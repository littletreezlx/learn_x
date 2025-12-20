import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile, stat } from 'fs/promises';
import { javaBridge } from './bridges/JavaBridge';
import { typeScriptBridge } from './bridges/TypeScriptBridge';
import type { StorageApiHandler } from './bridges/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (isDev) {
    const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
    if (VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(`${VITE_DEV_SERVER_URL}index.html`);
    } else {
      mainWindow.loadURL('http://localhost:5173/index.html');
    }
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

function loadPage(page: string): void {
  if (!mainWindow) return;
  if (isDev) {
    const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173/';
    mainWindow.loadURL(`${VITE_DEV_SERVER_URL}${page}`);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer', page));
  }
}

function setupIPC(): void {
  ipcMain.handle('ping', () => {
    return 'pong';
  });
  ipcMain.handle('get-time', () => {
    return new Date().toLocaleString('zh-CN');
  });
  ipcMain.handle('show-dialog', async () => {
    const result = await dialog.showMessageBox({
      type: 'info',
      title: 'IPC 通信演示',
      message: '这是来自主进程的消息！',
      detail: '渲染进程通过 IPC 成功调用了主进程的功能。',
      buttons: ['确定', '取消']
    });
    return result.response === 0 ? '用户点击了确定' : '用户点击了取消';
  });
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile'],
      filters: [
        { name: '文本文件', extensions: ['txt', 'md', 'json'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    });
    if (result.canceled) {
      return null;
    }
    return result.filePaths[0];
  });
  ipcMain.handle('read-file', async (_event, filePath: string) => {
    try {
      const content = await readFile(filePath, 'utf-8');
      const stats = await stat(filePath);
      return {
        success: true,
        content,
        size: stats.size,
        modified: stats.mtime.toLocaleString('zh-CN')
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  });
  ipcMain.handle('save-file', async (_event, content: string) => {
    const result = await dialog.showSaveDialog({
      title: '保存文件',
      defaultPath: 'untitled.txt',
      filters: [
        { name: '文本文件', extensions: ['txt'] },
        { name: 'Markdown', extensions: ['md'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    });
    if (result.canceled) {
      return { success: false, message: '用户取消了保存' };
    }
    try {
      await writeFile(result.filePath!, content, 'utf-8');
      return { success: true, path: result.filePath };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  });
  ipcMain.handle('get-file-info', async (_event, filePath: string) => {
    try {
      const stats = await stat(filePath);
      return {
        success: true,
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        created: stats.birthtime.toLocaleString('zh-CN'),
        modified: stats.mtime.toLocaleString('zh-CN'),
        accessed: stats.atime.toLocaleString('zh-CN')
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  });
  ipcMain.handle('navigate-to-lesson', (_event, lesson: string) => {
    const lessonMap: Record<string, string> = {
      'lesson01': 'lesson01.html',
      'lesson02': 'lesson02.html',
      'bridge-test': 'bridge-test.html'
    };
    const page = lessonMap[lesson];
    if (page) {
      loadPage(page);
    }
  });
  ipcMain.handle('navigate-to-home', () => {
    loadPage('index.html');
  });

  // ============= Java Bridge IPC 处理器 =============
  
  ipcMain.handle('java-bridge:initialize', async (_event, jarPath: string) => {
    try {
      await javaBridge.initialize(jarPath);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('java-bridge:execute', async (_event, className: string, methodName: string, ...args: any[]) => {
    try {
      const result = await javaBridge.execute(className, methodName, ...args);
      return { success: true, result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('java-bridge:execute-with-callback', async (_event, className: string, methodName: string, callbackId: string, ...args: any[]) => {
    try {
      await javaBridge.executeWithCallback(
        className,
        methodName,
        (msg: string) => {
          // 发送回调结果到渲染进程
          mainWindow?.webContents.send('java-callback', callbackId, msg);
        },
        ...args
      );
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('java-bridge:get-stats', () => {
    return javaBridge.getStats();
  });

  // ============= TypeScript Bridge IPC 处理器 =============
  
  ipcMain.handle('ts-bridge:initialize', async (_event, jsPath: string) => {
    try {
      await typeScriptBridge.initialize(jsPath);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('ts-bridge:execute', async (_event, code: string) => {
    try {
      const result = await typeScriptBridge.execute(code);
      return { success: true, result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('ts-bridge:inject-storage-api', () => {
    // 模拟的存储 API 实现
    const mockStorage = new Map<string, any>();
    
    const storageHandler: StorageApiHandler = {
      createUser: async (id: string, name: string, age: number) => {
        console.log(`[MockStorage] createUser: ${id}, ${name}, ${age}`);
        mockStorage.set(id, { id, name, age });
        return true;
      },
      getUser: async (id: string) => {
        console.log(`[MockStorage] getUser: ${id}`);
        const user = mockStorage.get(id);
        if (!user) {
          throw new Error(`用户不存在: ${id}`);
        }
        return JSON.stringify(user);
      },
      updateUser: async (id: string, newAge: number) => {
        console.log(`[MockStorage] updateUser: ${id}, ${newAge}`);
        const user = mockStorage.get(id);
        if (!user) {
          return false;
        }
        user.age = newAge;
        mockStorage.set(id, user);
        return true;
      },
      deleteUser: async (id: string) => {
        console.log(`[MockStorage] deleteUser: ${id}`);
        return mockStorage.delete(id);
      }
    };

    typeScriptBridge.injectStorageApi(storageHandler);
    return { success: true };
  });

  ipcMain.handle('ts-bridge:execute-with-storage', async (_event, code: string) => {
    try {
      const result = await typeScriptBridge.executeWithStorageApi(code);
      return { success: true, result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      };
    }
  });

  ipcMain.handle('ts-bridge:get-stats', () => {
    return typeScriptBridge.getStats();
  });
}

app.whenReady().then(() => {
  setupIPC();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

