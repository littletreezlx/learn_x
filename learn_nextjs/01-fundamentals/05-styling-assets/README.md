# 样式与静态资源管理

本节介绍Next.js中的样式管理方式和静态资源（图片、字体等）的处理方法。

## 样式方案概述

Next.js支持多种样式解决方案，允许开发者根据项目需求选择最合适的方式：

1. **全局CSS**：传统CSS文件，适用于整个应用
2. **模块化CSS**：作用域限定在组件级别的CSS
3. **CSS-in-JS**：在JavaScript中编写样式，如styled-components、emotion
4. **Tailwind CSS**：功能类优先的CSS框架
5. **Sass/SCSS**：CSS预处理器，支持嵌套、变量等高级特性

## 全局样式

全局样式会应用于整个应用，通常在根布局中导入。

### 设置全局样式

```tsx
// app/globals.css
:root {
  --primary-color: #0070f3;
  --background-color: #ffffff;
  --text-color: #333333;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### 导入全局样式

```tsx
// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## CSS 模块

CSS模块允许将样式限定在组件作用域内，避免全局命名冲突。

### 创建CSS模块

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary {
  background-color: var(--primary-color);
  color: white;
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}
```

### 在组件中使用CSS模块

```tsx
// components/Button.tsx
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

export default function Button({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Tailwind CSS

Tailwind CSS是一个功能类优先的CSS框架，通过组合预定义的类来构建UI。

### 安装和配置Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
      },
    },
  },
  plugins: [],
};
```

### 设置全局样式

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition-colors;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary/90;
  }
  .btn-secondary {
    @apply bg-transparent border border-primary text-primary hover:bg-primary/10;
  }
}
```

### 使用Tailwind CSS

```tsx
// components/CardWithTailwind.tsx
export default function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}

// 使用上面定义的自定义类
export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return <button className="btn btn-primary">{children}</button>;
}
```

## CSS-in-JS

Next.js支持多种CSS-in-JS库，如Styled Components和Emotion。

### 使用Styled Components

首先安装依赖：

```bash
npm install styled-components
npm install -D @types/styled-components
```

创建样式组件：

```tsx
'use client';

// components/StyledButton.tsx
import styled from 'styled-components';

// 创建样式化组件
const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${(props) => props.variant === 'primary' && `
    background-color: #0070f3;
    color: white;
    
    &:hover {
      background-color: #005cc5;
    }
  `}
  
  ${(props) => props.variant === 'secondary' && `
    background-color: transparent;
    border: 1px solid #0070f3;
    color: #0070f3;
    
    &:hover {
      background-color: rgba(0, 112, 243, 0.1);
    }
  `}
`;

export default function Button({
  children,
  variant = 'primary',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
```

### 在Next.js中使用Styled Components

在Next.js的App Router中使用CSS-in-JS库需要一些额外的配置，因为样式需要在服务器组件中使用：

```tsx
// app/registry.tsx
'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
```

然后在根布局中使用此注册表：

```tsx
// app/layout.tsx
import StyledComponentsRegistry from './registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
```

## Sass/SCSS 支持

Next.js内置支持Sass。首先安装Sass：

```bash
npm install -D sass
```

然后就可以使用`.scss`或`.sass`文件：

```scss
// styles/Button.module.scss
@mixin button-base {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button {
  @include button-base;
  
  &.primary {
    background-color: #0070f3;
    color: white;
    
    &:hover {
      background-color: darken(#0070f3, 10%);
    }
  }
  
  &.secondary {
    background-color: transparent;
    border: 1px solid #0070f3;
    color: #0070f3;
    
    &:hover {
      background-color: rgba(0, 112, 243, 0.1);
    }
  }
}
```

在组件中使用：

```tsx
// components/SassButton.tsx
import styles from '../styles/Button.module.scss';

export default function Button({
  children,
  variant = 'primary',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## 条件样式和动态样式

可以使用条件逻辑动态应用样式：

```tsx
// components/DynamicButton.tsx
import { useState } from 'react';
import styles from './Button.module.css';

export default function DynamicButton() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : styles.inactive}`}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? '激活状态' : '未激活状态'}
    </button>
  );
}
```

## 静态资源管理

Next.js优化了静态资源的加载和处理，提供了专门的组件和API。

### 图片组件

Next.js提供了`Image`组件，它是HTML `<img>`标签的扩展，带有自动优化功能：

```tsx
// components/ProfileCard.tsx
import Image from 'next/image';
import styles from './ProfileCard.module.css';

export default function ProfileCard({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className={styles.card}>
      <Image
        src={avatar}
        alt={`${name}'s profile picture`}
        width={100}
        height={100}
        className={styles.avatar}
        priority
      />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

### Image组件的主要特点

1. **自动优化**：按需调整大小、转换格式（WebP/AVIF）
2. **防止布局偏移**：强制指定宽高
3. **懒加载**：只有接近视口时才加载
4. **优先级控制**：使用`priority`属性预加载重要图片

### 配置图像优化

可以在`next.config.js`中配置图像优化行为：

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'images.unsplash.com'], // 允许的外部图片域名
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 响应式尺寸断点
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 生成的图片尺寸
    formats: ['image/webp', 'image/avif'], // 支持的格式
  },
};

module.exports = nextConfig;
```

### 字体优化

Next.js提供了内置的字体优化，通过`next/font`模块：

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

// 加载Inter字体
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 加载Roboto Mono字体
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

然后在CSS中使用自定义属性：

```css
/* app/globals.css */
:root {
  --font-inter: 'Inter', sans-serif;
  --font-roboto-mono: 'Roboto Mono', monospace;
}

body {
  font-family: var(--font-inter);
}

code {
  font-family: var(--font-roboto-mono);
}
```

### 本地字体

也可以使用项目中的本地字体：

```tsx
import localFont from 'next/font/local';

// 加载本地字体
const myFont = localFont({
  src: [
    {
      path: '../public/fonts/my-font.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/my-font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={myFont.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### 静态文件

Next.js将`public`目录用于存放静态文件，如图片、字体、图标等。这些文件可以通过URL根路径访问：

```tsx
// components/Logo.tsx
import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={150} height={50} />
      <a href="/documents/brochure.pdf" target="_blank" rel="noopener noreferrer">
        下载宣传册
      </a>
    </div>
  );
}
```

## 最佳实践

### 样式策略选择

1. **小型项目**：CSS模块或Tailwind CSS
2. **中型项目**：Tailwind CSS + 组件库
3. **大型项目**：Tailwind CSS或CSS-in-JS + 设计系统

### 性能优化

1. **使用CSS模块或Tailwind CSS**：在构建时优化、减少运行时开销
2. **优先使用`next/image`和`next/font`组件**：自动优化和最佳实践
3. **避免CSS-in-JS的服务器端渲染问题**：使用专门的注册表和支持SSR的库

### 响应式设计

1. **使用相对单位**：rem、em、%而非固定像素
2. **使用媒体查询或Tailwind的响应式类**：适应不同屏幕尺寸
3. **设计移动优先**：先设计移动布局，再扩展到大屏幕

## 学习检查点

- [ ] 理解Next.js支持的不同样式方案
- [ ] 能够创建和使用CSS模块
- [ ] 掌握Tailwind CSS在Next.js中的配置和使用
- [ ] 学会使用`next/image`优化图片
- [ ] 了解`next/font`进行字体优化
- [ ] 能够在项目中组织和管理静态资源

## 下一步

学习Next.js中的表单处理和API开发，为构建完整的全栈应用奠定基础。 