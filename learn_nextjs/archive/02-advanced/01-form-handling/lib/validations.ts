import { z } from 'zod';

/**
 * 用户注册表单验证schema
 */
export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, '姓名至少需要2个字符')
    .max(50, '姓名不能超过50个字符'),
  email: z
    .string()
    .email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(8, '密码至少需要8个字符')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字'),
  confirmPassword: z
    .string(),
  age: z
    .number()
    .min(18, '年龄必须大于18岁')
    .max(100, '年龄不能超过100岁'),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional(),
  bio: z
    .string()
    .max(500, '个人简介不能超过500个字符')
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

/**
 * 用户资料更新schema
 */
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(2, '姓名至少需要2个字符')
    .max(50, '姓名不能超过50个字符'),
  email: z
    .string()
    .email('请输入有效的邮箱地址'),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .max(500, '个人简介不能超过500个字符')
    .optional(),
  website: z
    .string()
    .url('请输入有效的网址')
    .optional()
    .or(z.literal('')),
});

/**
 * 联系表单schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, '姓名至少需要2个字符')
    .max(50, '姓名不能超过50个字符'),
  email: z
    .string()
    .email('请输入有效的邮箱地址'),
  subject: z
    .string()
    .min(5, '主题至少需要5个字符')
    .max(100, '主题不能超过100个字符'),
  message: z
    .string()
    .min(10, '消息内容至少需要10个字符')
    .max(1000, '消息内容不能超过1000个字符'),
  category: z.enum(['general', 'support', 'sales', 'feedback'], {
    required_error: '请选择消息类别',
  }),
});

/**
 * 动态表单配置schema
 */
export const dynamicFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'number', 'select', 'textarea', 'checkbox']),
  label: z.string(),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

export const dynamicFormSchema = z.object({
  title: z.string().min(1, '表单标题不能为空'),
  description: z.string().optional(),
  fields: z.array(dynamicFieldSchema).min(1, '至少需要一个字段'),
});

// TypeScript类型推导
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type DynamicField = z.infer<typeof dynamicFieldSchema>;
export type DynamicForm = z.infer<typeof dynamicFormSchema>;

/**
 * 通用表单验证工具函数
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    throw error;
  }
}

/**
 * 异步表单验证（模拟服务器验证）
 */
export async function validateFormAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  additionalValidations?: (data: T) => Promise<Record<string, string>>
): Promise<{ success: true; data: T } | { success: false; errors: Record<string, string> }> {
  // 首先进行本地验证
  const localValidation = validateForm(schema, data);
  if (!localValidation.success) {
    return localValidation;
  }

  // 执行额外的异步验证（如检查邮箱是否已存在）
  if (additionalValidations) {
    const serverErrors = await additionalValidations(localValidation.data);
    if (Object.keys(serverErrors).length > 0) {
      return { success: false, errors: serverErrors };
    }
  }

  return localValidation;
}