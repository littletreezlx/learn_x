# Next.js 示例代码使用指南

## 📁 示例文件说明

本目录包含了按照学习顺序编号的示例代码，每个文件都是独立的学习单元。

## 🚀 如何运行示例

### 方法 1: 复制到现有项目
```bash
# 1. 创建一个新的 Next.js 项目
npx create-next-app test-examples --typescript --tailwind
cd test-examples

# 2. 复制示例内容到 app/page.tsx
cp ../learn_nextjs/examples/01_hello.tsx app/page.tsx

# 3. 启动开发服务器
npm run dev
```

### 方法 2: 快速验证语法
```bash
# 检查 TypeScript 语法
npx tsc --noEmit examples/01_hello.tsx
npx tsc --noEmit examples/02_routing.tsx
# ... 其他文件
```

## 📋 学习顺序

### 基础阶段（第1-2天）
1. `01_hello.tsx` - Hello World，理解项目结构
2. `02_routing.tsx` - 路由系统，页面导航
3. `03_layouts.tsx` - 布局组件，共享导航
4. `04_styling.tsx` - 样式系统，Tailwind CSS
5. `05_data_basic.tsx` - 基础数据获取
6. `06_assets.tsx` - 静态资源管理

### React 核心概念（第3-4天）
7. `07_components.tsx` - 组件系统，服务端 vs 客户端
8. `08_state.tsx` - 状态管理，React Hooks
9. `09_forms.tsx` - 表单处理，Server Actions

### Next.js 高级特性（第5-6天）
10. `10_data_advanced.tsx` - 高级数据获取，缓存策略
11. `11_api.tsx` - API 路由开发
12. `12_auth.tsx` - 认证和授权

### 实战项目（第7-10天）
13. `13_blog.tsx` - 博客系统（完整项目）

## 💡 使用技巧

### 理解示例代码
每个示例文件都包含：
- 📝 **学习目标**：这个示例要教什么
- 🔍 **概念对比**：与 Java/Spring 的对比
- 💻 **代码示例**：可以直接运行的代码
- 🎯 **关键知识点**：需要重点理解的概念

### 修改和实验
```tsx
// 不要只看不练，一定要亲手修改！
function HelloWorld() {
  const [name, setName] = useState('Next.js');

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

### 调试技巧
1. **使用浏览器开发者工具**：查看 Console 和 Network 标签
2. **React Developer Tools**：安装浏览器扩展
3. **VS Code 调试**：设置断点调试
4. **console.log**：最简单有效的调试方法

## 🔧 常见问题

### TypeScript 错误
```bash
# 检查 TypeScript 版本
npm list typescript

# 更新到最新版本
npm install typescript@latest
```

### 模块导入错误
```tsx
// 确保正确导入 React 和其他依赖
import React, { useState } from 'react';
import Link from 'next/link';
```

### 样式不生效
```css
/* 确保 Tailwind CSS 已正确配置 */
/* 检查 tailwind.config.js 和 globals.css */
```

## 📊 进度追踪

每完成一个示例，记录在 [CORE_CHECKLIST.md](../CORE_CHECKLIST.md) 中：

- [ ] 01_hello.tsx - 理解 Next.js 项目结构
- [ ] 02_routing.tsx - 掌握路由系统
- [ ] ...以此类推

## 🎯 下一步

完成所有基础示例后：
1. 查看 `13_blog.tsx` 学习完整项目构建
2. 尝试自己创建一个小项目
3. 阅读 [QUICK_START.md](../QUICK_START.md) 复习概念
4. 参考 [CORE_CHECKLIST.md](../CORE_CHECKLIST.md) 确保掌握所有核心技能

---

**记住**：编程是实践技能，多动手多实验才能真正掌握！