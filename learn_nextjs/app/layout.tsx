import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 全栈开发学习项目",
  description: "系统化学习 Next.js 全栈开发，从基础概念到实战项目，构建现代 Web 应用的完整技能栈",
  keywords: ["Next.js", "React", "TypeScript", "全栈开发", "学习教程"],
  authors: [{ name: "LittleTree" }],
  openGraph: {
    title: "Next.js 全栈开发学习项目",
    description: "系统化学习 Next.js 全栈开发",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
