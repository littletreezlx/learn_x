# C++ 文件重命名方案

> **目标**: 建立统一的编号体系，符合 learn_x 全局标准

## 📋 现状分析

### 已有文件及建议重命名

#### 阶段1: 基础语法 (01-06)
| 当前位置 | 当前文件名 | 建议新文件名 | 学习内容 |
|---------|------------|--------------|----------|
| 01_basics/examples/ | 01_hello_world.cpp | 01_hello.cpp | Hello World + 编译环境 |
| 01_basics/examples/ | 02_variables.cpp | 02_variables.cpp | 变量、类型、常量 |
| 01_basics/examples/ | 03_operators.cpp | 03_operators.cpp | 运算符和表达式 |
| 01_basics/examples/ | 04_control_flow.cpp | 04_control_flow.cpp | if/for/while流程控制 |
| 01_basics/examples/ | 05_functions.cpp | 05_functions.cpp | 函数定义和调用 |
| 01_basics/examples/ | 06_namespaces.cpp | 06_namespaces.cpp | 命名空间和作用域 |

#### 阶段2: 内存管理 (07-09) - C++特色
| 当前位置 | 当前文件名 | 建议新文件名 | 学习内容 |
|---------|------------|--------------|----------|
| 01_basics/examples/ | 07_pointers_intro.cpp | 07_pointers.cpp | 指针基础（C++核心特色） |
| 01_basics/examples/ | 08_references.cpp | 08_references.cpp | 引用（C++核心特色） |
| 02_memory_management/examples/ | 01_memory_layout.cpp | 09_memory_layout.cpp | 内存布局（栈堆静态区） |

#### 阶段3: 动态内存与智能指针 (10-12)
| 当前位置 | 当前文件名 | 建议新文件名 | 学习内容 |
|---------|------------|--------------|----------|
| 02_memory_management/examples/ | 03_dynamic_allocation.cpp | 10_dynamic_memory.cpp | new/delete动态内存 |
| 02_memory_management/examples/ | 05_smart_pointers.cpp | 11_smart_pointers.cpp | unique_ptr/shared_ptr |
| 02_memory_management/examples/ | 06_raii_principle.cpp | 12_raii.cpp | RAII资源管理 |

#### 阶段4: 高级特性 (13-15)
| 当前位置 | 当前文件名 | 建议新文件名 | 学习内容 |
|---------|------------|--------------|----------|
| 02_memory_management/examples/ | 02_pointer_arithmetic.cpp | 13_pointer_arith.cpp | 指针算术（进阶） |
| 02_memory_management/examples/ | 04_memory_errors.cpp | 14_memory_errors.cpp | 常见内存错误 |
| (新建) | - | 15_oop_intro.cpp | 面向对象基础 |

## 🎯 执行步骤

### 第一批: 基础文件重命名（低风险）
```bash
# 阶段1文件 (01-06) - 基本重命名
mv 01_basics/examples/01_hello_world.cpp examples/01_hello.cpp
mv 01_basics/examples/03_operators.cpp examples/03_operators.cpp
# ... 其他文件
```

### 第二批: 内存管理文件重组（中风险）
```bash
# 阶段2-3文件 (07-12) - 跨目录移动
mv 01_basics/examples/07_pointers_intro.cpp examples/07_pointers.cpp
mv 02_memory_management/examples/05_smart_pointers.cpp examples/11_smart_pointers.cpp
# ... 其他文件
```

### 第三批: 练习文件整理
```bash
# 练习文件统一处理
exercises/calculator.cpp → exercises/02_calculator.cpp
exercises/text_processor.cpp → exercises/04_text_processor.cpp
exercises/simple_vector.cpp → exercises/10_simple_vector.cpp
```

## 📁 目标目录结构

```
learn_cpp/
├── examples/
│   ├── 01_hello.cpp              # Hello World
│   ├── 02_variables.cpp          # 变量、类型
│   ├── 03_operators.cpp          # 运算符
│   ├── 04_control_flow.cpp       # 流程控制
│   ├── 05_functions.cpp          # 函数
│   ├── 06_namespaces.cpp         # 命名空间
│   ├── 07_pointers.cpp           # 指针基础 ⭐
│   ├── 08_references.cpp         # 引用 ⭐
│   ├── 09_memory_layout.cpp      # 内存布局 ⭐
│   ├── 10_dynamic_memory.cpp     # 动态内存 ⭐
│   ├── 11_smart_pointers.cpp     # 智能指针 ⭐
│   ├── 12_raii.cpp               # RAII ⭐
│   ├── 13_pointer_arith.cpp      # 指针算术
│   ├── 14_memory_errors.cpp      # 内存错误
│   └── 15_oop_intro.cpp          # OOP基础
│
├── exercises/
│   ├── 02_calculator.cpp         # 配合02_variables
│   ├── 04_text_processor.cpp     # 配合04_control_flow
│   └── 10_simple_vector.cpp      # 配合10_dynamic_memory
│
└── solutions/
    ├── 02_calculator_solution.cpp
    ├── 04_text_processor_solution.cpp
    └── 10_simple_vector_solution.cpp
```

## ⚠️ 注意事项

1. **备份重要**：执行前先备份现有文件
2. **文档同步**：需要更新CORE_CHECKLIST.md中的文件引用
3. **验证编译**：重命名后确保所有文件都能正常编译
4. **保持一致性**：确保编号连续且不重复

## 🔄 与全局规范的契合

- ✅ **编号连续**: 01-15连续编号
- ✅ **阶段清晰**: 3个阶段，每阶段3-6个文件
- ✅ **描述性命名**: 文件名直接反映学习内容
- ✅ **C++特色**: 重点突出内存管理特色

## 📝 下一步行动

1. 创建重命名脚本
2. 备份现有文件
3. 执行重命名操作
4. 验证文件完整性
5. 更新相关文档