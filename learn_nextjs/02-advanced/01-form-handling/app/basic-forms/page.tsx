'use client';

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';

/**
 * 基础表单示例页面
 * 
 * 演示React中的受控组件和非受控组件两种表单处理方式
 */
export default function BasicFormsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">基础表单处理</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">受控组件</h2>
          <p className="mb-4 text-gray-600">
            表单数据由React state控制，每次输入都会触发状态更新
          </p>
          <ControlledForm />
        </div>
        
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">非受控组件</h2>
          <p className="mb-4 text-gray-600">
            表单数据由DOM自身管理，提交时通过ref获取值
          </p>
          <UncontrolledForm />
        </div>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/advanced-forms" 
          className="text-blue-600 hover:underline"
        >
          下一步：高级表单处理 →
        </Link>
      </div>
    </div>
  );
}

/**
 * 受控组件表单示例
 * 
 * 特点：
 * - 表单数据存储在React状态中
 * - 每次输入都会更新状态
 * - 可以随时访问和验证表单数据
 * - 适合需要即时反馈的表单
 */
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  // 处理输入变化，更新状态
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 表单提交处理
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('提交的数据(受控):', formData);
    setSubmitted(true);
    
    // 5秒后重置表单
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="controlled-name" className="block text-sm font-medium mb-1">
          姓名
        </label>
        <input
          id="controlled-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label htmlFor="controlled-email" className="block text-sm font-medium mb-1">
          邮箱
        </label>
        <input
          id="controlled-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label htmlFor="controlled-message" className="block text-sm font-medium mb-1">
          留言
        </label>
        <textarea
          id="controlled-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          提交
        </button>
      </div>
      
      {submitted && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          表单已提交! 查看控制台获取详情。
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <h3 className="font-semibold">当前表单值:</h3>
        <pre className="mt-1 p-2 bg-gray-100 rounded overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </form>
  );
}

/**
 * 非受控组件表单示例
 * 
 * 特点：
 * - 表单数据存储在DOM中
 * - 使用ref获取表单值
 * - 较少的重新渲染
 * - 适合简单的表单或性能敏感场景
 */
function UncontrolledForm() {
  // 创建refs来访问表单元素
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // 表单提交处理
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 使用ref获取表单值
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || ''
    };
    
    console.log('提交的数据(非受控):', formData);
    setSubmitted(true);
    
    // 5秒后重置表单
    setTimeout(() => {
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="uncontrolled-name" className="block text-sm font-medium mb-1">
          姓名
        </label>
        <input
          id="uncontrolled-name"
          type="text"
          name="name"
          ref={nameRef}
          className="w-full px-3 py-2 border rounded-md"
          defaultValue=""
          required
        />
      </div>
      
      <div>
        <label htmlFor="uncontrolled-email" className="block text-sm font-medium mb-1">
          邮箱
        </label>
        <input
          id="uncontrolled-email"
          type="email"
          name="email"
          ref={emailRef}
          className="w-full px-3 py-2 border rounded-md"
          defaultValue=""
          required
        />
      </div>
      
      <div>
        <label htmlFor="uncontrolled-message" className="block text-sm font-medium mb-1">
          留言
        </label>
        <textarea
          id="uncontrolled-message"
          name="message"
          ref={messageRef}
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
          defaultValue=""
          required
        />
      </div>
      
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          提交
        </button>
      </div>
      
      {submitted && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          表单已提交! 查看控制台获取详情。
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <h3 className="font-semibold">注意:</h3>
        <p>非受控组件不会在每次输入时更新状态，只在提交时获取值</p>
      </div>
    </form>
  );
} 