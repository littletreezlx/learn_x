/**
 * 12_auth.tsx - Next.js 认证和授权
 *
 * 学习目标：
 * - 实现用户认证流程
 * - 使用 Session 管理
 * - 处理权限控制
 * - 保护 API 路由
 */

'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

// =============================================
// 认证上下文
// =============================================

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 权限配置
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  user: ['read']
};

// AuthProvider 组件
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储的用户信息
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 模拟 API 调用
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // 可以调用 API 注销
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return permissions[user.role]?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook 使用认证上下文
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// =============================================
// 认证组件
// =============================================

// 登录表单组件
function LoginForm() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const success = await login(formData.email, formData.password);

    if (!success) {
      setError('邮箱或密码错误');
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h2>用户登录</h2>

      {/* 测试账号提示 */}
      <div style={{
        background: '#e3f2fd',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontSize: '0.875rem'
      }}>
        <strong>测试账号:</strong>
        <br />管理员: admin@example.com / admin123
        <br />编辑者: editor@example.com / editor123
        <br />普通用户: user@example.com / user123
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            邮箱:
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
            密码:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {error && (
          <div style={{
            color: '#dc3545',
            background: '#f8d7da',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {isSubmitting ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
}

// 用户信息组件
function UserProfile() {
  const { user, logout, hasPermission } = useAuth();

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2>用户信息</h2>

      <div style={{ marginBottom: '1rem' }}>
        <p><strong>姓名:</strong> {user?.name}</p>
        <p><strong>邮箱:</strong> {user?.email}</p>
        <p><strong>角色:</strong>
          <span style={{
            background: user?.role === 'admin' ? '#dc3545' :
                      user?.role === 'editor' ? '#ffc107' : '#28a745',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            marginLeft: '0.5rem'
          }}>
            {user?.role === 'admin' ? '管理员' :
             user?.role === 'editor' ? '编辑者' : '普通用户'}
          </span>
        </p>
      </div>

      {/* 权限展示 */}
      <div style={{
        background: '#f8f9fa',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <h4>权限检查:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.5rem 0' }}>
            {hasPermission('read') ? '✅' : '❌'} 读取权限
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            {hasPermission('write') ? '✅' : '❌'} 写入权限
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            {hasPermission('delete') ? '✅' : '❌'} 删除权限
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            {hasPermission('manage_users') ? '✅' : '❌'} 用户管理权限
          </li>
        </ul>
      </div>

      <button
        onClick={logout}
        style={{
          background: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        退出登录
      </button>
    </div>
  );
}

// 权限保护组件
function ProtectedComponent({ permission, children }: {
  permission: string;
  children: React.ReactNode;
}) {
  const { hasPermission, user } = useAuth();

  if (!user) {
    return (
      <div style={{
        background: '#fff3cd',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        请先登录以查看此内容
      </div>
    );
  }

  if (!hasPermission(permission)) {
    return (
      <div style={{
        background: '#f8d7da',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#721c24'
      }}>
        您没有权限查看此内容
      </div>
    );
  }

  return <>{children}</>;
}

// 权限管理示例
function PermissionDemo() {
  const { user } = useAuth();

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>权限管理示例</h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <ProtectedComponent permission="read">
          <div style={{
            background: '#d4edda',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <h3>公开内容</h3>
            <p>所有登录用户都可以看到</p>
          </div>
        </ProtectedComponent>

        <ProtectedComponent permission="write">
          <div style={{
            background: '#fff3cd',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <h3>编辑内容</h3>
            <p>需要编辑权限才能看到（编辑者和管理员）</p>
          </div>
        </ProtectedComponent>

        <ProtectedComponent permission="delete">
          <div style={{
            background: '#f8d7da',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <h3>管理内容</h3>
            <p>需要删除权限才能看到（仅管理员）</p>
          </div>
        </ProtectedComponent>
      </div>
    </div>
  );
}

// =============================================
// API 路由示例代码
// =============================================

const authRouteExample = `
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据库
const users = [
  { id: 1, name: '管理员', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, name: '编辑者', email: 'editor@example.com', password: 'editor123', role: 'editor' },
  { id: 3, name: '普通用户', email: 'user@example.com', password: 'user123', role: 'user' }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 验证用户
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;

    // 实际项目中应该设置 session 或 JWT
    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: '登录成功'
    });

    // 设置 Cookie
    response.cookies.set('auth-token', 'your-jwt-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7天
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, error: '登录失败' },
      { status: 500 }
    );
  }
}
`;

const middlewareExample = `
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取 token
  const token = request.cookies.get('auth-token')?.value;
  const authHeader = request.headers.get('authorization');

  // 检查需要认证的路由
  if (request.nextUrl.pathname.startsWith('/api/protected') ||
      request.nextUrl.pathname.startsWith('/dashboard')) {

    if (!token && !authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    // 这里可以验证 token
    // const isValidToken = await verifyToken(token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected/:path*', '/dashboard/:path*']
};
`;

// =============================================
// 主组件
// =============================================

export default function AuthPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>加载中...</div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Next.js 认证和授权</h1>

      {/* 认证对比 */}
      <div style={{
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>认证方案对比（Java 开发者视角）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>概念</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Next.js</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>Spring Boot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Session 管理</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Cookies / LocalStorage</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>HttpSession</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Token</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>JWT / 自定义</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>JWT / OAuth2</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>权限控制</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Middleware + HOC</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>@PreAuthorize</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>中间件</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>middleware.ts</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Filters</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 认证界面 */}
      {!user ? (
        <div>
          <LoginForm />
          <PermissionDemo />
        </div>
      ) : (
        <div>
          <UserProfile />
          <PermissionDemo />
        </div>
      )}

      {/* API 路由示例 */}
      <div style={{ marginTop: '2rem' }}>
        <h2>API 路由示例</h2>
        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.875rem'
        }}>
          <h3>登录 API 路由:</h3>
          <pre style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {authRouteExample}
          </pre>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          marginTop: '1rem'
        }}>
          <h3>中间件示例:</h3>
          <pre style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {middlewareExample}
          </pre>
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
        <h3 style={{ color: '#155724' }}>认证最佳实践</h3>
        <ul style={{ color: '#155724' }}>
          <li>✅ 使用 HTTPS 保护认证信息</li>
          <li>✅ 设置安全的 Cookie 选项</li>
          <li>✅ 实现适当的密码策略</li>
          <li>✅ 使用 JWT 或 Session 的过期时间</li>
          <li>✅ 实现 CSRF 保护</li>
          <li>✅ 记录认证相关的安全事件</li>
          <li>✅ 考虑使用成熟的认证库（NextAuth.js）</li>
        </ul>
      </div>
    </main>
  );
}

// 完整的页面包装器
export default function AuthPageWrapper() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  );
}