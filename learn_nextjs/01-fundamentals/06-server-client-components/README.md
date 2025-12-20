# 服务器组件与客户端组件

Next.js 13+ 引入的React Server Components模型是框架的核心特性，使开发者能够选择每个组件的最佳渲染策略。本节将探讨服务器组件与客户端组件的区别、用法及其交互方式。

## 组件模型概览

在Next.js的App Router中，所有组件默认都是服务器组件，除非明确声明为客户端组件。这种模型带来了明显的性能优势，并简化了数据获取和服务器资源访问。

### 服务器组件 vs 客户端组件

| 特性 | 服务器组件 | 客户端组件 |
|------|------------|------------|
| 渲染位置 | 服务器端 | 客户端（浏览器） |
| 代码位置 | 仅在服务器上运行 | 发送到客户端运行 |
| 数据获取 | 直接访问数据源 | 通过API或钩子 |
| 状态和交互 | 不支持 | 完全支持 |
| 访问服务器资源 | 可直接访问 | 无法直接访问 |
| 访问浏览器API | 不支持 | 完全支持 |
| 声明方式 | 默认 | 需添加`'use client'`指令 |

## 服务器组件

服务器组件在服务器上渲染，然后将渲染结果发送到客户端，不包含任何JavaScript代码。

### 服务器组件的特点

1. **访问服务器资源**：可以直接与数据库通信、读取文件系统
2. **减少客户端Bundle**：组件代码不会发送到客户端
3. **自动代码分割**：无需手动优化加载时间
4. **不支持交互功能**：没有状态、生命周期或浏览器API

### 服务器组件示例

```tsx
// app/users/page.tsx
import { db } from '@/lib/db';

// 此组件默认在服务器端渲染
export default async function UsersPage() {
  // 直接访问数据库，无需API
  const users = await db.user.findMany();
  
  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 服务器组件中的数据获取

服务器组件可以直接使用async/await进行数据获取：

```tsx
// app/products/[id]/page.tsx
import { getProductDetails } from '@/lib/products';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 直接在组件中获取数据
  const product = await getProductDetails(params.id);
  
  // 如果产品不存在，显示404页面
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>价格: ¥{product.price}</p>
    </div>
  );
}
```

## 客户端组件

客户端组件使用`'use client'`指令标记，在客户端渲染并支持完整的React交互功能。

### 客户端组件的特点

1. **支持交互**：可以使用React的状态、效果和事件处理器
2. **访问浏览器API**：可以使用`window`、`document`等浏览器对象
3. **使用React钩子**：支持`useState`、`useEffect`、`useContext`等
4. **事件处理**：可以处理用户输入和交互事件

### 声明客户端组件

```tsx
'use client' // 必须位于文件顶部

// app/components/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
```

### 客户端组件中的数据获取

客户端组件需要通过API或使用SWR、React Query等库获取数据：

```tsx
'use client'

// app/components/UserProfile.tsx
import { useState, useEffect } from 'react';

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('获取用户失败');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!user) return <div>未找到用户</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>邮箱: {user.email}</p>
    </div>
  );
}
```

### 使用SWR进行数据获取

```tsx
'use client'

// app/components/Posts.tsx
import useSWR from 'swr';

// SWR获取函数
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Posts() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  
  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;
  
  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 组件间的交互模式

服务器组件和客户端组件可以互相嵌套使用，实现最佳的性能和交互体验。

### 组件嵌套规则

1. 服务器组件可以导入和渲染客户端组件
2. 客户端组件可以导入和渲染其他客户端组件
3. 客户端组件**不能直接导入**服务器组件（但可以**接收**服务器组件作为子组件或属性）

### 服务器组件中使用客户端组件

```tsx
// app/dashboard/page.tsx (服务器组件)
import { db } from '@/lib/db';
import UserSettings from './UserSettings'; // 客户端组件

export default async function DashboardPage() {
  const user = await db.user.findUnique({ where: { id: 'current-user-id' } });
  
  return (
    <div>
      <h1>仪表板</h1>
      <UserSettings user={user} /> {/* 服务器组件传递数据给客户端组件 */}
    </div>
  );
}
```

```tsx
'use client'

// app/dashboard/UserSettings.tsx (客户端组件)
import { useState } from 'react';

export default function UserSettings({ user }) {
  const [name, setName] = useState(user.name);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">更新资料</button>
    </form>
  );
}
```

