import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BaseFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  description?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  registration?: UseFormRegisterReturn;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
  registration?: UseFormRegisterReturn;
}

interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  registration?: UseFormRegisterReturn;
}

interface CheckboxFieldProps extends Omit<BaseFieldProps, 'label'> {
  label: string;
  checked?: boolean;
  registration?: UseFormRegisterReturn;
}

/**
 * 通用输入字段组件
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, type = 'text', placeholder, registration, className = '', description }, ref) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          `}
          aria-describedby={error ? `${label}-error` : undefined}
          {...registration}
        />
        
        {error && (
          <p 
            id={`${label}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

/**
 * 文本域字段组件
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, required, placeholder, rows = 3, registration, className = '', description }, ref) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        
        <textarea
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm resize-vertical
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          `}
          aria-describedby={error ? `${label}-error` : undefined}
          {...registration}
        />
        
        {error && (
          <p 
            id={`${label}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';

/**
 * 选择框字段组件
 */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, required, options, placeholder, registration, className = '', description }, ref) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        
        <select
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          `}
          aria-describedby={error ? `${label}-error` : undefined}
          {...registration}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <p 
            id={`${label}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

/**
 * 复选框字段组件
 */
export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, required, registration, className = '', description }, ref) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            className={`
              mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded
              focus:ring-blue-500 focus:ring-2
              ${error ? 'border-red-500' : ''}
            `}
            aria-describedby={error ? `${label}-error` : undefined}
            {...registration}
          />
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
        
        {error && (
          <p 
            id={`${label}-error`}
            className="text-sm text-red-600 ml-7"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

/**
 * 表单按钮组件
 */
interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FormButton({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
}: FormButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${(disabled || loading) ? disabledClasses : ''}
        ${className}
      `}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

/**
 * 表单错误汇总组件
 */
interface FormErrorSummaryProps {
  errors: Record<string, any>;
  title?: string;
}

export function FormErrorSummary({ errors, title = '请修正以下错误:' }: FormErrorSummaryProps) {
  const errorEntries = Object.entries(errors).filter(([_, error]) => error?.message);
  
  if (errorEntries.length === 0) {
    return null;
  }
  
  return (
    <div className="rounded-md bg-red-50 p-4 border border-red-200 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
            className="h-5 w-5 text-red-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <ul className="mt-2 list-disc list-inside text-sm text-red-700">
            {errorEntries.map(([field, error]) => (
              <li key={field}>{error.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}