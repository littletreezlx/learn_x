# Vue 3 学习项目

> 一个系统化的 Vue 3 学习项目，从基础概念到实战应用

## 📚 项目简介

这是一个专为学习 Vue 3 设计的实践项目。通过结构化的示例代码和实战项目，帮助你快速掌握 Vue 3 的核心概念和 Composition API。

## 🎯 学习目标

- ✅ 理解 Vue 3 响应式系统原理（ref、reactive、computed、watch）
- ✅ 掌握 Composition API 的使用方法
- ✅ 熟悉组件通信的多种方式
- ✅ 理解生命周期钩子的使用时机
- ✅ 能够构建完整的 Vue 3 应用

## 📁 项目结构

```
learn_vue/
├── src/
│   ├── examples/              # 学习示例（按概念分类）
│   │   ├── 01-reactivity/     # 响应式系统
│   │   ├── 02-components/     # 组件通信
│   │   ├── 03-lifecycle/      # 生命周期
│   │   ├── 04-composition/    # Composition API
│   │   └── README.md          # 示例导航
│   ├── projects/              # 实战项目
│   │   ├── todo-app/          # Todo List 应用
│   │   └── form-app/          # 表单应用
│   ├── App.vue               # 主应用入口
│   └── main.js               # Vue 实例创建
├── README.md                 # 项目说明（本文件）
└── CLAUDE.md                 # AI 学习助手指南
```

## 🚀 快速开始

### 环境要求
- Node.js >= 14.x
- yarn 或 npm

### 安装依赖
```bash
yarn install
# 或
npm install
```

### 启动开发服务器
```bash
yarn serve
# 或
npm run serve
```

访问 http://localhost:8080 查看应用

### 生产构建
```bash
yarn build
# 或
npm run build
```

### 代码检查
```bash
yarn lint
# 或
npm run lint
```

## 📖 学习路径

### 阶段一：基础概念（预计 3-5 天）
1. **响应式系统** - `src/examples/01-reactivity/`
   - ref vs reactive
   - computed 计算属性
   - watch 和 watchEffect

2. **组件基础** - `src/examples/02-components/`
   - Props 向下传递
   - Emits 向上通信
   - Provide/Inject 跨层级通信

### 阶段二：核心功能（预计 3-5 天）
3. **生命周期** - `src/examples/03-lifecycle/`
   - onMounted, onUpdated, onUnmounted
   - 使用场景和最佳实践

4. **Composition API** - `src/examples/04-composition/`
   - setup 函数
   - 组合式函数（Composables）
   - 逻辑复用

### 阶段三：实战应用（预计 5-7 天）
5. **Todo List** - `src/projects/todo-app/`
   - 完整的 CRUD 操作
   - 本地存储
   - 状态管理

6. **表单应用** - `src/projects/form-app/`
   - 表单验证
   - 动态表单
   - 数据提交

## 💡 学习建议

1. **按顺序学习** - 从基础示例开始，循序渐进
2. **动手实践** - 每个示例都要自己敲一遍代码
3. **理解原理** - 不只记住语法，要理解背后的原理
4. **查阅文档** - 遇到问题优先查阅 [Vue 官方文档](https://cn.vuejs.org/)
5. **做好笔记** - 记录学习过程中的疑问和收获

## 🔧 开发工具推荐

- **编辑器**: VS Code
- **浏览器**: Chrome + Vue DevTools 扩展
- **VS Code 扩展**:
  - Volar (Vue 3 官方扩展)
  - ESLint
  - Prettier

## 📚 学习资源

### 官方资源
- [Vue 3 官方文档](https://cn.vuejs.org/) - 最权威的学习资料
- [Vue Router](https://router.vuejs.org/zh/) - 路由管理
- [Pinia](https://pinia.vuejs.org/zh/) - 状态管理

### 推荐教程
- [Vue Mastery](https://www.vuemastery.com/) - 高质量视频教程
- [Vue School](https://vueschool.io/) - 系统化课程

## ❓ 常见问题

### Q: ref 和 reactive 有什么区别？
A: 查看 `src/examples/01-reactivity/RefVsReactive.vue` 了解详细对比

### Q: 什么时候使用 Composition API？
A: 查看 `src/examples/04-composition/README.md` 了解使用场景

### Q: 如何调试 Vue 应用？
A: 安装 Vue DevTools 浏览器扩展，可以查看组件树、状态变化等

## 🎓 学习检查清单

完成以下内容，你就掌握了 Vue 3 的核心知识：

- [ ] 能解释 ref 和 reactive 的区别
- [ ] 能使用 computed 创建派生状态
- [ ] 能使用 watch 监听数据变化
- [ ] 能实现父子组件通信
- [ ] 能使用 provide/inject 跨层级通信
- [ ] 理解生命周期钩子的调用时机
- [ ] 能创建和使用组合式函数
- [ ] 能独立完成一个 Todo List 应用
- [ ] 能处理表单验证和提交

## 🤝 反馈与改进

如果你在学习过程中有任何疑问或建议，欢迎：
- 在项目中添加注释和笔记
- 向 AI 学习助手提问（参考 CLAUDE.md）
- 尝试扩展现有示例或创建新的实战项目

## 📄 许可

本项目仅用于学习目的。
