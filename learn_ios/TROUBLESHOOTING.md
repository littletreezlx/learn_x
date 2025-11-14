# iOS 开发 5个最常见问题排查

> 遇到问题先看这里！99%的问题都能在这找到答案

---

## 问题1: Xcode 编译失败

### 症状
- 代码无法运行
- 出现红色错误提示
- 控制台显示 "Build Failed"

### 常见原因和解决方法

#### 原因1: 语法错误
**症状**: 红色下划线，错误信息如 "Expected '{' in function"

**解决方法**:
1. 看错误提示的行号
2. 检查是否缺少括号、大括号、逗号
3. 检查拼写错误

**示例**:
```swift
// ❌ 错误: 缺少大括号
Button("Tap")
    print("Hello")
}

// ✅ 正确
Button("Tap") {
    print("Hello")
}
```

#### 原因2: 类型不匹配
**症状**: "Cannot convert value of type 'String' to expected argument type 'Int'"

**解决方法**:
1. 检查变量类型是否正确
2. 使用类型转换 (如 `Int(stringValue)`)

**示例**:
```swift
// ❌ 错误: 类型不匹配
let age: Int = "25"

// ✅ 正确
let age: Int = 25
let ageString: String = "25"
let age2 = Int(ageString) ?? 0  // Optional解包
```

#### 原因3: Optional 未解包
**症状**: "Value of optional type 'String?' must be unwrapped"

**解决方法**:
```swift
// ❌ 错误: Optional未解包
let name: String? = "Alice"
print("Hello, \(name)")

// ✅ 正确: 使用 if let
if let unwrappedName = name {
    print("Hello, \(unwrappedName)")
}

// ✅ 正确: 使用 nil coalescing
print("Hello, \(name ?? "Guest")")
```

---

## 问题2: Xcode Preview 无法显示

### 症状
- 右侧预览区域显示错误
- "Cannot preview in this file"
- 预览卡住不更新

### 解决方法

#### 方法1: 清理构建缓存
```bash
# 快捷键
Cmd + Shift + K

# 或者: Product → Clean Build Folder
```

#### 方法2: 重启预览
```bash
# 快捷键
Option + Cmd + P

# 或者: Editor → Canvas → Resume
```

#### 方法3: 重启 Xcode
1. 关闭 Xcode
2. 重新打开项目
3. 按 Option+Cmd+P 恢复预览

#### 方法4: 检查 Preview 代码
确保有 `#Preview` 宏:

```swift
#Preview {
    ContentView()
}
```

如果使用旧版 Xcode，可能是:
```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

---

## 问题3: 模拟器问题

### 症状
- 模拟器无法启动
- 模拟器卡住不动
- "Unable to boot device"

### 解决方法

#### 方法1: 重启模拟器
1. 关闭当前模拟器窗口
2. 在 Xcode 中选择其他设备
3. 再次运行 (Cmd+R)

#### 方法2: 重置模拟器
```bash
# 打开终端执行
xcrun simctl erase all
```

**警告**: 这会删除所有模拟器数据！

#### 方法3: 重启 Mac
有时候最简单的方法最有效！

#### 方法4: 检查磁盘空间
确保至少有 10GB 可用空间。

---

## 问题4: @State 和 @Binding 不理解

### 症状
- 修改变量但界面不更新
- "Cannot assign to property: 'self' is immutable"

### 概念理解

#### @State - 局部状态
用于 **单个视图内部** 的状态管理。

**示例**:
```swift
struct CounterView: View {
    @State private var count = 0  // 使用 @State

    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Increment") {
                count += 1  // 修改会更新UI
            }
        }
    }
}
```

#### @Binding - 双向绑定
用于 **父子视图间** 共享状态。

**示例**:
```swift
// 父视图
struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        ChildView(isOn: $isOn)  // 传递绑定 (注意 $)
    }
}

// 子视图
struct ChildView: View {
    @Binding var isOn: Bool  // 接收绑定

