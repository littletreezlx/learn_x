interface FileReadResult {
  success: boolean;
  content?: string;
  size?: number;
  modified?: string;
  error?: string;
}

interface FileSaveResult {
  success: boolean;
  path?: string;
  message?: string;
  error?: string;
}

interface FileInfoResult {
  success: boolean;
  size?: number;
  isFile?: boolean;
  isDirectory?: boolean;
  created?: string;
  modified?: string;
  accessed?: string;
  error?: string;
}

interface ElectronAPI {
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  selectFile: () => Promise<string | null>;
  readFile: (filePath: string) => Promise<FileReadResult>;
  saveFile: (content: string) => Promise<FileSaveResult>;
  getFileInfo: (filePath: string) => Promise<FileInfoResult>;
  navigateToHome: () => Promise<void>;
}

let currentFilePath: string | null = null;

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

function updateResult(message: string): void {
  const resultBox = document.getElementById('result')!;
  const timestamp = new Date().toLocaleTimeString();
  resultBox.textContent = `[${timestamp}] ${message}`;
}

function updateFilePath(filePath: string | null): void {
  const filePathDiv = document.getElementById('file-path')!;
  const currentFileSpan = document.getElementById('current-file')!;
  if (filePath) {
    currentFilePath = filePath;
    currentFileSpan.textContent = filePath;
    filePathDiv.style.display = 'block';
  } else {
    currentFilePath = null;
    filePathDiv.style.display = 'none';
  }
}

function init(): void {
  if (!window.electronAPI) {
    updateResult('错误: electronAPI 未找到');
    return;
  }
  document.getElementById('platform')!.textContent = window.electronAPI.platform;
  document.getElementById('node-version')!.textContent = window.electronAPI.versions.node;
  document.getElementById('chrome-version')!.textContent = window.electronAPI.versions.chrome;
  document.getElementById('electron-version')!.textContent = window.electronAPI.versions.electron;
  document.getElementById('btn-back')!.addEventListener('click', () => {
    window.electronAPI.navigateToHome();
  });
  document.getElementById('btn-select-file')!.addEventListener('click', async () => {
    try {
      const filePath = await window.electronAPI.selectFile();
      if (filePath) {
        updateFilePath(filePath);
        updateResult(`✅ 已选择文件: ${filePath}`);
      } else {
        updateResult('ℹ️ 用户取消了文件选择');
      }
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
  document.getElementById('btn-read-file')!.addEventListener('click', async () => {
    if (!currentFilePath) {
      updateResult('⚠️ 请先选择文件');
      return;
    }
    try {
      updateResult('📖 正在读取文件...');
      const result = await window.electronAPI.readFile(currentFilePath);
      if (result.success) {
        const contentTextarea = document.getElementById('file-content') as HTMLTextAreaElement;
        contentTextarea.value = result.content || '';
        updateResult(`✅ 文件读取成功\n大小: ${result.size} 字节\n修改时间: ${result.modified}`);
      } else {
        updateResult(`❌ 读取失败: ${result.error}`);
      }
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
  document.getElementById('btn-save-file')!.addEventListener('click', async () => {
    const contentTextarea = document.getElementById('file-content') as HTMLTextAreaElement;
    const content = contentTextarea.value;
    if (!content.trim()) {
      updateResult('⚠️ 内容为空，无法保存');
      return;
    }
    try {
      updateResult('💾 正在保存文件...');
      const result = await window.electronAPI.saveFile(content);
      if (result.success && result.path) {
        updateFilePath(result.path);
        updateResult(`✅ 文件保存成功: ${result.path}`);
      } else {
        updateResult(`❌ 保存失败: ${result.error || result.message}`);
      }
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
  document.getElementById('btn-file-info')!.addEventListener('click', async () => {
    if (!currentFilePath) {
      updateResult('⚠️ 请先选择文件');
      return;
    }
    try {
      updateResult('📊 正在获取文件信息...');
      const result = await window.electronAPI.getFileInfo(currentFilePath);
      if (result.success) {
        updateResult(
          `✅ 文件信息:\n` +
          `类型: ${result.isFile ? '文件' : result.isDirectory ? '目录' : '未知'}\n` +
          `大小: ${result.size} 字节\n` +
          `创建时间: ${result.created}\n` +
          `修改时间: ${result.modified}\n` +
          `访问时间: ${result.accessed}`
        );
      } else {
        updateResult(`❌ 获取信息失败: ${result.error}`);
      }
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
}

init();

