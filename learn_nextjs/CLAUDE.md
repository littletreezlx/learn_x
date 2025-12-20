# Learn Next.js - Claude Code 操作指南

**模块类型**: Next.js 全栈开发学习
**最后更新**: 2025-11-19

## ⭐ 模块特点

这是一个系统化学习 Next.js 13+ 全栈开发的模块，采用 App Router 架构，结合 TypeScript、React 和现代前端技术栈。

### 学习重点
- ✅ React Server Components (RSC) 模式
- ✅ App Router 架构（vs Pages Router）
- ✅ 全栈开发（前端 + API + 数据库）
- ✅ 现代前端工具链（Prisma, NextAuth, Tailwind）
- ✅ 生产环境部署和优化

## 🎯 我（Claude Code）要做什么？

| 场景 | 应该读什么 | 操作指南 |
|------|-----------|---------|
| 🆕 添加新示例 | 对应主题的 README | 1. 在对应主题目录创建示例<br>2. 添加详细注释<br>3. 更新主题 README<br>4. 更新根目录 FEATURE_CODE_MAP.md |
| 📖 查找特定功能 | FEATURE_CODE_MAP.md | 使用功能映射快速定位代码位置 |
| 🔧 完善某个主题 | 主题的 README | 按照学习路线图补充内容 |
| 🏗️ 构建实战项目 | 03-projects/ | 参考已有项目结构，整合所学知识 |
| 🐛 调试和测试 | 05-testing-debugging/ | 查看测试策略和调试技巧 |

## 📋 学习路线图

### 阶段 1: 基础概念 (01-fundamentals/)

1. **02-pages-routing** - 页面与路由基础
   - 文件系统路由
   - 静态路由 vs 动态路由
   - 路由组织结构

2. **03-react-basics** - React 基础回顾
   - 组件模型（函数组件 vs 类组件）
   - Props、State、Hooks
   - 事件处理和表单

3. **04-data-fetching** - 预渲染与数据获取 ⭐
   - SSG、SSR、ISR
   - 数据获取方法
   - 缓存与重新验证

4. **05-styling-assets** - 样式与静态资源
   - CSS Modules
   - Tailwind CSS
   - 静态资源优化

5. **06-server-client-components** - 服务器组件与客户端组件 ⭐
   - React Server Components (RSC)
   - 客户端组件的使用场景
   - 交互模式和最佳实践

6. **07-routing-navigation** - 路由系统与导航
   - App Router 详解
   - 动态路由和路由组
   - 导航和链接

### 阶段 2: 高级特性 (02-advanced/)

7. **01-form-handling** - 表单处理与验证
   - React Hook Form
   - 表单验证策略
   - Server Actions ⭐

8. **02-auth-authorization** - 认证与授权 ⭐
   - NextAuth.js 集成
   - JWT 认证流程
   - 角色与权限系统

9. **03-database-integration** - 数据库集成
   - Prisma ORM
   - 数据建模
   - CRUD 操作和关系查询

10. **04-deployment-optimization** - 部署与优化
    - Vercel 部署
    - 性能优化技术
    - CI/CD 流程

11. **05-testing-debugging** - 测试与调试
    - Jest 单元测试
    - React Testing Library
    - Playwright E2E 测试

### 阶段 3: 实战项目 (03-projects/)

12. **01-fullstack-app** - 全栈应用实战
    - 任务管理系统
    - 整合所有学习内容
    - 生产级别的代码结构

## 📝 代码规范

### 示例代码规范

```typescript
/**
 * Server Component - 用户列表展示
 *
 * 核心概念：
 * - 服务器组件默认是异步的，可以直接访问数据库
 * - 不能使用浏览器 API（如 useState, useEffect）
 * - 优势：减少客户端 JS 包大小，提高首屏加载速度
 *
 * 最佳实践：
 * - 数据获取放在服务器组件
 * - 交互逻辑放在客户端组件
 * - 合理划分组件边界
 */

import { prisma } from '@/lib/prisma'

// 服务器组件 - 默认是异步的
export default async function UserList() {
  // 直接在组件中获取数据（服务器端）
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded">
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  )
}
```

### 文件组织规范

```
主题目录/
├── README.md                    # 主题概览
├── app/                         # Next.js App Router 示例
│   ├── page.tsx                 # 主页面
│   ├── [id]/                    # 动态路由
│   └── layout.tsx               # 布局组件
├── components/                  # 可复用组件
│   ├── ServerComponent.tsx      # 服务器组件
│   └── ClientComponent.tsx      # 客户端组件
├── lib/                         # 工具函数
└── __tests__/                   # 测试文件
```

### TypeScript 规范
- ✅ 使用严格的类型注解
- ✅ 优先使用 `interface` 定义对象类型
- ✅ 为 API 响应定义明确的类型
- ✅ 使用泛型提高代码复用性

