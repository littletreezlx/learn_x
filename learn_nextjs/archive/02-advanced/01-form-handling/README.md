# 表单处理与验证

本模块探讨Next.js中的表单处理与验证最佳实践，面向有Java背景的开发者介绍现代前端表单处理方案。

## 学习目标

1. 掌握React中的受控与非受控表单组件
2. 学习使用React Hook Form高效处理表单状态
3. 实现客户端与服务器端表单验证
4. 理解表单提交的多种模式（传统提交、SPA提交、Server Actions）
5. 掌握错误处理和用户反馈最佳实践

## 目录结构

```
01-form-handling/
├── components/             # 表单相关组件
├── lib/                    # 工具函数和验证逻辑
├── app/                    # 示例应用
│   ├── basic-forms/        # 基础表单示例
│   ├── advanced-forms/     # 高级表单示例
│   └── server-validation/  # 服务端验证示例
└── README.md               # 模块文档
```

## 实现计划

1. 基础表单处理：受控组件vs非受控组件
2. 使用React Hook Form简化表单状态管理
3. 集成Zod进行类型安全的表单验证
4. 实现服务端表单验证与错误处理
5. 使用Server Actions进行表单提交
6. 实现复杂表单（多步骤、动态字段、文件上传）

## 技术栈

- React Hook Form
- Zod验证库
- Next.js Server Actions
- React Server Components
- shadcn/ui表单组件 