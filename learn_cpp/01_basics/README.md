# C++基础知识

## 学习目标

- 理解C++基本语法和编程范式
- 掌握基本的内存概念
- 能够编写和编译简单的C++程序
- 建立Java到C++的知识映射

## 核心概念

### 1. C++开发环境
- 编译器：g++, clang++
- 编译过程：预处理 → 编译 → 汇编 → 链接
- 基本编译命令：`g++ -std=c++17 source.cpp -o executable`

### 2. 基本语法对比（Java vs C++）

| 概念 | Java | C++ |
|------|------|-----|
| 文件组织 | .java文件 | .h头文件 + .cpp源文件 |
| 程序入口 | `public static void main(String[] args)` | `int main()` |
| 内存管理 | 垃圾回收 | 手动管理 |
| 命名空间 | package | namespace |
| 字符串 | String类 | std::string |

### 3. 数据类型
- **基本类型**：bool, char, int, float, double
- **类型修饰符**：signed, unsigned, short, long
- **类型推导**：auto关键字（C++11）
- **常量**：const, constexpr

### 4. 控制流
- 条件语句：if-else, switch-case
- 循环：for, while, do-while
- 跳转：break, continue, return

### 5. 函数
- 函数声明与定义
- 参数传递：值传递、引用传递、指针传递
- 函数重载
- 默认参数

### 6. 命名空间
- 定义和使用namespace
- using声明和using指令
- 标准命名空间std

## 文件结构

```
01_basics/
├── README.md                    # 本文件
├── examples/                    # 示例代码
│   ├── 01_hello_world.cpp      # Hello World程序
│   ├── 02_variables.cpp        # 变量和数据类型
│   ├── 03_operators.cpp        # 运算符
│   ├── 04_control_flow.cpp     # 控制流
│   ├── 05_functions.cpp        # 函数基础
│   ├── 06_namespaces.cpp       # 命名空间
│   ├── 07_pointers_intro.cpp   # 指针入门
│   └── 08_references.cpp       # 引用基础
├── exercises/                   # 练习题
│   ├── calculator.cpp          # 练习1：命令行计算器
│   └── text_processor.cpp      # 练习2：文本处理工具
└── solutions/                   # 练习答案
    ├── calculator_solution.cpp
    └── text_processor_solution.cpp
```

## 学习建议

1. **按顺序学习**：从examples/01开始，逐个运行和理解示例
2. **实践为主**：每个示例都要亲自编译运行
3. **对比思考**：思考与Java的差异点
4. **完成练习**：先独立完成，再对照答案

## 编译运行指南

```bash
# 进入01_basics目录
cd 01_basics

# 编译单个文件
g++ -std=c++17 examples/01_hello_world.cpp -o hello_world

# 运行程序
./hello_world

# 编译所有示例（使用通配符）
g++ -std=c++17 examples/*.cpp -o all_examples

# 启用所有警告
g++ -std=c++17 -Wall -Wextra examples/01_hello_world.cpp -o hello_world
```

## 常见问题

### Q: 为什么需要#include指令？
A: C++使用预处理器，#include将头文件内容插入当前文件中，提供函数和类的声明。

### Q: std::cout和Java的System.out.println()有什么区别？
A: std::cout是流对象，使用<<运算符；可以链式调用，更灵活。

### Q: C++的指针和Java的引用有什么区别？
A: C++指针是实际的内存地址，可以进行算术运算；Java引用更像是对象的别名。

## 下一步学习

完成本模块后，建议进入 `02_memory_management` 学习内存管理和指针的深入使用。

## 参考资源

- [cppreference.com](https://en.cppreference.com/w/) - C++标准库参考
- 《C++ Primer》第1-5章
- 《Effective C++》Items 1-4