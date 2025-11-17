'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { userRegistrationSchema, type UserRegistration } from '../lib/validations';
import { InputField, TextareaField, SelectField, CheckboxField, FormButton, FormErrorSummary } from './FormField';

/**
 * 高级表单组件 - 使用React Hook Form + Zod验证
 */
export function AdvancedRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset,
    setError,
  } = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
    mode: 'onChange', // 实时验证
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 18,
      phone: '',
      bio: '',
    },
  });

  // 监听密码字段以实现实时确认密码验证
  const password = watch('password');

  const onSubmit = async (data: UserRegistration) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // 模拟服务器验证（检查邮箱是否已存在）
      await simulateServerValidation(data);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('提交的表单数据:', data);
      setSubmitResult({
        success: true,
        message: '注册成功！欢迎加入我们。'
      });
      
      // 重置表单
      reset();
    } catch (error: any) {
      if (error.field) {
        // 设置特定字段错误
        setError(error.field, { message: error.message });
      } else {
        setSubmitResult({
          success: false,
          message: error.message || '注册失败，请稍后重试。'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 模拟服务器端验证
  const simulateServerValidation = async (data: UserRegistration) => {
    // 模拟邮箱已存在的情况
    if (data.email === 'test@example.com') {
      throw { field: 'email', message: '该邮箱已被注册' };
    }
    
    // 模拟手机号已存在的情况
    if (data.phone === '13800138000') {
      throw { field: 'phone', message: '该手机号已被注册' };
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          用户注册
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          请填写以下信息完成注册，所有必填字段都有实时验证。
        </p>
      </div>

      {/* 提交结果显示 */}
      {submitResult && (
        <div className={`mb-6 p-4 rounded-md ${
          submitResult.success 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitResult.message}
        </div>
      )}

      {/* 表单错误汇总 */}
      <FormErrorSummary errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 基本信息区域 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            基本信息
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="姓名"
              required
              placeholder="请输入您的姓名"
              registration={register('name')}
              error={errors.name?.message}
              description="将用于显示和通信"
            />
            
            <InputField
              label="年龄"
              type="number"
              required
              placeholder="18"
              registration={register('age', { valueAsNumber: true })}
              error={errors.age?.message}
            />
          </div>

          <InputField
            label="邮箱地址"
            type="email"
            required
            placeholder="your.email@example.com"
            registration={register('email')}
            error={errors.email?.message}
            description="将用于登录和接收重要通知"
          />

          <InputField
            label="手机号码"
            type="tel"
            placeholder="13800138000"
            registration={register('phone')}
            error={errors.phone?.message}
            description="可选，用于账户安全验证"
          />
        </div>

        {/* 安全信息区域 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            安全信息
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="密码"
              type="password"
              required
              placeholder="请输入密码"
              registration={register('password')}
              error={errors.password?.message}
              description="至少8位，包含大小写字母和数字"
            />
            
            <InputField
              label="确认密码"
              type="password"
              required
              placeholder="请再次输入密码"
              registration={register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          {/* 密码强度指示器 */}
          {password && (
            <div className="mt-2">
              <PasswordStrengthIndicator password={password} />
            </div>
          )}
        </div>

        {/* 个人简介 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            个人简介
          </h3>
          
          <TextareaField
            label="个人简介"
            placeholder="请简单介绍一下自己..."
            rows={4}
            registration={register('bio')}
            error={errors.bio?.message}
            description="可选，最多500个字符"
          />
        </div>

        {/* 表单操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <FormButton
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!isValid}
            className="flex-1"
          >
            {isSubmitting ? '注册中...' : '注册账户'}
          </FormButton>
          
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="flex-1"
          >
            清空表单
          </FormButton>
        </div>

        {/* 表单状态信息 */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>表单验证状态:</span>
            <span className={isValid ? 'text-green-600' : 'text-red-600'}>
              {isValid ? '✓ 所有字段有效' : '✗ 存在验证错误'}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>已填写字段:</span>
            <span>{Object.keys(touchedFields).length} / 7</span>
          </div>
        </div>
      </form>
    </div>
  );
}

/**
 * 密码强度指示器组件
 */
function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z\d]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ['很弱', '弱', '一般', '强', '很强'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">密码强度:</span>
        <span className={`font-medium ${
          strength <= 1 ? 'text-red-600' :
          strength <= 2 ? 'text-orange-600' :
          strength <= 3 ? 'text-yellow-600' :
          strength <= 4 ? 'text-blue-600' : 'text-green-600'
        }`}>
          {strengthLabels[strength] || '很弱'}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded ${
              level <= strength 
                ? strengthColors[strength] || 'bg-gray-300' 
                : 'bg-gray-200 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <ul className="space-y-1">
          <li className={password.length >= 8 ? 'text-green-600' : ''}>
            {password.length >= 8 ? '✓' : '○'} 至少8个字符
          </li>
          <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
            {/[a-z]/.test(password) ? '✓' : '○'} 包含小写字母
          </li>
          <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
            {/[A-Z]/.test(password) ? '✓' : '○'} 包含大写字母
          </li>
          <li className={/\d/.test(password) ? 'text-green-600' : ''}>
            {/\d/.test(password) ? '✓' : '○'} 包含数字
          </li>
        </ul>
      </div>
    </div>
  );
}

/**
 * 多步骤表单组件
 */
export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-full h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>基本信息</span>
          <span>安全设置</span>
          <span>完成注册</span>
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="min-h-[400px]">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <FormButton
          variant="secondary"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          上一步
        </FormButton>
        
        <FormButton
          variant="primary"
          onClick={currentStep === totalSteps ? () => alert('注册完成!') : nextStep}
        >
          {currentStep === totalSteps ? '完成注册' : '下一步'}
        </FormButton>
      </div>
    </div>
  );
}

function StepOne() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">第一步：基本信息</h2>
      <InputField label="姓名" required placeholder="请输入您的姓名" />
      <InputField label="邮箱" type="email" required placeholder="your.email@example.com" />
      <InputField label="手机号码" type="tel" placeholder="13800138000" />
    </div>
  );
}

function StepTwo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">第二步：安全设置</h2>
      <InputField label="密码" type="password" required placeholder="请输入密码" />
      <InputField label="确认密码" type="password" required placeholder="请再次输入密码" />
      <SelectField
        label="安全问题"
        required
        options={[
          { value: 'pet', label: '您的宠物叫什么名字？' },
          { value: 'school', label: '您的小学叫什么名字？' },
          { value: 'city', label: '您出生在哪个城市？' },
        ]}
        placeholder="请选择安全问题"
      />
      <InputField label="安全问题答案" required placeholder="请输入答案" />
    </div>
  );
}

function StepThree() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">第三步：完成注册</h2>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-2">请确认您的注册信息：</h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p>姓名: 张三</p>
          <p>邮箱: zhangsan@example.com</p>
          <p>手机: 13800138000</p>
        </div>
      </div>
      <CheckboxField
        label="我已阅读并同意用户协议和隐私政策"
        required
      />
      <CheckboxField
        label="接收产品更新和促销信息"
      />
    </div>
  );
}