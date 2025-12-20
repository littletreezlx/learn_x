import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },
  ping: () => ipcRenderer.invoke('ping'),
  getTime: () => ipcRenderer.invoke('get-time'),
  showDialog: () => ipcRenderer.invoke('show-dialog'),
  selectFile: () => ipcRenderer.invoke('select-file'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  saveFile: (content: string) => ipcRenderer.invoke('save-file', content),
  getFileInfo: (filePath: string) => ipcRenderer.invoke('get-file-info', filePath),
  navigateToLesson: (lesson: string) => ipcRenderer.invoke('navigate-to-lesson', lesson),
  navigateToHome: () => ipcRenderer.invoke('navigate-to-home'),

  // ============= Java Bridge API =============
  javaBridge: {
    initialize: (jarPath: string) => ipcRenderer.invoke('java-bridge:initialize', jarPath),
    execute: (className: string, methodName: string, ...args: any[]) => 
      ipcRenderer.invoke('java-bridge:execute', className, methodName, ...args),
    executeWithCallback: (className: string, methodName: string, callback: (msg: string) => void, ...args: any[]) => {
      const callbackId = `callback-${Date.now()}-${Math.random()}`;
      const listener = (_event: any, id: string, msg: string) => {
        if (id === callbackId) {
          callback(msg);
          ipcRenderer.removeListener('java-callback', listener);
        }
      };
      ipcRenderer.on('java-callback', listener);
      return ipcRenderer.invoke('java-bridge:execute-with-callback', className, methodName, callbackId, ...args);
    },
    getStats: () => ipcRenderer.invoke('java-bridge:get-stats')
  },

  // ============= TypeScript Bridge API =============
  tsBridge: {
    initialize: (jsPath: string) => ipcRenderer.invoke('ts-bridge:initialize', jsPath),
    execute: (code: string) => ipcRenderer.invoke('ts-bridge:execute', code),
    injectStorageApi: () => ipcRenderer.invoke('ts-bridge:inject-storage-api'),
    executeWithStorage: (code: string) => ipcRenderer.invoke('ts-bridge:execute-with-storage', code),
    getStats: () => ipcRenderer.invoke('ts-bridge:get-stats')
  }
});

