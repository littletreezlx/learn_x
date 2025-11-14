# 页面与路由基础

本节介绍Next.js的路由系统，包括基于文件系统的路由原理以及各种路由类型。

## 基于文件系统的路由

Next.js采用基于文件系统的路由机制，这意味着应用的URL路径结构直接映射到`app`目录下的文件结构。

### 核心约定

在App Router中，有以下核心约定：

- `app`目录是所有路由的根目录
- 文件夹用于定义路由结构
- `page.tsx`文件用于使路由可公开访问并渲染UI
- `layout.tsx`文件用于定义共享布局
- `route.ts`文件用于定义API端点

例如：

```
app/
├── page.tsx           # 对应 / 路径
├── about/
│   └── page.tsx       # 对应 /about 路径
└── blog/
    ├── page.tsx       # 对应 /blog 路径
    └── [slug]/
        └── page.tsx   # 对应 /blog/:slug 动态路径
```

## 静态路由

静态路由是最基本的路由类型，对应固定的URL路径。

### 创建静态路由

只需在`app`目录下创建一个文件夹，并添加`page.tsx`文件：

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是一个使用Next.js构建的网站。</p>
    </div>
  );
}
```

这将创建一个对应`/about`URL的页面。

## 动态路由

动态路由用于处理不固定的、参数化的路径，例如博客文章或产品详情页。

### 创建动态路由

使用方括号`[param]`语法定义动态路由段：

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>博客文章: {params.slug}</h1>
      <p>这是动态生成的博客文章页面。</p>
    </div>
  );
}
```

上面的组件可以匹配类似`/blog/hello-world`、`/blog/my-post`等路径，并通过`params.slug`获取动态参数。

### 获取动态路由数据

在页面组件中，你可以通过`params`属性访问URL参数：

```tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  // params.id 将包含URL中的id参数
  return <div>Product ID: {params.id}</div>;
}
```

### 多参数动态路由

可以在一个路径中使用多个动态段：

```
app/products/[category]/[id]/page.tsx
```

这将匹配`/products/electronics/123`这样的URL，并提供`params.category`和`params.id`。

## 捕获所有路由

使用`[...slug]`语法创建捕获所有路由，它可以匹配任意深度的路径：

```tsx
// app/docs/[...slug]/page.tsx
export default function DocsPage({ params }: { params: { slug: string[] } }) {
  // 对于URL /docs/feature/overview
  // params.slug 将是 ['feature', 'overview']
  return (
    <div>
      <h1>文档</h1>
      <p>路径: {params.slug.join('/')}</p>
    </div>
  );
}
```

## 可选捕获路由

使用`[[...slug]]`（双方括号）创建可选的捕获所有路由，它可以匹配零个或多个路径段：

```tsx
// app/shop/[[...slug]]/page.tsx
export default function ShopPage({ params }: { params: { slug?: string[] } }) {
  // 对于URL /shop, params.slug 将是 undefined
  // 对于URL /shop/clothes, params.slug 将是 ['clothes']
  // 对于URL /shop/clothes/shirts, params.slug 将是 ['clothes', 'shirts']
  
  const categories = params.slug || ['all'];
  
  return (
    <div>
      <h1>商店</h1>
      <p>分类: {categories.join(' > ')}</p>
    </div>
  );
}
```

## 路由组和路由组织

### 路由组

Next.js允许使用带括号的文件夹`(folderName)`创建路由组，这些文件夹不会影响URL路径，但可以帮助组织代码：

```
app/
├── (marketing)/     # 路由组不影响URL路径
│   ├── about/
│   │   └── page.tsx # 对应 /about 而非 /marketing/about
│   └── blog/
│       └── page.tsx # 对应 /blog 而非 /marketing/blog
└── (shop)/
    ├── cart/
    │   └── page.tsx # 对应 /cart 而非 /shop/cart
    └── products/
        └── page.tsx # 对应 /products 而非 /shop/products
```

路由组用途：
- 按功能、团队或逻辑组织路由
- 在同一路由段中启用嵌套布局

### 并行路由

Next.js 13.3+引入了并行路由功能，使用`@folder`命名约定定义并行路径：

```
app/
├── profile/
│   ├── page.tsx       # 主页面内容
│   ├── @posts/        # 并行路由
│   │   └── page.tsx   # 帖子内容
│   └── @likes/        # 并行路由
│       └── page.tsx   # 点赞内容
```

在布局中使用：

```tsx
// app/profile/layout.tsx
export default function ProfileLayout({
  children,
  posts,
  likes,
}: {
  children: React.ReactNode
  posts: React.ReactNode
  likes: React.ReactNode
}) {
  return (
    <div className="profile-layout">
      <div className="content">{children}</div>
      <div className="posts">{posts}</div>
      <div className="likes">{likes}</div>
    </div>
  );
}
```

## 页面间导航

### 使用Link组件

Next.js提供`Link`组件用于客户端导航，无需完整页面刷新：

```tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">首页</Link>
        </li>
        <li>
          <Link href="/about">关于</Link>
        </li>
        <li>
          <Link href="/blog">博客</Link>
        </li>
        <li>
          <Link href="/products/123">产品详情</Link>
        </li>
      </ul>
    </nav>
  );
}
```

