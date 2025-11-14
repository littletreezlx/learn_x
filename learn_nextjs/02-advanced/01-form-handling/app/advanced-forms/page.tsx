'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdvancedRegistrationForm, MultiStepForm } from '../../components/AdvancedForm';

export default function AdvancedFormsPage() {
  const [activeDemo, setActiveDemo] = useState<'registration' | 'multistep'>('registration');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          高级表单处理
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          使用 React Hook Form 和 Zod 实现复杂表单验证、多步骤表单和实时用户反馈
        </p>
      </div>

      {/* Demo 切换器 */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg max-w-md">
          <button
            onClick={() => setActiveDemo('registration')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeDemo === 'registration'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            完整注册表单
          </button>
          <button
            onClick={() => setActiveDemo('multistep')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeDemo === 'multistep'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            多步骤表单
          </button>
        </div>
      </div>

      {/* 功能特性说明 */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            📝 实时验证
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            使用 Zod 进行类型安全的表单验证，支持实时反馈和自定义验证规则
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
            🔒 密码强度
          </h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            动态密码强度指示器，帮助用户创建安全的密码
          </p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
            🚀 服务器验证
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            模拟异步服务器端验证，如邮箱唯一性检查
          </p>
        </div>
      </div>

      {/* Demo 内容 */}
      <div className="mb-8">
        {activeDemo === 'registration' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                完整注册表单示例
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                展示完整的用户注册流程，包含实时验证、密码强度检查、服务器端验证等高级功能
              </p>
            </div>
            <AdvancedRegistrationForm />
          </div>
        )}
        
        {activeDemo === 'multistep' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                多步骤表单示例
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                将复杂表单拆分为多个步骤，提升用户体验和完成率
              </p>
            </div>
            <MultiStepForm />
          </div>
        )}
      </div>

      {/* 技术要点 */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          技术要点
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">React Hook Form</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 高性能的表单状态管理</li>
              <li>• 最小化重新渲染</li>
              <li>• 灵活的验证策略</li>
              <li>• TypeScript 完全支持</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Zod 验证</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 类型安全的 schema 验证</li>
              <li>• 丰富的验证规则</li>
              <li>• 自定义验证函数</li>
              <li>• 优秀的错误信息</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="mb-8 bg-gray-900 text-white p-6 rounded-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">核心代码示例</h3>
        <pre className="text-sm">
{`// 使用 Zod 定义验证 schema
const userSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string()
    .min(8, '密码至少需要8个字符')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, '需包含大小写字母和数字'),
});

// 集成到 React Hook Form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(userSchema),
  mode: 'onChange', // 实时验证
});`}
        </pre>
      </div>

      {/* 导航链接 */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="/basic-forms" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 基础表单处理
        </Link>
        <Link 
          href="/server-validation" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          服务端验证 →
        </Link>
      </div>
    </div>
  );
} 