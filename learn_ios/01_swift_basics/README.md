# Swift 基础语法

本目录包含 Swift 基础语法的学习资料和示例代码。

## 📚 示例代码列表

### 已完成示例 (7个)

| 示例 | 文件 | 核心内容 |
|------|------|---------|
| 1️⃣ | [01_variables_and_constants.swift](examples/01_variables_and_constants.swift) | 变量/常量、数据类型、字符串、运算符、元组 |
| 2️⃣ | [02_collections.swift](examples/02_collections.swift) | 数组、字典、集合的完整操作 |
| 3️⃣ | [03_optionals.swift](examples/03_optionals.swift) | Optional 概念、所有解包方式、最佳实践 |
| 4️⃣ | [04_functions_and_closures.swift](examples/04_functions_and_closures.swift) | 函数、参数标签、闭包、高阶函数、捕获值 |
| 5️⃣ | [05_structs_and_classes.swift](examples/05_structs_and_classes.swift) | 结构体、类、继承、值类型vs引用类型 |
| 6️⃣ | [06_control_flow.swift](examples/06_control_flow.swift) | if/switch、循环、guard、defer |
| 7️⃣ | [07_protocols_and_extensions.swift](examples/07_protocols_and_extensions.swift) | 协议、扩展、面向协议编程 |

## 🎯 学习路径

### 第1天: 基础语法
1. 运行 `01_variables_and_constants.swift`
2. 运行 `02_collections.swift`
3. 完成变量和集合的练习

### 第2天: Optional 和函数
1. 运行 `03_optionals.swift` ⭐ 重点
2. 运行 `04_functions_and_closures.swift`
3. 理解 Optional 的所有解包方式

### 第3天: 面向对象
1. 运行 `05_structs_and_classes.swift`
2. 理解值类型 vs 引用类型
3. 掌握何时用 Struct 何时用 Class

### 第4天: 控制流和协议
1. 运行 `06_control_flow.swift`
2. 运行 `07_protocols_and_extensions.swift` ⭐ 重点
3. 理解面向协议编程 (POP)

## 💡 使用建议

### 方式1: Swift Playgrounds (推荐新手)
1. 打开 **Swift Playgrounds** App (iPad/Mac)
2. 创建新 Playground
3. 复制示例代码
4. 逐行运行观察结果

### 方式2: Xcode Playground
1. 打开 Xcode
2. File → New → Playground
3. 选择 Blank 模板
4. 复制示例代码
5. 点击运行 (Cmd+Shift+Enter)

### 方式3: 命令行编译
```bash
# 编译单个文件
swiftc 01_variables_and_constants.swift -o output

# 运行
./output
```

## 📝 学习重点

### ⭐ 必须掌握 (核心)
- ✅ var vs let
- ✅ Optional 和所有解包方式
- ✅ 数组和字典操作
- ✅ 函数和闭包
- ✅ Struct vs Class
- ✅ 协议 (Protocol)

### 🌟 建议掌握 (重要)
- 字符串插值 `\(value)`
- guard 提前返回
- map, filter, reduce
- 扩展 (Extension)
- 计算属性

### 💫 可选掌握 (进阶)
- 关联类型
- 属性观察器
- defer 语句
- 面向协议编程完整应用

## 🐛 常见错误

### 错误1: Optional 未解包
```swift
// ❌ 错误
let name: String? = "Alice"
print("Hello, " + name)  // 编译错误

// ✅ 正确
if let name = name {
    print("Hello, \(name)")
}
```

### 错误2: 修改常量
```swift
// ❌ 错误
let count = 0
count += 1  // 编译错误

// ✅ 正确
var count = 0
count += 1
```

### 错误3: 忘记 mutating
```swift
// ❌ 错误
struct Counter {
    var count = 0
    func increment() {  // 编译错误
        count += 1
    }
}

// ✅ 正确
struct Counter {
    var count = 0
    mutating func increment() {
        count += 1
    }
}
```

## 🎓 检验理解

完成所有示例后，你应该能够:

- [ ] 解释 Optional 是什么，为什么需要它
- [ ] 说出至少 4 种解包 Optional 的方式
- [ ] 解释 Struct 和 Class 的区别
- [ ] 写出闭包的简化语法
- [ ] 使用 map/filter/reduce 处理数组
- [ ] 定义协议并让类型遵循
- [ ] 使用扩展为已有类型添加功能

## 📖 参考资源

### 官方文档
- [Swift官方教程](https://docs.swift.org/swift-book/)
- [Swift语言指南(中文)](https://swiftgg.gitbook.io/swift/)
- [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)

### 在线学习
- [Swift Playgrounds](https://www.apple.com/swift/playgrounds/)
- [Hacking with Swift](https://www.hackingwithswift.com/100)
- [Ray Wenderlich - Swift](https://www.raywenderlich.com/swift)

---

**开始学习**: 从 `01_variables_and_constants.swift` 开始，逐个运行所有示例！
