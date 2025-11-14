# C++ 常见问题快速排查

> **5个最常遇到的问题和解决方案** - 90%的初学者都会遇到

---

## 🔴 问题 1: Segmentation Fault (段错误)

### 症状
```bash
Segmentation fault (core dumped)
```

### 最常见的3个原因

#### 原因1: 访问空指针
```cpp
int* ptr = nullptr;
*ptr = 42;  // ❌ 崩溃!
```

**解决方案**:
```cpp
int* ptr = nullptr;
if (ptr != nullptr) {  // ✅ 先检查
    *ptr = 42;
}
```

#### 原因2: 数组越界
```cpp
int arr[5];
arr[10] = 100;  // ❌ 越界!
```

**解决方案**:
```cpp
std::vector<int> arr(5);
if (index < arr.size()) {  // ✅ 先检查
    arr[index] = 100;
}
```

#### 原因3: 使用已释放的内存
```cpp
int* ptr = new int(42);
delete ptr;
*ptr = 100;  // ❌ 悬空指针!
```

**解决方案**:
```cpp
auto ptr = std::make_unique<int>(42);
// 自动管理，不会出错
```

### 调试方法
```bash
# 使用 gdb 定位崩溃位置
g++ -g program.cpp -o program
gdb ./program
run
bt  # 查看调用栈
```

---

## 💧 问题 2: 内存泄漏

### 症状
程序运行时间越长，占用内存越多

### 最常见的原因
```cpp
void leak_memory() {
    int* ptr = new int(42);
    // 忘记 delete
}  // ❌ 内存泄漏!
```

### 解决方案
```cpp
void no_leak() {
    auto ptr = std::make_unique<int>(42);
    // 自动释放
}  // ✅ 不会泄漏
```

### 检测工具
```bash
# 使用 valgrind 检测内存泄漏
g++ -g program.cpp -o program
valgrind --leak-check=full ./program

# 输出会显示泄漏的内存位置
```

---

## ⚠️ 问题 3: 编译错误

### 错误1: undefined reference

**症状**:
```bash
undefined reference to `myFunction()'
```

**原因**: 函数声明了但没有定义，或者没有链接对应的 .cpp 文件

**解决方案**:
```bash
# 确保编译所有相关文件
g++ main.cpp helper.cpp -o program
```

### 错误2: no matching function

**症状**:
```bash
no matching function for call to 'func(int)'
```

**原因**: 函数参数类型不匹配

**解决方案**:
```cpp
// 检查函数声明
void func(double x);  // 需要 double

// 调用时类型转换
func(static_cast<double>(42));
```

### 错误3: expected ';' before

**症状**:
```bash
expected ';' before 'int'
```

**原因**: 上一行缺少分号，或者类定义后忘记分号

**解决方案**:
```cpp
class MyClass {
    // ...
};  // ✅ 不要忘记分号!
```

---

## 🐛 问题 4: Vector 相关错误

### 错误1: 下标越界
```cpp
std::vector<int> vec = {1, 2, 3};
int x = vec[10];  // ❌ 越界，未定义行为
```

**解决方案**:
```cpp
// 方式1: 使用 at() (会抛出异常)
try {
    int x = vec.at(10);
} catch (const std::out_of_range& e) {
    std::cerr << "越界!" << std::endl;
}

// 方式2: 先检查大小
if (index < vec.size()) {
    int x = vec[index];
}
```

### 错误2: 迭代器失效
```cpp
std::vector<int> vec = {1, 2, 3};
for (auto it = vec.begin(); it != vec.end(); ++it) {
    vec.push_back(5);  // ❌ 迭代器失效!
}
```

**解决方案**:
```cpp
// 不要在遍历时修改容器大小
// 或者使用索引
for (size_t i = 0; i < vec.size(); ++i) {
    // 安全的操作
}
```

---

## ⚡ 问题 5: 指针和引用混淆

### 问题: 什么时候用指针? 什么时候用引用?

**引用 (优先使用)**:
```cpp
void modify(int& x) {  // ✅ 简单、安全
    x = 100;
}

int value = 42;
modify(value);
```

**指针 (必要时使用)**:
```cpp
void modify(int* x) {
    if (x != nullptr) {  // 需要检查空指针
        *x = 100;
    }
}

int value = 42;
modify(&value);
```

**选择规则**:
- ✅ 优先用引用 - 更简单、更安全
- ✅ 需要"可选"参数时用指针
- ✅ 需要重新指向其他对象时用指针

---

## 🎯 快速诊断流程

### 程序崩溃了?
1. 检查是否访问了空指针 → 加 `nullptr` 检查
2. 检查数组/vector是否越界 → 用 `.at()` 或检查大小
3. 用 `gdb` 查看崩溃位置 → `gdb ./program`

### 内存问题?
1. 用 `valgrind` 检测泄漏
2. 把所有 `new` 改成 `make_unique`
3. 确保 `new[]` 和 `delete[]` 配对

### 编译错误?
1. 仔细阅读错误信息的第一行
2. 检查是否缺少分号或括号
3. 确认所有 .cpp 文件都被编译

### 运行结果不对?
1. 用 `std::cout` 打印中间结果
2. 检查变量初始化
3. 确认逻辑判断条件

---

## 📚 推荐工具

### 调试工具
- **gdb**: Linux/Mac 命令行调试器
- **lldb**: Mac 上的调试器 (Xcode)
- **Visual Studio Debugger**: Windows 最强调试器

### 内存检测
- **valgrind**: Linux 内存检测神器
- **Address Sanitizer**: 编译时加 `-fsanitize=address`

### 编译器警告
```bash
# 开启所有警告 (强烈推荐)
g++ -Wall -Wextra -Werror program.cpp -o program
```

---

## 💡 预防性建议

1. ✅ **永远使用智能指针** - 避免 90% 的内存问题
2. ✅ **用 vector 代替数组** - 自动管理大小
3. ✅ **开启编译器警告** - `-Wall -Wextra`
4. ✅ **初始化所有变量** - 避免未定义行为
5. ✅ **用 const** - 编译器帮你检查错误
6. ✅ **用 gdb/valgrind** - 定期检查程序
7. ✅ **小步测试** - 不要一次写太多代码

---

## 🆘 求助指南

遇到无法解决的问题时:

1. **复制完整错误信息**
2. **提供最小可复现代码**
3. **说明你已经尝试过的方法**
4. **到以下地方求助**:
   - Stack Overflow (英文)
   - C++ Slack/Discord 社区
   - cppreference.com 文档

**记住**: 95%的问题都可以通过仔细阅读错误信息和使用调试工具解决！
