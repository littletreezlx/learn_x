# Learn Vue 3 - 快速掌握现代前端框架

> **面向有 React/JavaScript 经验的开发者** - 8-10 天掌握 Vue 3 核心概念

---

## 💡 Vue 3 主要用来做什么？

### 设计目标
Vue 3 是为**渐进式Web应用**而设计的框架，强调**易学易用、性能优秀、功能完备**。

### 与 React 对比

| 领域 | React | Vue 3 | Vue 3 的优势 |
|------|-------|-------|-------------|
| **学习曲线** | 陡峭（JSX、hooks、生态） | 平缓（模板语法、渐进式） | 模板更接近HTML，容易上手 |
| **开发体验** | 灵活但需要更多配置 | 开箱即用，约定优于配置 | 内置路由、状态管理支持 |
| **性能** | 虚拟DOM优化 | 编译时优化 + 虚拟DOM | 更小的包体积，更快的渲染 |
| **TypeScript** | 需要额外配置 | 原生支持，类型推导更准确 | 内置TS支持，类型更安全 |
| **生态系统** | 成熟庞大 | 快速增长，官方生态完整 | 官方工具链完善 |

### Vue 3 的"甜蜜区"

✅ **特别擅长**：
- 单页面应用（SPA）
- 中小型企业管理后台
- 移动端H5应用
- 快速原型和MVP开发
- 需要SEO的应用（SSR支持好）

⏸️ **可以做，但不是首选**：
- 大型复杂的企业级应用（Angular更合适）
- 实时性要求极高的应用（原生JS或WebAssembly更佳）
- 需要极致性能的3D游戏（WebGL相关技术更合适）

---

## 🎯 学习目标

- 理解 Vue 3 的设计理念（渐进式、易学易用）
- 掌握 Vue 3 与 React 的关键差异
- 能够编写地道的 Vue 3 代码（Composition API）
- 独立完成一个 Vue 3 项目（管理后台或H5应用）

---

## 📚 核心对比：Vue 3 vs React

| 特性 | React | Vue 3 |
|------|-------|-------|
| 模板语法 | JSX（JavaScript） | 模板（HTML-like） |
| 状态管理 | useState, useReducer | ref, reactive |
| 计算属性 | useMemo | computed |
| 副作用处理 | useEffect | watch, watchEffect |
| 组件通信 | props, callback, Context | props, emit, provide/inject |
| 条件渲染 | 三元运算符, && | v-if, v-show |
| 列表渲染 | map() | v-for |
| 表单处理 | 受控组件 | v-model |
| 样式方案 | CSS-in-JS, CSS Modules | Scoped CSS, CSS Modules |

---

## 🚀 快速开始

### 1. 环境准备

```bash
# 确保有 Node.js 14+
node --version

# 进入项目目录
cd learn_vue

# 安装依赖
yarn install

# 启动开发服务器
yarn serve
```

### 2. 30分钟快速上手

```bash
# 查看30分钟快速开始指南
cat QUICK_START.md
```

### 3. 学习路线图

**阶段 1：响应式系统（1-2天）**
- ref vs reactive
- computed 计算属性
- watch 和 watchEffect

**阶段 2：组件通信（2-3天）**
- Props 和 Emits
- 插槽 Slots
- Provide/Inject

**阶段 3：生命周期与组合（2-3天）**
- 生命周期钩子
- 组合式函数（Composables）
- 逻辑复用

**阶段 4：实战项目（3-4天）**
- **第一目标：Todo List**（练习核心概念）
- **第二目标：表单应用**（练习表单处理）

#### 💡 为什么先 Todo List 后表单应用？

**Todo List 的优势**（适合入门）：
- ✅ 专注核心概念（响应式、列表、事件）
- ✅ 不需要复杂的状态管理
- ✅ 快速看到成果（几十行代码就能做有用的东西）
- ✅ 覆盖大部分Vue 3基础用法

**表单应用的复杂性**（需要一定基础）：
- 需要理解表单验证、数据绑定
- 涉及更复杂的状态管理
- 需要理解用户交互和错误处理

