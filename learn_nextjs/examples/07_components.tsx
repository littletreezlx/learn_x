/**
 * 07_components.tsx - React 组件系统详解
 *
 * 学习目标：
 * - 理解服务端组件 vs 客户端组件
 * - 掌握组件组合模式
 * - 使用 Props 传递数据
 * - 状态管理和生命周期
 */

'use client'; // 这个指令文件包含客户端组件

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// =============================================
// 服务端组件（默认）
// =============================================

// 服务端组件示例 - 只在服务器运行
function ServerComponent({ name }: { name: string }) {
  const serverTime = new Date().toLocaleString('zh-CN');

  return (
    <div style={{
      background: '#e8f5e8',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h3>服务端组件</h3>
      <p>你好, {name}!</p>
      <p>服务器时间: {serverTime}</p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        这个组件在服务器上渲染，无法使用 useState 或 useEffect
      </p>
    </div>
  );
}

// =============================================
// 客户端组件
// =============================================

// 计数器组件 - 展示状态管理
function Counter({ initialValue = 0 }: { initialValue?: number }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div style={{
      background: '#fff3cd',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h4>计数器组件</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={() => setCount(initialValue)}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          重置
        </button>
      </div>
    </div>
  );
}

// 数据获取组件 - 展示 useEffect
function DataFetcher() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 模拟 API 调用
    const fetchData = async () => {
      try {
        setLoading(true);
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟数据
        const mockData = [
          { id: 1, title: '任务 1', completed: true },
          { id: 2, title: '任务 2', completed: false },
          { id: 3, title: '任务 3', completed: true },
        ];

        setData(mockData);
      } catch (err) {
        setError('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组表示只在组件挂载时执行一次

  return (
    <div style={{
      background: '#e7f3ff',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h4>数据获取组件</h4>

      {loading && <p>加载中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {data.map(item => (
            <li key={item.id} style={{ margin: '0.5rem 0' }}>
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                style={{ marginRight: '0.5rem' }}
              />
              <span style={{
                textDecoration: item.completed ? 'line-through' : 'none'
              }}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// =============================================
// 组件组合模式
// =============================================

// 基础按钮组件
function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
}) {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    };

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, background: '#6c757d', color: 'white' };
      case 'danger':
        return { ...baseStyle, background: '#dc3545', color: 'white' };
      default:
        return { ...baseStyle, background: '#007bff', color: 'white' };
    }
  };

  return (
    <button style={getButtonStyle()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// 卡片组件 - 展示组合模式
function Card({
  title,
  children,
  actions
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '0.5rem'
      }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {actions}
      </div>
      <div>{children}</div>
    </div>
  );
}

// =============================================
// 主要组件
// =============================================

export default function ComponentsPage() {
  const [showServerComponent, setShowServerComponent] = useState(false);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>React 组件系统详解</h1>

      {/* 组件类型对比 */}
      <Card title="组件类型对比" actions={
        <Button onClick={() => setShowServerComponent(!showServerComponent)}>
          {showServerComponent ? '隐藏' : '显示'}服务端组件
        </Button>
      }>
        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <h4>服务端组件 vs 客户端组件</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ background: '#e0e0e0' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>特性</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>服务端组件</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>客户端组件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>执行位置</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>服务器</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>浏览器</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>状态管理</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>❌</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>✅</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>事件处理</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>❌</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>✅</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>SEO友好</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>✅</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>❌</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Bundle大小</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>不包含</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>包含</td>
              </tr>
            </tbody>
          </table>
        </div>

        {showServerComponent && (
          <div style={{ marginTop: '1rem' }}>
            <ServerComponent name="Next.js开发者" />
          </div>
        )}
      </Card>

      {/* 组件示例展示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <Card title="状态管理示例">
          <Counter initialValue={10} />
        </Card>

        <Card title="数据获取示例">
          <DataFetcher />
        </Card>

        <Card title="组件组合示例">
          <p>这是一个使用组合模式的卡片组件。</p>
          <p>标题、内容、操作都是可配置的。</p>
          <div style={{ marginTop: '1rem' }}>
            <Button variant="primary" style={{ marginRight: '0.5rem' }}>
              主要按钮
            </Button>
            <Button variant="secondary" style={{ marginRight: '0.5rem' }}>
              次要按钮
            </Button>
            <Button variant="danger">
              危险按钮
            </Button>
          </div>
        </Card>
      </div>

      {/* 下一步提示 */}
      <Card title="下一步学习">
        <div style={{
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          padding: '1rem'
        }}>
          <h4 style={{ color: '#155724', margin: '0 0 0.5rem 0' }}>推荐学习路径</h4>
          <ul style={{ color: '#155724', margin: 0, paddingLeft: '1.5rem' }}>
            <li><Link href="/examples/08_state.tsx">状态管理进阶</Link></li>
            <li><Link href="/examples/09_forms.tsx">表单处理</Link></li>
            <li><Link href="/examples/10_data_advanced.tsx">高级数据获取</Link></li>
          </ul>
        </div>
      </Card>
    </main>
  );
}