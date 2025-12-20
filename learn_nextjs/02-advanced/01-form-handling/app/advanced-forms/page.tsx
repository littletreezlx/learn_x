'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

// 定义表单验证模式
const userFormSchema = z.object({
  name: z.string()
    .min(2, { message: '姓名至少需要2个字符' })
    .max(50, { message: '姓名不能超过50个字符' }),
  email: z.string()
    .email({ message: '请输入有效的邮箱地址' }),
  age: z.string()
    .refine((val) => !isNaN(Number(val)), { message: '年龄必须是数字' })
    .refine((val) => Number(val) >= 18 && Number(val) <= 120, { message: '年龄必须在18-120之间' }),
  website: z.string()
    .url({ message: '请输入有效的网址' })
    .optional()
    .or(z.literal('')), // 允许空字符串
  bio: z.string()
    .min(10, { message: '简介至少需要10个字符' })
    .max(500, { message: '简介不能超过500个字符' }),
  acceptTerms: z.boolean()
    .refine((val) => val === true, { message: '您必须接受条款和条件' })
});

// 从schema中推断表单数据类型
type UserFormData = z.infer<typeof userFormSchema>;

export default function AdvancedFormsPage() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  // 初始化React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: '',
      website: '',
      bio: '',
      acceptTerms: false
    }
  });

  // 处理表单提交
  const onSubmit = async (data: UserFormData) => {
    try {
      // 模拟API请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // 模拟成功响应
      console.log('表单提交成功:', data);
      setApiResponse(JSON.stringify(data, null, 2));
      reset();
    } catch (error) {
      console.error('提交表单时出错:', error);
      setApiResponse('提交表单时出错，请稍后再试');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">高级表单处理</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            React Hook Form + Zod 验证示例
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 姓名字段 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            {/* 邮箱字段 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            {/* 年龄字段 */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                年龄 <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                {...register('age')}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>
            
            {/* 网站字段（可选） */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                网站
              </label>
              <input
                id="website"
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${errors.website ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="https://example.com"
                {...register('website')}
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
              )}
            </div>
            
            {/* 简介字段 */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                简介 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
                {...register('bio')}
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>
            
            {/* 条款与条件 */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  className={`h-4 w-4 rounded border-gray-300 ${errors.acceptTerms ? 'border-red-500' : ''}`}
                  {...register('acceptTerms')}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                  我同意条款和条件 <span className="text-red-500">*</span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>
            
            {/* 提交按钮 */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? '提交中...' : '提交表单'}
              </button>
            </div>
          </form>
          
          {/* API响应 */}
          {apiResponse && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">提交结果:</h3>
              <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-sm">
                {apiResponse}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link 
            href="/basic-forms" 
            className="text-blue-600 hover:underline"
          >
            ← 基础表单处理
          </Link>
          <Link 
            href="/server-validation" 
            className="text-blue-600 hover:underline"
          >
            服务端验证 →
          </Link>
        </div>
      </div>
    </div>
  );
} 