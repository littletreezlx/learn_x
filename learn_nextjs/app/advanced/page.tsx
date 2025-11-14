import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '进阶阶段 - Next.js 学习',
  description: '学习更复杂的功能和最佳实践',
};

interface Module {
  id: string;
  title: string;
  description: string;
  path: string;
  topics: string[];
  estimatedTime: string;
  status: 'completed' | 'in-progress' | 'not-started';
  difficulty: 'intermediate' | 'advanced';
}

const modules: Module[] = [
  {
    id: 'forms',
    title: '表单处理与验证',
    description: 'React Hook Form、Zod 验证、Server Actions',
    path: '/advanced/forms',
    topics: ['受控组件', 'React Hook Form', 'Zod 验证', 'Server Actions', '错误处理'],
    estimatedTime: '4小时',
    status: 'in-progress',
    difficulty: 'intermediate',
  },
  {
    id: 'auth',
    title: '认证与授权',
    description: 'NextAuth.js、JWT、角色权限系统',
    path: '/advanced/auth',
    topics: ['NextAuth.js', 'JWT 认证', 'OAuth 登录', '权限控制', 'Session 管理'],
    estimatedTime: '5小时',
    status: 'not-started',
    difficulty: 'intermediate',
  },
  {
    id: 'database',
    title: '数据库集成',
    description: 'Prisma ORM、数据建模、CRUD 操作',
    path: '/advanced/database',
    topics: ['Prisma ORM', '数据建模', 'CRUD 操作', '关系查询', '事务处理'],
    estimatedTime: '6小时',
    status: 'not-started',
    difficulty: 'advanced',
  },
  {
    id: 'api-routes',
    title: 'API 路由与后端开发',
    description: 'Route Handlers、REST API、错误处理',
    path: '/advanced/api-routes',
    topics: ['Route Handlers', 'REST API', '中间件', '错误处理', 'API 验证'],
    estimatedTime: '4小时',
    status: 'not-started',
    difficulty: 'intermediate',
  },
  {
    id: 'testing',
    title: '测试与调试',
    description: 'Jest、React Testing Library、E2E 测试',
    path: '/advanced/testing',
    topics: ['单元测试', '组件测试', 'E2E 测试', '测试覆盖率', '调试技巧'],
    estimatedTime: '5小时',
    status: 'not-started',
    difficulty: 'advanced',
  },
  {
    id: 'optimization',
    title: '性能优化',
    description: '代码分割、图片优化、缓存策略',
    path: '/advanced/optimization',
    topics: ['代码分割', '图片优化', '缓存策略', 'Bundle 分析', 'SEO 优化'],
    estimatedTime: '4小时',
    status: 'not-started',
    difficulty: 'advanced',
  },
];

export default function AdvancedPage() {
  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const inProgressCount = modules.filter((m) => m.status === 'in-progress').length;
  const totalCount = modules.length;
  const progressPercentage = Math.round(
    ((completedCount + inProgressCount * 0.5) / totalCount) * 100
  );

  const intermediateModules = modules.filter((m) => m.difficulty === 'intermediate');
  const advancedModules = modules.filter((m) => m.difficulty === 'advanced');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-blue-900">
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
            进阶阶段
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            学习更复杂的功能和最佳实践，包括表单处理、认证授权、数据库集成、
            API 开发、测试和性能优化等全栈开发核心技能。
          </p>

          {/* Progress */}
          <div className="mt-8 max-w-md">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>完成进度</span>
              <span>
                {completedCount} 完成 / {inProgressCount} 进行中 / {totalCount} 总数
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="mr-2">⚠️</span>
            学习前提
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            开始进阶学习前，请确保已完成基础阶段的所有模块：
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>掌握 Next.js 路由系统和页面创建</li>
            <li>熟悉 React 组件、Props 和 Hooks</li>
            <li>理解服务器组件和客户端组件的区别</li>
            <li>了解数据获取和渲染策略</li>
          </ul>
        </div>

        {/* Intermediate Modules */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              中级模块
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              进一步提升开发技能，学习常用的高级功能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Advanced Modules */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              高级模块
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              深入全栈开发和生产环境优化
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            进阶学习建议
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                实践导向
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                每个模块都要配合实际项目练习，理论与实践相结合
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="mr-2">🔗</span>
                系统思考
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                理解各个模块之间的关联，构建完整的技术体系
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="mr-2">📖</span>
                查阅文档
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                养成查阅官方文档的习惯，深入理解技术细节
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <span className="mr-2">💡</span>
                最佳实践
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                学习业界最佳实践，写出高质量的生产级代码
              </p>
            </div>
          </div>
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

  const difficultyConfig = {
    intermediate: {
      label: '中级',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    advanced: {
      label: '高级',
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    },
  };

  const status = statusConfig[module.status];
  const difficulty = difficultyConfig[module.difficulty];

  return (
    <Link href={module.path}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-2xl">{status.icon}</span>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.className}`}>
              {difficulty.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
              {status.text}
            </span>
          </div>
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
