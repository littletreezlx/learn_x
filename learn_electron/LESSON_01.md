# 第一课：主进程与渲染进程的 IPC 通信

## 📖 学习目标

理解 Electron 的核心概念：主进程（Main Process）和渲染进程（Renderer Process）之间的通信机制。

## 🎯 核心概念

### 1. 进程架构

Electron 应用由两个主要进程组成：

- **主进程（Main Process）**：
  - 控制应用生命周期
  - 创建和管理窗口
  - 可以访问 Node.js API
  - 一个应用只有一个主进程

- **渲染进程（Renderer Process）**：
  - 显示网页内容
  - 运行前端代码（HTML/CSS/JavaScript）
  - 默认无法直接访问 Node.js API（安全考虑）
  - 每个窗口对应一个渲染进程

### 2. IPC 通信

**IPC（Inter-Process Communication）** 是进程间通信的机制。

- **渲染进程 → 主进程**：使用 `ipcRenderer.invoke()`
- **主进程 → 渲染进程**：使用 `ipcMain.handle()`

### 3. 安全机制

- **Context Isolation（上下文隔离）**：渲染进程和主进程隔离
- **Preload Script（预加载脚本）**：在隔离的上下文中运行，通过 `contextBridge` 安全地暴露 API

## 💻 代码解析

### 预加载脚本 (`src/preload/index.ts`)

```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getTime: () => ipcRenderer.invoke('get-time'),
  showDialog: () => ipcRenderer.invoke('show-dialog')
});
```

**作用**：安全地暴露 IPC 方法到渲染进程的 `window.electronAPI`

### 主进程 (`src/main/index.ts`)

```typescript
ipcMain.handle('ping', () => {
  return 'pong';
});

ipcMain.handle('get-time', () => {
  return new Date().toLocaleString('zh-CN');
});
```

**作用**：注册 IPC 处理器，响应渲染进程的调用

### 渲染进程 (`src/renderer/main.ts`)

```typescript
const response = await window.electronAPI.ping();
```

**作用**：调用预加载脚本暴露的方法，与主进程通信

## 🔄 通信流程

```
渲染进程 (Renderer)
    ↓
window.electronAPI.ping()
    ↓
预加载脚本 (Preload)
    ↓
ipcRenderer.invoke('ping')
    ↓
主进程 (Main)
    ↓
ipcMain.handle('ping')
    ↓
返回结果
    ↓
渲染进程收到响应
```

## 🎮 实践操作

运行应用后，点击三个按钮：

1. **发送 Ping**：最简单的 IPC 通信示例
2. **获取系统时间**：主进程返回系统时间
3. **显示对话框**：主进程调用 Electron API 显示对话框

## 📝 关键要点

1. ✅ 使用 `contextBridge` 安全地暴露 API
2. ✅ 使用 `ipcRenderer.invoke()` 和 `ipcMain.handle()` 进行双向通信
3. ✅ 保持 `contextIsolation: true` 和 `nodeIntegration: false` 确保安全
4. ✅ 所有 Node.js API 调用都在主进程中进行

## 🚀 下一步

- 第二课：文件系统操作
- 第三课：窗口管理
- 第四课：菜单和快捷键

