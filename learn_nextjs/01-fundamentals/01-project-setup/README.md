# 项目创建与结构

本节介绍如何创建Next.js项目以及理解项目的基本结构。

## Next.js项目创建

### 使用create-next-app创建项目

创建Next.js项目最简单的方式是使用官方提供的`create-next-app`脚手架工具：

```bash
# 使用npm
npx create-next-app@latest my-next-app

# 使用yarn
yarn create next-app my-next-app

# 使用pnpm
pnpm create next-app my-next-app
```

在创建过程中，会提示你选择一些配置选项：

1. 是否使用TypeScript？（推荐选择Yes）
2. 是否使用ESLint？（推荐选择Yes）
3. 是否使用Tailwind CSS？（根据项目需求选择）
4. 使用`src/`目录？（建议选择Yes以更好地组织代码）
5. 使用App Router还是Pages Router？（推荐选择App Router，这是Next.js 13后的新路由系统）
6. 是否自定义导入别名？（可以选择Yes，设置`@/*`映射到`src/*`）

## 项目目录结构

创建完成后，Next.js项目的基本结构如下（使用App Router）：

```
my-next-app/
├── .next/                # 构建输出目录（自动生成）
├── node_modules/         # 依赖包
├── public/               # 静态资源目录
│   ├── favicon.ico       # 网站图标
│   └── ...               # 其他静态资源
├── src/                  # 源代码目录
│   ├── app/              # App Router路由目录
│   │   ├── favicon.ico   # 应用图标
│   │   ├── globals.css   # 全局样式
│   │   ├── layout.tsx    # 根布局组件
│   │   └── page.tsx      # 首页组件
│   ├── components/       # 共享组件目录（你需要自己创建）
│   └── lib/              # 工具函数和库（你需要自己创建）
├── .eslintrc.json        # ESLint配置
├── .gitignore            # Git忽略文件
├── next.config.js        # Next.js配置文件
├── package.json          # 项目依赖和脚本
├── README.md             # 项目说明文档
└── tsconfig.json         # TypeScript配置
```

### 核心目录详解

1. **`public/`**: 存放静态资源的目录，这些文件可以通过根URL直接访问。
   例如，`public/images/logo.png`可以通过`/images/logo.png`访问。

2. **`src/app/`**: App Router的主目录，Next.js 13+使用基于文件系统的路由。
   - `layout.tsx`: 定义应用的根布局，所有页面都将包含在这个布局中
   - `page.tsx`: 路由的页面组件，对应URL根路径`/`
   - 子目录对应URL路径，例如`app/about/page.tsx`对应`/about`路径

3. **`src/components/`**: 存放可复用的React组件。
   建议按功能或页面进一步组织，例如：
   ```
   components/
   ├── common/           # 通用组件
   ├── layout/           # 布局相关组件
   └── features/         # 功能特定组件
   ```

4. **`src/lib/`**: 工具函数、API客户端、配置等。

## 配置文件详解

### next.config.js

Next.js的主配置文件，可以自定义构建行为、环境变量、路径重写等：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用React严格模式以在开发环境中捕获潜在问题
  reactStrictMode: true,
  
  // 自定义图片域名白名单（使用Next.js Image组件时）
  images: {
    domains: ['example.com'],
  },
  
  // 环境变量
  env: {
    CUSTOM_ENV_VAR: 'value',
  },
  
  // 重写URL（类似Apache的mod_rewrite）
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  
  // 启用实验性功能
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
```

### tsconfig.json

TypeScript配置文件，定义了TypeScript编译器选项：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 开发环境设置

### 启动开发服务器

在项目根目录运行以下命令启动开发服务器：

```bash
# 使用npm
npm run dev

# 使用yarn
yarn dev

# 使用pnpm
pnpm dev
```

服务器默认在`http://localhost:3000`启动。

### 添加有用的开发工具

1. **安装React开发者工具**
   - [Chrome扩展](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
   - [Firefox扩展](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. **配置VS Code插件**
   - ESLint：代码格式检查
   - Prettier：代码格式化
   - ES7+ React/Redux/React-Native snippets：React代码片段

3. **添加.env.local文件**
   创建`.env.local`文件存放本地环境变量：
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
   - 以`NEXT_PUBLIC_`开头的环境变量可在浏览器端访问
   - 其他环境变量仅在服务器端可用

## 代码示例

### 示例1：基本页面组件

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">欢迎使用Next.js</h1>
      <p>这是一个使用Next.js App Router创建的首页。</p>
    </main>
  );
}
```

### 示例2：动态路由页面

```tsx
// src/app/users/[id]/page.tsx
import { notFound } from 'next/navigation';

// 模拟用户数据
const users = {
  '1': { id: 1, name: '张三', email: 'zhangsan@example.com' },
  '2': { id: 2, name: '李四', email: 'lisi@example.com' },
};

export default function UserPage({ params }: { params: { id: string } }) {
  const user = users[params.id];
  
  // 如果用户不存在，返回404页面
  if (!user) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">用户详情</h1>
      <div className="bg-white shadow p-4 rounded">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>姓名:</strong> {user.name}</p>
        <p><strong>邮箱:</strong> {user.email}</p>
      </div>
    </div>
  );
}
```

### 示例3：自定义404页面

```tsx
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-6">页面未找到</p>
      <Link href="/" className="text-blue-500 hover:underline">
        返回首页
      </Link>
    </div>
  );
}
```

## 常见问题解答

1. **Q: 创建项目时应该选择App Router还是Pages Router?**
   
   A: 对于新项目，建议选择App Router（Next.js 13引入）。它提供了更强大的功能，如服务器组件、布局系统等。但如果你要维护现有的项目或与特定插件兼容，可能需要使用Pages Router。

2. **Q: 应该把代码放在src目录下吗?**
   
   A: 是的，使用`src`目录有助于更好地组织代码，尤其是随着项目规模增长。它将源代码与配置文件、构建输出等分开。

3. **Q: 如何处理环境变量?**
   
   A: Next.js支持`.env`、`.env.local`、`.env.development`和`.env.production`文件。以`NEXT_PUBLIC_`开头的变量会暴露给浏览器，其他变量仅在服务器端可用。

4. **Q: 开发时如何解决CORS问题?**
   
   A: 在开发环境中，可以在`next.config.js`中使用`rewrites`功能代理API请求，避免跨域问题：
   ```javascript
   async rewrites() {
     return [
       {
         source: '/api/:path*',
         destination: 'http://localhost:8080/api/:path*',
       },
     ];
   }
   ```

## 学习检查点

- [ ] 成功创建一个Next.js项目
- [ ] 了解项目的主要目录结构和功能
- [ ] 能够配置和启动开发环境
- [ ] 理解Next.js配置文件的基本选项
- [ ] 能创建基本的页面组件

## 下一步

学习Next.js的路由系统，包括静态和动态路由、路由导航和链接。 