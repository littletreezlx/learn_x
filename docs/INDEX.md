# Learn X - 场景驱动文档索引

**最后更新**: 2025-11-19

这个索引帮助你根据**要做的事情**快速找到需要的文档，而不是漫无目的地浏览所有文档。

## 🎯 我要做什么？

### 🆕 我要开始学习某个技术

**应该读什么**:
1. 根目录 [README.md](../README.md) - 了解项目结构
2. 对应模块的 README - 了解学习路径
3. 对应模块的 `01_basics/` 或类似入门目录

**操作步骤**:
```bash
cd learn_xxx
cat README.md
# 从基础模块开始学习
```

**相关模块**:
- [learn_cpp](../learn_cpp/) - C++ 学习
- [learn_nextjs](../learn_nextjs/) - Next.js 学习
- [learn_vue](../learn_vue/) - Vue.js 学习

---

### 🔍 我要查找特定知识点

**应该读什么**:
1. [FEATURE_CODE_MAP.md](../FEATURE_CODE_MAP.md) - 快速定位代码位置
2. 对应模块的具体目录

**操作步骤**:
```bash
# 1. 查看功能映射表
cat FEATURE_CODE_MAP.md | grep "关键词"

# 2. 直接跳转到目标位置
cd [映射表显示的路径]
```

**示例**:
- 查找"智能指针" → learn_cpp/02_memory_management/
- 查找"Server Actions" → learn_nextjs/02-advanced/01-form-handling/

---

### 📝 我要添加新的学习内容

**应该读什么**:
1. [CLAUDE.md](../CLAUDE.md) - 了解项目规范
2. [standards/LEARNING_CONTENT_STANDARD.md](standards/LEARNING_CONTENT_STANDARD.md) - 学习内容规范（待创建）
3. 对应模块的 CLAUDE.md（如果有）

**操作步骤**:
1. 确定内容归属（模块、主题）
2. 在对应目录创建文件
3. 编写代码和注释
4. 更新模块 README
5. 更新 FEATURE_CODE_MAP.md

**必须更新的文档**:
- ✅ FEATURE_CODE_MAP.md
- ✅ 模块的 README.md

---

### 🔧 我要完善某个学习模块

**应该读什么**:
1. [PROJECT_STATUS.md](../PROJECT_STATUS.md) - 了解当前进度和技术债务
2. 对应模块的 README - 了解学习路线图
3. 对应模块的 CLAUDE.md（如果有）

**优先级参考**:
- **高优先级**: PROJECT_STATUS.md 中的"高优先级"任务
- **中优先级**: 缺少文档的模块
- **低优先级**: 优化和扩展已有内容

**操作步骤**:
1. 查看学习路线图，识别缺失内容
2. 按照学习路线图的顺序补充
3. 更新进度追踪
4. 更新 PROJECT_STATUS.md

---

### 🤖 我要使用 AI 辅助学习

**应该读什么**:
1. [CLAUDE.md](../CLAUDE.md) - AI 操作指南
2. 对应模块的 CLAUDE.md（如果有）
3. [FEATURE_CODE_MAP.md](../FEATURE_CODE_MAP.md) - 快速定位

**AI 可以帮助做什么**:
- ✅ 生成示例代码和详细注释
- ✅ 解释复杂概念
- ✅ 生成学习笔记和总结
- ✅ 对比不同实现方式
- ✅ 代码审查和改进建议

**AI 不应该做什么**:
- ❌ 过度优化学习代码（保持简单易懂）
- ❌ 要求严格的生产环境规范
- ❌ 删除对比学习的多种实现

---

### 🆕 我要创建新的学习模块

**应该读什么**:
1. [CLAUDE.md](../CLAUDE.md) - 了解项目规范
2. [standards/MODULE_STRUCTURE_STANDARD.md](standards/MODULE_STRUCTURE_STANDARD.md) - 模块结构规范（待创建）
3. 参考 learn_cpp 或 learn_nextjs 的结构

**操作步骤**:
1. 在根目录创建 `learn_xxx/` 目录
2. 创建基础结构（README, CLAUDE.md等）
3. 规划学习路线图
4. 更新根目录的 README.md
5. 更新 PROJECT_STATUS.md
6. 更新 FEATURE_CODE_MAP.md

