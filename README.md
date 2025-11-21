# Learn X - 多技术栈学习项目集

> **广度优先学习** - 快速掌握多个技术栈的核心知识，能独立完成实际项目

---

## 🎯 项目定位

这是一个**个人技术学习工作区**，包含多个技术方向的学习项目。每个子项目都遵循**20%核心知识解决80%问题**的原则，帮助你快速上手并具备实战能力。

### 个人背景
- **最擅长**: Java, Kotlin
- **熟练**: JavaScript, Python, C
- **学习目标**: 个人兴趣驱动

### 学习目标
- ✅ 广度优先，快速建立技术全景认知
- ✅ 掌握每个技术的核心部分
- ✅ 能独立完成小型实际项目
- ✅ 知道如何深入学习和查找资料

### 核心理念

**这是演示项目（Demo），不是测试项目（Test）**

| 维度 | 测试项目 | learn_x |
|------|---------|---------|
| **目标** | 确保代码正确 | 快速验证概念 |
| **心态** | 防御性（不能出错） | 探索性（试试看） |
| **重点** | 完美的实现 | 能运行、能理解 |

我们鼓励：
- ✅ **试错和探索** - 代码不完美没关系，重点是理解概念
- ✅ **即时反馈** - 快速运行、立即看到结果
- ✅ **多次实验** - 改代码、试不同用法，深入理解

### 不是什么
- ❌ 不是从零到专家的完整课程
- ❌ 不追求每个技术的深度和广度
- ❌ 不包含所有边缘特性和高级用法
- ❌ 不要求代码完美或生产级质量

---

## 📚 子项目总览

| 项目 | 技术栈 | 学习时长 | 状态 | 核心内容 |
|------|--------|---------|------|---------|
| **[learn_cpp](learn_cpp/)** | C++17 | 10-14天 | ✅ 完整框架 | 指针、内存管理、STL、类设计 |
| **[learn_docker](learn_docker/)** | Docker, Docker Compose | 5-7天 | ✅ 有示例 | 容器化、镜像构建、多容器编排 |
| **[learn_nextjs](learn_nextjs/)** | Next.js 13+, React | 7-10天 | ✅ ✨ 已重构 | 统一编号、全栈开发、Java开发友好 |
| **[learn_vue](learn_vue/)** | Vue 3 | 7-10天 | 🔄 基础框架 | 组件化、响应式、Composition API |
| **[learn_ios](learn_ios/)** | Swift, SwiftUI | 10-14天 | ✅ 完整框架 | Swift语法、SwiftUI、数据管理、网络 |
| **[learn_go](learn_go/)** | Go 1.21+ | 7-10天 | ✅ 完整框架 | 并发、接口、错误处理 |

---

## 🚀 快速开始

### 新手指南

**第一次使用？**

1. 选择一个感兴趣的技术
2. 进入对应的子项目目录
3. 阅读该项目的 `README.md`
4. 按照推荐学习路径开始

**示例：学习C++**
```bash
cd learn_cpp
cat README.md          # 查看项目总览
cat QUICK_START.md     # 30分钟快速上手
```

### 选择学习路径

根据你的目标选择:

**🎯 目标：前端开发**
→ 推荐路径: `learn_nextjs` → `learn_vue`

**🎯 目标：后端开发**
→ 推荐路径: `learn_cpp` → `learn_docker`

**🎯 目标：全栈开发**
→ 推荐路径: `learn_nextjs` → `learn_docker`

**🎯 目标：移动端开发**
→ 推荐路径: `learn_ios` → `learn_nextjs`

**🎯 目标：DevOps**
→ 推荐路径: `learn_docker` → `learn_cpp`

---

## 📋 子项目详细介绍

### 1. Learn C++ ([learn_cpp](learn_cpp/))

**适合人群**: 有编程基础，想学习系统级编程语言

**核心内容**:
- 指针和引用的理解与使用
- 内存管理 (智能指针、RAII)
- STL容器 (vector, map, string)
- 类和对象设计

**学习资源**:
- ✅ [30分钟快速上手](learn_cpp/QUICK_START.md)
- ✅ [核心知识检查清单](learn_cpp/CORE_CHECKLIST.md)
- ✅ [5个常用代码模式](learn_cpp/CODE_PATTERNS/)
- ✅ [常见问题排查](learn_cpp/TROUBLESHOOTING.md)

**预计时间**: 10-14天 (每天1-2小时)

---

### 2. Learn Docker ([learn_docker](learn_docker/))

**适合人群**: 需要容器化部署应用的开发者

**核心内容**:
- Docker 基础概念和架构
- Dockerfile 编写和镜像构建
- Docker Compose 多容器编排
- 实际 Spring Boot 应用容器化

