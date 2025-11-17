/**
 * 05_data_basic.tsx - Next.js 基础数据获取
 *
 * 学习目标：
 * - 理解服务端组件 vs 客户端组件
 * - 掌握基础的数据获取方法
 * - 了解静态生成 vs 服务端渲染
 */

import Link from 'next/link';

// 模拟数据
const posts = [
  { id: 1, title: 'Next.js 13 新特性', content: 'App Router 带来的变革...', category: '技术' },
  { id: 2, title: 'React Server Components', content: '服务器组件的核心概念...', category: '技术' },
  { id: 3, title: '全栈开发实践', content: '从零构建全栈应用...', category: '教程' }
];

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' }
];

// 服务端组件示例（默认）
// 在服务器上渲染，不能使用 useState, useEffect 等 React Hooks
export default function DataFetchingPage() {
  // 这里可以直接执行异步操作，会在服务器上运行
  const currentTime = new Date().toLocaleString('zh-CN');

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js 数据获取基础</h1>
      <p>服务器渲染时间: {currentTime}</p>

      {/* 数据获取对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>渲染模式对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>渲染模式</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>执行时机</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>类似概念</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SSR (服务端渲染)</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>请求时渲染</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Spring MVC 视图</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>动态内容页面</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SSG (静态生成)</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>构建时生成</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>静态 HTML 文件</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>文档、博客等</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>CSR (客户端渲染)</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>浏览器中渲染</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SPA 单页应用</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>交互复杂的应用</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 静态数据展示 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>静态文章列表</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map(post => (
            <article key={post.id} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h3>{post.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>分类: {post.category}</p>
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 用户数据展示 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>用户数据</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #dee2e6' }}>ID</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #dee2e6' }}>姓名</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #dee2e6' }}>邮箱</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #dee2e6' }}>角色</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ padding: '0.5rem', border: '1px solid #dee2e6' }}>{user.id}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #dee2e6' }}>{user.name}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #dee2e6' }}>{user.email}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #dee2e6' }}>
                    <span style={{
                      background: user.role === 'admin' ? '#28a745' : '#6c757d',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem'
                    }}>
                      {user.role === 'admin' ? '管理员' : '普通用户'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 下一步提示 */}
      <div style={{
        background: '#e3f2fd',
        padding: '1rem',
        borderRadius: '8px',
        borderLeft: '4px solid #2196f3'
      }}>
        <h3>下一步学习</h3>
        <ul>
          <li><Link href="/examples/06_assets.tsx">静态资源管理</Link></li>
          <li><Link href="/examples/07_components.tsx">组件系统详解</Link></li>
          <li><Link href="/examples/10_data_advanced.tsx">高级数据获取</Link></li>
        </ul>
      </div>
    </main>
  );
}

// 客户端组件示例
// 'use client' 指令表示这是一个客户端组件
export function ClientComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{
      background: '#fff3cd',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h3>客户端组件</h3>
      <p>计数器: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          background: '#ffc107',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        点击增加
      </button>
      <p style={{ fontSize: '0.9rem', color: '#856404' }}>
        这个组件使用 useState，只能在客户端运行
      </p>
    </div>
  );
}