## 🎯 核心工作流

### 添加新的示例代码

**步骤**:
1. 确定主题归属（哪个模块、哪个主题）
2. 创建文件（遵循 Next.js 的文件命名约定）
3. 编写代码和详细注释
4. 添加类型注解（TypeScript）
5. 更新主题 README
6. 更新 FEATURE_CODE_MAP.md

### 构建实战项目

**步骤**:
1. 规划功能和技术栈
2. 设计数据库模型（Prisma schema）
3. 实现后端 API（Route Handlers 或 Server Actions）
4. 实现前端页面（Server Components + Client Components）
5. 添加认证和授权
6. 编写测试（单元测试 + E2E 测试）
7. 部署到 Vercel

### 完善某个主题

**步骤**:
1. 阅读主题 README 了解当前内容
2. 识别缺失的概念或示例
3. 按照基础 → 进阶 → 最佳实践的顺序补充
4. 更新主题 README
5. 更新学习进度追踪

## 🚫 禁止事项

### 不要使用过时的模式
- ❌ 不要使用 Pages Router（除非对比学习）
- ❌ 不要使用 `getServerSideProps`（使用 Server Components）
- ❌ 不要过度使用 `"use client"`（保持服务器组件为默认）

### 不要忽略性能
- ❌ 不要在服务器组件中使用客户端 Hooks
- ❌ 不要过度获取数据（使用 select 限制字段）
- ❌ 不要忘记图片优化（使用 next/image）

## 🔧 开发命令

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 数据库操作（Prisma）
npx prisma generate    # 生成 Prisma Client
npx prisma migrate dev # 运行数据库迁移
npx prisma studio      # 打开数据库管理界面
```

### 测试
```bash
# 单元测试
npm run test

# E2E 测试
npm run test:e2e

# 类型检查
npm run type-check
```

### 构建和部署
```bash
# 构建生产版本
npm run build

# 本地预览生产版本
npm run start

# 部署到 Vercel
vercel deploy
```

## 📊 技术栈

### 核心技术
- **框架**: Next.js 13+ (App Router)
- **语言**: TypeScript
- **UI**: React 18, Tailwind CSS, shadcn/ui
- **状态管理**: React Context, Zustand（可选）

### 后端技术
- **API**: Route Handlers, Server Actions
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js

### 开发工具
- **测试**: Jest, React Testing Library, Playwright
- **代码质量**: ESLint, Prettier, TypeScript
- **部署**: Vercel, Docker

## 💡 AI 辅助学习建议

### 生成代码
- ✅ 可以生成完整的功能模块
- ✅ 必须遵循 Next.js App Router 最佳实践
- ✅ 必须包含 TypeScript 类型注解
- ✅ 必须添加详细注释

### 代码审查
- ✅ 检查是否正确使用服务器组件和客户端组件
- ✅ 检查是否有性能问题（如过度数据获取）
- ✅ 检查类型安全性
- ✅ 检查是否遵循 Next.js 最佳实践

### 解释概念
- ✅ 解释 RSC 和传统 React 的区别
- ✅ 解释 SSG、SSR、ISR 的使用场景
- ✅ 提供实际应用示例
- ✅ 指出常见陷阱

## 🔗 相关文档

### 模块文档
- [learn_nextjs/README.md](README.md) - 模块总览

### 全局文档
- [根目录 README](../README.md) - 项目总览
- [根目录 CLAUDE.md](../CLAUDE.md) - 全局 AI 操作指南
- [FEATURE_CODE_MAP.md](../FEATURE_CODE_MAP.md) - 快速定位

### 官方文档
- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev)
- [Prisma 官方文档](https://www.prisma.io/docs)

## 📚 重点主题

### ⭐ 必须深入理解的概念

1. **React Server Components** (06-server-client-components)
   - Next.js 13+ 的核心特性
   - 理解服务器组件和客户端组件的边界
   - 掌握何时使用 `"use client"`

2. **数据获取策略** (04-data-fetching)
   - SSG、SSR、ISR 的使用场景
   - 缓存策略和重新验证
   - Server Actions 的应用

3. **认证与授权** (02-auth-authorization)
   - NextAuth.js 的配置和使用
   - JWT 令牌管理
   - 角色权限系统的实现

4. **数据库集成** (03-database-integration)
   - Prisma ORM 的使用
   - 数据建模和关系定义
   - 高效的数据查询

### ⏸️ 可以浅尝辄止的概念
- 复杂的 CSS 动画
- 高级的 Webpack 配置
- 微前端架构

---

**注意**: 这是一个学习项目，重点在于掌握 Next.js 13+ 的核心概念和全栈开发能力。保持代码清晰，遵循最佳实践。
