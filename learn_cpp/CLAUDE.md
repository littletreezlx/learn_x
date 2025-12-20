# Learn C++ - Claude Code 操作指南

**模块类型**: Java 开发者的 C++ 学习之旅
**最后更新**: 2025-11-19

## ⭐ 模块特点

这是一个为有 Java 背景的开发者设计的 C++ 学习模块，通过结构化的路径和对比学习帮助快速掌握 C++ 核心概念。

### 学习重点
- ✅ 理解 C++ 的内存模型（vs Java 的自动内存管理）
- ✅ 掌握指针和引用（Java 没有的概念）
- ✅ 理解编译型语言的特点（vs Java 的解释执行）
- ✅ 掌握现代 C++ 的最佳实践（C++11/14/17/20）

## 🎯 我（Claude Code）要做什么？

| 场景 | 应该读什么 | 操作指南 |
|------|-----------|---------|
| 🆕 添加新示例代码 | 对应主题的 README | 1. 在对应主题目录创建示例<br>2. 添加详细注释<br>3. 更新主题 README<br>4. 更新根目录 FEATURE_CODE_MAP.md |
| 📖 查找特定概念 | [java_to_cpp/README.md](java_to_cpp/README.md) | 使用 Java 到 C++ 的映射表快速定位 |
| 🔧 完善某个主题 | 主题的 README + 学习路线图 | 按照学习路线图补充缺失内容 |
| 📝 解释复杂概念 | 相关示例代码 + 最佳实践 | 在代码注释或主题 README 中详细解释 |
| 🤔 对比 Java 和 C++ | [java_to_cpp/](java_to_cpp/) | 在对比文档中添加示例和说明 |

## 📋 学习路线图

### 阶段 1: 基础知识 (01-03)
1. **01_basics** - C++ 基础语法
   - 数据类型、控制流、函数
   - 编译和链接过程
   - 命名空间和作用域

2. **02_memory_management** - 内存管理 ⭐
   - 栈 vs 堆（vs Java 的自动管理）
   - 指针和引用（Java 没有的概念）
   - 智能指针（现代 C++ 的核心）
   - RAII 模式

3. **03_oop** - 面向对象编程
   - 类和对象（vs Java 的类）
   - 继承和多态（vs Java 的实现）
   - 访问控制（vs Java 的修饰符）

### 阶段 2: 高级特性 (04-06)
4. **04_advanced_features** - 高级特性
   - 模板（vs Java 泛型）
   - 异常处理（vs Java 的异常）
   - RTTI 和类型转换

5. **05_stl** - 标准模板库
   - 容器（vs Java Collections）
   - 迭代器（vs Java Iterator）
   - 算法库

6. **06_modern_cpp** - 现代 C++ ⭐
   - C++11: auto, lambda, 移动语义
   - C++14/17: 更多语法糖
   - C++20: concepts, ranges

### 阶段 3: 实战技能 (07-10)
7. **07_concurrency** - 并发编程
   - 线程（vs Java Thread）
   - 互斥和同步（vs Java synchronized）
   - 原子操作

8. **08_performance** - 性能优化
   - 性能分析工具
   - 优化技术
   - 最佳实践

9. **09_design_patterns** - 设计模式
   - 常用设计模式的 C++ 实现
   - vs Java 实现的对比

10. **10_project_templates** - 项目模板
    - CMake 构建系统
    - 测试框架
    - CI/CD 配置

## 📝 代码规范

### 示例代码规范
```cpp
/**
 * 文件用途：智能指针示例
 *
 * 核心概念：
 * - unique_ptr: 独占所有权（类似 Java 的强引用）
 * - shared_ptr: 共享所有权（类似引用计数）
 * - weak_ptr: 弱引用（避免循环引用）
 *
 * 与 Java 对比：
 * - Java 自动管理内存，C++ 需要手动管理
 * - 智能指针是 C++ 的自动内存管理方案
 */

#include <memory>
#include <iostream>

// 示例类
class Resource {
public:
    Resource() { std::cout << "Resource acquired\n"; }
    ~Resource() { std::cout << "Resource released\n"; }
};

int main() {
    // unique_ptr - 独占所有权
    {
        std::unique_ptr<Resource> ptr1 = std::make_unique<Resource>();
        // ptr1 离开作用域时自动释放资源
    }

    // shared_ptr - 共享所有权
    {
        std::shared_ptr<Resource> ptr2 = std::make_shared<Resource>();
        std::shared_ptr<Resource> ptr3 = ptr2; // 引用计数 +1
        // 最后一个 shared_ptr 离开作用域时释放资源
    }

    return 0;
}
```

### 代码组织原则
- ✅ 每个示例都是独立的完整程序（可以直接编译运行）
- ✅ 关键概念必须有注释解释
- ✅ 复杂示例要拆分为多个简单示例
- ✅ 提供编译和运行命令
- ✅ 对比 Java 的实现（在注释或文档中）

