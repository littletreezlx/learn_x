/**
 * 10_data_advanced.tsx - Next.js 高级数据获取
 *
 * 学习目标：
 * - 掌握 Server Components 数据获取
 * - 理解数据缓存策略
 * - 使用动态路由获取数据
 * - 实现增量静态再生成
 */

import { notFound } from 'next/navigation';

// =============================================
// 模拟数据源
// =============================================

// 模拟博客文章数据
const posts = [
  {
    id: 1,
    title: 'Next.js 14 新特性解析',
    content: 'Next.js 14 带来了许多令人兴奋的新特性...',
    category: '技术',
    author: '张三',
    publishedAt: '2025-01-15',
    views: 1234,
    tags: ['Next.js', 'React', 'Web开发']
  },
  {
    id: 2,
    title: 'React Server Components 最佳实践',
    content: 'Server Components 是 React 18 的重要特性...',
    category: '教程',
    author: '李四',
    publishedAt: '2025-01-10',
    views: 2345,
    tags: ['React', 'Server Components', '性能']
  },
  {
    id: 3,
    title: '全栈应用开发指南',
    content: '从零开始构建现代全栈应用...',
    category: '实战',
    author: '王五',
    publishedAt: '2025-01-05',
    views: 3456,
    tags: ['全栈', '数据库', '部署']
  }
];

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: '/avatars/zhangsan.jpg', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', avatar: '/avatars/lisi.jpg', role: 'editor' },
  { id: 3, name: '王五', email: 'wangwu@example.com', avatar: '/avatars/wangwu.jpg', role: 'user' }
];

// =============================================
// 数据获取函数
// =============================================

// 异步数据获取函数（服务端组件中使用）
async function getPosts(): Promise<typeof posts> {
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts;
}

async function getPost(id: number): Promise<typeof posts[0] | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const post = posts.find(p => p.id === id);
  return post || null;
}

async function getUsers(): Promise<typeof users> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return users;
}

// =============================================
// 静态生成示例
// =============================================

// 静态生成的博客列表页面
export default async function BlogListPage() {
  const postsList = await getPosts();

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>博客文章列表</h1>
      <p style={{ color: '#666' }}>静态生成页面，构建时预渲染</p>

      {/* 数据获取对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>数据获取策略对比</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>策略</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>执行时机</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>缓存</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SSG</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>构建时</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>长期缓存</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>博客、文档</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SSR</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>请求时</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>短时缓存</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>动态内容</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>ISR</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>混合</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>可配置缓存</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>电商新闻</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 博客文章列表 */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {postsList.map(post => (
          <article key={post.id} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#666' }}>
                  <span>作者: {post.author}</span>
                  <span>发布: {post.publishedAt}</span>
                  <span>阅读: {post.views}</span>
                </div>
              </div>
              <span style={{
                background: '#e3f2fd',
                color: '#1976d2',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}>
                {post.category}
              </span>
            </div>

            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem' }}>
              {post.content.substring(0, 100)}...
            </p>

            <div style={{ marginBottom: '1rem' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: '#f0f0f0',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  marginRight: '0.5rem'
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            <a
              href={`/posts/${post.id}`}
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              阅读全文 →
            </a>
          </article>
        ))}
      </div>

      {/* 性能优化提示 */}
      <div style={{
        background: '#e8f5e8',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#2e7d32' }}>数据获取优化提示</h3>
        <ul style={{ color: '#2e7d32' }}>
          <li>✅ 优先使用 Server Components 进行数据获取</li>
          <li>✅ 合理使用 revalidate 避免过度重新验证</li>
          <li>✅ 考虑数据预取提升用户体验</li>
          <li>✅ 使用 Suspense 实现优雅的加载状态</li>
          <li>✅ 实现适当的错误边界</li>
        </ul>
      </div>
    </main>
  );
}

// =============================================
// 动态路由页面
// =============================================

// 动态博客文章页面
export async function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = await getPost(postId);
  const usersList = await getUsers();

  if (!post) {
    notFound(); // Next.js 404 处理
  }

  const author = usersList.find(u => u.name === post.author);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{post.title}</h1>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {post.author[0]}
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{post.author}</div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  {author?.email}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#666' }}>
              <div>发布: {post.publishedAt}</div>
              <div>阅读: {post.views} 次</div>
              <div>分类: {post.category}</div>
            </div>
          </div>
        </div>

        <div style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#333'
        }}>
          {post.content}
        </div>

        <div style={{ marginTop: '2rem' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              background: '#e3f2fd',
              color: '#1976d2',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              marginRight: '0.5rem',
              display: 'inline-block'
            }}>
              #{tag}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>关于这篇文章</h3>
          <p>这是一个使用 Server Components 动态渲染的页面示例。</p>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            每次访问都会重新获取最新数据，确保内容是最新的。
          </p>
        </div>

        <a
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          ← 返回博客列表
        </a>
      </article>
    </main>
  );
}

// =============================================
// 增量静态再生成 (ISR) 示例
// =============================================

// ISR 示例页面
export async function ISRDemoPage() {
  const currentTime = new Date().toLocaleString('zh-CN');

  // 这里会每 60 秒重新生成一次
  // revalidate: 60

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>增量静态再生成 (ISR) 示例</h1>

      <div style={{
        background: '#fff3cd',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>ISR 的工作原理</h3>
        <ol>
          <li>首次请求时静态生成页面</li>
          <li>后续请求返回缓存的页面</li>
          <li>后台在指定时间间隔后重新生成页面</li>
          <li>下次请求时返回新生成的页面</li>
        </ol>
      </div>

      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h2>页面生成时间</h2>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
          {currentTime}
        </p>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          这个页面使用 ISR，每 60 秒重新生成一次。
          刷新页面可以看到时间在更新（最多延迟 60 秒）。
        </p>
      </div>
    </main>
  );
}

// =============================================
// 数据缓存示例
// =============================================

// 缓存策略示例组件
export function CacheStrategyDemo() {
  return (
    <div style={{
      background: '#e7f3ff',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h3>Next.js 缓存策略</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#e0e0e0' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>API Route</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>缓存策略</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>-使用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>/api/posts</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>force-cache</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>静态内容</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>/api/user</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>no-store</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>实时数据</td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>/api/stats</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>revalidate(60)</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>定期更新</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        <strong>示例代码：</strong>
        <pre style={{
          background: '#f4f4f4',
          padding: '0.5rem',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`// 强制缓存（默认）
const data = fetch('/api/posts', { cache: 'force-cache' });

// 不缓存
const data = fetch('/api/user', { cache: 'no-store' });

// 重新验证
const data = fetch('/api/stats', { next: { revalidate: 60 } });`}
        </pre>
      </div>
    </div>
  );
}