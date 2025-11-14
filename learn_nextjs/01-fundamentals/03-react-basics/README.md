# React基础回顾

本节为有Java背景的开发者回顾React的核心概念，帮助你理解Next.js的组件模型和状态管理。

## React核心概念

React是一个用于构建用户界面的JavaScript库，其核心概念包括：

1. **组件**：UI的独立、可复用的部分
2. **JSX**：JavaScript的语法扩展，允许在JS中编写HTML结构
3. **Props**：从父组件向子组件传递数据的方式
4. **State**：组件内部状态，当状态变化时会触发重新渲染
5. **Hooks**：允许在函数组件中使用状态和其他React特性的函数

对于习惯面向对象编程的Java开发者，React的函数式组件模型可能会有些不同，但两者也有相似之处：

| Java概念 | React类比 |
|---------|----------|
| 类 | 组件 |
| 类属性 | 状态(state) |
| 方法参数 | 属性(props) |
| 方法 | 事件处理函数 |
| 继承 | 组合 |

## 组件与JSX

### 组件基础

React组件本质上是返回UI元素的JavaScript函数：

```tsx
// 简单的函数组件
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}
```

等同于JavaScript中的：

```javascript
function Greeting(props) {
  return React.createElement('h1', null, 'Hello, ' + props.name + '!');
}
```

### JSX语法

JSX将HTML和JavaScript混合在一起，使组件更直观：

```tsx
function UserProfile({ user }: { user: { name: string; role: string } }) {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Role: {user.role}</p>
      
      {/* 条件渲染 */}
      {user.role === 'admin' && (
        <span className="admin-badge">Administrator</span>
      )}
      
      {/* 三元表达式 */}
      <p className={user.role === 'admin' ? 'admin-text' : 'user-text'}>
        Account type: {user.role}
      </p>
    </div>
  );
}
```

### 组件类型

在Next.js中，组件分为服务端组件和客户端组件：

**服务端组件** (默认)：
- 在服务器上渲染，减少JavaScript包大小
- 可以直接访问服务器资源（数据库、文件系统等）
- 不能使用浏览器API、交互状态和事件处理程序

```tsx
// 服务端组件（默认）
export default async function UserList() {
  // 直接从数据库获取数据
  const users = await db.users.findMany();
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**客户端组件**：
- 在浏览器中渲染，启用交互性
- 可以使用useState、useEffect等hooks
- 通过在文件顶部添加'use client'指令声明

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Props（属性）

Props是组件接收的输入，类似于Java方法的参数：

```tsx
// 定义props的TypeScript类型
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // 可选属性
  variant?: 'primary' | 'secondary' | 'danger'; // 联合类型
}

// 使用解构接收props
function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// 使用组件，传递props
function App() {
  return (
    <div>
      <Button 
        label="Click Me" 
        onClick={() => alert('Button clicked!')}
        variant="primary" 
      />
    </div>
  );
}
```

### children属性

`children`是一个特殊的prop，代表组件的子元素：

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode; // 可以接收任何可渲染内容
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// 使用方式
function App() {
  return (
    <Card title="用户信息">
      <p>这是卡片内容</p>
      <button>操作</button>
    </Card>
  );
}
```

## State（状态）

State代表组件的内部状态，当状态变化时React会重新渲染组件。

### useState Hook

`useState`是React最基本的Hook，用于在函数组件中添加状态：

```tsx
'use client';

import { useState } from 'react';

function LoginForm() {
  // 声明状态变量及其更新函数
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // 处理表单提交逻辑
      await loginUser(username, password);
      // 登录成功处理
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### 使用对象状态

对于复杂状态，可以将相关状态组合成一个对象：

```tsx
'use client';

import { useState } from 'react';

interface UserFormData {
  name: string;
  email: string;
  age: number;
}

function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    age: 0,
  });
  
  // 更新单个字段
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData, // 保留其他字段
      [name]: name === 'age' ? Number(value) : value, // 适当转换类型
    }));
  };
  
  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Age:</label>
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
```

## React Hooks

Hooks是React 16.8引入的特性，允许在函数组件中使用状态和其他React特性。

### 基础Hooks

1. **useState**: 添加状态
2. **useEffect**: 处理副作用
3. **useContext**: 使用Context API跨组件共享数据

### useEffect Hook

`useEffect`用于处理组件中的副作用，如数据获取、订阅或手动DOM操作：

```tsx
'use client';

import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 当userId变化时获取用户数据
  useEffect(() => {
    setLoading(true);
    
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // 清理函数，在组件卸载或userId变化前调用
    return () => {
      console.log('Cleanup: Component unmounted or userId changed');
    };
  }, [userId]); // 依赖数组，只有userId变化时才重新执行
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### useContext Hook

`useContext`用于跨组件共享数据，避免prop drilling问题：

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 创建上下文
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 提供上下文的组件
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用上下文的自定义Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 使用主题的组件
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={`btn-${theme}`}
      onClick={toggleTheme}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}
```

### 其他常用Hooks

- **useReducer**: 适用于复杂状态逻辑，类似Redux
- **useCallback**: 记忆函数引用，优化子组件重渲染
- **useMemo**: 记忆计算结果，避免昂贵计算
- **useRef**: 访问DOM元素或保存不触发重渲染的值

## 事件处理

React中的事件处理与DOM事件类似，但有一些语法差异：

```tsx
'use client';

function EventHandlingDemo() {
  // 事件处理函数
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', e);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认提交行为
    console.log('Form submitted!');
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Type something"
      />
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="example" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## 列表渲染

在React中渲染列表需要提供唯一的`key`属性，帮助React识别哪些元素发生了变化：

```tsx
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? 'completed' : undefined}>
          {task.text}
        </li>
      ))}
    </ul>
  );
}
```

## 表单处理

React中表单有两种处理方式：

### 受控组件

表单元素的值由React state控制：

```tsx
'use client';

import { useState, FormEvent } from 'react';

export default function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, message });
    // 提交数据...
    
    // 重置表单
    setName('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 非受控组件

使用ref直接访问DOM元素值：

```tsx
'use client';

import { useRef, FormEvent } from 'react';

export default function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 直接从DOM中获取值
    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };
    
    console.log(formData);
    // 提交数据...
    
    // 重置表单
    e.currentTarget.reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          ref={nameRef}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          ref={messageRef}
          required
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 从Java到React的思维转变

1. **声明式vs命令式**：
   - Java通常偏向命令式编程（描述"如何"做）
   - React采用声明式方法（描述"是什么"，由React处理"如何"做）

2. **不可变数据**：
   - React鼓励使用不可变数据模式
   - 状态更新总是创建新对象，而不是修改现有对象

3. **组合而非继承**：
   - Java倾向于通过继承构建复杂对象
   - React推荐使用组合模式，将组件组合构建UI

4. **函数式编程**：
   - React大量使用函数式编程概念
   - 纯函数、高阶函数、不可变性是React的基础

## 学习检查点

- [ ] 理解React组件的概念和JSX语法
- [ ] 区分服务端组件和客户端组件
- [ ] 掌握Props的传递和使用
- [ ] 使用useState管理组件状态
- [ ] 了解useEffect的生命周期作用
- [ ] 能够处理常见的React事件
- [ ] 掌握列表渲染和表单处理

## 下一步

学习Next.js中的数据获取方法，包括服务端渲染(SSR)、静态生成(SSG)等技术。 