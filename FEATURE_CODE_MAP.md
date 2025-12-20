# 学习模块映射表

**最后更新**: 2025-12-19

这个文档帮助快速定位学习内容的位置，特别适合 AI 辅助开发时快速找到相关代码和文档。

## 🎯 核心文档位置

| 文档名称 | 路径 | 用途 |
|---------|------|------|
| 项目总览 | [README.md](README.md) | 了解项目结构和快速导航 |
| AI 操作指南 | [CLAUDE.md](CLAUDE.md) | AI 辅助开发的规范和指引 |
| 项目状态 | [PROJECT_STATUS.md](PROJECT_STATUS.md) | 了解当前进度和技术债务 |
| 场景驱动索引 | [docs/INDEX.md](docs/INDEX.md) | 按场景查找文档（待创建） |

## 📚 学习模块导航

### 1. C++ 学习 (learn_cpp/)

**模块概览**: [learn_cpp/README.md](learn_cpp/README.md)
**AI 指南**: learn_cpp/CLAUDE.md (待创建)
**学习路线**: [learn_cpp/LEARNING_PATH.md](learn_cpp/LEARNING_PATH.md)

#### 主题映射

| 主题 | 路径 | 内容 |
|------|------|------|
| 基础语法 | learn_cpp/01_basics/ | 数据类型、控制流、函数等 |
| 内存管理 | learn_cpp/02_memory_management/ | 指针、引用、智能指针、内存分配 |
| 面向对象 | learn_cpp/03_oop/ | 类、继承、多态、封装 |
| 高级特性 | learn_cpp/04_advanced_features/ | 模板、异常、RTTI、类型推导 |
| 标准库 | learn_cpp/05_stl/ | 容器、迭代器、算法、函数对象 |
| 现代C++ | learn_cpp/06_modern_cpp/ | C++11/14/17/20 新特性 |
| 并发编程 | learn_cpp/07_concurrency/ | 线程、互斥、原子操作、Future |
| 性能优化 | learn_cpp/08_performance/ | 性能分析、优化技术、最佳实践 |
| 设计模式 | learn_cpp/09_design_patterns/ | 常用设计模式的C++实现 |
| 项目模板 | learn_cpp/10_project_templates/ | CMake、测试框架、CI/CD |
| Java迁移指南 | learn_cpp/java_to_cpp/ | Java到C++的知识迁移 |

### 2. Next.js 学习 (learn_nextjs/)

**模块概览**: [learn_nextjs/README.md](learn_nextjs/README.md)
**AI 指南**: learn_nextjs/CLAUDE.md (待创建)

#### 主题映射

| 主题 | 路径 | 内容 |
|------|------|------|
| 页面路由 | learn_nextjs/01-fundamentals/02-pages-routing/ | 文件系统路由、静态与动态路由 |
| React基础 | learn_nextjs/01-fundamentals/03-react-basics/ | 组件、Props、State、Hooks |
| 数据获取 | learn_nextjs/01-fundamentals/04-data-fetching/ | SSG、SSR、ISR、缓存策略 |
| 样式管理 | learn_nextjs/01-fundamentals/05-styling-assets/ | CSS Modules、Tailwind、静态资源 |
| 服务端组件 | learn_nextjs/01-fundamentals/06-server-client-components/ | RSC、客户端组件、交互模式 |
| 路由系统 | learn_nextjs/01-fundamentals/07-routing-navigation/ | App Router、动态路由、导航 |
| 表单处理 | learn_nextjs/02-advanced/01-form-handling/ | React Hook Form、验证、Server Actions |
| 认证授权 | learn_nextjs/02-advanced/02-auth-authorization/ | NextAuth.js、JWT、角色权限 |
| 数据库集成 | learn_nextjs/02-advanced/03-database-integration/ | Prisma ORM、数据建模、CRUD |
| 部署优化 | learn_nextjs/02-advanced/04-deployment-optimization/ | Vercel部署、性能优化、CI/CD |
| 测试调试 | learn_nextjs/02-advanced/05-testing-debugging/ | Jest、Playwright、DevTools |
| 实战项目 | learn_nextjs/03-projects/01-fullstack-app/ | 任务管理系统全栈应用 |

### 3. Vue.js 学习 (learn_vue/)

**模块概览**: learn_vue/ (缺少 README)
**状态**: 🟡 基础内容，文档待完善

### 4. Docker 学习 (learn_docker/)

**模块概览**: learn_docker/ (缺少 README)
**状态**: 🟡 基础内容，文档待完善

### 5. Git 学习 (learn_git/)

**模块概览**: learn_git/ (缺少 README)
**状态**: 🟡 基础内容，多个分支实践项目

**相关目录**:
- learn_git/ - 主要学习目录
- learn_git_feature/ - 特性分支实践
- learn_git_develop/ - 开发分支实践

### 6. KMP + Compose Multiplatform (kmp/)

**模块概览**: [kmp/README.md](kmp/README.md)
**状态**: 🟢 新建模块

