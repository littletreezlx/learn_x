# C++内存管理

## 学习目标

- 深入理解C++内存模型和布局
- 掌握指针和引用的高级使用
- 学习手动内存管理技术
- 理解智能指针和RAII原则
- 能够识别和避免常见内存错误

## 核心概念

### 1. 内存布局

| 内存区域 | 作用 | 特点 | Java对比 |
|----------|------|------|----------|
| 栈(Stack) | 局部变量、函数参数 | 自动管理、速度快 | 局部变量存储 |
| 堆(Heap) | 动态分配内存 | 手动管理、灵活 | 对象存储(GC管理) |
| 全局/静态区 | 全局变量、静态变量 | 程序生命周期 | 类变量 |
| 代码段 | 程序指令 | 只读 | 方法区 |

### 2. 指针深入

- **指针算术**：指针的加减运算
- **多级指针**：指向指针的指针
- **函数指针**：指向函数的指针
- **const指针**：常量指针和指向常量的指针

### 3. 动态内存管理

- **new/delete**：C++的内存分配和释放
- **new[]/delete[]**：数组的动态分配
- **内存泄漏**：忘记释放内存
- **悬空指针**：指向已释放内存的指针
- **重复释放**：多次删除同一内存

### 4. 智能指针 (C++11)

- **unique_ptr**：独占所有权
- **shared_ptr**：共享所有权
- **weak_ptr**：弱引用，打破循环依赖

### 5. RAII原则

Resource Acquisition Is Initialization - 资源获取即初始化

## 文件结构

```
02_memory_management/
├── README.md                    # 本文件
├── examples/                    # 示例代码
│   ├── 01_memory_layout.cpp     # 内存布局演示
│   ├── 02_pointer_arithmetic.cpp # 指针算术
│   ├── 03_dynamic_allocation.cpp # 动态内存分配
│   ├── 04_memory_errors.cpp     # 常见内存错误
│   ├── 05_smart_pointers.cpp    # 智能指针基础
│   ├── 06_raii_principle.cpp    # RAII原则
│   ├── 07_custom_allocator.cpp  # 自定义分配器
│   └── 08_memory_pool.cpp       # 内存池实现
├── exercises/                   # 练习题
│   ├── simple_vector.cpp        # 练习1：简单向量实现
│   └── memory_leak_detector.cpp # 练习2：内存泄漏检测器
└── solutions/                   # 练习答案
    ├── simple_vector_solution.cpp
    └── memory_leak_detector_solution.cpp
```

## 与Java的对比

### 内存管理方式

| 特性 | C++ | Java |
|------|-----|------|
| 内存分配 | 手动(new/delete) | 自动(new) |
| 内存释放 | 手动(delete) | 垃圾回收器 |
| 性能控制 | 完全控制 | 受GC影响 |
| 内存泄漏 | 可能发生 | 很少发生 |
| 学习难度 | 较高 | 较低 |

### 智能指针 vs Java引用

```cpp
// C++ 智能指针
std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
// 自动释放，无需手动delete

// Java 引用
MyClass obj = new MyClass();
// GC自动管理
```

## 学习路径

1. **理解内存布局** - 栈、堆、全局区的区别
2. **掌握指针进阶** - 算术、多级、函数指针
3. **学习动态分配** - new/delete的正确使用
4. **识别内存错误** - 泄漏、悬空、重复释放
5. **应用智能指针** - 现代C++的内存管理
6. **实践RAII** - 资源管理最佳实践

## 编译建议

```bash
# 启用内存检查
g++ -std=c++17 -Wall -Wextra -g examples/filename.cpp -o output

# 使用valgrind检测内存错误 (Linux/Mac)
valgrind --leak-check=full ./output

# 使用AddressSanitizer
g++ -std=c++17 -fsanitize=address -g examples/filename.cpp -o output
```

## 常见陷阱

1. **忘记释放内存** - 每个new都要有对应的delete
2. **悬空指针** - 删除后将指针设为nullptr
3. **数组释放错误** - new[]要用delete[]
4. **重复释放** - 检查指针是否为nullptr
5. **this指针误用** - 不要delete this

## 最佳实践

1. **优先使用智能指针** - 避免手动内存管理
2. **遵循RAII原则** - 构造函数获取资源，析构函数释放
3. **避免裸指针** - 除非性能关键场景
4. **使用容器类** - vector、string等自动管理内存
5. **定期检查内存** - 使用工具检测泄漏

## 下一步学习

完成本模块后，建议进入 `03_oop` 学习面向对象编程，其中会深入讨论构造函数、析构函数和拷贝控制。

## 参考资源

- 《C++ Primer》第12章
- 《Effective C++》Items 13-17
- 《深入理解C++对象模型》
- [cppreference - 智能指针](https://en.cppreference.com/w/cpp/memory)