**学习路径设计**：
```
Todo List（简单）
  ↓  掌握：响应式、组件通信、列表操作
表单应用（中等）
  ↓  掌握：表单验证、状态管理、用户交互
管理后台（复杂）
  ↓  掌握：路由、权限、状态管理
```

---

## 📂 示例文件编号说明

所有示例文件采用编号方式组织，方便你直观地看到学习顺序：

### 编号对应关系

**阶段 1：响应式系统（01-03）**
- `01_ref_vs_reactive.vue` - ref vs reactive，响应式基础
- `02_computed_basics.vue` - 计算属性，自动缓存和依赖追踪
- `03_watch_watcheffect.vue` - 监听器，副作用处理

**阶段 2：组件通信（04-06）**
- `04_props_demo.vue` - Props 传递，单向数据流
- `05_emits_demo.vue` - 事件发射，子父组件通信
- `06_slots_demo.vue` - 插槽，内容分发和作用域插槽

**阶段 3：生命周期与组合（07-09）**
- `07_lifecycle_demo.vue` - 生命周期钩子，组件挂载与清理
- `08_composables_demo.vue` - 组合式函数，逻辑复用
- `09_provide_inject.vue` - Provide/Inject，跨层级通信

**阶段 4：实战项目（10-12）**
- `10_todo_list.vue` - Todo List，完整的CRUD操作
- `11_form_app.vue` - 表单应用，验证和提交
- `12_advanced_demo.vue` - 高级技巧，性能优化

### 如何使用

```bash
cd learn_vue

# 启动开发服务器
yarn serve

# 按顺序学习（建议）
1. 访问 http://localhost:8080
2. 从 "响应式系统" 开始
3. 按编号顺序学习每个示例
4. 完成基础后挑战实战项目
```

**学习建议**：
- ✅ 按编号顺序学习，每个示例都建立在前面的基础上
- ✅ 运行代码，观察输出，理解概念
- ✅ 修改代码，做实验，加深理解
- ✅ 对比 React，理解设计差异

---

## 📁 项目结构

```
learn_vue/
├── README.md                  # 本文件
├── QUICK_START.md             # 30分钟快速上手
├── CORE_CHECKLIST.md          # 核心知识检查清单
├── CLAUDE.md                  # Vue 3 学习助手规则
├── src/
│   ├── examples/              # 学习示例（已编号）
│   │   ├── 01_ref_vs_reactive.vue
│   │   ├── 02_computed_basics.vue
│   │   ├── ...
│   │   └── 12_advanced_demo.vue
│   ├── projects/              # 实战项目
│   │   ├── todo-app/
│   │   └── form-app/
│   ├── components/            # 可复用组件
│   ├── App.vue               # 主应用（导航和路由）
│   └── main.js               # 入口文件
└── exercises/                # 练习题目
    ├── basic/
    ├── intermediate/
    └── advanced/
```

---

## 📋 核心知识检查清单

详见 [CORE_CHECKLIST.md](CORE_CHECKLIST.md)

---

## 🔗 推荐资源

- **官方文档**: https://cn.vuejs.org/
- **Vue DevTools**: https://devtools.vuejs.org/
- **Volar 扩展**: VS Code 中的 Vue 3 官方扩展

---

## 🎯 学习完成标准

### ✅ 知识维度
- 理解 Vue 3 的响应式系统（ref、reactive、computed、watch）
- 掌握组件通信的多种方式（props、emit、slots、provide/inject）
- 熟悉生命周期钩子的使用时机
- 了解 Composition API 的优势和组合式函数

### ✅ 实践维度
- 完成至少 1 个 Vue 3 项目（Todo List 或表单应用）
- 能够创建可复用的组件和组合式函数
- 会使用 Vue DevTools 调试应用

### ✅ 能力维度
- 能够阅读和分析他人的 Vue 3 代码
- 知道何时使用不同的通信方式
- 能够查阅官方文档解决问题

---

开始学习：查看 [QUICK_START.md](QUICK_START.md)