### 客户端组件接收服务器组件作为子元素

客户端组件可以通过`children`属性或其他属性接收服务器组件：

```tsx
// app/dashboard/layout.tsx (服务器组件)
import ClientLayout from '@/components/ClientLayout'; // 客户端组件
import ServerHeader from '@/components/ServerHeader'; // 服务器组件

export default function DashboardLayout({ children }) {
  return (
    <ClientLayout
      header={<ServerHeader />} // 传递服务器组件作为属性
    >
      {children} {/* 传递服务器组件作为children */}
    </ClientLayout>
  );
}
```

```tsx
'use client'

// components/ClientLayout.tsx (客户端组件)
import { useState } from 'react';

export default function ClientLayout({
  header,
  children
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div>
      {header} {/* 渲染服务器组件 */}
      
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        打开/关闭侧边栏
      </button>
      
      <div className="content-area">
        {isSidebarOpen && <div className="sidebar">侧边栏</div>}
        <div className="main-content">
          {children} {/* 渲染服务器组件 */}
        </div>
      </div>
    </div>
  );
}
```

### 使用Context在客户端组件间共享状态

```tsx
'use client'

// context/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ 
  theme: 'light', 
  toggleTheme: () => {} 
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

```tsx
// app/layout.tsx (根布局)
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
'use client'

// components/ThemeToggle.tsx
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      切换为 {theme === 'light' ? '暗色' : '亮色'} 主题
    </button>
  );
}
```

## 最佳实践

### 组件分离策略

1. **自顶向下设计**：从服务器组件开始，仅在需要交互时引入客户端组件
2. **细粒度分解**：保持客户端组件小巧专注，最小化客户端JavaScript
3. **数据获取下沉**：在服务器组件中获取数据，通过属性传给客户端组件

### 服务器组件最佳实践

1. **执行数据获取**：使用服务器组件获取数据，减少网络瀑布流
2. **访问后端资源**：直接访问数据库、文件系统和服务API
3. **保护敏感信息**：存储API密钥和其他凭证
4. **减少客户端JavaScript**：把大型依赖保留在服务器上

示例：

```tsx
// app/products/page.tsx
import { db } from '@/lib/db';
import { ProductList } from '@/components/ProductList'; // 客户端组件

export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div>
      <h1>产品列表</h1>
      <ProductList initialProducts={products} /> {/* 传递预加载数据 */}
    </div>
  );
}
```

### 客户端组件最佳实践

1. **处理用户交互**：添加事件处理函数和状态管理
2. **使用钩子和浏览器API**：访问`window`、`document`、`localStorage`等
3. **保持组件粒度小**：减少传输给客户端的代码量
4. **懒加载**：对大型客户端组件使用动态导入

示例：

```tsx
'use client'

// components/ProductList.tsx
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { type Product } from '@/types';

export function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name');
  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div>
      <div className="filters">
        <button onClick={() => setSortBy('name')}>按名称排序</button>
        <button onClick={() => setSortBy('price')}>按价格排序</button>
      </div>
      
      <div className="grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### 客户端组件的懒加载

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 懒加载复杂客户端组件
const DashboardChart = dynamic(() => import('@/components/DashboardChart'), {
  loading: () => <div>加载图表中...</div>,
  ssr: false // 如果组件依赖于浏览器API，完全跳过SSR
});

export default function DashboardPage() {
  return (
    <div>
      <h1>仪表板</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <DashboardChart />
      </Suspense>
    </div>
  );
}
```

## 常见模式与技巧

### 组件边界分离

按功能分离组件，让服务器和客户端组件各自专注于自己的职责：

```tsx
// app/products/[id]/page.tsx (服务器组件)
import { getProductDetails } from '@/lib/products';
import ProductView from './ProductView';   // 客户端组件
import RelatedProducts from './RelatedProducts'; // 服务器组件

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 在服务器上获取数据
  const product = await getProductDetails(params.id);
  const relatedProducts = await getRelatedProducts(params.id);
  
  return (
    <div>
      <ProductView product={product} /> {/* 处理交互的客户端组件 */}
      <RelatedProducts products={relatedProducts} /> {/* 静态展示的服务器组件 */}
    </div>
  );
}
```

### 表单处理

结合服务器操作和客户端交互处理表单：

```tsx
'use client'