### 文件命名规范
```
主题目录/
├── README.md                    # 主题概览
├── 01_concept_name.cpp          # 基础概念示例
├── 02_advanced_concept.cpp      # 进阶概念示例
├── 03_common_pitfalls.cpp       # 常见陷阱示例
└── 04_best_practices.cpp        # 最佳实践示例
```

## 🎯 核心工作流

### 添加新的示例代码

**步骤**:
1. 确定主题归属（01-10 哪个目录）
2. 创建 `.cpp` 文件，使用编号命名
3. 编写完整的可运行程序
4. 添加详细注释（概念解释 + Java 对比）
5. 更新主题 README
6. 更新 FEATURE_CODE_MAP.md

**示例**:
```bash
cd 02_memory_management
# 创建 05_smart_pointers_advanced.cpp
# 编写代码和注释
# 更新 02_memory_management/README.md
# 更新根目录的 FEATURE_CODE_MAP.md
```

### 完善某个主题

**步骤**:
1. 阅读主题 README 了解当前内容
2. 识别缺失的概念或示例
3. 按照基础 → 进阶 → 陷阱 → 最佳实践的顺序补充
4. 更新主题 README
5. 更新学习进度追踪

### 添加 Java 到 C++ 的对比

**步骤**:
1. 在 `java_to_cpp/` 目录创建或更新对应文档
2. 提供 Java 和 C++ 的代码示例对比
3. 解释关键差异和注意事项
4. 更新 java_to_cpp/README.md

## 🚫 禁止事项

### 不要过度复杂化
- ❌ 不要在示例中使用过多高级特性（保持简单）
- ❌ 不要写生产级别的完整项目（专注概念学习）
- ❌ 不要过度抽象（直观易懂优先）

### 不要忽略 Java 对比
- ❌ 不要只解释 C++ 概念而不对比 Java
- ❌ 不要假设学习者已经忘记 Java
- ❌ 不要使用 Java 没有的术语而不解释

## 🔧 编译和运行

### 基础编译
```bash
# 编译单个文件
g++ -std=c++17 example.cpp -o example
./example

# 带调试信息
g++ -std=c++17 -g example.cpp -o example
```

### 推荐编译器选项
```bash
# 推荐使用的编译选项
g++ -std=c++17 -Wall -Wextra -pedantic example.cpp -o example
```

### CMake 项目（10_project_templates）
```bash
mkdir build && cd build
cmake ..
make
./example
```

## 📊 学习进度追踪

在模块 README 中使用进度表格：

```markdown
| 主题 | 状态 | 完成日期 | 笔记 |
|------|------|----------|------|
| 01_basics | ✅ 已完成 | 2025-XX-XX | 基础扎实 |
| 02_memory_management | 🔄 学习中 | - | 重点：智能指针 |
| 03_oop | ⏸️ 未开始 | - | |
```

## 💡 AI 辅助学习建议

### 生成示例代码
- ✅ 可以生成多个版本的实现（对比学习）
- ✅ 必须包含详细注释
- ✅ 必须可以直接编译运行
- ✅ 必须对比 Java 的实现

### 解释概念
- ✅ 从 Java 开发者的角度解释
- ✅ 强调与 Java 的差异
- ✅ 提供实际应用场景
- ✅ 指出常见陷阱

### 代码审查
- ✅ 检查是否符合现代 C++ 最佳实践
- ✅ 检查注释是否充分
- ✅ 检查是否有内存泄漏
- ⏸️ 不需要过于严格的风格检查

## 🔗 相关文档

### 模块文档
- [learn_cpp/README.md](README.md) - 模块总览
- [LEARNING_PATH.md](LEARNING_PATH.md) - 详细学习路线
- [java_to_cpp/README.md](java_to_cpp/README.md) - Java 到 C++ 迁移指南

### 全局文档
- [根目录 README](../README.md) - 项目总览
- [根目录 CLAUDE.md](../CLAUDE.md) - 全局 AI 操作指南
- [FEATURE_CODE_MAP.md](../FEATURE_CODE_MAP.md) - 快速定位

## 📚 重点主题

### ⭐ 必须深入理解的概念
1. **内存管理** (02_memory_management)
   - 这是 C++ 和 Java 最大的区别
   - 智能指针是现代 C++ 的核心
   - RAII 是 C++ 的设计哲学

2. **移动语义** (06_modern_cpp)
   - C++11 最重要的特性
   - Java 没有的概念
   - 性能优化的关键

3. **模板编程** (04_advanced_features)
   - 比 Java 泛型更强大
   - 编译期计算
   - STL 的基础

### ⏸️ 可以浅尝辄止的概念
- 复杂的模板元编程
- 底层的内存布局细节
- 历史遗留特性（如 C 风格字符串）

---

**注意**: 这是一个学习项目，重点在于理解概念和对比 Java。保持代码简单清晰，避免过度设计。
