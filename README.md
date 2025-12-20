# Learn X - 技术学习资源中心

这是一个系统化的技术学习资源集合项目，包含多个编程语言、框架和工具的学习模块。每个模块都有完整的学习路径、示例代码和实践项目。

## 🎯 项目目标

- 建立系统化的技术学习路径
- 积累可复用的代码示例和最佳实践
- 记录学习过程中的经验和决策
- 为 AI 辅助开发提供清晰的项目结构

## 📚 学习模块

| 模块 | 状态 | 描述 | 快速开始 |
|------|------|------|----------|
| [learn_cpp](learn_cpp/) | 🟢 活跃 | Java开发者的C++学习之旅 | [开始学习](learn_cpp/README.md) |
| [learn_nextjs](learn_nextjs/) | 🟢 活跃 | Next.js 全栈开发学习 | [开始学习](learn_nextjs/README.md) |
| [learn_vue](learn_vue/) | 🟡 维护 | Vue.js 前端框架学习 | - |
| [learn_docker](learn_docker/) | 🟡 维护 | Docker 容器化技术学习 | - |
| [learn_git](learn_git/) | 🟡 维护 | Git 版本控制学习 | - |

### 状态说明
- 🟢 活跃：正在积极学习和更新
- 🟡 维护：基础内容已完成，偶尔更新
- 🔴 归档：学习已完成，仅作参考

## 🗺️ 快速导航

### 我要做什么？

| 场景 | 推荐路径 |
|------|---------|
| 🆕 开始新的学习模块 | 1. 阅读对应模块的 README<br>2. 查看学习路线图<br>3. 从基础部分开始 |
| 📖 查找特定知识点 | 1. 使用 [FEATURE_CODE_MAP.md](FEATURE_CODE_MAP.md) 快速定位<br>2. 查看模块内的索引文件 |
| 🤖 AI 辅助开发 | 1. 阅读 [CLAUDE.md](CLAUDE.md) 了解项目规范<br>2. 查看 [PROJECT_STATUS.md](PROJECT_STATUS.md) 了解当前状态 |
| 📝 添加新的学习内容 | 1. 查看 [docs/standards/](docs/standards/) 了解规范<br>2. 更新 FEATURE_CODE_MAP.md |

## 🛠️ 项目规范

### 文档系统
- **核心文档**（根目录）
  - `README.md` - 项目概览和导航（本文件）
  - `CLAUDE.md` - AI 操作指南
  - `PROJECT_STATUS.md` - 项目状态快照
  - `FEATURE_CODE_MAP.md` - 学习模块映射

- **标准规范**（docs/standards/）
  - 代码规范、文档规范、学习记录规范

- **架构决策**（docs/decisions/）
  - 重要的学习路径决策和技术选型

### 目录结构原则
```
learn_x/
├── README.md              # 项目总览
├── CLAUDE.md              # AI 操作指南
├── PROJECT_STATUS.md      # 项目状态
├── FEATURE_CODE_MAP.md    # 模块映射
├── docs/                  # 共享文档
│   ├── INDEX.md           # 场景驱动索引
│   ├── standards/         # 规范文档
│   └── decisions/         # 决策记录
└── learn_xxx/             # 各学习模块
    ├── README.md          # 模块概览
    ├── CLAUDE.md          # 模块 AI 指南
    └── ...                # 具体内容
```

## 🚀 开始使用

1. **选择学习模块**
   ```bash
   cd learn_xxx
   ```

2. **阅读模块文档**
   - 查看 README.md 了解模块概况
   - 查看学习路线图规划学习路径

3. **运行示例代码**
   - 按照各模块的快速开始指南操作

## 📊 学习进度追踪

详见 [PROJECT_STATUS.md](PROJECT_STATUS.md)

## 🤝 贡献指南

这是个人学习项目，主要用于：
- 记录学习过程和心得
- 积累可复用的代码模板
- 为 AI 辅助开发提供良好的项目结构

## 📄 License

MIT License - 仅供学习参考使用