    var body: some View {
        Toggle("开关", isOn: $isOn)  // 使用绑定
    }
}
```

### 常见错误

#### 错误1: 忘记使用 @State
```swift
// ❌ 错误: 没有 @State
struct CounterView: View {
    var count = 0

    var body: some View {
        Button("Tap") {
            count += 1  // 报错: cannot assign
        }
    }
}

// ✅ 正确
struct CounterView: View {
    @State private var count = 0  // 加上 @State

    var body: some View {
        Button("Tap") {
            count += 1  // 正常工作
        }
    }
}
```

#### 错误2: 传递 Binding 时忘记加 $
```swift
// ❌ 错误: 缺少 $
ChildView(isOn: isOn)

// ✅ 正确
ChildView(isOn: $isOn)  // 加上 $
```

---

## 问题5: 网络请求失败

### 症状
- API 调用没有返回数据
- "The resource could not be loaded"
- "Network connection lost"

### 解决方法

#### 方法1: 检查 Info.plist (HTTP 请求)
如果使用 HTTP (非 HTTPS)，需要配置:

1. 打开 `Info.plist`
2. 添加以下内容:
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

**警告**: 仅用于开发测试，生产环境应使用 HTTPS！

#### 方法2: 检查网络请求代码

**完整示例**:
```swift
import Foundation

// 定义数据模型
struct Post: Codable {
    let id: Int
    let title: String
}

// 网络请求函数
func fetchPosts() async throws -> [Post] {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

    // 发起请求
    let (data, _) = try await URLSession.shared.data(from: url)

    // 解析 JSON
    let posts = try JSONDecoder().decode([Post].self, from: data)
    return posts
}

// 在 SwiftUI 中使用
struct ContentView: View {
    @State private var posts: [Post] = []
    @State private var isLoading = false
    @State private var errorMessage = ""

    var body: some View {
        VStack {
            if isLoading {
                ProgressView("加载中...")
            } else if !errorMessage.isEmpty {
                Text("错误: \(errorMessage)")
            } else {
                List(posts, id: \.id) { post in
                    Text(post.title)
                }
            }
        }
        .task {
            await loadPosts()
        }
    }

    func loadPosts() async {
        isLoading = true
        errorMessage = ""

        do {
            posts = try await fetchPosts()
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
```

#### 方法3: 调试网络请求

**添加打印调试**:
```swift
func fetchPosts() async throws -> [Post] {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

    print("请求 URL: \(url)")

    let (data, response) = try await URLSession.shared.data(from: url)

    print("响应: \(response)")
    print("数据长度: \(data.count)")

    let posts = try JSONDecoder().decode([Post].self, from: data)
    print("解析成功，获取 \(posts.count) 条数据")

    return posts
}
```

---

## 🔧 通用调试技巧

### 1. 使用 print() 调试
```swift
Button("Tap") {
    print("按钮被点击")  // 调试信息
    count += 1
    print("新的 count: \(count)")
}
```

### 2. 使用断点
1. 点击代码行号左侧，出现蓝色断点
2. 运行程序 (Cmd+R)
3. 程序会在断点处暂停
4. 在底部控制台查看变量值

### 3. 使用 LLDB 命令
程序暂停时，在控制台输入:
```bash
# 打印变量值
po count

# 打印对象详情
po self
```

### 4. 查看控制台输出
- 打开 Xcode 底部控制台 (Cmd+Shift+Y)
- 查看错误信息和 print 输出

---

## 📚 进一步帮助

### 实在解决不了？

1. **复制完整错误信息**
2. **提供代码上下文**
3. **说明期望行为 vs 实际行为**
4. **询问 Claude 或查看官方文档**

### 推荐资源
- [Apple Developer Forums](https://developer.apple.com/forums/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/swiftui)
- [Hacking with Swift](https://www.hackingwithswift.com/)

---

**问题解决了？** 继续学习 [CORE_CHECKLIST.md](CORE_CHECKLIST.md)！
