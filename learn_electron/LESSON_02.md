# 第二课：文件系统操作

## 📖 学习目标

学习如何在 Electron 应用中安全地操作文件系统：读取文件、写入文件、选择文件对话框、获取文件信息。

## 🎯 核心概念

### 1. 文件系统访问

在 Electron 中，文件系统操作必须在**主进程**中进行，因为：
- 渲染进程默认无法访问 Node.js API（安全考虑）
- 主进程可以安全地使用 `fs` 模块
- 通过 IPC 通信将文件操作结果传递给渲染进程

### 2. 文件对话框

Electron 提供了两种文件对话框：

- **`dialog.showOpenDialog()`**：打开文件选择对话框
- **`dialog.showSaveDialog()`**：打开文件保存对话框

### 3. 异步文件操作

使用 Node.js 的 `fs/promises` 模块进行异步文件操作：
- `readFile()`：读取文件
- `writeFile()`：写入文件
- `stat()`：获取文件信息

## 💻 代码解析

### 主进程：文件选择 (`src/main/index.ts`)

```typescript
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    title: '选择文件',
    properties: ['openFile'],
    filters: [
      { name: '文本文件', extensions: ['txt', 'md', 'json'] },
      { name: '所有文件', extensions: ['*'] }
    ]
  });
  return result.canceled ? null : result.filePaths[0];
});
```

**要点**：
- `properties: ['openFile']` 指定只能选择文件
- `filters` 定义文件类型过滤器
- 返回文件路径或 `null`（用户取消）

### 主进程：读取文件

```typescript
ipcMain.handle('read-file', async (_event, filePath: string) => {
  const content = await readFile(filePath, 'utf-8');
  const stats = await stat(filePath);
  return {
    success: true,
    content,
    size: stats.size,
    modified: stats.mtime.toLocaleString('zh-CN')
  };
});
```

**要点**：
- 使用 `readFile()` 读取文件内容（指定编码为 'utf-8'）
- 使用 `stat()` 获取文件元信息
- 返回结构化的结果对象

### 主进程：保存文件

```typescript
ipcMain.handle('save-file', async (_event, content: string) => {
  const result = await dialog.showSaveDialog({
    title: '保存文件',
    defaultPath: 'untitled.txt',
    filters: [...]
  });
  if (result.canceled) return { success: false };
  
  await writeFile(result.filePath!, content, 'utf-8');
  return { success: true, path: result.filePath };
});
```

**要点**：
- 先显示保存对话框让用户选择保存位置
- 使用 `writeFile()` 写入文件
- 处理用户取消的情况

### 预加载脚本：暴露 API

```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.invoke('select-file'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  saveFile: (content: string) => ipcRenderer.invoke('save-file', content),
  getFileInfo: (filePath: string) => ipcRenderer.invoke('get-file-info', filePath)
});
```

**要点**：
- 通过 `contextBridge` 安全暴露文件操作 API
- 使用 `ipcRenderer.invoke()` 调用主进程方法

### 渲染进程：调用文件操作

```typescript
const filePath = await window.electronAPI.selectFile();
if (filePath) {
  const result = await window.electronAPI.readFile(filePath);
  if (result.success) {
    // 显示文件内容
  }
}
```

**要点**：
- 使用 `async/await` 处理异步操作
- 检查操作结果的成功状态
- 处理错误情况

## 🔄 完整流程示例

### 读取文件流程

```
渲染进程
  ↓
window.electronAPI.selectFile()
  ↓
预加载脚本
  ↓
ipcRenderer.invoke('select-file')
  ↓
主进程
  ↓
dialog.showOpenDialog()
  ↓
用户选择文件
  ↓
返回文件路径
  ↓
渲染进程调用 readFile()
  ↓
主进程 readFile() + stat()
  ↓
返回文件内容和元信息
  ↓
渲染进程显示内容
```

## 🎮 实践操作

1. **选择文件**：点击"选择文件"按钮，在对话框中选择一个文本文件
2. **读取文件**：选择文件后，点击"读取文件"查看内容
3. **保存文件**：在文本框中编辑内容，点击"保存文件"保存
4. **文件信息**：查看文件的详细信息（大小、创建时间等）

## 📝 关键要点

1. ✅ **安全性**：所有文件操作都在主进程中进行
2. ✅ **用户体验**：使用系统原生对话框
3. ✅ **错误处理**：始终检查操作结果和错误
4. ✅ **异步操作**：使用 `async/await` 处理异步文件操作
5. ✅ **文件编码**：明确指定文件编码（如 'utf-8'）

## ⚠️ 注意事项

1. **路径处理**：注意不同操作系统的路径分隔符
2. **文件权限**：确保应用有读取/写入文件的权限
3. **大文件处理**：对于大文件，考虑使用流式处理
4. **错误处理**：文件不存在、权限不足等情况需要妥善处理

## 🚀 扩展练习

- 实现文件拖拽功能
- 添加文件内容搜索
- 支持多文件选择
- 实现文件历史记录
- 添加文件编码检测和转换

## 🔗 相关资源

- [Node.js fs 模块文档](https://nodejs.org/api/fs.html)
- [Electron dialog 模块文档](https://www.electronjs.org/docs/latest/api/dialog)
- [文件系统最佳实践](https://www.electronjs.org/docs/latest/tutorial/security#17-validate-all-user-inputs)

