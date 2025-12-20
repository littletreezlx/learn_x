# Learn Electron

Electron 学习项目，使用 TypeScript + Vite 构建。

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具

## 项目结构

```
learn_electron/
├── src/
│   ├── main/          # 主进程代码
│   │   └── index.ts   # 应用入口
│   ├── preload/       # 预加载脚本
│   │   └── index.ts   # 安全桥接层
│   └── renderer/      # 渲染进程代码
│       ├── index.html # 页面模板
│       └── main.ts    # 前端逻辑
├── dist/              # 构建输出
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run electron:dev
```

这将同时启动 Vite 开发服务器和 Electron 应用。

### 构建

```bash
pnpm run build
```

### 打包应用

```bash
pnpm run electron:build
```

## 架构说明

### 主进程 (Main Process)
- 位于 `src/main/index.ts`
- 负责创建和管理应用窗口
- 控制应用生命周期

### 预加载脚本 (Preload Script)
- 位于 `src/preload/index.ts`
- 在渲染进程和主进程之间建立安全桥接
- 通过 `contextBridge` 暴露安全的 API

### 渲染进程 (Renderer Process)
- 位于 `src/renderer/`
- 运行前端代码（HTML/CSS/TypeScript）
- 通过预加载脚本访问 Electron API

## 安全最佳实践

- ✅ 启用 `contextIsolation`
- ✅ 禁用 `nodeIntegration`
- ✅ 使用 `contextBridge` 暴露 API
- ✅ 使用 TypeScript 类型检查

