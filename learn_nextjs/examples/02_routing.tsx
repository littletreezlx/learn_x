/**
 * 02_routing.tsx - Next.js 路由系统
 *
 * 学习目标：
 * - 理解 Next.js 的文件系统路由
 * - 创建动态路由
 * - 实现页面导航
 *
 * 文件结构示例：
 * app/
 * ├── page.tsx              → /
 * ├── about/page.tsx        → /about
 * ├── posts/
 * │   ├── page.tsx         → /posts
 * │   └── [slug]/page.tsx  → /posts/[动态参数]
 */

// 主页面 - app/page.tsx
export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js 路由系统</h1>

      <nav style={{ marginBottom: '2rem' }}>
        <a href="/about" style={{ marginRight: '1rem' }}>关于页面</a>
        <a href="/posts/hello-world">博客文章：hello-world</a>
      </nav>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <h2>路由对比</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Spring Boot</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                <code>@GetMapping("/users/{id}")</code>
              </td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                <code>app/users/[id]/page.tsx</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                <code>@GetMapping("/api/users")</code>
              </td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                <code>app/api/users/route.ts</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

// 关于页面 - app/about/page.tsx
export function AboutPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>关于我们</h1>
      <p>这是一个静态页面示例</p>
      <a href="/">← 返回首页</a>
    </main>
  );
}

// 动态博客页面 - app/posts/[slug]/page.tsx
export function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>博客文章</h1>
      <p>文章ID: {params.slug}</p>
      <p>这是动态路由的示例，URL中的参数会被自动解析</p>
      <a href="/">← 返回首页</a>
    </main>
  );
}