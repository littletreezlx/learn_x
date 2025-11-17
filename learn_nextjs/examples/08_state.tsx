/**
 * 08_state.tsx - React 状态管理
 *
 * 学习目标：
 * - 掌握 useState Hook
 * - 理解 useEffect Hook
 * - 使用自定义 Hook
 * - 状态管理最佳实践
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// =============================================
// 基础状态管理
// =============================================

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Todo 列表组件
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 添加新待办
  const addTodo = useCallback(() => {
    if (newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: newTodoTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    }
  }, [newTodoTitle, todos]);

  // 切换完成状态
  const toggleTodo = useCallback((id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [todos]);

  // 删除待办
  const deleteTodo = useCallback((id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }, [todos]);

  // 计算统计信息
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  // 过滤后的待办列表
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h2>待办事项列表</h2>

      {/* 统计信息 */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '0.5rem',
        background: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <span>总计: {stats.total}</span>
        <span>进行中: {stats.active}</span>
        <span>已完成: {stats.completed}</span>
      </div>

      {/* 添加新待办 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新待办事项..."
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          添加
        </button>
      </div>

      {/* 过滤器 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? '#007bff' : '#f8f9fa',
              color: filter === f ? 'white' : 'black',
              border: '1px solid #ddd',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
          </button>
        ))}
      </div>

      {/* 待办列表 */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            borderBottom: '1px solid #eee',
            background: todo.completed ? '#f8f9fa' : 'white'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ margin: 0 }}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#666' : 'black'
            }}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          {filter === 'active' ? '没有进行中的任务' :
           filter === 'completed' ? '没有已完成的任务' :
           '还没有待办事项，添加一个吧！'}
        </p>
      )}
    </div>
  );
}

// =============================================
// 自定义 Hook
// =============================================

// 自定义 Hook：本地存储
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('读取localStorage失败:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('写入localStorage失败:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// 自定义 Hook：计数器
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// 使用自定义 Hook 的组件
function CounterWithLocalStorage() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [savedCount, setSavedCount] = useLocalStorage('savedCounter', 0);

  return (
    <div style={{
      background: '#e3f2fd',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <h3>自定义 Hook 示例</h3>

      <div style={{ marginBottom: '1rem' }}>
        <h4>普通计数器 (不保存): {count}</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
          <button onClick={reset}>重置</button>
        </div>
      </div>

      <div>
        <h4>持久化计数器 (localStorage): {savedCount}</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button onClick={() => setSavedCount(savedCount - 1)}>-</button>
          <button onClick={() => setSavedCount(savedCount + 1)}>+</button>
          <button onClick={() => setSavedCount(0)}>重置</button>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          这个计数器的值会保存在浏览器的本地存储中，刷新页面后仍然保留
        </p>
      </div>
    </div>
  );
}

// =============================================
// 主组件
// =============================================

export default function StatePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 使用 useEffect 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // 清理副作用
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>React 状态管理</h1>
      <p>当前时间: {currentTime.toLocaleTimeString('zh-CN')}</p>

      {/* 状态管理对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>状态管理对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>概念</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>React</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Spring Boot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>组件状态</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>useState Hook</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@ModelAttribute</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>副作用</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>useEffect Hook</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@PostConstruct, Event Listeners</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>状态共享</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Context, Redux</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Session, Application Scope</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 示例展示 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div>
          <h2>Todo 列表 (复杂状态管理)</h2>
          <TodoList />
        </div>

        <div>
          <h2>自定义 Hook 示例</h2>
          <CounterWithLocalStorage />
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
        <h3 style={{ color: '#155724' }}>状态管理最佳实践</h3>
        <ul style={{ color: '#155724' }}>
          <li>✅ 保持状态简单，避免过度嵌套</li>
          <li>✅ 使用 useCallback 避免不必要的重渲染</li>
          <li>✅ 使用 useMemo 缓存计算结果</li>
          <li>✅ 清理 useEffect 的副作用</li>
          <li>✅ 提取自定义 Hook 复用逻辑</li>
          <li>✅ 考虑状态提升避免数据重复</li>
        </ul>
      </div>
    </main>
  );
}