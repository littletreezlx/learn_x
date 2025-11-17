# Next.js 30分钟快速上手

> **面向 Java 开发者** - 快速掌握 Next.js 全栈开发

---

## 🎯 为什么学习 Next.js？

**对比传统 Spring 开发**：

| Spring Boot | Next.js | 优势 |
|-------------|---------|------|
| 前后端分离，需要维护两个项目 | 全栈一体，一个项目搞定 | 减少协调成本 |
| 需要配置 REST API | 内置 API 路由 | 无需额外配置 |
| 前端需要单独部署 | 一键部署到 Vercel | 部署简单 |
| 服务端渲染需要额外配置 | 原生支持 SSR/SSG | 性能优化容易 |

---

## ⚡ 10分钟环境搭建

### 1. 安装 Node.js
```bash
# 检查是否已安装（需要 18+ 版本）
node --version

# macOS 使用 Homebrew
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. 创建项目
```bash
# 创建 Next.js 项目（自动配置 TypeScript）
npx create-next-app@latest my-blog --typescript --tailwind --eslint

# 进入项目目录
cd my-blog

# 启动开发服务器
npm run dev
```

### 3. 访问应用
打开浏览器访问 `http://localhost:3000`

---

## 🏗️ 理解项目结构

```
my-blog/
├── app/                    # Next.js 13+ App Router
│   ├── layout.tsx          # 根布局（所有页面共享）
│   ├── page.tsx            # 首页 (/)
│   ├── globals.css         # 全局样式
│   └── api/                # API 路由
│       └── hello/          # API 端点 (/api/hello)
├── public/                 # 静态资源
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript 配置
└── next.config.ts          # Next.js 配置
```

**对比 Spring 项目**：
- `app/page.tsx` ≈ `src/main/resources/templates/index.html`
- `app/api/` ≈ `src/main/java/controller/`
- `public/` ≈ `src/main/resources/static/`

---

## 📝 创建第一个页面

### 1. 修改首页 (app/page.tsx)
```tsx
export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Hello, Next.js! 🎉</h1>
      <p>我是 Java 开发者，现在学习 Next.js</p>

      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>快速对比</h2>
        <p><strong>Java</strong>: 需要创建 Controller + Service + Repository</p>
        <p><strong>Next.js</strong>: 直接写组件，自动处理路由</p>
      </div>
    </main>
  );
}
```

### 2. 创建关于页面
创建文件 `app/about/page.tsx`：
```tsx
export default function AboutPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>关于我</h1>
      <p>我是一个正在学习 Next.js 的 Java 开发者</p>
      <a href="/">← 返回首页</a>
    </main>
  );
}
```

访问 `http://localhost:3000/about` 查看效果！

---

## 🛠️ 创建第一个 API

### 1. 创建 API 路由
创建文件 `app/api/hello/route.ts`：
```ts
import { NextResponse } from 'next/server';

// GET /api/hello
export async function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString()
  });
}
```

### 2. 在组件中调用 API
```tsx
'use client'; // 声明为客户端组件

import { useState, useEffect } from 'react';

export default function ApiDemo() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>API 调用结果：</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

---

## 🎨 样式系统

### 1. Tailwind CSS 快速上手
```tsx
export default function StyledComponent() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        使用 Tailwind CSS
      </h2>
      <p className="text-gray-600 mb-4">
        类似于 Bootstrap，但更加灵活
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        点击我
      </button>
    </div>
  );
}
```

### 2. CSS Modules（局部作用域）
创建 `styles.module.css`：
```css
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
```

在组件中使用：
```tsx
import styles from './styles.module.css';

export default function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}
```

---

## 🔄 状态管理（React Hooks）

### 1. useState - 基础状态
```tsx
'use client';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
```

### 2. useEffect - 副作用（类似生命周期）
```tsx
'use client';

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 组件挂载后执行
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 组件卸载前清理
    return () => clearInterval(timer);
  }, []); // 空数组表示只在挂载/卸载时执行

  return <div>当前时间: {time.toLocaleTimeString()}</div>;
}
```

---

## 📋 学习路径建议

### 立即开始（今天）
1. ✅ 搭建开发环境
2. ✅ 创建几个页面，理解路由
3. ✅ 创建简单的 API 路由
4. ✅ 练习基础样式

### 本周目标
- [ ] 掌握组件化开发
- [ ] 学习表单处理
- [ ] 理解数据获取（SSR vs CSR）
- [ ] 完成一个小项目

### 下周进阶
- [ ] 学习数据库集成
- [ ] 实现用户认证
- [ ] 部署到生产环境
- [ ] 性能优化

---

## 💡 Java 开发者特别提示

### 概念映射
| Java 概念 | Next.js 对应 |
|-----------|-------------|
| Controller 方法 | API 路由函数 |
| @Service | 工具函数/自定义 Hook |
| @Autowired | React Context |
| Thymeleaf 模板 | JSX 组件 |
| Model/DTO | TypeScript 接口 |
| Session/Cookie | Cookie/useState |

### 常见误区
❌ **Java 思维**: 习惯用面向对象方式思考
✅ **React 思维**: 组件化、函数式编程

❌ **过度设计**: 创建过多抽象层
✅ **保持简单**: Next.js 推崇约定优于配置

❌ **后端优先**: 先设计数据结构
✅ **用户优先**: 从 UI 和用户体验开始

---

## 🚀 下一步

1. **查看示例代码**：运行 `examples/` 目录中的示例
2. **创建真实项目**：复制 `13_blog.tsx` 开始你的博客项目
3. **深入学习**：阅读 `CORE_CHECKLIST.md` 完成核心技能检查

---

## 🔗 有用资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

**记住**：Next.js 的优势是开发效率高，不要陷入过度设计的陷阱！