/**
 * 09_forms.tsx - React 表单处理
 *
 * 学习目标：
 * - 掌握受控组件
 * - 理解表单验证
 * - 使用 Server Actions
 * - 处理文件上传
 */

'use client';

import React, { useState, useActionState } from 'react';

// =============================================
// 受控组件示例
// =============================================

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  subscribe: boolean;
}

function ContactFormComponent() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    subscribe: false
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.message.trim()) {
      newErrors.message = '留言不能为空';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // 清除对应字段的错误
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('提交的数据:', formData);
      setSubmitted(true);

      // 重置表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subscribe: false
      });
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        background: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#155724' }}>✅ 提交成功！</h2>
        <p style={{ color: '#155724' }}>感谢您的留言，我们会尽快回复您。</p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          继续填写
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '600px'
    }}>
      <h2>联系我们</h2>

      {/* 姓名字段 */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>
          姓名 *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: `1px solid ${errors.name ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px'
          }}
        />
        {errors.name && (
          <p style={{ color: '#dc3545', fontSize: '0.875rem', margin: '0.25rem 0' }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* 邮箱字段 */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>
          邮箱 *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: `1px solid ${errors.email ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px'
          }}
        />
        {errors.email && (
          <p style={{ color: '#dc3545', fontSize: '0.875rem', margin: '0.25rem 0' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* 电话字段 */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>
          电话
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* 留言字段 */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="message" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>
          留言 *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: `1px solid ${errors.message ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
        {errors.message && (
          <p style={{ color: '#dc3545', fontSize: '0.875rem', margin: '0.25rem 0' }}>
            {errors.message}
          </p>
        )}
      </div>

      {/* 订阅复选框 */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleInputChange}
            style={{ marginRight: '0.5rem' }}
          />
          订阅我们的新闻通讯
        </label>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          background: isSubmitting ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          fontSize: '1rem'
        }}
      >
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
}

// =============================================
// Server Actions 示例
// =============================================

// 模拟 Server Action
async function submitUserAction(
  prevState: { message: string; success: boolean },
  formData: FormData
) {
  // 模拟服务器处理时间
  await new Promise(resolve => setTimeout(resolve, 1000));

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) {
    return {
      message: '请填写所有必填字段',
      success: false
    };
  }

  // 模拟成功处理
  return {
    message: `用户 ${name} (${email}) 已成功注册！`,
    success: true
  };
}

function ServerActionForm() {
  const [state, formAction, isPending] = useActionState(submitUserAction, {
    message: '',
    success: false
  });

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      maxWidth: '400px'
    }}>
      <h3>Server Actions 表单</h3>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        使用 Next.js 14+ 的 Server Actions 处理表单提交
      </p>

      <form action={formAction}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="server-name" style={{ display: 'block', marginBottom: '0.25rem' }}>
            姓名:
          </label>
          <input
            type="text"
            id="server-name"
            name="name"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="server-email" style={{ display: 'block', marginBottom: '0.25rem' }}>
            邮箱:
          </label>
          <input
            type="email"
            id="server-email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {isPending ? '处理中...' : '注册'}
        </button>
      </form>

      {state.message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem',
          borderRadius: '4px',
          background: state.success ? '#d4edda' : '#f8d7da',
          color: state.success ? '#155724' : '#721c24',
          border: `1px solid ${state.success ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {state.message}
        </div>
      )}
    </div>
  );
}

// =============================================
// 文件上传组件
// =============================================

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // 生成预览（仅对图片文件）
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');

    try {
      // 模拟文件上传
      const formData = new FormData();
      formData.append('file', selectedFile);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <h3>文件上传示例</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '0.5rem' }}>
          选择文件:
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileSelect}
          accept="image/*"
          style={{ marginBottom: '1rem' }}
        />
      </div>

      {selectedFile && (
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>选中的文件:</strong> {selectedFile.name}</p>
          <p><strong>文件大小:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
          <p><strong>文件类型:</strong> {selectedFile.type}</p>

          {preview && (
            <div style={{ marginTop: '1rem' }}>
              <strong>预览:</strong>
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '0.5rem', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploadStatus === 'uploading'}
        style={{
          background: uploadStatus === 'success' ? '#28a745' :
                  uploadStatus === 'error' ? '#dc3545' :
                  uploadStatus === 'uploading' ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: (!selectedFile || uploadStatus === 'uploading') ? 'not-allowed' : 'pointer'
        }}
      >
        {uploadStatus === 'uploading' ? '上传中...' :
         uploadStatus === 'success' ? '✓ 上传成功' :
         uploadStatus === 'error' ? '✗ 上传失败' :
         '上传文件'}
      </button>
    </div>
  );
}

// =============================================
// 主组件
// =============================================

export default function FormsPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>React 表单处理</h1>

      {/* 表单处理对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>表单处理对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>概念</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>React/Next.js</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Spring Boot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>表单绑定</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>受控组件 + useState</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@ModelAttribute + Thymeleaf</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>验证</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>手动验证 + 错误状态</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@Valid + Bean Validation</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>服务器提交</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Server Actions / API</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@PostMapping</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 表单示例展示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div>
          <h2>受控组件表单</h2>
          <ContactFormComponent />
        </div>

        <div>
          <h2>Server Actions</h2>
          <ServerActionForm />
        </div>

        <div>
          <h2>文件上传</h2>
          <FileUploadComponent />
        </div>
      </div>

      {/* 最佳实践提示 */}
      <div style={{
        background: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        padding: '1rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#155724' }}>表单处理最佳实践</h3>
        <ul style={{ color: '#155724' }}>
          <li>✅ 使用受控组件获得完整的控制权</li>
          <li>✅ 及时验证并提供清晰的错误反馈</li>
          <li>✅ 考虑使用 Server Actions 减少客户端代码</li>
          <li>✅ 为上传文件设置合理的限制</li>
          <li>✅ 提供加载状态指示器</li>
          <li>✅ 确保表单可访问性（ARIA 标签等）</li>
        </ul>
      </div>
    </main>
  );
}