# Learn Electron 项目规则文档

## 📋 项目概述

这是一个 Electron 学习项目，使用 TypeScript + Vite 构建，采用多页面课程结构。

## 🏗️ 项目结构

```
learn_electron/
├── src/
│   ├── main/              # 主进程代码
│   │   └── index.ts       # 应用入口，窗口管理和 IPC 处理器
│   ├── preload/           # 预加载脚本
│   │   └── index.ts       # 安全 API 桥接层
│   └── renderer/          # 渲染进程代码
│       ├── index.html     # 课程导航主页
│       ├── navigation.ts  # 导航页逻辑
│       ├── lesson01.html  # 第一课页面
│       ├── lesson01.ts    # 第一课逻辑
│       ├── lesson02.html  # 第二课页面
│       └── lesson02.ts    # 第二课逻辑
├── dist-electron/         # 构建输出（主进程和预加载脚本）
├── dist/                  # 构建输出（渲染进程）
├── package.json
├── tsconfig.json
├── vite.config.ts
└── LESSON_*.md            # 课程文档
```

## 📐 架构规则

### 1. 进程分离原则

- **主进程 (Main Process)**
  - 位置：`src/main/index.ts`
  - 职责：窗口管理、应用生命周期、IPC 处理器、文件系统操作
  - 规则：所有 Node.js API 调用必须在主进程中进行

- **预加载脚本 (Preload Script)**
  - 位置：`src/preload/index.ts`
  - 职责：通过 `contextBridge` 安全暴露 API 到渲染进程
  - 规则：使用 `ipcRenderer.invoke()` 调用主进程方法

- **渲染进程 (Renderer Process)**
  - 位置：`src/renderer/`
  - 职责：UI 展示、用户交互、调用预加载脚本暴露的 API
  - 规则：不能直接访问 Node.js API，必须通过预加载脚本

### 2. 多页面课程结构

#### 导航主页
- **文件**：`src/renderer/index.html` + `navigation.ts`
- **功能**：显示所有课程卡片，提供导航功能
- **规则**：
  - 使用 `data-lesson` 属性标识课程
  - 通过 `window.electronAPI.navigateToLesson()` 导航

#### 课程页面
- **命名规则**：`lesson{N}.html` + `lesson{N}.ts`（N 为课程编号）
- **结构要求**：
  - 必须有"返回课程列表"按钮
  - 使用 `window.electronAPI.navigateToHome()` 返回主页
  - 独立的样式和逻辑，不依赖其他课程

#### 添加新课程步骤
1. 创建 `src/renderer/lesson{N}.html` 和 `lesson{N}.ts`
2. 在主进程 `setupIPC()` 中添加课程映射：
   ```typescript
   const lessonMap: Record<string, string> = {
     'lesson01': 'lesson01.html',
     'lesson02': 'lesson02.html',
     'lesson{N}': 'lesson{N}.html'  // 新增
   };
   ```
3. 在导航主页 `index.html` 中添加课程卡片
4. 创建对应的 `LESSON_{N}.md` 文档

### 3. IPC 通信规范

#### 主进程注册处理器
```typescript
ipcMain.handle('handler-name', async (_event, ...args) => {
  // 处理逻辑
  return result;
});
```

#### 预加载脚本暴露 API
```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  methodName: (...args) => ipcRenderer.invoke('handler-name', ...args)
});
```

#### 渲染进程调用
```typescript
const result = await window.electronAPI.methodName(...args);
```

### 4. 安全规则

- ✅ **必须启用** `contextIsolation: true`
- ✅ **必须禁用** `nodeIntegration: false`
- ✅ **必须使用** `contextBridge` 暴露 API
- ✅ **所有文件操作** 必须在主进程中进行
- ✅ **错误处理** 必须完善，避免暴露敏感信息

## 🛠️ 开发规范

### TypeScript 配置

