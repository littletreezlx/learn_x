# 个人博客项目

这是一个使用Next.js构建的个人博客项目，展示了如何使用Next.js的基础和进阶特性构建实际应用。

## 项目概述

个人博客项目是一个完整的全栈应用，包含以下功能：

- 文章列表和详情页
- 分类和标签过滤
- 管理员登录和文章管理
- Markdown文章编辑
- 评论系统

## 技术栈

- **前端**:
  - Next.js 14（App Router）
  - TypeScript
  - Tailwind CSS
  - React Hook Form
  - SWR/React Query

- **后端**:
  - Next.js API Routes
  - Prisma ORM
  - SQLite/PostgreSQL
  - NextAuth.js

## 学习目标

通过构建这个博客项目，你将学习：

1. Next.js的服务器组件和客户端组件
2. 数据获取和缓存策略
3. 静态生成和增量静态再生成
4. API路由开发和数据库集成
5. 用户认证和授权
6. 表单处理和数据验证
7. 性能优化技术

## 项目结构

```
personal-blog/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── posts/
│   │   │   ├── comments/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── posts/
│   │   │   ├── comments/
│   │   │   └── auth/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── blog/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── ui/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
├── prisma/
│   └── schema.prisma
└── public/
    └── images/
```

## 开发阶段

项目开发分为以下阶段，逐步增加功能复杂度：

### 阶段1：基础博客展示

- 创建项目结构
- 实现文章列表和详情页
- 使用静态生成优化加载性能
- 基本样式和响应式设计

### 阶段2：数据库集成

- 设置Prisma和数据库
- 创建数据模型
- 实现API路由进行数据获取
- 连接前端和API

### 阶段3：用户认证和管理后台

- 集成NextAuth.js
- 创建登录和注册页面
- 开发管理后台UI
- 实现文章CRUD操作

### 阶段4：高级功能和性能优化

- 添加评论功能
- 实现分类和标签系统
- 添加搜索功能
- 性能和SEO优化

## 部署说明

项目可以部署到Vercel平台，只需将代码推送到GitHub仓库并连接到Vercel即可。

## 代码示例

以下是一些关键功能的代码示例，可以作为开发参考。

### 文章列表页

```tsx
// src/app/blog/page.tsx
import { Suspense } from 'react';
import PostList from '@/components/blog/PostList';
import { getPosts } from '@/lib/posts';

export const revalidate = 3600; // 每小时重新验证一次

export default async function BlogPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">博客文章</h1>
      <Suspense fallback={<div>加载文章列表...</div>}>
        <PostList />
      </Suspense>
    </main>
  );
}

// src/components/blog/PostList.tsx
import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default async function PostList() {
  const posts = await getPosts();
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Link href={`/blog/${post.slug}`}>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.author.name}</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
```

### API路由示例

```typescript
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        categories: true,
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, authorId, published = false, slug, categoryIds = [] } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        published,
        author: {
          connect: { id: authorId },
        },
        categories: {
          connect: categoryIds.map((id: number) => ({ id })),
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

### 数据库模型

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // 或 "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String
  slug       String     @unique
  content    String
  excerpt    String?
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[]
  comments   Comment[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  slug  String @unique
  posts Post[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

## 学习资源

- [Next.js文档](https://nextjs.org/docs)
- [Prisma文档](https://www.prisma.io/docs)
- [NextAuth.js文档](https://next-auth.js.org)
- [Tailwind CSS文档](https://tailwindcss.com/docs) 