### 动态生成链接

可以动态生成链接地址：

```tsx
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

### 使用useRouter钩子进行编程式导航

对于更复杂的导航逻辑，可以使用`useRouter`钩子：

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 执行登录逻辑
    const success = await login(/* 登录参数 */);
    
    if (success) {
      // 登录成功后重定向到仪表板
      router.push('/dashboard');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      <button type="submit">登录</button>
    </form>
  );
}
```

> 注意：`useRouter`只能在客户端组件中使用，所以需要添加`'use client'`指令。

### 导航选项

`Link`组件和`router.push()`支持以下选项：

- `href`：目标URL
- `replace`：是否替换历史记录（默认为false，即添加新记录）
- `scroll`：是否滚动到页面顶部（默认为true）
- `prefetch`：是否预加载目标页面（默认为true）

```tsx
// 替换当前历史记录，不添加新记录
<Link href="/new-page" replace>替换导航</Link>

// 导航时不滚动到顶部
<Link href="/keep-scroll" scroll={false}>保持滚动位置</Link>
```

## 错误处理与加载状态

### 错误处理

在目录中创建`error.tsx`文件来处理该路由及其子路由的错误：

```tsx
// app/dashboard/error.tsx
'use client'; // 错误组件必须是客户端组件

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以记录错误到错误监控服务
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>出错了！</h2>
      <p>很抱歉，处理您的请求时出现了问题。</p>
      <button
        onClick={
          // 尝试恢复，重新渲染
          () => reset()
        }
      >
        重试
      </button>
    </div>
  );
}
```

### 加载状态

在目录中创建`loading.tsx`文件来显示加载状态：

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>加载中...</p>
    </div>
  );
}
```

当路由正在加载时，将自动显示此组件。

### 404页面（未找到）

创建`not-found.tsx`文件来自定义未找到页面：

```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - 页面未找到</h1>
      <p>很抱歉，您要查找的页面不存在。</p>
      <Link href="/">
        返回首页
      </Link>
    </div>
  );
}
```

在组件中触发未找到状态：

```tsx
import { notFound } from 'next/navigation';

export default function Post({ params }: { params: { id: string } }) {
  const post = fetchPost(params.id);
  
  if (!post) {
    notFound(); // 触发最近的not-found.tsx
  }
  
  return <PostDetails post={post} />;
}
```

## 代码示例

### 完整的博客路由示例

```tsx
// app/blog/page.tsx - 博客列表页
export default function BlogListPage() {
  return (
    <div>
      <h1>博客文章</h1>
      <ul>
        <li><Link href="/blog/hello-nextjs">Hello Next.js</Link></li>
        <li><Link href="/blog/getting-started">Getting Started</Link></li>
      </ul>
    </div>
  );
}

// app/blog/[slug]/page.tsx - 博客文章页
async function getBlogPost(slug: string) {
  // 实际应用中，这里会从数据库或API获取数据
  const posts = {
    'hello-nextjs': {
      title: 'Hello Next.js',
      content: '这是一篇关于Next.js的介绍文章...',
    },
    'getting-started': {
      title: 'Getting Started with Next.js',
      content: '本文将帮助你开始使用Next.js...',
    },
  };
  
  return posts[slug] || null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <p>
        <Link href="/blog">← 返回博客列表</Link>
      </p>
    </article>
  );
}

// app/blog/[slug]/not-found.tsx - 博客特定的404页面
export default function BlogNotFound() {
  return (
    <div>
      <h1>文章未找到</h1>
      <p>抱歉，您请求的博客文章不存在。</p>
      <Link href="/blog">查看所有文章</Link>
    </div>
  );
}
```

### 嵌套布局示例

```tsx
// app/dashboard/layout.tsx - 仪表板布局
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <h3>仪表板导航</h3>
        <ul>
          <li><Link href="/dashboard">概览</Link></li>
          <li><Link href="/dashboard/analytics">分析</Link></li>
          <li><Link href="/dashboard/settings">设置</Link></li>
        </ul>
      </nav>
      <main className="dashboard-content">{children}</main>
    </div>
  );
}

// app/dashboard/page.tsx - 仪表板首页
export default function DashboardPage() {
  return (
    <div>
      <h1>仪表板</h1>
      <p>欢迎来到您的仪表板。</p>
      {/* 仪表板内容 */}
    </div>
  );
}

// app/dashboard/analytics/page.tsx - 分析页面
export default function AnalyticsPage() {
  return (
    <div>
      <h1>分析</h1>
      {/* 分析内容 */}
    </div>
  );
}
```

## 学习检查点

- [ ] 理解基于文件系统的路由原理
- [ ] 能够创建静态路由
- [ ] 掌握动态路由和参数获取
- [ ] 了解捕获所有路由
- [ ] 使用Link组件实现页面导航
- [ ] 理解路由组织方式（路由组、并行路由）
- [ ] 实现错误处理和加载状态

## 下一步

学习React基础知识，包括组件、Props、State和Hooks等。 