# KMP + Compose Multiplatform 学习指南

**最后更新**: 2025-12-19
**目标读者**: 熟悉 Kotlin 的 Android 开发者

## 🎯 学习目标

掌握 Kotlin Multiplatform (KMP) + Compose Multiplatform，实现一套代码运行在 Android、iOS、Desktop (macOS/Windows/Linux) 和 Web 平台。

## 📚 核心概念

### 什么是 KMP？

**Kotlin Multiplatform (KMP)** 是 JetBrains 推出的跨平台解决方案：
- **共享业务逻辑**：网络请求、数据处理、状态管理
- **平台特定实现**：expect/actual 机制处理平台差异
- **原生性能**：编译为各平台原生代码

### 什么是 Compose Multiplatform？

**Compose Multiplatform** 是基于 Jetpack Compose 的跨平台 UI 框架：
- Android 上就是 Jetpack Compose
- iOS/Desktop/Web 使用 Skia 渲染引擎
- 声明式 UI，熟悉 Compose 即可上手

### 架构关系

```
┌─────────────────────────────────────────────────────────┐
│                    Compose Multiplatform                │
│                    (共享 UI 层)                          │
├─────────────────────────────────────────────────────────┤
│                   Kotlin Multiplatform                  │
│                   (共享业务逻辑层)                        │
├──────────┬──────────┬──────────┬──────────┬────────────┤
│ Android  │   iOS    │  Desktop │   Web    │   Server   │
│  (JVM)   │ (Native) │  (JVM)   │  (WASM)  │   (JVM)    │
└──────────┴──────────┴──────────┴──────────┴────────────┘
```

## 🛠️ 环境准备

### 必备工具

1. **Android Studio** (最新稳定版)
   - 安装 Kotlin Multiplatform 插件
   - 安装 Compose Multiplatform IDE Support 插件

2. **Xcode** (iOS 开发必需)
   ```bash
   xcode-select --install
   ```

3. **JDK 17+**
   ```bash
   brew install openjdk@17
   ```

4. **CocoaPods** (iOS 依赖管理)
   ```bash
   sudo gem install cocoapods
   ```

### 验证环境

```bash
# 检查 Kotlin 版本
kotlin -version

# 检查 Xcode 命令行工具
xcode-select -p

# 检查 CocoaPods
pod --version
```

## 🚀 快速开始

### 方式一：使用官方向导 (推荐)