// app/contact/ContactForm.tsx
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('提交中...');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('提交失败');
      
      setStatus('提交成功！');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(`错误: ${error.message}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">姓名</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">邮箱</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">留言</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit">提交</button>
      {status && <p>{status}</p>}
    </form>
  );
}
```

### 服务器组件与服务器操作（Server Actions）

Next.js引入的服务器操作允许从客户端直接调用服务器函数：

```tsx
// app/actions.ts
'use server'

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  if (!title || !content) {
    return { error: '标题和内容不能为空' };
  }
  
  try {
    await db.post.create({
      data: { title, content }
    });
    
    // 重新验证路径以更新数据
    revalidatePath('/posts');
    return { success: true };
  } catch (error) {
    return { error: '创建文章失败' };
  }
}
```

```tsx
// app/posts/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <div>
      <h1>创建新文章</h1>
      <form action={createPost}>
        <div>
          <label htmlFor="title">标题</label>
          <input id="title" name="title" required />
        </div>
        
        <div>
          <label htmlFor="content">内容</label>
          <textarea id="content" name="content" required />
        </div>
        
        <button type="submit">发布</button>
      </form>
    </div>
  );
}
```

### 使用useFormStatus钩子提供表单反馈

```tsx
'use client'

// app/posts/new/SubmitButton.tsx
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? '发布中...' : '发布'}
    </button>
  );
}
```

```tsx
// app/posts/new/page.tsx
import { createPost } from '@/app/actions';
import { SubmitButton } from './SubmitButton';

export default function NewPostPage() {
  return (
    <div>
      <h1>创建新文章</h1>
      <form action={createPost}>
        {/* 表单字段... */}
        <SubmitButton />
      </form>
    </div>
  );
}
```

## 常见错误与解决方案

### 1. "useState can only be used in Client Components"

**问题**: 在服务器组件中使用了React钩子

**解决方案**: 将组件转换为客户端组件，或创建一个新的客户端组件

```tsx
// 错误写法
// app/counter.tsx
import { useState } from 'react'; // 错误!服务器组件中不能使用useState

export default function Counter() {
  const [count, setCount] = useState(0);
  return (/* ... */);
}

// 正确写法
// app/counter.tsx
'use client'
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (/* ... */);
}
```

### 2. "Client Component Imported by Server Component"

**问题**: 客户端组件试图导入服务器组件

**解决方案**: 通过属性或children传递服务器组件给客户端组件

```tsx
// 错误写法
'use client'
// components/Layout.tsx
import Header from './Header'; // 错误!Header是服务器组件

export default function Layout({ children }) {
  return (
    <div>
      <Header /> {/* 不能在客户端组件中导入服务器组件 */}
      {children}
    </div>
  );
}

// 正确写法
// app/page.tsx (服务器组件)
import Layout from '@/components/Layout';
import Header from '@/components/Header';

export default function Page() {
  return (
    <Layout header={<Header />}> {/* 通过属性传递 */}
      <div>页面内容</div>
    </Layout>
  );
}

// components/Layout.tsx (客户端组件)
'use client'
export default function Layout({ header, children }) {
  return (
    <div>
      {header} {/* 渲染传入的服务器组件 */}
      {children}
    </div>
  );
}
```

### 3. "window is not defined"

**问题**: 在服务器组件中访问浏览器API

**解决方案**: 将依赖浏览器API的代码移至客户端组件，或使用条件逻辑检查

```tsx
'use client'
// components/WindowSize.tsx
import { useState, useEffect } from 'react';

export default function WindowSize() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // 仅在客户端执行
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  return (
    <div>
      窗口尺寸: {dimensions.width} x {dimensions.height}
    </div>
  );
}
```

## 学习检查点

- [ ] 理解服务器组件和客户端组件的区别
- [ ] 掌握何时使用服务器组件vs客户端组件
- [ ] 学会在服务器组件中获取数据
- [ ] 熟悉服务器组件和客户端组件的交互模式
- [ ] 掌握客户端组件中的状态管理和交互
- [ ] 学会使用服务器操作（Server Actions）
- [ ] 了解并避免常见错误

## 下一步

学习Next.js中的路由系统、动态路由和嵌套布局，以构建丰富的用户体验和导航结构。 