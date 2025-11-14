# iOS 核心学习项目

> **广度优先学习** - 10-14天掌握iOS/Swift核心知识，能独立完成小型iOS应用

---

## 🚀 快速开始 (3选1)

| 如果你是... | 建议路径 | 预计时间 |
|------------|---------|---------|
| **完全新手** | [30分钟快速上手](QUICK_START.md) → [核心检查清单](CORE_CHECKLIST.md) | 10-14天 |
| **有编程基础** | [核心检查清单](CORE_CHECKLIST.md) → 运行示例代码 | 7-10天 |
| **只想速查** | [代码速查手册](CODE_PATTERNS/README.md) | 随时参考 |

---

## 📋 项目结构

```
learn_ios/
├── QUICK_START.md           # 30分钟快速上手 ⭐ 新手必看
├── CORE_CHECKLIST.md        # 核心知识检查清单 ⭐ 学习主线
├── CODE_PATTERNS/           # 5个最常用代码模式 ⭐ 速查手册
├── TROUBLESHOOTING.md       # 5个最常见问题排查 ⭐ 遇到问题看这里
├── LEARNING_PATH.md         # 详细学习路线图 (深入学习参考)
│
├── 01_swift_basics/         # Swift基础语法
├── 02_ui_basics/            # UI基础概念
├── 03_swiftui/              # SwiftUI框架 (现代方式)
├── 04_uikit/                # UIKit框架 (传统方式)
├── 05_data_persistence/     # 数据持久化
├── 06_networking/           # 网络请求
├── 07_advanced_features/    # 高级特性
└── 08_project_templates/    # 项目模板
```

---

## 🎯 推荐学习流程

### 第1天: 环境和基础
- [ ] 阅读 [QUICK_START.md](QUICK_START.md)
- [ ] 安装 Xcode
- [ ] 创建并运行 Hello World iOS 应用
- [ ] 了解 Swift Playground

### 第2-5天: Swift基础 + SwiftUI入门
- [ ] 按照 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 学习
- [ ] 重点: Swift语法、Optional、Struct vs Class
- [ ] SwiftUI基础: View、State、Binding
- [ ] 运行 `01_swift_basics/examples/` 中的示例

### 第6-10天: 实战项目
- [ ] 选择一个核心项目完成 (见 CORE_CHECKLIST.md 阶段3)
  - 待办事项 App (SwiftUI + CoreData)
  - 天气查询 App (Networking + JSON)
  - 照片浏览器 (UIKit + Photo Library)
- [ ] 遇到问题查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- [ ] 需要代码参考查看 [CODE_PATTERNS](CODE_PATTERNS/README.md)

### 第11-14天: 巩固和扩展
- [ ] 完成练习题
- [ ] 学习调试技巧 (LLDB, Instruments)
- [ ] 了解 App 发布流程
- [ ] 复习核心知识点

---

## 📚 核心文档说明

| 文档 | 用途 | 何时查看 |
|------|------|---------|
| [QUICK_START.md](QUICK_START.md) | 30分钟入门 | 第一次使用 |
| [CORE_CHECKLIST.md](CORE_CHECKLIST.md) | 学习主线 | 系统学习时 |
| [CODE_PATTERNS](CODE_PATTERNS/README.md) | 代码速查 | 写代码时忘记语法 |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | 问题排查 | 遇到错误时 |
| [LEARNING_PATH.md](LEARNING_PATH.md) | 深度学习路线 | 想深入某个主题 |
| [CLAUDE.md](CLAUDE.md) | AI学习助手规则 | 与Claude协作学习时 |

---

## ✅ 学习目标

完成本项目后，你将能够:
- ✅ 使用 Swift 编写 iOS 应用
- ✅ 使用 SwiftUI 构建现代化界面
- ✅ 理解 iOS 应用生命周期
- ✅ 处理用户输入和导航
- ✅ 实现数据持久化 (UserDefaults, CoreData)
- ✅ 进行网络请求和 JSON 解析
- ✅ 调试和测试 iOS 应用
- ✅ 独立完成小型 iOS 项目

**不包含** (需要额外深入学习):
- ❌ 复杂的动画和自定义转场
- ❌ 高级性能优化
- ❌ ARKit、CoreML 等高级框架
- ❌ 复杂的多线程编程
- ❌ App Store 上架的商业流程

---

## 🎓 学习原则

1. **广度优先** - 先掌握20%核心知识解决80%问题
2. **实践为主** - 每个概念都要在 Xcode 中运行验证
3. **SwiftUI优先** - 学习现代化的开发方式
4. **小步快跑** - 每天1-2小时，持续学习
5. **及时反馈** - 不懂就问，不要堆积问题

---

## 💡 使用建议

### 创建和运行项目
```bash
# 1. 打开 Xcode
# 2. File -> New -> Project
# 3. 选择 iOS -> App
# 4. 选择 SwiftUI 作为 Interface
# 5. 按 Cmd+R 运行到模拟器
```

### 快速测试代码
- 使用 **Swift Playgrounds** 快速验证 Swift 语法
- 使用 **Xcode Previews** 实时预览 SwiftUI 界面
- 使用 **#Preview** 宏快速迭代 UI

### 调试问题
1. 先查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. 使用 `print()` 输出调试信息
3. 使用断点和 LLDB 调试器
4. 使用 Instruments 分析性能问题

---

## 📊 进度追踪

在 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 中勾选完成的项目。

---

## 🆘 获取帮助

- **查看文档**: 99%的问题在 TROUBLESHOOTING.md 中有答案
- **运行示例**: examples/ 目录有完整可运行代码
- **使用 Claude**: 根据 CLAUDE.md 的指导与AI协作学习
- **在线资源**:
  - [Swift官方文档](https://docs.swift.org/swift-book/)
  - [SwiftUI官方教程](https://developer.apple.com/tutorials/swiftui)
  - [Apple Developer Documentation](https://developer.apple.com/documentation/)
  - [Hacking with Swift](https://www.hackingwithswift.com/)

---

## 🔧 系统要求

- **macOS** 12.0 或更高版本
- **Xcode** 14.0 或更高版本
- **Apple ID** (免费账号即可用于模拟器测试)
- **真机测试** (可选): iPhone/iPad 和 Apple Developer 账号

---

**开始学习**: 打开 [QUICK_START.md](QUICK_START.md) 开始30分钟快速上手！