- 使用 `strict: true` 模式
- 所有文件必须通过类型检查
- 接口定义放在对应的 TypeScript 文件中

### 代码组织

- **单一职责**：每个文件只负责一个功能模块
- **命名规范**：
  - 文件：kebab-case（如 `lesson01.ts`）
  - 函数：camelCase
  - 接口：PascalCase
- **注释要求**：关键逻辑必须添加注释说明

### 文件操作规范

- 使用 `fs/promises` 进行异步文件操作
- 所有文件操作必须包含错误处理
- 文件路径使用 `join()` 拼接，避免硬编码

### UI 规范

- 使用统一的样式主题（渐变背景、毛玻璃效果）
- 按钮使用统一的样式类
- 响应式设计，适配不同窗口大小

## 📝 课程文档规范

### 文档命名
- 格式：`LESSON_{N}.md`（N 为课程编号，两位数）
- 示例：`LESSON_01.md`, `LESSON_02.md`

### 文档结构
```markdown
# 第 N 课：课程标题

## 📖 学习目标
## 🎯 核心概念
## 💻 代码解析
## 🔄 完整流程示例
## 🎮 实践操作
## 📝 关键要点
## ⚠️ 注意事项
## 🚀 扩展练习
```

## 🔧 构建和运行

### 开发模式
```bash
pnpm run electron:dev
```

**重要配置说明**：
- Vite 配置中设置了 `root: 'src/renderer'`，这样 HTML 文件可以直接通过 `/index.html` 访问
- 主进程使用 `process.env.VITE_DEV_SERVER_URL` 获取开发服务器 URL（由 `vite-plugin-electron` 自动设置）
- 如果环境变量不存在，会回退到 `http://localhost:5173/`

### 构建
```bash
pnpm run build
```

### 打包
```bash
pnpm run electron:build
```

## ⚠️ 常见问题

### 空白页面 / 404 错误

**问题**：启动后页面空白或出现 404 错误

**解决方案**：
1. 确保 `vite.config.ts` 中设置了 `root: 'src/renderer'`
2. 确保主进程代码使用 `process.env.VITE_DEV_SERVER_URL` 或回退到 `http://localhost:5173/`
3. 检查 Vite 服务器是否正常启动（查看终端输出）
4. 如果端口被占用，Vite 会自动切换到其他端口，需要相应更新主进程代码

### Content Security Policy 警告

**问题**：控制台出现 CSP 安全警告

**解决方案**：
在 HTML 文件的 `<head>` 中添加：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📦 依赖管理

- 使用 **pnpm** 作为包管理器
- 配置文件：`.npmrc`
- 锁定文件：`pnpm-lock.yaml`（必须提交）

## 🚫 禁止事项

- ❌ 在渲染进程中直接使用 `require('fs')`
- ❌ 禁用 `contextIsolation` 或启用 `nodeIntegration`
- ❌ 在主进程和渲染进程之间传递函数或复杂对象
- ❌ 硬编码文件路径（使用相对路径或配置）
- ❌ 忽略错误处理

## ✅ 最佳实践

1. **错误处理**：所有异步操作必须包含 try-catch
2. **类型安全**：充分利用 TypeScript 类型系统
3. **代码复用**：公共逻辑提取到工具函数
4. **用户体验**：操作反馈及时，错误提示清晰
5. **性能优化**：避免不必要的 IPC 调用

## 🔄 工作流程

### 添加新功能
1. 在主进程添加 IPC 处理器
2. 在预加载脚本暴露 API
3. 在渲染进程调用 API
4. 更新类型定义
5. 测试功能完整性

### 添加新课程
1. 创建课程 HTML 和 TS 文件
2. 更新主进程导航映射
3. 更新导航主页
4. 创建课程文档
5. 测试导航和功能

## 📚 参考资源

- [Electron 官方文档](https://www.electronjs.org/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Vite 文档](https://vitejs.dev/)

---

**最后更新**：2024-11-25

