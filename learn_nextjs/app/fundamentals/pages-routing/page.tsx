import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '页面与路由基础 - Next.js 学习',
  description: '学习 Next.js 的文件系统路由、动态路由和导航',
};

export default function PagesRoutingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            首页
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            href="/fundamentals"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            基础阶段
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">页面与路由基础</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">📄</span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              页面与路由基础
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            学习 Next.js 基于文件系统的路由机制，掌握静态路由、动态路由和导航的核心概念
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1: 文件系统路由 */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. 文件系统路由
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Next.js 使用基于文件系统的路由，每个文件夹和文件都会自动映射为一个路由路径。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
└── blog/
    ├── page.tsx          → /blog
    └── [slug]/
        └── page.tsx      → /blog/[slug]`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>💡 关键点：</strong> page.tsx 文件定义路由的 UI，文件夹结构定义 URL 路径
              </p>
            </div>
          </section>

          {/* Section 2: 静态路由 */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. 静态路由
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              创建固定路径的页面，路径在构建时就已确定。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是一个静态路由页面</p>
    </div>
  );
}`}
              </pre>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              访问路径：<code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/about</code>
            </p>
          </section>

          {/* Section 3: 动态路由 */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. 动态路由
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              使用方括号 [param] 创建动态路由段，可以匹配任意值。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`// app/blog/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>博客文章</h1>
      <p>文章 ID: {params.slug}</p>
    </div>
  );
}`}
              </pre>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              访问路径示例：
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/blog/hello-world</code>
                → slug = "hello-world"
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/blog/nextjs-tutorial</code>
                → slug = "nextjs-tutorial"
              </li>
            </ul>
          </section>

          {/* Section 4: Link 导航 */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Link 组件导航
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              使用 Next.js 的 Link 组件实现客户端导航，无需页面刷新。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/about">关于</Link>
      <Link href="/blog/hello-world">博客</Link>
    </nav>
  );
}`}
              </pre>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>✅ 最佳实践：</strong> 使用 Link 组件而非 a 标签，享受预加载和快速导航
              </p>
            </div>
          </section>

          {/* Section 5: 路由参数 */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. 查询参数
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              使用 useSearchParams 钩子获取 URL 查询参数。
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`'use client';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return <div>搜索关键词: {query}</div>;
}`}
              </pre>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              访问路径：<code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/search?q=nextjs</code>
              → query = "nextjs"
            </p>
          </section>

          {/* Practice Section */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🔨 实践练习
            </h2>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-md p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  练习 1：创建个人简历网站
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  创建包含首页、关于、项目、联系等页面的简历网站
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  难度：⭐ 基础
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-md p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  练习 2：博客列表和详情
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  实现博客列表页和动态的文章详情页
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  难度：⭐⭐ 中等
                </p>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 参考资源
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nextjs.org/docs/app/building-your-application/routing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Next.js 官方文档 - Routing
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Next.js 官方文档 - Dynamic Routes
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/fundamentals"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← 返回基础阶段
          </Link>
          <Link
            href="/fundamentals/react-basics"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            下一课：React 基础 →
          </Link>
        </div>
      </div>
    </div>
  );
}