访问 [Kotlin Multiplatform Wizard](https://kmp.jetbrains.com/)：
1. 选择目标平台 (Android, iOS, Desktop, Web)
2. 选择是否使用 Compose Multiplatform
3. 下载生成的项目模板

### 方式二：使用 Android Studio 模板

1. File → New → New Project
2. 选择 "Kotlin Multiplatform App"
3. 配置项目名称和包名
4. 选择 iOS framework 分发方式

## 📁 项目结构

典型的 KMP + Compose 项目结构：

```
my-kmp-app/
├── composeApp/                    # Compose Multiplatform 模块
│   ├── src/
│   │   ├── commonMain/            # 共享代码
│   │   │   └── kotlin/
│   │   │       ├── App.kt         # 主 Composable
│   │   │       └── ...
│   │   ├── androidMain/           # Android 特定代码
│   │   ├── iosMain/               # iOS 特定代码
│   │   ├── desktopMain/           # Desktop 特定代码
│   │   └── wasmJsMain/            # Web 特定代码
│   └── build.gradle.kts
├── iosApp/                        # iOS 应用入口 (Xcode 项目)
├── shared/                        # 纯业务逻辑共享 (可选)
├── gradle/
├── build.gradle.kts
└── settings.gradle.kts
```

### Source Sets 说明

| Source Set | 作用 | 包含内容 |
|------------|------|----------|
| commonMain | 所有平台共享 | 业务逻辑、UI、expect 声明 |
| androidMain | Android 特定 | actual 实现、Android API 调用 |
| iosMain | iOS 特定 | actual 实现、iOS API 调用 |
| desktopMain | 桌面特定 | actual 实现、JVM API |
| wasmJsMain | Web 特定 | actual 实现、JS 互操作 |

## 📖 学习路线

### 阶段 1：项目创建与运行 (Day 1-2)
- [ ] 使用 Wizard 创建项目
- [ ] 在 Android 模拟器运行
- [ ] 在 iOS 模拟器运行
- [ ] 在 Desktop 运行
- [ ] 理解项目结构

### 阶段 2：共享 UI 开发 (Day 3-5)
- [ ] 复习 Jetpack Compose 基础
- [ ] 创建跨平台 Composable
- [ ] 平台特定样式适配
- [ ] 资源管理 (图片、字符串)
- [ ] 主题与设计系统

### 阶段 3：状态管理与架构 (Day 6-8)
- [ ] ViewModel 跨平台方案
- [ ] 状态管理 (StateFlow, MutableState)
- [ ] 导航 (Navigation-Compose)
- [ ] MVVM/MVI 架构实践

### 阶段 4：网络与数据 (Day 9-12)
- [ ] Ktor Client 网络请求
- [ ] Kotlin Serialization JSON 解析
- [ ] SQLDelight 本地数据库
- [ ] DataStore 偏好存储

### 阶段 5：平台特定功能 (Day 13-15)
- [ ] expect/actual 机制
- [ ] 权限处理
- [ ] 平台 API 调用 (相机、文件系统等)
- [ ] 原生视图嵌入

### 阶段 6：实战项目 (Day 16+)
- [ ] 设计一个完整的跨平台应用
- [ ] 实现核心功能
- [ ] 各平台打包发布

## 🔧 常用库

### 核心框架
| 库 | 用途 | 文档 |
|---|------|------|
| Compose Multiplatform | 跨平台 UI | [官方文档](https://www.jetbrains.com/lp/compose-multiplatform/) |
| Ktor Client | 网络请求 | [Ktor 文档](https://ktor.io/docs/getting-started-ktor-client.html) |
| Kotlin Serialization | JSON 解析 | [官方文档](https://github.com/Kotlin/kotlinx.serialization) |
| SQLDelight | 本地数据库 | [SQLDelight](https://cashapp.github.io/sqldelight/) |

### 架构相关
| 库 | 用途 |
|---|------|
| Koin | 依赖注入 |
| Voyager / Decompose | 导航 |
| MVIKotlin | MVI 架构 |
| Multiplatform Settings | 偏好存储 |

### 其他实用库
| 库 | 用途 |
|---|------|
| Coil3 | 图片加载 |
| Napier | 跨平台日志 |
| KotlinX DateTime | 日期时间处理 |
| UUID | 跨平台 UUID 生成 |

## 🔗 学习资源

### 官方资源
- [Kotlin Multiplatform 官方文档](https://kotlinlang.org/docs/multiplatform.html)
- [Compose Multiplatform 官方文档](https://www.jetbrains.com/lp/compose-multiplatform/)
- [KMP Wizard](https://kmp.jetbrains.com/) - 项目生成器
- [Kotlin Multiplatform Samples](https://github.com/JetBrains/compose-multiplatform/tree/master/examples)

### 推荐教程
- [官方 Get Started 教程](https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html)
- [Philipp Lackner 的 KMP 系列](https://www.youtube.com/playlist?list=PLQkwcJG4YTCS3AD2C-xyQq6a-uvfKBvkn)
- [Touchlab KMP 指南](https://touchlab.co/kotlin-multiplatform)

### 社区
- [Kotlin Slack #multiplatform](https://kotlinlang.slack.com/)
- [Reddit r/Kotlin](https://www.reddit.com/r/Kotlin/)

## 📝 学习笔记

记录你的学习心得和遇到的问题：

### 常见问题

1. **iOS 模拟器启动失败**
   - 检查 Xcode 是否正确安装
   - 运行 `pod install` 更新依赖

2. **Gradle 同步失败**
   - 检查网络连接
   - 尝试使用代理或镜像

3. **expect/actual 不匹配**
   - 确保所有目标平台都有 actual 实现
   - 检查函数签名是否完全一致

---

## 目录结构 (待创建)

```
kmp/
├── README.md                      # 本文件
├── CLAUDE.md                      # AI 操作指南
├── 01_getting_started/            # 入门项目
├── 02_compose_basics/             # Compose 基础
├── 03_state_management/           # 状态管理
├── 04_networking/                 # 网络请求
├── 05_database/                   # 本地存储
├── 06_platform_specific/          # 平台特定功能
├── 07_architecture/               # 架构模式
└── projects/                      # 实战项目
```

---

> 💡 **提示**：作为 Android 开发者，你已经熟悉 Jetpack Compose 和 Kotlin，学习曲线会比较平缓。重点关注 expect/actual 机制和各平台的差异处理即可。
