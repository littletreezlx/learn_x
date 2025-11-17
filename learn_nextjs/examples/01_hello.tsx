/**
 * 01_hello.tsx - Next.js Hello World
 *
 * 学习目标：
 * - 理解 Next.js App Router 的基本结构
 * - 创建第一个页面组件
 * - 了解页面文件的基本语法
 *
 * 运行方式：
 * 1. 将此文件复制到 app/page.tsx
 * 2. 运行 npm run dev
 * 3. 访问 http://localhost:3000
 */

export default function HomePage() {
  return (
    <main style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>Hello, Next.js!</h1>
      <p>这是你的第一个 Next.js 页面 🎉</p>

      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>快速对比（Java开发者）</h2>
        <ul>
          <li><strong>Java Spring</strong>: 需要 @RestController 类 + @RequestMapping</li>
          <li><strong>Next.js</strong>: 直接导出一个函数组件即可</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>关键概念：</h3>
        <ol>
          <li><strong>文件即路由</strong>: app/page.tsx → /</li>
          <li><strong>组件即页面</strong>: 导出的默认函数就是页面内容</li>
          <li><strong>JSX语法</strong>: 类似HTML但写在JavaScript中</li>
        </ol>
      </div>
    </main>
  );
}