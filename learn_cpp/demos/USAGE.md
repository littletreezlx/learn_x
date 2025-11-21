# Demo Playground 使用指南

## 🎉 第一个 Demo Playground 已创建！

### 快速开始

```bash
cd /Users/zhanglingxiao/LittleTree_Projects/learn_x/learn_cpp/demos

# 编译（只需一次）
g++ -std=c++17 smart_pointers_playground.cpp -o smart_pointers_playground

# 运行
./smart_pointers_playground
```

### 使用方式

1. 运行程序后，会看到菜单：
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🎮 智能指针 Demo Playground
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. unique_ptr 基础
  2. unique_ptr 移动
  3. unique_ptr reset
  4. shared_ptr 基础
  5. shared_ptr 引用计数
  6. weak_ptr 用法
  7. 自定义删除器
  8. 三者对比总结
  0. 退出
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

请选择 Demo (0-8):
```

2. 输入数字（1-8）选择想运行的 Demo
3. 观察输出，理解概念
4. 按回车继续，选择下一个 Demo
5. 输入 0 退出

### Demo 内容预览

运行 Demo 1 的输出示例：

```
━━━ Demo 1: unique_ptr 基础用法 ━━━
unique_ptr 拥有独占所有权

创建 unique_ptr:
  ✅ Resource '独占资源' 创建 (值: 42)

访问资源:
  📦 Resource '独占资源': 42
  地址: 0x101455d30

修改值:
  📦 Resource '独占资源': 100
  ❌ Resource '独占资源' 销毁

💡 关键点: unique_ptr 离开作用域时自动释放资源
```

### 学习建议

#### 新手学习路径

1. **先运行 Demo 1-3**（理解 unique_ptr）
   - Demo 1: 基础用法
   - Demo 2: 所有权转移（重要！）
   - Demo 3: reset 操作

2. **再运行 Demo 4-5**（理解 shared_ptr）
   - Demo 4: 基础用法和引用计数
   - Demo 5: 引用计数如何变化

3. **最后运行 Demo 6-8**（高级用法）
   - Demo 6: weak_ptr 打破循环引用
   - Demo 7: 自定义删除器
   - Demo 8: 三者对比总结

#### 深入理解建议

1. **运行 Demo 后，试着修改代码**
   - 改变 Resource 的值
   - 添加更多的智能指针
   - 观察什么时候资源被销毁

2. **对比 examples/11_smart_pointers.cpp**
   - Playground 是交互式的，一次运行多个 Demo
   - Examples 是完整的示例，需要编译整个文件

3. **遇到问题？回到 Playground**
   - 找到相关 Demo
   - 运行并观察输出
   - 对比你的代码

---

## 🎯 核心价值

### 传统方式 vs Playground

**传统方式**：
```bash
# 看一个用法
g++ example.cpp -o example
./example

# 想看另一个用法
# 修改代码...
# 重新编译...
# 再运行...
```

**Playground 方式**：
```bash
# 编译1次
g++ playground.cpp -o playground

# 交互式运行所有 Demo
./playground
# 选择 Demo 1 → 立即看结果
# 选择 Demo 2 → 立即看结果
# 选择 Demo 3 → 立即看结果
```

### 关键优势

1. ✅ **编译1次，试验多次** - 降低试错成本
2. ✅ **即时反馈** - 选择 → 运行 → 看结果，最短反馈循环
3. ✅ **概念聚合** - 一个概念的所有用法集中展示
4. ✅ **鼓励探索** - 随意试验，不会破坏项目

---

## 📖 相关文档

- **README.md** - Demo Playground 总览
- **DEMO_PLAYGROUND_DESIGN.md** - 完整设计思想（项目根目录）
- **../examples/11_smart_pointers.cpp** - 传统的完整示例

---

**记住**：这是探索式学习工具，不是测试代码！

放心试验，代码不完美没关系，重点是理解概念 🚀
