# 预渲染与数据获取

本节介绍Next.js的预渲染策略和数据获取方法，这是Next.js区别于普通React应用的核心特性。

## 渲染策略概述

Next.js提供多种渲染策略，每种策略适合不同的场景：

1. **服务器端渲染 (SSR)**：每次请求时在服务器渲染页面
2. **静态站点生成 (SSG)**：在构建时预渲染页面
3. **增量静态再生成 (ISR)**：在后台定期重新生成静态页面
4. **客户端渲染 (CSR)**：在浏览器中渲染页面（类似传统React）

### 渲染策略对比

| 渲染策略 | 适用场景 | 数据新鲜度 | 性能 | SEO |
|---------|---------|-----------|------|-----|
| SSR | 个性化内容、实时数据 | 高 | 中 | 好 |
| SSG | 内容不频繁变化的页面 | 低（仅构建时） | 高 | 极好 |
| ISR | 内容定期更新的页面 | 中（可配置） | 高 | 好 |
| CSR | 仅客户端功能、私有内容 | 高 | 低 | 差 |

## 服务器组件中的数据获取

在Next.js 13+的App Router中，React服务器组件是获取数据的主要方式。服务器组件可以直接使用异步/await语法获取数据。

### 基本数据获取

```tsx
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### fetch API的缓存和重新验证

Next.js扩展了Web标准的fetch API，增加了缓存和重新验证功能：

```tsx
// 默认：缓存数据（静态行为）
const data = await fetch('https://api.example.com/data');

// 每次请求重新获取（动态行为）
const data = await fetch('https://api.example.com/data', { cache: 'no-store' });

// 增量静态再生成：每60秒重新验证数据
const data = await fetch('https://api.example.com/data', { 
  next: { revalidate: 60 } 
});
```

## 静态站点生成 (SSG)

静态站点生成是在构建时预渲染页面，适用于内容不经常变化的场景。

### 基本静态生成

默认情况下，不含动态数据的页面会被自动静态生成：

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a static page.</p>
    </div>
  );
}
```

### 带数据的静态生成

对于需要数据的静态页面，Next.js会在构建时获取数据并渲染页面：

```tsx
// app/blog/page.tsx
async function getBlogPosts() {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 静态生成动态路由

对于动态路由，Next.js需要知道预先生成哪些路径。

### 生成静态路径

使用`generateStaticParams`函数定义要预渲染的路径：

```tsx
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
```

## 增量静态再生成 (ISR)

ISR允许在特定时间间隔后重新生成静态页面，无需重新构建整个站点。

### 定时重新验证

```tsx
// app/dashboard/page.tsx
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    next: { revalidate: 60 }, // 每60秒重新验证一次
  });
  
  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      {/* 显示仪表板数据 */}
    </div>
  );
}
```

### 按需重新验证

除了定时重新验证外，还可以通过API路由触发按需重新验证：

```tsx
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json();
  
  // 验证密钥
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }
  
  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  }
  
  return NextResponse.json({ error: 'No path or tag provided' }, { status: 400 });
}
```

## 服务器端渲染 (SSR)

服务器端渲染会在每次请求时动态生成页面，适用于高度动态的内容。

### 动态数据获取

通过禁用缓存实现每次请求都获取新数据：

```tsx
// app/stock-prices/page.tsx
async function getStockPrices() {
  const res = await fetch('https://api.example.com/stocks', {
    cache: 'no-store', // 禁用缓存，每次请求都获取新数据
  });
  
  return res.json();
}

export default async function StockPricesPage() {
  const stocks = await getStockPrices();
  
  return (
    <div>
      <h1>Real-time Stock Prices</h1>
      <p>Last updated: {new Date().toLocaleString()}</p>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 客户端数据获取

对于需要在客户端获取数据的情况，可以使用SWR或React Query等库。

### 使用SWR获取数据

SWR是Next.js团队开发的数据获取库，提供缓存、重新验证、焦点更新等功能：

```tsx
'use client';

import useSWR from 'swr';

// 获取函数
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${userId}`,
    fetcher
  );
  
  if (error) return <div>Failed to load user</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
}
```

### 使用React Query

React Query是另一个流行的数据获取库，提供更丰富的功能：

```tsx
'use client';

import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建QueryClient实例
const queryClient = new QueryClient();

// Provider组件
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// 数据获取组件
function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  });
  
  const mutation = useMutation({
    mutationFn: (newTodo: { title: string }) => {
      return fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    },
    onSuccess: () => {
      // 成功后使查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      
      <button
        onClick={() => {
          mutation.mutate({ title: 'New Todo' });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
```

## 路由处理程序（API Routes）

Next.js允许创建API端点，用于处理前端请求、与数据库交互或调用外部服务。

### 基本API路由

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newUser = await db.user.create({ data });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

### 动态API路由

```tsx
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: Number(params.id) },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
```

## 组合不同渲染策略

在实际项目中，可能需要组合不同的渲染策略以获得最佳性能和用户体验。

### 静态页面 + 客户端动态数据

```tsx
// app/dashboard/page.tsx
import UserActivityChart from './UserActivityChart';

// 静态部分，在构建时生成
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="static-content">
        {/* 静态内容 */}
        <p>Welcome to your dashboard!</p>
      </div>
      
      {/* 动态部分，在客户端获取数据 */}
      <UserActivityChart />
    </div>
  );
}

// app/dashboard/UserActivityChart.tsx
'use client';

import { useState, useEffect } from 'react';

export default function UserActivityChart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/user-activity');
        const chartData = await res.json();
        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (isLoading) return <div>Loading chart...</div>;
  
  return (
    <div className="chart">
      {/* 渲染图表数据 */}
    </div>
  );
}
```

### 流式渲染

流式渲染允许分块加载页面，先显示静态部分，然后逐步流式传输动态部分：

```tsx
// app/products/[id]/page.tsx
import { Suspense } from 'react';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* 最重要的内容先加载 */}
      <ProductDetails id={params.id} />
      
      {/* 次要内容可以延迟加载 */}
      <div className="secondary-content">
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts productId={params.id} />
        </Suspense>
        
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ProductReviews productId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
```

## 最佳实践

1. **选择合适的渲染策略**：
   - 静态内容（博客文章、文档、产品页面）：使用SSG
   - 频繁更新但不需要实时数据：使用ISR
   - 实时、个性化、用户特定内容：使用SSR
   - 交互性强、私密内容：使用CSR

2. **数据获取**：
   - 尽可能在服务器组件中获取数据，减少客户端JavaScript大小
   - 使用适当的缓存策略优化性能和数据新鲜度
   - 对于动态数据，使用SWR或React Query实现自动重新获取和状态管理

3. **性能优化**：
   - 使用Suspense实现流式渲染
   - 根据优先级划分内容加载顺序
   - 适当预取数据和预加载页面

## 学习检查点

- [ ] 理解不同渲染策略的优缺点和适用场景
- [ ] 掌握在服务器组件中获取数据的方法
- [ ] 了解静态生成和动态路由的结合使用
- [ ] 能够实现增量静态再生成
- [ ] 学会使用客户端数据获取库（SWR或React Query）
- [ ] 掌握API路由的创建和使用
- [ ] 能够组合不同渲染策略优化用户体验

## 下一步

学习如何在Next.js中管理样式和静态资源。 