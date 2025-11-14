import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '实战项目 - Next.js 学习',
  description: '通过实战项目整合所学知识',
};

interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  status: 'completed' | 'in-progress' | 'planned';
  path?: string;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 'personal-blog',
    title: '个人博客系统',
    description: '一个功能完整的个人博客网站，包含文章列表、详情、分类、标签等功能',
    features: [
      '文章列表与详情页',
      '分类和标签筛选',
      '搜索功能',
      'Markdown 渲染',
      '响应式设计',
      'SEO 优化',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    difficulty: 'beginner',
    estimatedTime: '8-10小时',
    status: 'completed',
    path: '/projects/personal-blog',
  },
  {
    id: 'task-manager',
    title: '任务管理系统',
    description: '全栈任务管理应用，支持用户认证、任务 CRUD、状态管理等',
    features: [
      '用户注册与登录',
      '任务增删改查',
      '任务状态跟踪',
      '优先级标记',
      '截止日期提醒',
      '数据持久化',
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    difficulty: 'intermediate',
    estimatedTime: '15-20小时',
    status: 'in-progress',
    path: '/projects/task-manager',
  },
  {
    id: 'ecommerce-platform',
    title: '电商平台',
    description: '完整的电商解决方案，包含商品管理、购物车、订单、支付等功能',
    features: [
      '商品展示与搜索',
      '购物车管理',
      '用户订单系统',
      '支付集成',
      '库存管理',
      '订单追踪',
      '管理后台',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Stripe',
      'Redis',
    ],
    difficulty: 'advanced',
    estimatedTime: '40-50小时',
    status: 'planned',
  },
  {
    id: 'social-media',
    title: '社交媒体应用',
    description: '类似 Twitter 的社交媒体平台，支持发帖、评论、点赞、关注等',
    features: [
      '用户认证与个人资料',
      '发布动态',
      '评论与点赞',
      '关注与粉丝',
      '实时通知',
      '图片上传',
      '无限滚动',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'WebSocket',
      'AWS S3',
    ],
    difficulty: 'advanced',
    estimatedTime: '50-60小时',
    status: 'planned',
  },
  {
    id: 'analytics-dashboard',
    title: '数据分析仪表板',
    description: '数据可视化仪表板，展示各类图表和统计信息',
    features: [
      '多种图表类型',
      '实时数据更新',
      '数据筛选',
      '导出报表',
      '响应式布局',
      '暗黑模式',
    ],
    techStack: ['Next.js', 'TypeScript', 'Chart.js', 'TanStack Table', 'Tailwind CSS'],
    difficulty: 'intermediate',
    estimatedTime: '12-15小时',
    status: 'planned',
  },
  {
    id: 'learning-platform',
    title: '在线学习平台',
    description: '课程学习平台，包含课程管理、视频播放、进度跟踪等',
    features: [
      '课程列表与详情',
      '视频播放器',
      '学习进度跟踪',
      '笔记功能',
      '课程评价',
      '证书生成',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Video.js',
      'PDF.js',
    ],
    difficulty: 'advanced',
    estimatedTime: '45-55小时',
    status: 'planned',
  },
];

export default function ProjectsPage() {
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const inProgressProjects = projects.filter((p) => p.status === 'in-progress');
  const plannedProjects = projects.filter((p) => p.status === 'planned');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
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
            实战项目
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            通过构建真实项目来巩固所学知识。每个项目都涵盖多个技术点，
            帮助你将理论知识转化为实际开发能力。
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedProjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">已完成</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {inProgressProjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">进行中</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plannedProjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">计划中</div>
            </div>
          </div>
        </div>

        {/* Projects by Status */}
        <div className="space-y-12">
          {/* Completed Projects */}
          {completedProjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                已完成项目
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* In Progress Projects */}
          {inProgressProjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                进行中项目
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgressProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Planned Projects */}
          {plannedProjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                计划中项目
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plannedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Project Selection Guide */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            项目选择指南
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🟢</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">初级项目</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                适合刚完成基础阶段的学习者，专注于核心功能实现
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🟡</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">中级项目</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                涉及数据库、认证等进阶功能，需要一定全栈开发经验
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🔴</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">高级项目</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                复杂的全栈应用，包含多个高级特性和性能优化
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
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
    planned: {
      icon: '📋',
      text: '计划中',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
  };

  const difficultyConfig = {
    beginner: {
      label: '初级',
      icon: '🟢',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    intermediate: {
      label: '中级',
      icon: '🟡',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    advanced: {
      label: '高级',
      icon: '🔴',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
  };

  const status = statusConfig[project.status];
  const difficulty = difficultyConfig[project.difficulty];

  const CardContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{status.icon}</span>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.className}`}>
            {difficulty.icon} {difficulty.label}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">核心功能</h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="mr-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
          {project.features.length > 4 && (
            <li className="text-gray-500 dark:text-gray-500">
              还有 {project.features.length - 4} 项功能...
            </li>
          )}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mt-auto">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
            预计时间: {project.estimatedTime}
          </div>
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (project.path) {
    return (
      <Link href={project.path}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
