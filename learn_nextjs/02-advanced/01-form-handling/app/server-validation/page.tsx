'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { submitUserData } from './actions';

export default function ServerValidationPage() {
  const [apiResponse, setApiResponse] = useState<null | {
    status: 'success' | 'error';
    data?: any;
    message?: string;
  }>(null);
  
  // 使用useFormState来处理服务器响应
  const initialState = { errors: {}, message: '' };
  const [state, formAction] = useFormState(submitUserData, initialState);

  // 处理提交成功
  const handleSuccess = (data: any) => {
    setApiResponse({
      status: 'success',
      data
    });
    
    // 5秒后清除成功提示
    setTimeout(() => {
      setApiResponse(null);
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">服务端表单验证</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Server Actions 表单处理示例
          </h2>
          
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h3 className="font-semibold text-yellow-800">Server Actions 特点:</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-yellow-700">
              <li>表单验证在服务器端执行</li>
              <li>无需单独创建API端点</li>
              <li>开箱即用的CSRF保护</li>
              <li>可以直接访问数据库和服务器资源</li>
              <li>适合处理敏感数据和复杂验证逻辑</li>
            </ul>
          </div>
          
          <form action={async (formData) => {
            const result = await submitUserData(initialState, formData);
            if (!result.errors || Object.keys(result.errors).length === 0) {
              handleSuccess(result.data);
            }
          }} className="space-y-6">
            {/* 用户名字段 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名 <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${
                  state.errors?.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {state.errors?.username && (
                <p className="mt-1 text-sm text-red-600">{state.errors.username}</p>
              )}
            </div>
            
            {/* 电子邮件字段 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                电子邮件 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md ${
                  state.errors?.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>
            
            {/* 密码字段 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`w-full px-3 py-2 border rounded-md ${
                  state.errors?.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {state.errors?.password && (
                <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                密码必须至少包含8个字符，且包含大小写字母、数字和特殊字符。
              </p>
            </div>
            
            {/* 确认密码字段 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                确认密码 <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`w-full px-3 py-2 border rounded-md ${
                  state.errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {state.errors?.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword}</p>
              )}
            </div>
            
            {/* 角色选择字段 */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                用户角色 <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                className={`w-full px-3 py-2 border rounded-md ${
                  state.errors?.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">选择角色...</option>
                <option value="user">普通用户</option>
                <option value="editor">编辑</option>
                <option value="admin">管理员</option>
              </select>
              {state.errors?.role && (
                <p className="mt-1 text-sm text-red-600">{state.errors.role}</p>
              )}
            </div>
            
            {/* 条款与条件 */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  我同意条款和条件 <span className="text-red-500">*</span>
                </label>
                {state.errors?.terms && (
                  <p className="mt-1 text-sm text-red-600">{state.errors.terms}</p>
                )}
              </div>
            </div>
            
            {/* 全局表单错误 */}
            {state.message && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {state.message}
              </div>
            )}
            
            {/* 提交按钮 */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                注册账户
              </button>
            </div>
          </form>
          
          {/* 成功响应 */}
          {apiResponse?.status === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
              <h3 className="font-semibold mb-2">注册成功!</h3>
              <pre className="bg-green-100 p-3 rounded-md overflow-auto text-sm">
                {JSON.stringify(apiResponse.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <Link 
            href="/advanced-forms" 
            className="text-blue-600 hover:underline"
          >
            ← 高级表单处理
          </Link>
        </div>
      </div>
    </div>
  );
} 