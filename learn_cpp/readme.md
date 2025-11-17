# C++ 核心学习项目

> **广度优先学习** - 10-14天掌握C++核心知识，能独立完成小型项目

---

## 🚀 快速开始 (3选1)

| 如果你是... | 建议路径 | 预计时间 |
|------------|---------|---------|
| **完全新手** | [30分钟快速上手](QUICK_START.md) → [核心检查清单](CORE_CHECKLIST.md) | 10-14天 |
| **有编程基础** | [核心检查清单](CORE_CHECKLIST.md) → 运行示例代码 | 7-10天 |
| **只想速查** | [代码速查手册](CODE_PATTERNS/README.md) | 随时参考 |

---

## 📋 项目结构

```
learn_cpp/
├── QUICK_START.md           # 30分钟快速上手 ⭐ 新手必看
├── CORE_CHECKLIST.md        # 核心知识检查清单 ⭐ 学习主线
├── CODE_PATTERNS/           # 5个最常用代码模式 ⭐ 速查手册
├── TROUBLESHOOTING.md       # 5个最常见问题排查 ⭐ 遇到问题看这里
├── LEARNING_PATH.md         # 详细学习路线图 (深入学习参考)
│
├── examples/                # 15个核心示例文件 (01-15)
│   ├── 01_hello.cpp         # Hello World
│   ├── 07_pointers.cpp      # 指针基础 ⭐
│   ├── 11_smart_pointers.cpp # 智能指针 ⭐
│   └── 15_oop_intro.cpp     # OOP基础
├── exercises/               # 练习题文件
│   ├── 02_calculator.cpp    # 计算器练习
│   └── 10_simple_vector.cpp # 简单vector实现
├── solutions/               # 练习解答
│   └── 02_calculator_solution.cpp
│
├── backup_*/                # 原始文件备份
└── RENAME_PLAN.md          # 重命名方案文档
```

---

## 🎯 推荐学习流程

### 第1天: 环境和基础
- [ ] 阅读 [QUICK_START.md](QUICK_START.md)
- [ ] 完成环境搭建
- [ ] 运行 Hello World
- [ ] 运行 `examples/01_hello.cpp`

### 第2-5天: 核心概念
- [ ] 按照 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 学习
- [ ] 重点: 指针、智能指针、类、STL容器
- [ ] 运行 `examples/07_pointers.cpp`（指针基础）
- [ ] 运行 `examples/11_smart_pointers.cpp`（智能指针）

### 第6-10天: 实战项目
- [ ] 选择一个核心项目完成 (见 CORE_CHECKLIST.md 阶段3)
- [ ] 遇到问题查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- [ ] 需要代码参考查看 [CODE_PATTERNS](CODE_PATTERNS/README.md)

### 第11-14天: 巩固和扩展
- [ ] 完成练习题 `01_basics/exercises/`
- [ ] 完成练习题 `02_memory_management/exercises/`
- [ ] 复习核心知识点

---

## 📚 核心文档说明

| 文档 | 用途 | 何时查看 |
|------|------|---------|
| [QUICK_START.md](QUICK_START.md) | 30分钟入门 | 第一次使用 |
| [CORE_CHECKLIST.md](CORE_CHECKLIST.md) | 学习主线 | 系统学习时 |
| [CODE_PATTERNS](CODE_PATTERNS/README.md) | 代码速查 | 写代码时忘记语法 |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | 问题排查 | 遇到错误时 |
| [LEARNING_PATH.md](LEARNING_PATH.md) | 深度学习路线 | 想深入某个主题 |
| [CLAUDE.md](CLAUDE.md) | AI学习助手规则 | 与Claude协作学习时 |

---

## ✅ 学习目标

完成本项目后，你将能够:
- ✅ 理解 C++ 内存管理 (指针、引用、智能指针)
- ✅ 使用 STL 容器 (vector, map, string)
- ✅ 设计和实现简单的类
- ✅ 独立完成小型 C++ 项目
- ✅ 调试常见的 C++ 错误

**不包含** (需要额外深入学习):
- ❌ 高级模板元编程
- ❌ 复杂的多线程编程
- ❌ 底层系统编程
- ❌ 性能极致优化

---

## 🎓 学习原则

1. **广度优先** - 先掌握20%核心知识解决80%问题
2. **实践为主** - 每个概念都要运行代码验证
3. **问题驱动** - 遇到问题立即查 TROUBLESHOOTING
4. **小步快跑** - 每天1-2小时，持续学习
5. **及时反馈** - 不懂就问，不要堆积问题

---

## 💡 使用建议

### 编译和运行示例
```bash
# 进入对应目录
cd 01_basics

# 编译单个文件 (推荐加上警告)
g++ -std=c++17 -Wall -Wextra examples/01_hello_world.cpp -o hello

# 运行
./hello
```

### 调试问题
1. 先查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. 使用 `gdb` 调试: `gdb ./program`
3. 检测内存泄漏: `valgrind --leak-check=full ./program`

---

## 📊 进度追踪

在 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 中勾选完成的项目。

---

## 🆘 获取帮助

- **查看文档**: 99%的问题在 TROUBLESHOOTING.md 中有答案
- **运行示例**: examples/ 目录有完整可运行代码
- **使用 Claude**: 根据 CLAUDE.md 的指导与AI协作学习
- **在线资源**: [cppreference.com](https://en.cppreference.com/w/)

---

**开始学习**: 打开 [QUICK_START.md](QUICK_START.md) 开始30分钟快速上手！
