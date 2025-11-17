'use server';

import { z } from 'zod';

// 定义服务端验证模式
const userSchema = z.object({
  username: z.string()
    .min(3, { message: '用户名至少需要3个字符' })
    .max(20, { message: '用户名不能超过20个字符' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: '用户名只能包含字母、数字和下划线' }),
  
  email: z.string()
    .email({ message: '请输入有效的电子邮件地址' })
    .refine(email => !email.endsWith('test.com'), { 
      message: 'test.com域名不被接受' 
    }),
  
  password: z.string()
    .min(8, { message: '密码至少需要8个字符' })
    .regex(/[A-Z]/, { message: '密码必须包含至少一个大写字母' })
    .regex(/[a-z]/, { message: '密码必须包含至少一个小写字母' })
    .regex(/[0-9]/, { message: '密码必须包含至少一个数字' })
    .regex(/[^A-Za-z0-9]/, { message: '密码必须包含至少一个特殊字符' }),
  
  confirmPassword: z.string(),
  
  role: z.enum(['user', 'editor', 'admin'], { 
    required_error: '请选择一个有效的角色',
    invalid_type_error: '角色必须是预定义的角色之一'
  }),
  
  terms: z.literal('on', {
    invalid_type_error: '您必须同意条款和条件',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: '密码和确认密码不匹配',
  path: ['confirmPassword'], // 指定错误应该附加到哪个字段
});

// 模拟用户数据库
const existingUsers = [
  { username: 'admin', email: 'admin@example.com' },
  { username: 'user1', email: 'user1@example.com' },
];

// 类型定义
type FormState = {
  errors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    terms?: string;
    _form?: string;
  };
  message?: string;
  data?: any;
};

/**
 * 处理用户表单提交的Server Action
 */
export async function submitUserData(prevState: FormState, formData: FormData): Promise<FormState> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // 从表单数据创建对象
    const rawFormData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role: formData.get('role'),
      terms: formData.get('terms'),
    };
    
    // 验证表单数据
    const validatedData = userSchema.safeParse(rawFormData);
    
    if (!validatedData.success) {
      // 提取验证错误
      const errors: Record<string, string> = {};
      validatedData.error.errors.forEach(error => {
        const path = error.path[0] as string;
        errors[path] = error.message;
      });
      
      return {
        errors,
        message: '表单验证失败，请检查输入。'
      };
    }
    
    // 检查用户名是否已存在
    const usernameExists = existingUsers.some(
      user => user.username === validatedData.data.username
    );
    
    if (usernameExists) {
      return {
        errors: {
          username: '该用户名已被使用'
        },
        message: '注册失败，用户名已存在。'
      };
    }
    
    // 检查电子邮件是否已存在
    const emailExists = existingUsers.some(
      user => user.email === validatedData.data.email
    );
    
    if (emailExists) {
      return {
        errors: {
          email: '该电子邮件已被注册'
        },
        message: '注册失败，电子邮件已存在。'
      };
    }
    
    // 省略密码，避免在响应中返回
    const { password, confirmPassword, terms, ...userData } = validatedData.data;
    
    // 实际应用中，此处会将用户数据保存到数据库
    // 例如: await db.users.create({ data: { ...userData, hashedPassword } });
    
    return {
      data: {
        ...userData,
        id: Math.floor(Math.random() * 1000000),
        createdAt: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('服务器验证错误:', error);
    return {
      message: '服务器处理请求时出错，请稍后再试。'
    };
  }
} 