**学习资源**:
- ✅ 完整的 Spring Boot 示例应用
- ✅ 多环境配置实践
- ✅ 自动化练习脚本
- ✅ API测试工具

**预计时间**: 5-7天 (每天1-2小时)

---

### 3. Learn Next.js ([learn_nextjs](learn_nextjs/))

**适合人群**: Java/Spring 开发者，想快速掌握全栈开发

**核心内容**:
- **统一编号学习系统** (01-13 顺序学习)
- **面向 Java 开发者** (概念对比、思维转变)
- Next.js 13+ App Router
- React Server Components
- 全栈实战项目 (博客系统)

**学习资源**:
- ✅ **[30分钟快速上手](learn_nextjs/QUICK_START.md)** - 面向 Java 开发者
- ✅ **[核心技能检查清单](learn_nextjs/CORE_CHECKLIST.md)** - 验证学习成果
- ✅ **[统一编号示例](learn_nextjs/examples/)** - 13个渐进式学习示例
- ✅ **完整实战项目** - 博客系统，可直接部署

**预计时间**: 7-10天 (每天1-2小时)

**特色**: 专为 Java 开发者设计，降低学习曲线，注重实战应用

---

### 4. Learn Vue ([learn_vue](learn_vue/))

**适合人群**: 前端开发者，想学习渐进式框架

**核心内容**:
- Vue 3 Composition API
- 组件化开发
- 响应式系统
- 前端工程化

**学习资源**:
- 🔄 基础示例代码
- 🔄 待完善文档

**预计时间**: 7-10天 (每天1-2小时)

---

### 5. Learn iOS ([learn_ios](learn_ios/))

**适合人群**: 想学习iOS应用开发的开发者

**核心内容**:
- Swift 基础语法 (Optional, 闭包, 结构体)
- SwiftUI 界面开发
- 状态管理 (@State, @Binding)
- 数据持久化 (UserDefaults, CoreData)
- 网络请求和 JSON 解析

**学习资源**:
- ✅ [30分钟快速上手](learn_ios/QUICK_START.md)
- ✅ [核心知识检查清单](learn_ios/CORE_CHECKLIST.md)
- ✅ [5个常用代码模式](learn_ios/CODE_PATTERNS/)
- ✅ [常见问题排查](learn_ios/TROUBLESHOOTING.md)

**预计时间**: 10-14天 (每天1-2小时)

**系统要求**: macOS 12.0+, Xcode 14.0+

---

## 📊 学习进度追踪

查看 [LEARNING_TRACKER.md](LEARNING_TRACKER.md) 追踪你的跨项目学习进度。

---

## 💡 学习建议

### 核心原则

1. **广度优先，深度适度**
   - 先掌握20%的核心知识
   - 遇到具体问题再深入学习

2. **实践为主，理论为辅**
   - 每个概念都要运行代码验证
   - 完成至少一个实战项目

3. **小步快跑，持续迭代**
   - 每天1-2小时，保持连续性
   - 不要贪多，确保每天有收获

4. **问题驱动，即查即用**
   - 遇到问题立即查文档
   - 不要死记硬背，用时再查

### 时间安排建议

**工作日**: 每天1小时
- 0.5小时学习新内容
- 0.5小时动手实践

**周末**: 每天2-3小时
- 1小时学习
- 1-2小时完成实战项目

**总时长**: 根据选择的技术栈，2-8周完成

---

## 🤝 与 Claude 协作学习

每个子项目都有 `CLAUDE.md` 文件，定义了与 Claude AI 协作学习的规则。

### Claude 能帮你做什么

✅ **引导学习** - 不直接给答案，引导你思考
✅ **解释概念** - 用简单的类比和示例
✅ **代码审查** - 指出问题并建议改进
✅ **问题诊断** - 帮助定位和解决错误
✅ **进度规划** - 根据你的情况调整学习路径

### 使用技巧

1. **明确提问** - 说清楚你的问题和背景
2. **提供上下文** - 告诉Claude你已经尝试了什么
3. **反馈学习方式** - 如果觉得太难或太简单，告诉Claude
4. **主动实践** - 不要只看代码，一定要自己运行

---

## 📁 项目文件结构

