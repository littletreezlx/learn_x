# Next.js 核心知识检查清单

> **完成这些检查点，你就掌握了 Next.js 全栈开发**

---

## 阶段 1: 基础概念（1-2天）

### ✅ 项目设置和环境
- [ ] 能够创建 Next.js 项目（`npx create-next-app`）
- [ ] 理解项目目录结构（app/、public/、package.json）
- [ ] 会启动开发服务器（`npm run dev`）
- [ ] 了解 TypeScript 配置

**验证练习**：
```bash
# 创建一个新项目
npx create-next-app my-test-app --typescript
cd my-test-app
npm run dev
# 访问 http://localhost:3000
```

---

### ✅ 路由系统
- [ ] 理解文件系统路由（app/page.tsx → /）
- [ ] 能够创建动态路由（app/posts/[id]/page.tsx）
- [ ] 会使用 Link 组件进行导航
- [ ] 了解路由组和布局

**验证练习**：
```tsx
// 创建以下文件结构：
// app/
// ├── page.tsx           // 首页
// ├── about/page.tsx     // 关于页面
// └── posts/[id]/page.tsx // 动态文章页
```

---

### ✅ 组件基础
- [ ] 能够创建 React 组件
- [ ] 理解 JSX 语法
- [ ] 会使用 Props 传递数据
- [ ] 掌握组件组合模式

**验证练习**：
```tsx
// 创建一个 Card 组件
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

### ✅ 样式系统
- [ ] 会使用 Tailwind CSS
- [ ] 理解 CSS Modules
- [ ] 能够处理响应式设计
- [ ] 掌握全局样式

**验证练习**：
```tsx
// 使用 Tailwind 创建响应式卡片
<div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">响应式卡片</h2>
</div>
```

---

## 阶段 2: React 核心概念（2-3天）

### ✅ State 和 Props
- [ ] 掌握 useState Hook
- [ ] 理解 Props 的不可变性
- [ ] 能够处理复杂状态
- [ ] 了解状态提升

**验证练习**：
```tsx
// 创建一个计数器组件
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

### ✅ 生命周期和副作用
- [ ] 掌握 useEffect Hook
- [ ] 理解依赖数组
- [ ] 会处理副作用清理
- [ ] 了解数据获取模式

**验证练习**：
```tsx
// 创建一个组件，在挂载时获取数据
function UserData({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // userId 变化时重新获取

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

---

### ✅ 事件处理
- [ ] 能够处理各种用户事件
- [ ] 理解事件对象
- [ ] 会使用表单处理
- [ ] 掌握键盘和鼠标事件

**验证练习**：
```tsx
// 创建一个搜索组件
function Search() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理搜索逻辑
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
    </form>
  );
}
```

---

### ✅ 列表和条件渲染
- [ ] 能够使用 map 渲染列表
- [ ] 掌握条件渲染模式
- [ ] 理解 key 的重要性
- [ ] 会处理空状态

**验证练习**：
```tsx
// 创建一个用户列表组件
function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>没有用户数据</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 阶段 3: Next.js 高级特性（2-3天）

### ✅ 数据获取
- [ ] 理解服务端组件 vs 客户端组件
- [ ] 掌握静态生成（SSG）
- [ ] 会使用服务端渲染（SSR）
- [ ] 了解增量静态再生成（ISR）

**验证练习**：
```tsx
// 创建一个静态生成的页面
async function BlogPage() {
  const posts = await getPosts(); // 在服务器上获取数据

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

---

### ✅ API 路由
- [ ] 能够创建 RESTful API
- [ ] 处理不同的 HTTP 方法
- [ ] 实现错误处理
- [ ] 会使用动态 API 路由

**验证练习**：
```ts
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  return Response.json(post);
}
```

---

### ✅ 表单处理
- [ ] 掌握受控组件
- [ ] 会使用 Server Actions
- [ ] 实现表单验证
- [ ] 处理文件上传

**验证练习**：
```tsx
// 创建一个登录表单
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login({ email, password });
    // 处理登录结果
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">登录</button>
    </form>
  );
}
```

---

### ✅ 认证和授权
- [ ] 理解认证流程
- [ ] 会使用 Context 管理状态
- [ ] 实现路由保护
- [ ] 处理权限控制

**验证练习**：
```tsx
// 创建权限保护组件
function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user || user.role !== requiredRole) {
    return <div>无权限访问</div>;
  }

  return children;
}
```

---

## 阶段 4: 实战项目（2-3天）

### ✅ 博客系统（初级）
- [ ] 创建文章列表页面
- [ ] 实现文章详情页
- [ ] 添加搜索功能
- [ ] 实现分类筛选

**项目功能**：
- [x] 文章列表展示
- [x] 响应式设计
- [x] 搜索和筛选
- [x] 分页或无限滚动

### ✅ 任务管理系统（中级）
- [ ] 用户认证和授权
- [ ] CRUD 操作
- [ ] 实时更新
- [ ] 数据持久化

**项目功能**：
- [x] 用户注册登录
- [x] 任务增删改查
- [x] 状态管理
- [x] 数据验证

### ✅ 电商网站（高级）
- [ ] 产品目录和搜索
- [ ] 购物车功能
- [ ] 订单处理
- [ ] 支付集成

**项目功能**：
- [x] 产品展示
- [x] 购物车管理
- [x] 订单流程
- [x] 用户中心

---

## 🎯 完成标准

### ✅ 知识维度
- [ ] 理解 Next.js 的渲染策略
- [ ] 掌握 React 核心概念
- [ ] 了解 TypeScript 在 Next.js 中的应用
- [ ] 知道如何优化性能

### ✅ 实践维度
- [ ] 独立完成至少 1 个完整项目
- [ ] 能够创建和维护 API 路由
- [ ] 会部署 Next.js 应用到 Vercel
- [ ] 掌握调试技巧

### ✅ 能力维度
- [ ] 能够阅读 Next.js 项目代码
- [ ] 知道如何解决常见问题
- [ ] 会查阅官方文档
- [ ] 能够指导他人学习

---

## 📊 技能评估

### 基础技能（⭐⭐⭐）
- [ ] 创建和管理 Next.js 项目
- [ ] 使用组件化开发
- [ ] 实现基本的路由
- [ ] 应用样式和布局

### 进阶技能（⭐⭐⭐⭐）
- [ ] 数据获取和状态管理
- [ ] API 路由开发
- [ ] 表单处理和验证
- [ ] 性能优化

### 高级技能（⭐⭐⭐⭐⭐）
- [ ] 认证和授权系统
- [ ] 数据库集成
- [ ] 测试驱动开发
- [ ] 生产环境部署

---

## 💡 学习建议

### 高效学习方法
1. **项目驱动**：通过实际项目学习概念
2. **循序渐进**：先掌握基础再深入高级特性
3. **代码复现**：不只是看教程，要亲手写代码
4. **调试优先**：学会使用开发者工具

### 常见误区避免
1. **过度设计**：Next.js 已经处理了很多复杂性
2. **忽视 TypeScript**：类型安全很重要
3. **忘记响应式**：移动端优先设计
4. **忽略性能**：了解 Core Web Vitals

### 资源推荐
- [Next.js 官方文档](https://nextjs.org/docs)
- [React 学习资源](https://react.dev/learn)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

**记住**：完成这些检查点后，你就具备了 Next.js 全栈开发的核心能力！