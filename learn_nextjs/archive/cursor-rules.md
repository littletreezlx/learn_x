# Next.js 与 TypeScript 开发规范

## TypeScript 核心概念

### 类型系统
- 始终使用类型标注，避免`any`类型
- 优先使用接口（`interface`）定义对象类型
- 使用类型别名（`type`）定义联合类型和交叉类型
- 对函数参数和返回值明确类型标注

```typescript
// 推荐写法
interface User {
  id: number;
  name: string;
  email: string;
}

// 函数类型标注
function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}
```

### 类型工具
- 充分利用TypeScript内置类型工具：`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`等
- 使用泛型增强代码复用性和类型安全性
- 使用类型断言（`as`）时需谨慎，确保类型安全

```typescript
// 泛型使用示例
function createState<T>(initialState: T): [T, (newState: T) => void] {
  let state = initialState;
  const setState = (newState: T) => {
    state = newState;
  };
  return [state, setState];
}
```

## Next.js 核心概念

### 路由系统
- App Router优先使用（Next.js 13+）
- 遵循文件系统路由规则，避免重复路径
- 动态路由使用`[param]`或`[...slug]`语法
- 路由组织按业务功能划分，避免过深嵌套

```typescript
// 路由组织示例
app/
├── (auth)/            // 路由组
│   ├── login/         // /login 路由
│   └── register/      // /register 路由
├── dashboard/         // /dashboard 路由
└── profile/[id]/      // /profile/:id 动态路由
```

### 数据获取
- 服务端组件内直接获取数据，无需hooks
- 客户端组件使用`SWR`或`React Query`管理远程数据
- 合理使用缓存策略，减少重复请求
- 对API请求进行错误处理和loading状态管理

```typescript
// 服务端组件数据获取
async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// 客户端组件数据获取
'use client'
import { useQuery } from '@tanstack/react-query';

function ClientComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.map(item => <div key={item.id}>{item.title}</div>)}</div>;
}
```

### 渲染策略
- 优先使用服务端组件，除非需要客户端交互
- 明确标记客户端组件：`'use client'`
- 合理拆分服务端/客户端组件边界，避免大量数据传输
- 根据页面特性选择适当的渲染模式：SSG、SSR、ISR

```typescript
// 服务端组件
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return (
    <div>
      <h1>{product.name}</h1>
      <ClientInteractive product={product} />
    </div>
  );
}

// 客户端组件
'use client'
export function ClientInteractive({ product }) {
  const [count, setCount] = useState(1);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Add to cart ({count})
      </button>
    </div>
  );
}
```

## 最佳实践

### 项目结构
- 按功能模块组织代码，避免按技术类型分类
- 共享组件放置在`components`目录
- 工具函数放置在`utils`或`lib`目录
- 全局状态和Provider放置在顶层`app`目录

```
app/
├── api/              # API Routes
├── components/       # 共享组件
│   ├── ui/           # UI组件
│   └── forms/        # 表单组件
├── hooks/            # 自定义Hooks
├── lib/              # 工具函数和库
└── (routes)/         # 页面路由
```

### 状态管理
- 局部状态使用`useState`和`useReducer`
- 跨组件状态使用Context API或Zustand
- 服务端状态使用React Query或SWR
- 避免过度使用全局状态，保持状态靠近使用处

### 性能优化
- 使用`Image`组件代替原生`img`标签
- 路由级别代码分割，按需加载模块
- 对大型列表使用虚拟滚动
- 合理使用`memo`、`useMemo`和`useCallback`缓存

### 安全最佳实践
- 输入验证同时在客户端和服务端进行
- 使用NextAuth.js或类似库处理认证
- API路由添加适当的权限验证
- 防止XSS和CSRF攻击

### 代码质量
- 使用ESLint和Prettier保持代码风格一致
- 编写单元测试和集成测试验证功能
- 遵循语义化组件命名和目录结构
- 保持组件小而专注，单一职责 