```
learn_x/
├── README.md                    # 本文件 - 项目总览
├── CLAUDE.md                    # 顶层学习模式指导
├── LEARNING_TRACKER.md          # 跨项目学习进度追踪
├── DEMO_PLAYGROUND_DESIGN.md    # Demo Playground 设计思想
│
├── learn_cpp/                   # C++ 学习项目
│   ├── README.md               # C++ 项目说明
│   ├── QUICK_START.md          # 30分钟快速上手
│   ├── CORE_CHECKLIST.md       # 核心知识检查清单
│   ├── CODE_PATTERNS/          # 常用代码模式
│   ├── TROUBLESHOOTING.md      # 常见问题排查
│   ├── CLAUDE.md               # C++ 学习助手规则
│   ├── examples/               # 📖 示例代码（按编号线性学习）
│   │   ├── 01_hello.cpp        # 编号表示学习顺序
│   │   ├── 02_variables.cpp
│   │   └── ...
│   └── demos/                  # 🎮 交互式演示（规划中）
│       ├── smart_pointers_playground.cpp
│       └── containers_playground.cpp
│
├── learn_docker/               # Docker 学习项目
│   ├── README.md               # Docker 项目说明
│   ├── Dockerfile              # 镜像构建文件
│   ├── docker-compose.yml      # 容器编排配置
│   └── examples/               # 示例应用
│
├── learn_nextjs/               # Next.js 学习项目
│   ├── README.md               # Next.js 项目说明
│   ├── fundamentals/           # 基础模块
│   ├── advanced/               # 高级特性
│   └── projects/               # 实战项目
│
└── learn_vue/                  # Vue 学习项目
    ├── README.md               # Vue 项目说明
    └── examples/               # 示例代码
```

### 📌 学习资源的双轨设计

**两种互补的学习方式**（部分规划中）：

| 资源类型 | 目的 | 使用场景 | 状态 |
|---------|------|---------|------|
| **examples/** | 线性学习路径 | 第一次学习某个概念，按顺序建立知识体系 | ✅ 已实现 |
| **demos/** | 探索式工具 | 深入理解某个概念的各种用法，交互式实验 | 🔄 规划中 |

**示例文件编号**（`examples/`）：

所有子项目的示例文件都采用**统一编号**，方便你直观地看到学习顺序：

**编号格式**：`<两位数>_<名称>.<扩展名>`

**编号区间**（标准4阶段）：
- **01-06**：基础语法（变量、函数、控制流、数据结构）
- **07-09**：语言特色（结构体/类、接口、错误处理）
- **10-12**：高级特性（并发、模块、高级用法）
- **13-15**：实战进阶（可选）

**示例**（Go）：
```bash
cd learn_go/examples
ls                   # 查看所有示例（自动按编号排序）

# 📖 线性学习路径
go run 01_hello.go          # 从这里开始
go run 02_variables.go
go run 07_structs.go        # 新阶段开始
go run 10_goroutines.go     # 并发编程
```

**Demo Playground**（`demos/` - 规划中）：

交互式演示集合，一个文件包含多个 Demo，降低运行成本：

```bash
# 🎮 探索式学习（规划中）
cd learn_cpp/demos
./smart_pointers_playground     # 编译1次，交互式选择运行多个Demo

# 菜单示例：
# 1. unique_ptr 基础
# 2. unique_ptr 移动
# 3. shared_ptr 共享
# 4. weak_ptr 弱引用
```

**详细设计**: 查看 [DEMO_PLAYGROUND_DESIGN.md](DEMO_PLAYGROUND_DESIGN.md)

---

## 🎓 学习完成标准

对于每个子项目，达到以下标准即可认为"掌握核心":

### ✅ 知识维度
- 理解该技术的3-5个核心概念
- 知道最常用的5-10个API或命令
- 能解释"为什么这样做"

### ✅ 实践维度
- 独立完成至少1个小型项目
- 能够从零搭建开发环境
- 遇到常见错误知道如何排查

### ✅ 能力维度
- 能够读懂中等复杂度的代码
- 能够查阅文档解决具体问题
- 知道如何继续深入学习

---

## 🔄 持续更新

这个学习项目会持续更新和完善:

- **已完善**: learn_cpp (完整框架)
- **待完善**: learn_vue, learn_docker (补充文档)
- **计划添加**: 根据学习需求动态调整

---

## 💬 反馈和改进

在学习过程中，如果你发现:
- 📌 文档有错误或不清楚
- 📌 学习路径不合理
- 📌 需要补充某些内容
- 📌 某种学习方式更适合你

可以:
1. 在对应子项目的 CLAUDE.md 中添加你的建议
2. 与 Claude 讨论如何改进
3. 自己动手优化文档

**记住**: 这是你的个人学习项目，按照你的方式来！

---

## 🌟 开始你的学习之旅

选择一个感兴趣的技术，进入对应目录，开始学习吧！

**推荐第一步**:
```bash
cd learn_cpp && cat QUICK_START.md
```

祝学习愉快！🚀
