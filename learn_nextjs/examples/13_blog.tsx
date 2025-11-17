/**
 * 13_blog.tsx - 博客系统项目（入门级）
 *
 * 项目目标：创建一个简单的博客系统
 * 学习重点：综合运用前面学到的知识
 */

import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// 模拟数据
const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Next.js 14 学习指南',
    excerpt: '全面介绍 Next.js 14 的新特性和最佳实践...',
    content: 'Next.js 14 是一个重要的版本更新，带来了许多令人兴奋的新特性...',
    author: '张三',
    publishedAt: '2025-01-15',
    category: '技术',
    tags: ['Next.js', 'React', '教程']
  },
  {
    id: 2,
    title: 'React Server Components 详解',
    excerpt: '深入理解 React Server Components 的工作原理...',
    content: 'React Server Components 是 React 18 引入的革命性特性...',
    author: '李四',
    publishedAt: '2025-01-12',
    category: '技术',
    tags: ['React', 'Server Components', '性能']
  },
  {
    id: 3,
    title: '全栈开发实践心得',
    excerpt: '分享我成为全栈工程师的学习路径和经验...',
    content: '成为全栈工程师是许多开发者的目标，但如何规划学习路径呢...',
    author: '王五',
    publishedAt: '2025-01-10',
    category: '经验',
    tags: ['全栈', '学习', '职业发展']
  }
];

const categories: Category[] = [
  { id: 'all', name: '全部', count: 3 },
  { id: 'tech', name: '技术', count: 2 },
  { id: 'experience', name: '经验', count: 1 }
];

// 博客列表组件
function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 模拟从 API 获取数据
    setTimeout(() => {
      setPosts(mockPosts);
    }, 500);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'tech' && post.category === '技术') ||
      (selectedCategory === 'experience' && post.category === '经验');

    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0', color: '#2c3e50' }}>我的技术博客</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>分享技术，记录成长</p>
      </header>

      {/* 搜索和分类筛选 */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="搜索文章..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? '#007bff' : '#f8f9fa',
                color: selectedCategory === cat.id ? 'white' : 'black',
                border: '1px solid #ddd',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* 文章列表 */}
      <div style={{ display: 'grid', gap: '2rem' }}>
        {filteredPosts.map(post => (
          <article key={post.id} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <header style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                  <a
                    href={`/posts/${post.id}`}
                    style={{ color: '#2c3e50', textDecoration: 'none' }}
                  >
                    {post.title}
                  </a>
                </h2>
                <span style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem'
                }}>
                  {post.category}
                </span>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                <span>{post.author}</span>
                <span style={{ margin: '0 0.5rem' }}>•</span>
                <span>{post.publishedAt}</span>
              </div>
            </header>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333', margin: '1rem 0' }}>
              {post.excerpt}
            </p>

            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {post.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f0f0f0',
                    color: '#666',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    marginRight: '0.5rem'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <a
                href={`/posts/${post.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                阅读全文 →
              </a>
            </footer>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <p>没有找到匹配的文章</p>
        </div>
      )}

      {/* 页脚 */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        borderTop: '1px solid #eee',
        marginTop: '3rem'
      }}>
        <p style={{ color: '#666' }}>© 2025 我的技术博客. All rights reserved.</p>
        <div style={{ marginTop: '1rem' }}>
          <a href="/" style={{ color: '#007bff', textDecoration: 'none', margin: '0 1rem' }}>
            首页
          </a>
          <a href="/about" style={{ color: '#007bff', textDecoration: 'none', margin: '0 1rem' }}>
            关于
          </a>
          <a href="/contact" style={{ color: '#007bff', textDecoration: 'none', margin: '0 1rem' }}>
            联系
          </a>
        </div>
      </footer>
    </div>
  );
}

export default BlogList;