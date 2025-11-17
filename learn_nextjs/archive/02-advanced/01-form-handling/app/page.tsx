import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Next.js 表单处理与验证</h1>
        
        <p className="text-lg mb-8">
          本模块探讨 Next.js 中的表单处理与验证最佳实践，从基础表单到高级表单处理和服务端验证。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/basic-forms" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-bold mb-2">基础表单处理</h2>
            <p className="text-gray-600">
              学习受控组件和非受控组件的基本概念和实现方式。
            </p>
          </Link>
          
          <Link href="/advanced-forms" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-bold mb-2">高级表单处理</h2>
            <p className="text-gray-600">
              使用 React Hook Form 和 Zod 进行表单状态管理和验证。
            </p>
          </Link>
          
          <Link href="/server-validation" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-bold mb-2">服务端验证</h2>
            <p className="text-gray-600">
              使用 Next.js Server Actions 实现服务端表单验证。
            </p>
          </Link>
        </div>
        
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-bold mb-4">学习要点</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>理解表单处理的基本概念和最佳实践</li>
            <li>对比受控组件与非受控组件的异同</li>
            <li>学习使用 React Hook Form 简化表单状态管理</li>
            <li>掌握 Zod 进行类型安全的表单验证</li>
            <li>实现服务端表单验证和错误处理</li>
            <li>使用 Server Actions 进行表单提交</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 