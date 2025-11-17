/**
 * 11_api.tsx - Next.js API 路由和后端开发
 *
 * 学习目标：
 * - 创建 API 路由
 * - 处理不同的 HTTP 方法
 * - 实现 RESTful API
 * - 错误处理和验证
 */

import React, { useState, useEffect } from 'react';

// =============================================
// API 路由示例代码
// =============================================

// 示例：app/api/posts/route.ts
export const postsRouteExample = `
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 模拟数据
let posts = [
  { id: 1, title: '文章1', content: '内容1', author: '张三' },
  { id: 2, title: '文章2', content: '内容2', author: '李四' }
];

// GET - 获取所有文章
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  // 简单的过滤逻辑
  let filteredPosts = posts;
  if (category) {
    filteredPosts = posts.filter(post =>
      post.category?.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredPosts,
    total: filteredPosts.length
  });
}

// POST - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证必填字段
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    const newPost = {
      id: Date.now(),
      title: body.title,
      content: body.content,
      author: body.author || '匿名',
      createdAt: new Date().toISOString(),
      category: body.category
    };

    posts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: '文章创建成功'
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: '无效的请求数据' },
      { status: 400 }
    );
  }
}
`;

// 示例：动态路由 app/api/posts/[id]/route.ts
export const dynamicRouteExample = `
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

// 模拟数据（实际应该从数据库获取）
const posts = [
  { id: 1, title: '文章1', content: '内容1' },
  { id: 2, title: '文章2', content: '内容2' }
];

// GET - 获取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    notFound(); // 404
  }

  return NextResponse.json({
    success: true,
    data: post
  });
}

// PUT - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await request.json();

  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return NextResponse.json(
      { success: false, error: '文章不存在' },
      { status: 404 }
    );
  }

  posts[postIndex] = { ...posts[postIndex], ...body };

  return NextResponse.json({
    success: true,
    data: posts[postIndex],
    message: '文章更新成功'
  });
}

// DELETE - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return NextResponse.json(
      { success: false, error: '文章不存在' },
      { status: 404 }
    );
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  return NextResponse.json({
    success: true,
    data: deletedPost,
    message: '文章删除成功'
  });
}
`;

// =============================================
// API 调用组件
// =============================================

interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  category?: string;
  createdAt?: string;
}

function APITestComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  // 获取所有文章
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts');
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.error || '获取文章失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  // 创建新文章
  const createPost = async () => {
    if (!newPost.title || !newPost.content) {
      setError('标题和内容不能为空');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      const result = await response.json();

      if (result.success) {
        setPosts([...posts, result.data]);
        setNewPost({ title: '', content: '', author: '' });
      } else {
        setError(result.error || '创建文章失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  // 删除文章
  const deletePost = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`/api/posts/\${id}\`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        setError(result.error || '删除文章失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <h3>API 测试组件</h3>

      {/* 创建文章表单 */}
      <div style={{
        background: '#f8f9fa',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <h4>创建新文章</h4>
        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="标题"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="作者"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <textarea
            placeholder="内容"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        <button
          onClick={createPost}
          disabled={loading}
          style={{
            background: loading ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '创建中...' : '创建文章'}
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* 文章列表 */}
      <div>
        <h4>文章列表</h4>
        {loading && <p>加载中...</p>}

        {!loading && posts.length === 0 && <p>暂无文章</p>}

        {!loading && posts.map(post => (
          <div
            key={post.id}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h5 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h5>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                  {post.author} • {post.createdAt || '刚刚'}
                </p>
              </div>
              <button
                onClick={() => deletePost(post.id)}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================
// 主组件
// =============================================

export default function APIPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js API 路由和后端开发</h1>

      {/* API 开发对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>API 开发对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>概念</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Next.js</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Spring Boot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>路由定义</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>文件系统路由</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@RestController + @RequestMapping</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>请求处理</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>命名函数 (GET, POST, PUT, DELETE)</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@GetMapping, @PostMapping 等</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>数据绑定</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>await request.json()</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@RequestBody 注解</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>错误处理</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>NextResponse.json + 状态码</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@ExceptionHandler, @ResponseStatus</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>中间件</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>middleware.ts</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@Filter, @Interceptor</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* API 路由示例 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div>
          <h2>基础 API 路由</h2>
          <div style={{
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h3>文件结构</h3>
            <pre style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
{`app/
├── api/
│   ├── posts/
│   │   ├── route.ts        # /api/posts
│   │   └── [id]/
│   │       └── route.ts    # /api/posts/[id]
│   ├── users/
│   │   └── route.ts        # /api/users
│   └── auth/
│       └── route.ts        # /api/auth`}
            </pre>
          </div>

          <div style={{
            background: '#fff3cd',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h3>关键特性</h3>
            <ul>
              <li>✅ 文件系统路由，无需额外配置</li>
              <li>✅ 支持 TypeScript 类型安全</li>
              <li>✅ 内置错误处理和状态码</li>
              <li>✅ 支持 GET, POST, PUT, DELETE, PATCH</li>
              <li>✅ 动态路由支持参数</li>
            </ul>
          </div>
        </div>

        <div>
          <h2>代码示例</h2>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h3>GET /api/posts 示例</h3>
            <pre style={{
              background: '#f4f4f4',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem'
            }}>
              {postsRouteExample}
            </pre>
          </div>
        </div>
      </div>

      {/* API 测试组件 */}
      <div style={{ marginTop: '2rem' }}>
        <h2>API 测试组件</h2>
        <APITestComponent />
      </div>

      {/* 最佳实践提示 */}
      <div style={{
        background: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '1rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#155724' }}>API 开发最佳实践</h3>
        <ul style={{ color: '#155724' }}>
          <li>✅ 始终验证输入数据和类型</li>
          <li>✅ 使用适当的 HTTP 状态码</li>
          <li>✅ 实现统一的错误响应格式</li>
          <li>✅ 添加适当的请求限制和验证</li>
          <li>✅ 实现 CORS 策略</li>
          <li>✅ 添加日志记录和监控</li>
          <li>✅ 考虑 API 版本控制</li>
        </ul>
      </div>
    </main>
  );
}