import Link from 'next/link';
import Image from "next/image";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'not-started';
  path: string;
  estimatedTime: string;
}

const learningModules: LearningModule[] = [
  {
    id: 'pages-routing',
    title: '页面与路由',
    description: '学习基于文件系统的路由、动态路由和导航',
    level: 'basic',
    status: 'completed',
    path: '/fundamentals/pages-routing',
    estimatedTime: '2小时'
  },
  {
    id: 'react-basics',
    title: 'React 基础',
    description: '组件、Props、State、Hooks等React核心概念',
    level: 'basic', 
    status: 'completed',
    path: '/fundamentals/react-basics',
    estimatedTime: '3小时'
  },
  {
    id: 'data-fetching',
    title: '数据获取',
    description: '预渲染、SSG、SSR、ISR等数据获取策略',
    level: 'basic',
    status: 'completed', 
    path: '/fundamentals/data-fetching',
    estimatedTime: '2.5小时'
  },
  {
    id: 'styling',
    title: '样式与资源',
    description: 'CSS模块、Tailwind CSS、静态资源优化',
    level: 'basic',
    status: 'completed',
    path: '/fundamentals/styling',
    estimatedTime: '2小时'
  },
  {
    id: 'components',
    title: '服务器与客户端组件',
    description: 'React Server Components与客户端组件的使用',
    level: 'intermediate',
    status: 'completed',
    path: '/fundamentals/components',
    estimatedTime: '3小时'
  },
  {
    id: 'forms',
    title: '表单处理与验证',
    description: 'React Hook Form、Zod验证、Server Actions',
    level: 'intermediate',
    status: 'in-progress',
    path: '/advanced/forms',
    estimatedTime: '4小时'
  },
  {
    id: 'auth',
    title: '认证与授权',
    description: 'NextAuth.js、JWT、角色权限系统',
    level: 'intermediate',
    status: 'not-started',
    path: '/advanced/auth',
    estimatedTime: '5小时'
  },
  {
    id: 'database',
    title: '数据库集成',
    description: 'Prisma ORM、数据建模、CRUD操作',
    level: 'advanced',
    status: 'not-started',
    path: '/advanced/database',
    estimatedTime: '6小时'
  }
];

export default function Home() {
  const basicModules = learningModules.filter(m => m.level === 'basic');
  const intermediateModules = learningModules.filter(m => m.level === 'intermediate');
  const advancedModules = learningModules.filter(m => m.level === 'advanced');
  
  const completedCount = learningModules.filter(m => m.status === 'completed').length;
  const totalCount = learningModules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={200}
              height={42}
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js 全栈开发学习项目
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            系统化学习Next.js全栈开发，从基础概念到实战项目，构建现代Web应用的完整技能栈
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>学习进度</span>
              <span>{completedCount}/{totalCount} 模块</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              已完成 {progressPercentage}%
            </p>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="space-y-12">
          {/* Basic Level */}
          <LearningSection
            title="基础阶段"
            description="掌握Next.js和React的核心概念"
            modules={basicModules}
            color="green"
          />

          {/* Intermediate Level */}
          <LearningSection
            title="进阶阶段"
            description="学习更复杂的功能和最佳实践"
            modules={intermediateModules}
            color="blue"
          />

          {/* Advanced Level */}
          <LearningSection
            title="高级阶段"
            description="深入全栈开发和生产环境优化"
            modules={advancedModules}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            快速开始
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fundamentals/pages-routing"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始学习
            </Link>
            <Link
              href="/projects"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              查看项目
            </Link>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              官方文档
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LearningSectionProps {
  title: string;
  description: string;
  modules: LearningModule[];
  color: 'green' | 'blue' | 'purple';
}

function LearningSection({ title, description, modules, color }: LearningSectionProps) {
  const colorClasses = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', 
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
  };

  return (
    <div className={`rounded-lg border-2 p-6 ${colorClasses[color]}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: LearningModule }) {
  const statusConfig = {
    completed: { 
      icon: '✅', 
      text: '已完成', 
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
    },
    'in-progress': { 
      icon: '🔄', 
      text: '进行中', 
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' 
    },
    'not-started': { 
      icon: '⭐', 
      text: '未开始', 
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400' 
    }
  };

  const status = statusConfig[module.status];

  return (
    <Link href={module.path}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-lg">{status.icon}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
            {status.text}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {module.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {module.description}
        </p>
        
        <div className="text-xs text-gray-500 dark:text-gray-500">
          预计时间: {module.estimatedTime}
        </div>
      </div>
    </Link>
  );
}
