# Learn Next.js - 全栈开发学习项目

> **面向有 Java 背景的开发者** - 15天掌握 Next.js 全栈开发

---

## 🎯 项目定位

这是一个**系统化的 Next.js 全栈开发学习项目**，采用最新的 App Router 架构，帮助 Java 开发者快速掌握现代 Web 全栈开发。

### 为什么选择 Next.js？

| 特性 | Spring Boot | Next.js | Next.js 优势 |
|------|-------------|---------|-------------|
| **开发效率** | 配置复杂，前后端分离 | 约定优于配置，全栈一体 | 一个项目搞定所有功能 |
| **学习曲线** | 概念多，框架重 | 概念少，实用性强 | 更快上手，更容易出成果 |
| **部署方式** | 需要服务器 | 一键部署到 Vercel | 零运维，自动扩缩容 |
| **性能优化** | 需要手动优化 | 内置 SSR/SSG/ISR | 开箱即用的性能优化 |
| **开发体验** | 重启频繁，热更新慢 | 快速热更新，错误提示好 | 开发更流畅，调试更容易 |

---

## 🚀 快速开始

### 30分钟快速上手
```bash
# 1. 快速了解 Next.js
cat QUICK_START.md

# 2. 查看核心技能清单
cat CORE_CHECKLIST.md

# 3. 开始第一个示例
cd examples
# 查看 01_hello.tsx
```

### 创建项目
```bash
# 创建新项目
npx create-next-app my-next-app --typescript --tailwind --eslint

# 进入项目
cd my-next-app

# 启动开发服务器
npm run dev
```

---

## 📚 学习路径

### 🎯 学习目标
- ✅ 掌握 Next.js App Router
- ✅ 理解 React Server Components
- ✅ 实现全栈应用开发
- ✅ 学会部署和优化

### 📈 学习阶段

**阶段 1: 基础语法（01-06）** - 预计 2-3 天
- `01_hello.tsx` - Hello World，项目结构理解
- `02_routing.tsx` - 路由系统，动态路由
- `03_layouts.tsx` - 布局系统，导航组件
- `04_styling.tsx` - 样式系统，Tailwind CSS
- `05_data_basic.tsx` - 基础数据获取，组件通信
- `06_assets.tsx` - 静态资源管理，图片优化

**阶段 2: React 核心概念（07-09）** - 预计 2-3 天
- `07_components.tsx` - 组件系统，服务端 vs 客户端
- `08_state.tsx` - 状态管理，React Hooks
- `09_forms.tsx` - 表单处理，Server Actions

**阶段 3: Next.js 高级特性（10-12）** - 预计 2-3 天
- `10_data_advanced.tsx` - 高级数据获取，缓存策略
- `11_api.tsx` - API 路由开发，RESTful API
- `12_auth.tsx` - 认证授权，权限管理

**阶段 4: 实战项目（13-15）** - 预计 3-4 天
- `13_blog.tsx` - 博客系统（入门级）
- `14_dashboard.tsx` - 数据仪表板（中等级）
- `15_ecommerce.tsx` - 电商平台（高级）

---

## 🏗️ 项目结构

```
learn_nextjs/
├── README.md                   # 项目说明（本文件）
├── QUICK_START.md              # 30分钟快速上手
├── CORE_CHECKLIST.md           # 核心技能检查清单
├── CLAUDE.md                   # 学习助手规则
│
├── examples/                   # 示例代码（按编号顺序学习）
│   ├── 01_hello.tsx            # 从这里开始！
│   ├── 02_routing.tsx
│   ├── 03_layouts.tsx
│   ├── 04_styling.tsx
│   ├── 05_data_basic.tsx
│   ├── 06_assets.tsx
│   ├── 07_components.tsx
│   ├── 08_state.tsx
│   ├── 09_forms.tsx
│   ├── 10_data_advanced.tsx
│   ├── 11_api.tsx
│   ├── 12_auth.tsx
│   ├── 13_blog.tsx
│   ├── 14_dashboard.tsx        # 待完成
│   └── 15_ecommerce.tsx        # 待完成
│
├── projects/                   # 完整实战项目
│   ├── blog-system/            # 博客系统
│   ├── data-dashboard/         # 数据仪表板
│   └── ecommerce-platform/     # 电商平台
│
└── styles.module.css           # 示例样式文件
```

---

## 💡 Java 开发者特别指南

### 概念对比表

