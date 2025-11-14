import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '基础阶段 - Next.js 学习',
  description: '掌握 Next.js 和 React 的核心概念',
};

interface Module {
  id: string;
  title: string;
  description: string;
  path: string;
  topics: string[];
  estimatedTime: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const modules: Module[] = [
  {
    id: 'pages-routing',
    title: '页面与路由基础',
    description: '学习基于文件系统的路由、动态路由和导航',
    path: '/fundamentals/pages-routing',
    topics: ['文件系统路由', '静态路由', '动态路由', '路由参数', 'Link 组件'],
    estimatedTime: '2小时',
    status: 'completed',
  },
  {
    id: 'react-basics',
    title: 'React 基础回顾',
    description: '组件、Props、State、Hooks 等 React 核心概念',
    path: '/fundamentals/react-basics',
    topics: ['组件与 JSX', 'Props 传递', 'State 管理', 'Hooks 使用', '事件处理'],
    estimatedTime: '3小时',
    status: 'completed',
  },
  {
    id: 'data-fetching',
    title: '数据获取与渲染',
    description: '预渲染、SSG、SSR、ISR 等数据获取策略',
    path: '/fundamentals/data-fetching',
    topics: ['服务端渲染', '静态生成', '增量静态再生成', '客户端获取', '缓存策略'],
    estimatedTime: '2.5小时',
    status: 'completed',
  },
  {
    id: 'styling',
    title: '样式与静态资源',
    description: 'CSS 模块、Tailwind CSS、静态资源优化',
    path: '/fundamentals/styling',
    topics: ['CSS Modules', 'Tailwind CSS', 'Image 组件', 'Font 优化', '布局组件'],
    estimatedTime: '2小时',
    status: 'completed',
  },
  {
    id: 'components',
    title: '服务器与客户端组件',
    description: 'React Server Components 与客户端组件的使用',
    path: '/fundamentals/components',
    topics: ['服务器组件', '客户端组件', '组件边界', '数据流', '最佳实践'],
    estimatedTime: '3小时',
    status: 'completed',
  },
  {
    id: 'routing-navigation',
    title: '路由系统与导航',
    description: '深入学习 App Router 的路由系统和导航实现',
    path: '/fundamentals/routing-navigation',
    topics: ['App Router', '布局系统', '导航钩子', '路由组', '并行路由'],
    estimatedTime: '2.5小时',
    status: 'completed',
  },
];

export default function FundamentalsPage() {
  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-2"
            >
              ← 返回首页
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            基础阶段
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            掌握 Next.js 和 React 的核心概念，建立坚实的知识基础。
            本阶段涵盖路由系统、组件开发、数据获取、样式管理等基础知识。
          </p>

          {/* Progress */}
          <div className="mt-8 max-w-md">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>完成进度</span>
              <span>
                {completedCount}/{totalCount} 模块
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* Learning Tips */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            学习建议
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>按照顺序学习各个模块，每个模块都是后续学习的基础</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔨</span>
              <span>每学完一个概念，立即动手实践，编写代码验证理解</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📝</span>
              <span>记录学习笔记，总结关键概念和易错点</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">❓</span>
              <span>遇到问题时，先查阅官方文档，理解核心原理</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const statusConfig = {
    completed: {
      icon: '✅',
      text: '已完成',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    'in-progress': {
      icon: '🔄',
      text: '进行中',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    'not-started': {
      icon: '⭐',
      text: '未开始',
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400',
    },
  };

  const status = statusConfig[module.status];

  return (
    <Link href={module.path}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-2xl">{status.icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
            {status.text}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {module.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {module.description}
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
            预计时间: {module.estimatedTime}
          </div>
          <div className="flex flex-wrap gap-1">
            {module.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
              >
                {topic}
              </span>
            ))}
            {module.topics.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                +{module.topics.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
