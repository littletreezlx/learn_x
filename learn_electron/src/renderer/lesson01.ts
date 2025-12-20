interface ElectronAPI {
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  ping: () => Promise<string>;
  getTime: () => Promise<string>;
  showDialog: () => Promise<string>;
  navigateToHome: () => Promise<void>;
}

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
  document.getElementById('btn-ping')!.addEventListener('click', async () => {
    try {
      const response = await window.electronAPI.ping();
      updateResult(`✅ 收到响应: ${response}`);
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
  document.getElementById('btn-get-time')!.addEventListener('click', async () => {
    try {
      const time = await window.electronAPI.getTime();
      updateResult(`🕐 系统时间: ${time}`);
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
  document.getElementById('btn-show-dialog')!.addEventListener('click', async () => {
    try {
      const result = await window.electronAPI.showDialog();
      updateResult(`💬 对话框结果: ${result}`);
    } catch (error) {
      updateResult(`❌ 错误: ${error}`);
    }
  });
}

init();

