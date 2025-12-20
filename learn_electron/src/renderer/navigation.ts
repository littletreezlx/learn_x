interface ElectronAPI {
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  navigateToLesson: (lesson: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

function init(): void {
  if (!window.electronAPI) {
    console.error('electronAPI 未找到');
    return;
  }
  document.getElementById('platform')!.textContent = window.electronAPI.platform;
  document.getElementById('node-version')!.textContent = window.electronAPI.versions.node;
  document.getElementById('electron-version')!.textContent = window.electronAPI.versions.electron;
  const lessonCards = document.querySelectorAll('.lesson-card');
  lessonCards.forEach(card => {
    card.addEventListener('click', () => {
      const lesson = card.getAttribute('data-lesson');
      if (lesson) {
        window.electronAPI.navigateToLesson(lesson);
      }
    });
  });
}

init();

