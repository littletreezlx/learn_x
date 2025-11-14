# C++ 30分钟快速上手

> **目标**: 30分钟内完成环境搭建并运行第一个程序
> **适合人群**: 有其他编程语言基础(如Java、Python)的学习者

---

## 🚀 第一步: 安装编译器 (5分钟)

### macOS
```bash
# 安装 Xcode Command Line Tools (包含 clang++)
xcode-select --install

# 验证安装
g++ --version
# 或
clang++ --version
```

### Linux (Ubuntu/Debian)
```bash
# 安装 g++
sudo apt update
sudo apt install g++ build-essential

# 验证安装
g++ --version
```

### Windows
推荐安装 MinGW-w64 或使用 WSL (Windows Subsystem for Linux)

---

## 💻 第二步: 编写第一个程序 (10分钟)

### 创建项目目录
```bash
mkdir ~/cpp_practice
cd ~/cpp_practice
```

### 编写 Hello World

创建文件 `hello.cpp`:
```cpp
#include <iostream>
#include <string>

int main() {
    // 输出到控制台
    std::cout << "Hello, C++!" << std::endl;

    // 获取用户输入
    std::string name;
    std::cout << "请输入你的名字: ";
    std::getline(std::cin, name);

    // 格式化输出
    std::cout << "你好, " << name << "!" << std::endl;

    return 0;  // 返回0表示程序成功执行
}
```

### 关键概念速览
- `#include <iostream>`: 引入输入输出流库
- `std::cout`: 标准输出流 (类似 Java 的 System.out)
- `std::cin`: 标准输入流 (类似 Java 的 Scanner)
- `std::endl`: 输出换行并刷新缓冲区
- `int main()`: 程序入口函数
- `return 0`: 返回状态码 (0表示成功)

---

## 🔨 第三步: 编译和运行 (5分钟)

### 基本编译
```bash
# 编译
g++ -std=c++17 hello.cpp -o hello

# 运行
./hello
```

### 编译参数说明
- `-std=c++17`: 使用 C++17 标准
- `-o hello`: 指定输出文件名为 hello
- `-Wall`: 开启所有警告 (推荐)
- `-g`: 包含调试信息

### 推荐的编译命令
```bash
g++ -std=c++17 -Wall -Wextra -g hello.cpp -o hello
```

---

## 🎯 第四步: 核心概念实践 (10分钟)

### 实践1: 指针基础
创建 `pointer_demo.cpp`:
```cpp
#include <iostream>

int main() {
    int value = 42;
    int* ptr = &value;  // ptr 存储 value 的内存地址

    std::cout << "value = " << value << std::endl;
    std::cout << "ptr 指向的地址 = " << ptr << std::endl;
    std::cout << "ptr 指向的值 = " << *ptr << std::endl;

    // 通过指针修改值
    *ptr = 100;
    std::cout << "修改后 value = " << value << std::endl;

    return 0;
}
```

编译运行:
```bash
g++ -std=c++17 pointer_demo.cpp -o pointer_demo
./pointer_demo
```

### 实践2: 使用 STL 容器
创建 `vector_demo.cpp`:
```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    // 创建动态数组
    std::vector<std::string> names;

    // 添加元素
    names.push_back("Alice");
    names.push_back("Bob");
    names.push_back("Charlie");

    // 遍历输出
    std::cout << "Names:" << std::endl;
    for (const auto& name : names) {
        std::cout << "  - " << name << std::endl;
    }

    // 访问元素
    std::cout << "\n第一个名字: " << names[0] << std::endl;
    std::cout << "数组大小: " << names.size() << std::endl;

    return 0;
}
```

编译运行:
```bash
g++ -std=c++17 vector_demo.cpp -o vector_demo
./vector_demo
```

---

## 🎓 核心概念对比表

### C++ vs Java 快速对比

| 概念 | Java | C++ |
|------|------|-----|
| **编译方式** | 编译成字节码 | 编译成机器码 |
| **内存管理** | 自动垃圾回收 | 手动管理 (或智能指针) |
| **输出** | `System.out.println()` | `std::cout << ... << std::endl;` |
| **输入** | `Scanner` | `std::cin >>` 或 `std::getline()` |
| **数组** | `ArrayList` | `std::vector` |
| **字典** | `HashMap` | `std::map` |
| **字符串** | `String` | `std::string` |
| **空值** | `null` | `nullptr` |

---

## 📝 动手练习 (课后)

### 练习1: 简单计算器
编写一个程序，接受两个数字和一个运算符(+, -, *, /)，输出计算结果。

提示:
```cpp
double num1, num2;
char op;
std::cin >> num1 >> op >> num2;
```

### 练习2: 数字猜谜游戏
程序随机生成1-100之间的数字，用户猜测，程序提示"太大"或"太小"，直到猜中。

提示:
```cpp
#include <random>
#include <ctime>

std::srand(std::time(0));
int target = std::rand() % 100 + 1;
```

---

## 🔧 常见问题速查

### Q1: 编译时提示 "command not found"
**原因**: 编译器未安装或未加入 PATH
**解决**: 重新安装编译器，验证 `g++ --version`

### Q2: 运行时出现 "Segmentation fault"
**原因**: 访问了无效的内存地址
**解决**: 检查指针是否为空，检查数组是否越界

### Q3: 如何查看编译错误详情
**方法**: 仔细阅读编译器输出的错误信息
```bash
g++ -Wall -Wextra hello.cpp -o hello
```
`-Wall` 和 `-Wextra` 会显示更详细的警告信息

### Q4: 如何调试程序
**方法1**: 使用 print 调试
```cpp
std::cout << "Debug: value = " << value << std::endl;
```

**方法2**: 使用 gdb 调试器
```bash
g++ -g hello.cpp -o hello
gdb ./hello
```

---

## 🎯 下一步学习

完成快速上手后，建议按以下顺序深入学习:

1. **查看完整示例代码**
   - 运行 `01_basics/examples/` 中的所有示例
   - 理解每个示例的核心概念

2. **学习核心知识**
   - 打开 `CORE_CHECKLIST.md`
   - 按照检查清单系统学习

3. **完成实战项目**
   - 选择一个核心项目完成
   - 巩固所学知识

---

## 📚 推荐资源

- **官方文档**: https://en.cppreference.com/w/
- **在线编译器**: https://godbolt.org/ (查看编译结果)
- **代码练习**: https://leetcode.com/ (C++ 解题)
- **学习路线**: 查看 `LEARNING_PATH.md`

---

## ✅ 30分钟检查清单

- [ ] 成功安装 C++ 编译器
- [ ] 编译并运行 Hello World
- [ ] 理解基本的输入输出
- [ ] 运行指针演示程序
- [ ] 运行 vector 演示程序
- [ ] 能够独立编译和运行简单程序

**恭喜完成快速上手!** 🎉

现在你已经掌握了 C++ 的基本开发流程，可以开始系统学习核心知识了。
