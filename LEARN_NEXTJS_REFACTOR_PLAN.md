# Learn Next.js 项目重构计划

> **目标**：按照 learn_go 的成功模式，统一编号规则，简化结构

---

## 🎯 重构目标

### 当前问题
- 目录结构复杂（01-fundamentals/02-pages-routing/）
- 编号不统一，学习顺序不清晰
- 文件分散，难以追踪进度

### 目标状态
- 统一的两位数编号规则
- 扁平化的 examples/ 目录结构
- 清晰的学习阶段划分

---

## 📚 新的编号规则

### 阶段划分（适配 Next.js 特点）

**阶段 1: 基础语法（01-06）**
- 01_hello.ts - Next.js 项目设置和 Hello World
- 02_routing.ts - 页面路由基础
- 03_layouts.ts - 布局和导航
- 04_styling.ts - 样式系统（CSS Modules、Tailwind）
- 05_data_basic.ts - 基础数据获取
- 06_assets.ts - 静态资源管理

**阶段 2: React 核心概念（07-09）**
- 07_components.ts - 组件基础（服务器/客户端组件）
- 08_state.ts - 状态管理（useState、useEffect）
- 09_forms.ts - 表单处理

**阶段 3: Next.js 高级特性（10-12）**
- 10_data_advanced.ts - 高级数据获取（缓存、重新验证）
- 11_api.ts - API 路由和后端开发
- 12_auth.ts - 认证和授权

**阶段 4: 实战项目（13-15）**
- 13_blog.ts - 博客系统（简单项目）
- 14_dashboard.ts - 数据仪表板（中等项目）
- 15_ecommerce.ts - 电商平台（复杂项目）

---

## 🏗️ 新目录结构

```
learn_nextjs/
├── README.md                    # 项目总览
├── CLAUDE.md                    # 学习助手规则
├── QUICK_START.md               # 30分钟快速上手
├── CORE_CHECKLIST.md            # 核心知识检查清单
├── package.json                 # 项目依赖
├── next.config.ts               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
│
├── examples/                    # 示例代码（统一编号）
│   ├── 01_hello.ts
│   ├── 02_routing.ts
│   ├── ...
│   └── 15_ecommerce.ts
│
├── app/                         # Next.js App Router
│   ├── components/              # 全局组件
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
└── projects/                    # 完整项目代码
    ├── blog-system/
    ├── data-dashboard/
    └── ecommerce-platform/
```

---

## 🔄 迁移步骤

### 第 1 步：整理现有示例
1. 从 `01-fundamentals/` 提取核心示例
2. 重命名为统一编号格式
3. 移动到 `examples/` 目录

### 第 2 步：创建缺失示例
1. 补充 10-12 号高级特性示例
2. 创建 13-15 号实战项目框架

### 第 3 步：更新文档
1. 更新 README.md 反映新结构
2. 创建 QUICK_START.md
3. 创建 CORE_CHECKLIST.md

### 第 4 步：清理旧结构
1. 删除复杂的旧目录
2. 更新导入路径
3. 确保所有示例可运行

---

## 📋 具体映射关系

| 旧路径 | 新编号 | 新文件名 |
|--------|--------|----------|
| 01-fundamentals/02-pages-routing/ | 02_routing.ts | 路由基础 |
| 01-fundamentals/03-react-basics/ | 07_components.ts | 组件基础 |
| 01-fundamentals/04-data-fetching/ | 10_data_advanced.ts | 高级数据获取 |
| 01-fundamentals/05-styling-assets/ | 04_styling.ts | 样式系统 |
| 01-fundamentals/06-server-client-components/ | 07_components.ts | 服务器/客户端组件 |
| 01-fundamentals/07-routing-navigation/ | 03_layouts.ts | 布局和导航 |
| 02-advanced/01-form-handling/ | 09_forms.ts | 表单处理 |
| 02-advanced/02-auth-authorization/ | 12_auth.ts | 认证和授权 |
| 02-advanced/03-database-integration/ | 11_api.ts | API 和数据库 |

---

## ✅ 验收标准

### 结构标准
- [ ] 所有示例文件在 `examples/` 目录下
- [ ] 文件名统一为 `XX_description.ts` 格式
- [ ] 编号从 01-15 连续，无遗漏
- [ ] 目录层级不超过 3 层

### 功能标准
- [ ] 所有示例代码可运行
- [ ] 每个示例有清晰注释
- [ ] README.md 正确反映新结构
- [ ] QUICK_START.md 可在 30 分钟内完成

### 学习体验标准
- [ ] 学习顺序一目了然
- [ ] 阶段划分清晰
- [ ] 进度追踪方便

---

## 🚀 执行计划

### 阶段 1：分析整理（1小时）
- [x] 分析现有结构
- [x] 制定编号规则
- [ ] 创建迁移映射表

### 阶段 2：重构执行（2小时）
- [ ] 创建新目录结构
- [ ] 迁移和重命名示例文件
- [ ] 更新代码导入路径

### 阶段 3：补充内容（2小时）
- [ ] 创建缺失的示例文件
- [ ] 编写实战项目框架
- [ ] 更新所有文档

### 阶段 4：测试验证（1小时）
- [ ] 运行所有示例确保可用
- [ ] 验证学习路径是否清晰
- [ ] 更新 LEARNING_TRACKER.md

---

## 📝 注意事项

1. **保持向后兼容**：保留原有的复杂结构作为 backup
2. **渐进式迁移**：先建新结构，再删除旧结构
3. **测试驱动**：每个迁移步骤都要确保代码可运行
4. **文档同步**：代码迁移的同时更新文档

---

**预期效果**：迁移后的 learn_nextjs 将具备和 learn_go 一样的清晰结构，学习体验显著提升！