#### 主题映射

| 主题 | 路径 | 内容 |
|------|------|------|
| 快速开始 | kmp/01_getting_started/ | 项目创建、环境配置、各平台运行 |
| Compose 基础 | kmp/02_compose_basics/ | 跨平台 Composable、资源管理 |
| 状态管理 | kmp/03_state_management/ | ViewModel、StateFlow、导航 |
| 网络请求 | kmp/04_networking/ | Ktor Client、Serialization |
| 本地存储 | kmp/05_database/ | SQLDelight、DataStore |
| 平台特定 | kmp/06_platform_specific/ | expect/actual、原生 API |
| 架构模式 | kmp/07_architecture/ | MVVM、MVI、依赖注入 |
| 实战项目 | kmp/projects/ | 完整跨平台应用 |

## 🔍 快速查找示例

### 按技术栈查找

| 技术 | 位置 | 说明 |
|------|------|------|
| C++ 智能指针 | learn_cpp/02_memory_management/ | unique_ptr, shared_ptr, weak_ptr |
| C++ 模板编程 | learn_cpp/04_advanced_features/ | 函数模板、类模板、模板特化 |
| C++ STL容器 | learn_cpp/05_stl/ | vector, map, set等容器使用 |
| Next.js App Router | learn_nextjs/01-fundamentals/07-routing-navigation/ | 新版路由系统 |
| Next.js Server Actions | learn_nextjs/02-advanced/01-form-handling/ | 服务端表单处理 |
| Prisma ORM | learn_nextjs/02-advanced/03-database-integration/ | 数据库操作 |
| React Server Components | learn_nextjs/01-fundamentals/06-server-client-components/ | RSC 模式 |
| KMP expect/actual | kmp/06_platform_specific/ | 平台特定实现机制 |
| Compose Multiplatform | kmp/02_compose_basics/ | 跨平台 UI 框架 |
| Ktor Client | kmp/04_networking/ | 跨平台网络请求 |
| SQLDelight | kmp/05_database/ | 跨平台数据库 |

### 按概念查找

| 概念 | C++ | Next.js | Vue | Docker | Git | KMP |
|------|-----|---------|-----|--------|-----|-----|
| 内存管理 | 02_memory_management/ | - | - | - | - | - |
| 异步编程 | 07_concurrency/ | 04-data-fetching/ | - | - | - | 04_networking/ |
| 状态管理 | - | 03-react-basics/ | - | - | - | 03_state_management/ |
| 路由系统 | - | 07-routing-navigation/ | - | - | - | 03_state_management/ |
| 数据库操作 | - | 03-database-integration/ | - | - | - | 05_database/ |
| 认证授权 | - | 02-auth-authorization/ | - | - | - | - |
| 测试 | 10_project_templates/ | 05-testing-debugging/ | - | - | - | - |
| 部署 | - | 04-deployment-optimization/ | - | ✓ | - | - |
| 版本控制 | - | - | - | - | ✓ | - |
| 跨平台 | - | - | - | - | - | ✓ |

## 📝 文档完善度

| 模块 | README | CLAUDE.md | 示例代码 | 学习路线 | 完善度 |
|------|--------|-----------|----------|----------|---------|
| learn_cpp | ✅ | ⏳ | ✅ | ✅ | 80% |
| learn_nextjs | ✅ | ⏳ | ✅ | ✅ | 90% |
| learn_vue | ❌ | ❌ | ✅ | ❌ | 30% |
| learn_docker | ❌ | ❌ | ✅ | ❌ | 30% |
| learn_git | ❌ | ❌ | ✅ | ❌ | 20% |
| kmp | ✅ | ⏳ | ⏳ | ✅ | 40% |

## 🎯 待完善内容

### 高优先级
- [ ] 创建 learn_cpp/CLAUDE.md
- [ ] 创建 learn_nextjs/CLAUDE.md
- [ ] 完善 learn_vue/README.md
- [ ] 完善 learn_docker/README.md

### 中优先级
- [ ] 整合 Git 学习项目（合并多个目录）
- [ ] 为 learn_vue 创建学习路线图
- [ ] 为 learn_docker 创建学习路线图

### 低优先级
- [ ] 添加更多 C++ 示例代码
- [ ] 添加更多 Next.js 实战项目
- [ ] 创建跨技术栈的对比学习内容

## 💡 使用技巧

### For AI (Claude Code)
1. **查找功能**: 先查这个文件，快速定位代码位置
2. **理解结构**: 了解模块组织方式，避免重复查找
3. **更新提醒**: 添加新内容后必须更新这个文件

### For Human
1. **快速导航**: 使用表格快速跳转到目标内容
2. **学习规划**: 查看"待完善内容"了解下一步学习方向
3. **进度追踪**: 查看"文档完善度"了解整体进展

---

**更新规则**:
- ✅ 添加新模块时必须更新
- ✅ 添加新主题时必须更新
- ✅ 重大重构后必须更新
- ⏸️ 小改动可以批量更新
