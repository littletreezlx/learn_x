# 全栈应用实战项目

本模块将综合运用前面所学知识，构建一个功能完整的全栈应用，展示Next.js在实际项目中的应用。

## 项目概述

这是一个任务管理系统(Task Management System)，具有以下特点：

1. 完整的用户认证与授权系统
2. 项目与任务的CRUD操作
3. 实时协作功能
4. 文件上传与管理
5. 数据统计与可视化
6. 响应式设计，支持各种设备

## 目录结构

```
01-fullstack-app/
├── components/            # UI组件
│   ├── ui/                # 通用UI组件 
│   ├── auth/              # 认证相关组件
│   ├── projects/          # 项目相关组件
│   ├── tasks/             # 任务相关组件
│   └── dashboard/         # 仪表盘组件
├── lib/                   # 工具函数和服务
├── prisma/                # 数据库模型和迁移
├── app/                   # 应用路由
│   ├── api/               # API路由
│   ├── auth/              # 认证页面
│   ├── dashboard/         # 仪表盘页面
│   ├── projects/          # 项目管理页面
│   └── settings/          # 用户设置页面
├── public/                # 静态资源
└── README.md              # 项目文档
```

## 功能模块

1. **认证系统**：注册、登录、社交登录、重置密码
2. **项目管理**：创建、查看、编辑、删除项目
3. **任务管理**：创建任务、分配任务、更新状态、添加评论
4. **用户管理**：用户角色与权限、个人资料
5. **仪表盘**：统计信息、任务进度、团队活动
6. **通知系统**：邮件通知、应用内通知

## 技术栈

- **前端**：Next.js, React, TailwindCSS, shadcn/ui
- **后端**：Next.js API Routes, tRPC
- **数据库**：Prisma + PostgreSQL
- **认证**：NextAuth.js
- **实时功能**：Socket.io / Pusher
- **部署**：Vercel + Supabase
- **测试**：Jest, React Testing Library, Playwright 