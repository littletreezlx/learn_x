import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js表单处理与验证',
  description: '学习Next.js中的表单处理与验证最佳实践',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Next.js表单处理与验证</h1>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <Link 
                        href="/basic-forms" 
                        className="hover:text-blue-300"
                      >
                        基础表单
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/advanced-forms" 
                        className="hover:text-blue-300"
                      >
                        高级表单
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/server-validation" 
                        className="hover:text-blue-300"
                      >
                        服务端验证
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Next.js表单处理学习项目 © {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 