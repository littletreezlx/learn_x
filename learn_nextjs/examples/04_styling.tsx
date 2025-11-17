/**
 * 04_styling.tsx - Next.js 样式系统
 *
 * 学习目标：
 * - 掌握多种样式方案
 * - 理解 CSS Modules
 * - 使用 Tailwind CSS
 * - 全局样式管理
 */

import styles from './styles.module.css';

// 使用 CSS Modules 的组件
export function StyledCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>CSS Modules 示例</h2>
      <p className={styles.content}>
        CSS Modules 为每个组件生成唯一的类名，避免样式冲突
      </p>
      <button className={styles.button}>点击我</button>
    </div>
  );
}

// 使用 Tailwind CSS 的组件
export function TailwindCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Tailwind CSS 示例
      </h2>
      <p className="text-gray-600 mb-4">
        Tailwind CSS 提供了原子化的CSS类，快速构建样式
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        点击我
      </button>
    </div>
  );
}

// 内联样式示例（适用于动态样式）
export function InlineStyleExample() {
  const isHighlighted = true;

  return (
    <div style={{
      backgroundColor: isHighlighted ? '#fff3cd' : '#f8f9fa',
      border: `2px solid ${isHighlighted ? '#ffc107' : '#dee2e6'}`,
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <p style={{
        color: isHighlighted ? '#856404' : '#495057',
        fontWeight: isHighlighted ? 'bold' : 'normal'
      }}>
        内联样式适合需要动态计算的样式值
      </p>
    </div>
  );
}

// 完整的页面示例
export default function StylingPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Next.js 样式系统
      </h1>

      {/* 样式对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>样式方案对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>方案</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>特点</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>类似技术</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>CSS Modules</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>局部作用域，避免冲突</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>类似 Vue Scoped CSS</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Tailwind CSS</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>原子化CSS，快速开发</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>类似 Bootstrap</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>CSS-in-JS</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>-JavaScript中写CSS</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>-类似 JSS</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 示例展示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h3>CSS Modules 示例</h3>
          <StyledCard />
        </div>

        <div>
          <h3>Tailwind CSS 示例</h3>
          <TailwindCard />
        </div>

        <div>
          <h3>内联样式示例</h3>
          <InlineStyleExample />
        </div>
      </div>

      {/* 响应式设计示例 */}
      <div style={{
        background: '#e8f4f8',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2>响应式设计</h2>
        <p>Next.js 配合 Tailwind 可以轻松实现响应式：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-4 rounded shadow">
              项目 {i}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}