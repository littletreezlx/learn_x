/**
 * 06_assets.tsx - Next.js 静态资源管理
 *
 * 学习目标：
 * - 掌握图片优化
 * - 理解静态资源处理
 * - 使用字体和图标
 * - 了解资源加载优化
 */

import Image from 'next/image';

// 模拟图片数据（实际项目中这些应该是真实图片）
const sampleImages = [
  {
    id: 1,
    title: 'Hero Banner',
    width: 1200,
    height: 400,
    description: '网站横幅图片'
  },
  {
    id: 2,
    title: 'Product Image',
    width: 400,
    height: 400,
    description: '产品展示图片'
  },
  {
    id: 3,
    title: 'User Avatar',
    width: 100,
    height: 100,
    description: '用户头像'
  }
];

export default function AssetsPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js 静态资源管理</h1>

      {/* 资源管理对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>资源管理对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>资源类型</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Next.js 处理</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>-Spring Boot 对比</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>图片</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>自动优化、WebP转换、懒加载</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>static resources + 手动优化</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>字体</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Google Fonts 自动优化</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@font-face + 手动配置</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>静态文件</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>public/ 目录直接访问</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>-src/main/resources/static</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Next.js Image 组件示例 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Next.js Image 组件</h2>
        <div style={{ background: '#e8f5e8', padding: '1rem', borderRadius: '8px' }}>
          <h3>Image 组件的优势</h3>
          <ul>
            <li>✅ 自动优化图片格式（WebP、AVIF）</li>
            <li>✅ 响应式图片生成</li>
            <li>✅ 懒加载支持</li>
            <li>✅ 防止布局偏移</li>
            <li>✅ 更好的 Core Web Vitals</li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4>代码示例：</h4>
          <pre style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`import Image from 'next/image';

// 基础用法
<Image
  src="/hero-banner.jpg"
  alt="网站横幅"
  width={1200}
  height={400}
  priority  // 首屏重要图片
/>

// 响应式图片
<Image
  src="/product-image.jpg"
  alt="产品图片"
  sizes="(max-width: 768px) 100vw, 50vw"
  fill
  style={{ objectFit: 'cover' }}
/>`}
          </pre>
        </div>
      </section>

      {/* 图片展示区 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>图片展示示例</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {sampleImages.map(img => (
            <div key={img.id} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              {/* 模拟图片容器 */}
              <div style={{
                width: '100%',
                height: '200px',
                background: `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)}40, #${Math.floor(Math.random()*16777215).toString(16)}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem',
                borderRadius: '4px'
              }}>
                <span style={{ color: '#666' }}>图片 {img.id}</span>
              </div>

              <h4>{img.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{img.description}</p>
              <p style={{ fontSize: '0.8rem', color: '#999' }}>
                尺寸: {img.width} × {img.height}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 字体和图标 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>字体和图标</h2>

        <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <h3>字体加载策略</h3>
          <ul>
            <li>Google Fonts: 使用 next/font 自动优化</li>
            <li>本地字体: 放在 styles/ 目录中</li>
            <li>字体预加载: 使用 preload 优化首屏</li>
          </ul>
        </div>

        <div style={{ background: '#e7f3ff', padding: '1rem', borderRadius: '8px' }}>
          <h3>图标解决方案</h3>
          <ul>
            <li>SVG 图标: 内联或组件化</li>
            <li>字体图标: Font Awesome、Heroicons</li>
            <li>Emoji: 直接使用 unicode</li>
          </ul>
        </div>
      </section>

      {/* 静态文件处理 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>静态文件处理</h2>

        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <h3>public/ 目录结构</h3>
          <pre style={{
            background: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
{`public/
├── images/          # 图片资源
├── icons/           # 图标文件
├── fonts/           # 字体文件
├── robots.txt       # SEO配置
├── sitemap.xml      # 站点地图
└── favicon.ico      # 网站图标`}
          </pre>

          <p style={{ marginTop: '1rem' }}>
            <strong>访问方式：</strong> public/ 目录下的文件可以直接通过根路径访问
          </p>
          <p>
            <code>public/images/logo.png</code> → <code>https://yourdomain.com/images/logo.png</code>
          </p>
        </div>
      </section>

      {/* 性能优化提示 */}
      <div style={{
        background: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <h3 style={{ color: '#155724' }}>性能优化提示</h3>
        <ul style={{ color: '#155724' }}>
          <li>✅ 使用 next/image 而不是普通的 img 标签</li>
          <li>✅ 为首屏图片添加 priority 属性</li>
          <li>✅ 合理设置图片尺寸，避免布局偏移</li>
          <li>✅ 使用现代图片格式（WebP、AVIF）</li>
          <li>✅ 优化字体加载，避免 FOIT/FOUT</li>
          <li>✅ 压缩静态资源，减少文件大小</li>
        </ul>
      </div>
    </main>
  );
}