# C++ 核心代码速查手册

> **5个最常用的代码模式** - 拿来即用，解决80%的日常需求
>
> 详细示例请查看: `01_basics/examples/` 和 `02_memory_management/examples/`

---

## 1. 智能指针 - 自动管理内存 ⭐⭐⭐

```cpp
#include <memory>

// 独占所有权 (最常用)
auto ptr = std::make_unique<int>(42);

// 共享所有权
auto shared = std::make_shared<int>(100);
auto copy = shared;  // 引用计数 +1
```

**何时使用**: 任何需要 `new` 的地方都用 `make_unique`

**详细示例**: `02_memory_management/examples/05_smart_pointers.cpp`

---

## 2. 遍历容器 - Vector 和 Map ⭐⭐⭐

```cpp
#include <vector>
#include <map>

// 遍历 vector (推荐)
std::vector<int> nums = {1, 2, 3, 4, 5};
for (const auto& num : nums) {
    std::cout << num << " ";
}

// 遍历 map (C++17)
std::map<std::string, int> ages = {{"Alice", 25}, {"Bob", 30}};
for (const auto& [name, age] : ages) {
    std::cout << name << ": " << age << "\n";
}
```

**何时使用**: 遍历任何 STL 容器

---

## 3. 读写文件 - 简单3行 ⭐⭐

```cpp
#include <fstream>
#include <string>

// 读取文件
std::ifstream file("data.txt");
std::string line;
while (std::getline(file, line)) {
    // 处理每一行
}

// 写入文件
std::ofstream out("output.txt");
out << "Hello, World!" << std::endl;
```

**何时使用**: 处理文本文件

---

## 4. 定义类 - 标准模板 ⭐⭐⭐

```cpp
class MyClass {
private:
    int data;

public:
    // 构造函数 (用初始化列表)
    MyClass(int d) : data(d) {}

    // 析构函数
    ~MyClass() {}

    // Getter
    int get_data() const { return data; }

    // Setter
    void set_data(int d) { data = d; }
};
```

**何时使用**: 创建任何新类

---

## 5. 指针基础 - 必须理解 ⭐⭐⭐

```cpp
// 指针声明和使用
int value = 42;
int* ptr = &value;     // ptr 存储 value 的地址

std::cout << *ptr;     // 输出: 42 (解引用)
*ptr = 100;            // 修改 value 的值

// 检查空指针
if (ptr != nullptr) {
    *ptr = 200;
}
```

**何时使用**: 理解内存和函数参数传递

**详细示例**: `01_basics/examples/07_pointers_intro.cpp`

---

## 📋 快速决策树

**需要动态内存?** → 用 `std::make_unique`

**需要遍历容器?** → 用 `for (const auto& item : container)`

**需要读写文件?** → 用 `std::ifstream` / `std::ofstream`

**需要创建类?** → 复制"定义类"模板

**不理解指针?** → 先运行 `07_pointers_intro.cpp`

---

## 🎯 学习建议

1. **先理解指针** - 运行 `01_basics/examples/07_pointers_intro.cpp`
2. **然后学智能指针** - 运行 `02_memory_management/examples/05_smart_pointers.cpp`
3. **其他3个模式** - 直接复制使用，遇到问题再深入

**记住**: 这5个模式能解决你80%的编码需求！
