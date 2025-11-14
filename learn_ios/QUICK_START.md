# iOS 开发 30分钟快速上手

> 完全零基础？跟着这个指南，30分钟后你就能运行第一个iOS应用！

---

## 🎯 本指南目标

- ✅ 安装 Xcode 开发环境
- ✅ 创建并运行 Hello World iOS 应用
- ✅ 理解 iOS 项目的基本结构
- ✅ 了解如何使用 Xcode

---

## 📋 准备工作

### 系统要求
- **macOS** 12.0 或更高版本
- **磁盘空间**: 至少 20GB 可用空间
- **Apple ID**: 免费账号即可 (用于下载 Xcode)

**重要**: iOS 开发必须在 Mac 上进行，Windows/Linux 无法使用 Xcode！

---

## 步骤1: 安装 Xcode (15分钟)

### 方式1: 从 App Store 安装 (推荐)
1. 打开 **App Store**
2. 搜索 **Xcode**
3. 点击 **获取** (免费)
4. 等待下载和安装 (约10-15分钟，取决于网速)

### 方式2: 从官网下载
1. 访问 [Apple Developer](https://developer.apple.com/download/)
2. 下载最新版 Xcode
3. 解压并拖到 Applications 文件夹

### 首次启动
1. 打开 **Xcode**
2. 同意许可协议
3. 等待安装额外组件 (约5分钟)

---

## 步骤2: 创建第一个 iOS 应用 (5分钟)

### 2.1 创建新项目
1. 打开 Xcode
2. 选择 **Create New Project**
3. 选择 **iOS** → **App**
4. 点击 **Next**

### 2.2 配置项目
填写以下信息:
- **Product Name**: HelloWorld
- **Team**: None (留空)
- **Organization Identifier**: com.yourname (随便填)
- **Interface**: **SwiftUI** ⭐ (重要！)
- **Language**: **Swift**
- **Storage**: None
- 取消勾选 **Include Tests**

点击 **Next**，选择保存位置，点击 **Create**。

---

## 步骤3: 运行应用 (5分钟)

### 3.1 选择模拟器
在 Xcode 顶部工具栏:
1. 点击设备选择器 (显示 "iPhone 15 Pro" 之类的)
2. 选择任意 iPhone 模拟器 (推荐 iPhone 15)

### 3.2 运行应用
1. 点击左上角的 **▶️ 播放按钮** (或按 **Cmd+R**)
2. 等待编译 (第一次较慢，约1-2分钟)
3. 模拟器启动，看到 "Hello, world!"

🎉 **恭喜！你的第一个 iOS 应用已经运行了！**

---

## 步骤4: 修改代码看效果 (5分钟)

### 4.1 修改文本
在左侧文件导航器，打开 `ContentView.swift`。

找到这行代码:
```swift
Text("Hello, world!")
```

修改为:
```swift
Text("我的第一个iOS应用！")
```

### 4.2 使用实时预览
在代码编辑器右上角，点击 **Resume** 按钮 (或按 **Option+Cmd+P**)。

你会在右侧看到实时预览，代码修改后立即显示效果！

### 4.3 添加按钮
在 `ContentView.swift` 中，修改 `body` 部分:

```swift
var body: some View {
    VStack {
        Text("我的第一个iOS应用！")
            .font(.title)

        Button("点我！") {
            print("按钮被点击了")
        }
        .padding()
        .background(Color.blue)
        .foregroundColor(.white)
        .cornerRadius(10)
    }
}
```

按 **Cmd+R** 重新运行，点击蓝色按钮试试！

---

## 📂 理解项目结构

```
HelloWorld/
├── HelloWorldApp.swift      # 应用入口
├── ContentView.swift         # 主界面 (你会经常修改这个)
├── Assets.xcassets/          # 图片、颜色等资源
└── Preview Content/          # 预览用的资源
```

### 关键文件说明

**HelloWorldApp.swift** - 应用入口
```swift
@main  // 标记这是应用的入口
struct HelloWorldApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()  // 显示主界面
        }
    }
}
```

**ContentView.swift** - 主界面
```swift
struct ContentView: View {
    var body: some View {
        // 这里写界面代码
    }
}
```

---

## 🎓 Xcode 基础操作

### 常用快捷键
- **Cmd+R**: 运行应用
- **Cmd+.**: 停止运行
- **Cmd+B**: 仅编译
- **Cmd+Shift+K**: 清理构建缓存
- **Option+Cmd+P**: 恢复预览
- **Cmd+Shift+O**: 快速打开文件

### 界面布局
- **左侧**: 文件导航器
- **中间**: 代码编辑器
- **右侧**: 实时预览 (SwiftUI)
- **底部**: 控制台 (显示 print 输出和错误)

---

## 🐛 常见问题

### 问题1: 模拟器启动失败
**解决方法**:
```bash
# 打开终端执行
sudo xcode-select --reset
```

### 问题2: 预览无法显示
**解决方法**:
1. 按 **Cmd+Shift+K** 清理构建
2. 重启 Xcode
3. 按 **Option+Cmd+P** 恢复预览

### 问题3: "No developer account" 警告
**不用担心**: 模拟器测试不需要开发者账号，直接忽略即可。

### 问题4: 编译错误
**常见原因**:
- 拼写错误
- 缺少大括号或括号
- 缺少逗号

**解决方法**: 看错误提示，Xcode 通常会指出问题所在行。

---

## ✅ 检查点

完成本指南后，你应该能够:
- [ ] 成功安装并启动 Xcode
- [ ] 创建新的 iOS 项目
- [ ] 在模拟器中运行应用
- [ ] 修改代码并看到效果
- [ ] 使用 Xcode 的实时预览

**全部完成？** 继续学习 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 开始系统学习！

---

## 🔄 下一步

### 推荐学习路径
1. 完成 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 阶段1 (Swift基础)
2. 学习 SwiftUI 基础组件 (Text, Button, Image, VStack, HStack)
3. 完成第一个小项目 (计数器应用)

### 推荐资源
- [Swift官方教程](https://docs.swift.org/swift-book/)
- [SwiftUI官方教程](https://developer.apple.com/tutorials/swiftui)
- [Hacking with Swift - 100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui)

---

**准备好了？开始系统学习**: [CORE_CHECKLIST.md](CORE_CHECKLIST.md)
