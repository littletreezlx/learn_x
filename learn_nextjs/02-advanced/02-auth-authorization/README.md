# 认证与授权

本模块探讨Next.js应用中的认证与授权实现，介绍从传统会话认证到现代JWT和OAuth2的完整认证体系。

## 学习目标

1. 理解Web认证的核心概念和最佳实践
2. 掌握NextAuth.js (Auth.js)的使用方法
3. 实现多种认证方式（邮箱密码、社交登录、MFA）
4. 设计与实现完整的授权系统（RBAC/ABAC）
5. 保护API路由和服务器组件

## 目录结构

```
02-auth-authorization/
├── components/             # 认证相关组件
├── lib/                    # 认证工具和中间件
├── app/                    # 示例应用
│   ├── basic-auth/         # 基础认证示例
│   ├── social-login/       # 社交登录示例
│   ├── rbac-example/       # 基于角色的授权示例
│   └── protected-routes/   # 路由保护示例
└── README.md               # 模块文档
```

## 实现计划

1. 基础认证系统：注册、登录、重置密码
2. 集成Auth.js实现多提供商认证
3. 实现JWT和会话认证
4. 设计与实现角色与权限系统
5. 保护路由和API端点
6. 实现登录状态持久化和刷新令牌

## 技术栈

- NextAuth.js/Auth.js
- JWT/Cookie认证
- OAuth2
- 中间件路由保护
- bcrypt密码哈希
- Prisma用户数据模型 