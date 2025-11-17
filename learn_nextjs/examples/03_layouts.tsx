/**
 * 03_layouts.tsx - Next.js 布局系统
 *
 * 学习目标：
 * - 理解 Next.js 的布局组件
 * - 创建共享的导航和页脚
 * - 掌握布局的继承机制
 *
 * 文件结构：
 * app/
 * ├── layout.tsx            → 根布局（所有页面共享）
 * ├── page.tsx             → 首页
 * ├── dashboard/
 * │   ├── layout.tsx       → 仪表板布局（继承根布局）
 * │   └── page.tsx         → 仪表板首页
 */

import Link from 'next/link';

// 根布局 - app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body style={{
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa'
      }}>
        <header style={{
          background: '#2c3e50',
          color: 'white',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
            MyApp
          </Link>
          <nav>
            <Link href="/" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>
              首页
            </Link>
            <Link href="/dashboard" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>
              仪表板
            </Link>
          </nav>
        </header>

        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          {children}
        </main>

        <footer style={{
          background: '#34495e',
          color: 'white',
          textAlign: 'center',
          padding: '1rem'
        }}>
          <p>&copy; 2025 MyApp. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

// 仪表板布局 - app/dashboard/layout.tsx
export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <aside style={{
        width: '250px',
        background: '#ecf0f1',
        padding: '1rem',
        borderRight: '1px solid #bdc3c7'
      }}>
        <h3>仪表板菜单</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: '#2c3e50' }}>
              概览
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/dashboard/analytics" style={{ textDecoration: 'none', color: '#2c3e50' }}>
              分析
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/dashboard/settings" style={{ textDecoration: 'none', color: '#2c3e50' }}>
              设置
            </Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}

// 仪表板首页 - app/dashboard/page.tsx
export function DashboardPage() {
  return (
    <div>
      <h1>仪表板概览</h1>
      <p>这里是仪表板的主要内容区域</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>用户数</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>1,234</p>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>订单数</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>567</p>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>收入</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>¥89,012</p>
        </div>
      </div>
    </div>
  );
}