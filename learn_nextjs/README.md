# Next.js 全栈开发学习项目

本项目是一个系统化学习 Next.js 全栈开发的教程项目，面向有 Java 背景的开发者转型全栈开发。项目采用最新的 Next.js App Router 架构，结合 TypeScript、React 和现代前端技术栈，循序渐进地构建完整的知识体系。

## 项目目标

1. 系统化学习 Next.js 13+ 的核心概念和最佳实践
2. 掌握 React 服务器组件和客户端组件的开发模式
3. 理解全栈应用架构，从前端到后端的完整实现
4. 构建性能优化、SEO 友好的现代 Web 应用
5. 遵循 TypeScript 严格类型规范，提高代码质量和可维护性

## 项目结构

```
learn_nextjs/
├── app/                            # Next.js App Router 应用目录
│   ├── components/                 # 全局共享组件
│   │   └── Navigation.tsx          # 导航栏组件
│   ├── fundamentals/               # 基础阶段学习模块
│   │   ├── page.tsx                # 基础阶段主页
│   │   └── pages-routing/          # 页面与路由示例
│   ├── advanced/                   # 进阶阶段学习模块
│   │   └── page.tsx                # 进阶阶段主页
│   ├── projects/                   # 实战项目展示
│   │   └── page.tsx                # 项目列表页
│   ├── layout.tsx                  # 根布局
│   ├── page.tsx                    # 首页
│   └── globals.css                 # 全局样式
├── 01-fundamentals/                # 基础概念学习资料
│   ├── 02-pages-routing/           # 页面与路由基础
│   ├── 03-react-basics/            # React基础回顾
│   ├── 04-data-fetching/           # 预渲染与数据获取
│   ├── 05-styling-assets/          # 样式与静态资源管理
│   ├── 06-server-client-components/ # 服务器组件与客户端组件
│   └── 07-routing-navigation/      # 路由系统与导航
├── 02-advanced/                    # 高级特性学习资料
│   ├── 01-form-handling/           # 表单处理与验证
│   ├── 02-auth-authorization/      # 认证与授权
│   ├── 03-database-integration/    # 数据库集成
│   ├── 04-deployment-optimization/ # 部署与优化
│   └── 05-testing-debugging/       # 测试与调试
├── 03-projects/                    # 实战项目代码
│   └── 01-fullstack-app/           # 全栈应用实战
├── public/                         # 静态资源
├── package.json                    # 项目依赖
└── README.md                       # 项目概述文档
```

## 当前进度

已完成的模块：

- ✅ **页面与路由基础**：文件系统路由、静态与动态路由、路由组织结构
- ✅ **React基础回顾**：组件模型、Props、State、Hooks、事件处理
- ✅ **预渲染与数据获取**：渲染策略、数据获取方法、缓存与重新验证
- ✅ **样式与静态资源管理**：CSS模块、Tailwind CSS、静态资源优化
- ✅ **服务器组件与客户端组件**：组件模型、交互模式、最佳实践
- ✅ **路由系统与导航**：基础路由、动态路由、导航实现、路由钩子
- ✅ **表单处理与验证**：受控组件、React Hook Form、表单验证、Server Actions
- ✅ **认证与授权**：NextAuth.js、JWT认证、角色与权限系统
- ✅ **数据库集成**：Prisma ORM、数据建模、CRUD操作、关系查询
- ✅ **部署与优化**：Vercel部署、性能优化、CI/CD、监控
- ✅ **测试与调试**：Jest、React Testing Library、Playwright、DevTools
- ✅ **实战项目**：任务管理系统全栈应用

## 技术栈

- **前端**: Next.js 13+, React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes/Route Handlers
- **数据库**: Prisma ORM, PostgreSQL
- **认证**: NextAuth.js
- **样式**: Tailwind CSS, CSS Modules, shadcn/ui
- **部署**: Vercel, Docker
- **测试**: Jest, React Testing Library, Playwright

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 学习路径

### 1. 基础阶段（必学）
访问 `/fundamentals` 页面，按顺序学习以下模块：
- 页面与路由基础
- React 基础回顾
- 数据获取与渲染
- 样式与静态资源
- 服务器与客户端组件
- 路由系统与导航

### 2. 进阶阶段
访问 `/advanced` 页面，学习更复杂的功能：
- 表单处理与验证
- 认证与授权
- 数据库集成
- API 路由与后端开发
- 测试与调试
- 性能优化

### 3. 实战项目
访问 `/projects` 页面，选择合适难度的项目进行实践：
- 初级：个人博客系统
- 中级：任务管理系统、数据分析仪表板
- 高级：电商平台、社交媒体应用、在线学习平台

## 功能特性

✅ **完整的学习体系** - 从基础到高级的系统化学习路径
✅ **互动式导航** - 清晰的页面导航和进度追踪
✅ **模块化设计** - 每个学习模块独立完整
✅ **实战项目** - 多个难度级别的实战项目
✅ **响应式设计** - 支持桌面和移动设备
✅ **暗黑模式** - 内置明暗主题切换

## 学习建议

1. **按顺序学习** - 基础阶段 → 进阶阶段 → 实战项目
2. **动手实践** - 每学完一个概念立即编写代码验证
3. **记录笔记** - 总结关键概念和易错点
4. **查阅文档** - 养成查阅官方文档的习惯
5. **项目驱动** - 通过实战项目巩固所学知识