**必须创建的文件**:
- ✅ learn_xxx/README.md
- ✅ 学习路线图或目录结构

**推荐创建的文件**:
- ⏸️ learn_xxx/CLAUDE.md

---

### 🐛 我遇到问题需要调试

**学习项目的特点**:
- ⏸️ 学习代码**允许有错误**（这也是学习的一部分）
- ⏸️ 不需要严格的错误处理
- ⏸️ 可以保留多个版本的实现（包括错误的实现）

**操作建议**:
1. 先尝试自己理解和解决
2. 记录错误和解决过程（学习笔记）
3. 保留多个版本的实现（对比学习）
4. 在代码注释中说明常见错误

---

### 📊 我要查看学习进度

**应该读什么**:
1. [PROJECT_STATUS.md](../PROJECT_STATUS.md) - 整体进度和计划
2. 各模块 README 中的"学习进度追踪"部分

**进度追踪方式**:
- ✅ 使用模块 README 中的进度表格
- ✅ 更新 PROJECT_STATUS.md 的"重大变更记录"
- ⏸️ 不需要详细的时间记录（学习节奏灵活）

---

## 📚 文档分层系统

### ⭐ 第一层：核心文档（经常使用）
| 文档 | 路径 | 用途 |
|------|------|------|
| 项目总览 | [README.md](../README.md) | 了解项目结构和快速导航 |
| AI 操作指南 | [CLAUDE.md](../CLAUDE.md) | AI 辅助开发规范 |
| 项目状态 | [PROJECT_STATUS.md](../PROJECT_STATUS.md) | 当前进度和技术债务 |
| 模块映射 | [FEATURE_CODE_MAP.md](../FEATURE_CODE_MAP.md) | 快速定位代码位置 |

### 📋 第二层：开发规范（需要时查阅）
| 文档 | 路径 | 用途 |
|------|------|------|
| 学习内容规范 | [standards/LEARNING_CONTENT_STANDARD.md](standards/LEARNING_CONTENT_STANDARD.md) | 如何组织学习内容（待创建） |
| 模块结构规范 | [standards/MODULE_STRUCTURE_STANDARD.md](standards/MODULE_STRUCTURE_STANDARD.md) | 如何创建新模块（待创建） |
| 文档编写规范 | [standards/DOCUMENTATION_STANDARD.md](standards/DOCUMENTATION_STANDARD.md) | 如何编写文档（待创建） |

### 🎯 第三层：架构与决策（理解"为什么"）
| 文档 | 路径 | 用途 |
|------|------|------|
| 决策记录索引 | [decisions/INDEX.md](decisions/INDEX.md) | 重要学习路径决策（待创建） |

---

## 💡 使用技巧

### 快速查找
1. **按场景**: 使用本文档"我要做什么"部分
2. **按模块**: 使用 FEATURE_CODE_MAP.md
3. **按关键词**: 在项目中搜索关键词

### 高效学习
1. **循序渐进**: 按照学习路线图顺序学习
2. **动手实践**: 每个概念都要写代码验证
3. **及时记录**: 记录学习心得和常见错误
4. **对比学习**: 保留多种实现方式

### AI 辅助
1. **明确需求**: 告诉 AI 你在学习什么概念
2. **保持简单**: 要求简单易懂的实现
3. **多问为什么**: 理解原理比记住代码更重要
4. **代码审查**: 让 AI 检查你的理解是否正确

---

## 🔗 快速链接

### 常用文档
- [项目总览](../README.md)
- [AI 操作指南](../CLAUDE.md)
- [项目状态](../PROJECT_STATUS.md)
- [模块映射](../FEATURE_CODE_MAP.md)

### 学习模块
- [C++ 学习](../learn_cpp/)
- [Next.js 学习](../learn_nextjs/)
- [Vue.js 学习](../learn_vue/)
- [Docker 学习](../learn_docker/)
- [Git 学习](../learn_git/)

### 规范文档
- [学习内容规范](standards/LEARNING_CONTENT_STANDARD.md)（待创建）
- [模块结构规范](standards/MODULE_STRUCTURE_STANDARD.md)（待创建）
- [文档编写规范](standards/DOCUMENTATION_STANDARD.md)（待创建）

---

**注意**: 这是一个学习项目，重点在于理解概念和积累经验，而不是严格的工程规范。