| Java/Spring 概念 | Next.js 对应 | 关键差异 |
|------------------|-------------|----------|
| `@RestController` | API Route (`app/api/.../route.ts`) | 文件即路由，无需注解 |
| `@GetMapping` | `export async function GET()` | 命名函数代替注解 |
| `@Service` | 自定义 Hook/工具函数 | 函数式而非面向对象 |
| `@Autowired` | React Context/Props | 依赖注入 vs 数据流 |
| `Thymeleaf` | JSX/TSX | 编译时 vs 运行时模板 |
| `HttpSession` | Cookies/useState | 服务端 vs 客户端状态 |
| `@Valid` | Zod/手动验证 | Schema 验证 vs 注解验证 |

### 学习重点

#### 1. 思维模式转变
```java
// Java 思维：面向对象
public class UserService {
    @Autowired
    private UserRepository repo;

    public User getUser(Long id) {
        return repo.findById(id);
    }
}
```

```tsx
// Next.js 思维：函数式 + 组合
function useUser(id: number) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  return user;
}
```

#### 2. 项目结构理解
```
Spring Boot 项目            Next.js 项目
├── src/main/java/          ├── app/
│   ├── controller/         │   ├── api/          # API 路由
│   ├── service/            │   ├── layout.tsx    # 布局
│   └── repository/         │   └── page.tsx     # 页面
├── src/main/resources/     ├── public/          # 静态资源
│   ├── static/             └── styles/          # 样式文件
│   └── templates/
└── pom.xml                 └── package.json
```

---

## 🎯 学习建议

### 高效学习路径

1. **第 1-2 天**：完成 01-06 号示例
   - 理解 Next.js 基本概念
   - 掌握路由和组件基础
   - 熟悉样式系统

2. **第 3-5 天**：完成 07-09 号示例
   - 掌握 React 核心概念
   - 学会状态管理和表单处理

3. **第 6-8 天**：完成 10-12 号示例
   - 深入理解数据获取
   - 学会 API 开发和认证

4. **第 9-12 天**：完成实战项目 13-15
   - 构建完整应用
   - 部署到生产环境

### 学习技巧

#### ✅ 推荐做法
- **边学边做**：每个示例都要亲自运行和修改
- **对比理解**：不断与 Java/Spring 对比
- **项目驱动**：以完成实际项目为目标
- **查阅文档**：遇到问题先看官方文档

#### ❌ 避免误区
- **过度设计**：不要用 Java 思维过度抽象
- **忽视类型**：TypeScript 很重要，不要跳过
- **只看不练**：必须亲手写代码
- **孤立学习**：多与其他技术对比理解

---

## 📊 完成标准

### ✅ 基础掌握（第1-2周）
- [ ] 能够创建 Next.js 项目
- [ ] 理解 App Router 和组件系统
- [ ] 掌握基本的样式和布局
- [ ] 会创建简单的 API 路由

### ✅ 进阶应用（第3-4周）
- [ ] 能够处理复杂的表单和状态
- [ ] 掌握数据获取和缓存策略
- [ ] 实现用户认证和权限
- [ ] 完成至少一个完整项目

### ✅ 生产就绪（第5-6周）
- [ ] 了解性能优化技巧
- [ ] 掌握部署和监控
- [ ] 能够处理错误和边界情况
- [ ] 具备独立开发能力

---

## 🛠️ 开发环境

### 必需工具
- **Node.js** 18+
- **代码编辑器**：VS Code（推荐）
- **浏览器**：Chrome（用于调试）

### 推荐扩展
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter

### 开发技巧
```bash
# 快速创建组件
npx create-next-component MyComponent

# 类型检查
npm run type-check

# 代码格式化
npm run format

# 构建检查
npm run build
```

---

## 🚀 部署指南

### Vercel 部署（推荐）
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录并部署
vercel login
vercel

# 3. 每次更新
vercel --prod
```

### 自定义服务器
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## 💬 学习支持

### 获取帮助
- 📖 查阅 `CORE_CHECKLIST.md` 了解具体技能要求
- 🚀 从 `QUICK_START.md` 开始快速上手
- 🔍 运行 `examples/` 中的示例代码

### 学习社区
- [Next.js 官方文档](https://nextjs.org/docs)
- [React 学习资源](https://react.dev/learn)
- [Vercel Discord 社区](https://vercel.com/discord)

---

## 📝 项目状态

- ✅ **已完成**：基础示例（01-12），快速入门指南
- 🔄 **进行中**：实战项目开发，文档完善
- 📋 **计划中**：高级特性，部署优化

---

**开始学习**：查看 `examples/01_hello.tsx`，开始你的 Next.js 之旅！ 🎉