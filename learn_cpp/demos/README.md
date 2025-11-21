# Demo Playground - 交互式概念演示

> **这不是测试代码，而是探索式学习工具** 🎮

---

## 🎯 什么是 Demo Playground？

传统方式学习智能指针：
```bash
# 看示例1
g++ 11_smart_pointers.cpp -o smart_pointers
./smart_pointers

# 想试试其他用法？修改代码...
# 重新编译...
# 再运行...
```

**Demo Playground 方式**：
```bash
# 编译1次
g++ -std=c++17 smart_pointers_playground.cpp -o smart_pointers_playground

# 交互式选择运行多个 Demo
./smart_pointers_playground

# 菜单示例：
# 1. unique_ptr 基础
# 2. unique_ptr 移动
# 3. unique_ptr reset
# ...

# 选择想试的 Demo，立即看到效果
```

**核心优势**：
- ✅ **编译1次，试验多次** - 降低试错成本
- ✅ **多个独立 Demo 聚合** - 一个概念的所有用法集中展示
- ✅ **即时反馈** - 选择 → 运行 → 看结果
- ✅ **鼓励探索** - 随意试验，不会破坏项目

---

## 📚 现有 Playground

### 1. smart_pointers_playground.cpp

**包含 8 个独立 Demo**：
1. unique_ptr 基础用法
2. unique_ptr 所有权转移
3. unique_ptr reset 操作
4. shared_ptr 基础用法
5. shared_ptr 引用计数观察
6. weak_ptr 打破循环引用
7. 自定义删除器
8. 三者对比总结

**编译和运行**：
```bash
cd demos

# 编译
g++ -std=c++17 smart_pointers_playground.cpp -o smart_pointers_playground

# 运行
./smart_pointers_playground
```

**使用建议**：
- 先运行 Demo 1-3（理解 unique_ptr）
- 再运行 Demo 4-5（理解 shared_ptr）
- 最后运行 Demo 6-8（高级用法和对比）

---

## 🆚 Demo Playground vs Examples

### Examples（线性学习）

**位置**: `learn_cpp/examples/`

**特点**：
- 按编号顺序学习（01-15）
- 一个文件一个程序
- 适合第一次学习某个概念

**使用场景**：
```bash
cd examples

# 第一次学习智能指针
g++ 11_smart_pointers.cpp -o smart_pointers
./smart_pointers
```

### Demo Playground（探索式学习）

**位置**: `learn_cpp/demos/`

**特点**：
- 按概念聚合多个 Demo
- 一个文件包含多个独立演示
- 适合深入理解某个概念

**使用场景**：
```bash
cd demos

# 深入理解智能指针的各种用法
./smart_pointers_playground

# 选择想试的 Demo，立即运行
```

---

## 🔧 如何创建新的 Playground？

参考 `smart_pointers_playground.cpp` 的结构：

```cpp
// 1. Demo 函数定义
void demo_concept_1() {
    std::cout << "\n━━━ Demo 1: 概念名称 ━━━\n";
    // 演示代码
    std::cout << "\n💡 关键点: ... " << std::endl;
}

void demo_concept_2() {
    std::cout << "\n━━━ Demo 2: 概念名称 ━━━\n";
    // 演示代码
    std::cout << "\n💡 关键点: ... " << std::endl;
}

// 2. Demo 运行器
class DemoRunner {
private:
    std::map<int, std::pair<std::string, std::function<void()>>> demos;

public:
    DemoRunner() {
        // 注册 Demo
        demos[1] = {"概念1", demo_concept_1};
        demos[2] = {"概念2", demo_concept_2};
    }

    void show_menu() { /* 显示菜单 */ }
    void run() { /* 运行循环 */ }
};

// 3. 主函数
int main() {
    DemoRunner runner;
    runner.run();
    return 0;
}
```

---

## 💡 学习建议

### 第一次学习某个概念

1. 先看 `examples/` 的对应文件
2. 运行代码，建立初步理解

### 深入理解某个概念

1. 打开对应的 Playground
2. 逐个运行 Demo
3. 修改代码，试验不同用法
4. 观察输出，验证理解

### 遇到问题时

1. 回到 Playground
2. 找到相关 Demo
3. 对比你的代码和 Demo 的区别

---

## 🚀 未来计划

根据学习需求，可能添加的 Playground：

- `containers_playground.cpp` - STL 容器（vector, map, set）
- `templates_playground.cpp` - 模板基础
- `move_semantics_playground.cpp` - 移动语义
- `raii_playground.cpp` - RAII 模式

**建议**：先试用 `smart_pointers_playground`，如果觉得有用，再扩展其他主题。

---

## 📖 相关文档

- **设计思想**: `/learn_x/DEMO_PLAYGROUND_DESIGN.md`
- **项目总览**: `/learn_x/README.md`
- **C++ 学习指南**: `../README.md`

---

**记住**：这是演示（Demo），不是测试（Test）！

鼓励探索、试错、实验。代码不完美没关系，重点是理解概念 🎯
