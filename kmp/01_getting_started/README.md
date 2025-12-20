# 01 - 快速开始

## 目标

创建你的第一个 KMP + Compose Multiplatform 项目，并在各平台运行。

## 步骤 1：使用 KMP Wizard 创建项目

### 1.1 访问 Wizard

打开 [https://kmp.jetbrains.com/](https://kmp.jetbrains.com/)

### 1.2 配置项目

| 选项 | 推荐值 | 说明 |
|------|--------|------|
| Project name | MyKmpApp | 项目名称 |
| Project ID | com.example.mykmpapp | 包名 |
| Android | ✅ | 必选 |
| iOS | ✅ | 使用 macOS 必选 |
| Desktop | ✅ | JVM 桌面应用 |
| Web | ✅ | WASM 版本 |
| Share UI | ✅ Compose Multiplatform | 共享 UI |

### 1.3 下载并解压

下载生成的 zip 文件，解压到此目录。

## 步骤 2：用 Android Studio 打开

1. 打开 Android Studio
2. File → Open → 选择项目目录
3. 等待 Gradle 同步完成（首次可能需要较长时间）

### 常见问题

**Gradle 同步失败？**
```bash
# 清理缓存重试
./gradlew clean
./gradlew --refresh-dependencies
```

**缺少 Kotlin Multiplatform 插件？**
- Settings → Plugins → 搜索 "Kotlin Multiplatform"
- 安装后重启 Android Studio

## 步骤 3：运行各平台

### Android

```bash
# 命令行
./gradlew :composeApp:assembleDebug

# 或在 Android Studio 中选择 composeApp 配置，点击运行
```

### iOS

```bash
# 首次需要安装 CocoaPods 依赖
cd iosApp
pod install

# 在 Android Studio 中选择 iosApp 配置
# 或用 Xcode 打开 iosApp/iosApp.xcworkspace
```

### Desktop

```bash
./gradlew :composeApp:run
```

### Web (WASM)

```bash
./gradlew :composeApp:wasmJsBrowserDevelopmentRun
```

## 步骤 4：理解项目结构

打开项目后，重点关注以下文件：

### `composeApp/src/commonMain/kotlin/App.kt`

这是共享的主入口 Composable：

```kotlin
@Composable
fun App() {
    MaterialTheme {
        var showContent by remember { mutableStateOf(false) }
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Button(onClick = { showContent = !showContent }) {
                Text("Click me!")
            }
            AnimatedVisibility(showContent) {
                // 共享 UI
                Column {
                    // greeting 来自共享逻辑
                    Text("Compose: ${Greeting().greet()}")
                }
            }
        }
    }
}
```

### `composeApp/src/commonMain/kotlin/Greeting.kt`

共享的业务逻辑：

```kotlin
class Greeting {
    private val platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}
```

### `composeApp/src/commonMain/kotlin/Platform.kt`

expect 声明（期望各平台实现）：

```kotlin
expect fun getPlatform(): Platform

interface Platform {
    val name: String
}
```

### 各平台的 actual 实现

**androidMain/Platform.android.kt:**
```kotlin
actual fun getPlatform(): Platform = AndroidPlatform()

class AndroidPlatform : Platform {
    override val name: String = "Android ${android.os.Build.VERSION.SDK_INT}"
}
```

**iosMain/Platform.ios.kt:**
```kotlin
actual fun getPlatform(): Platform = IOSPlatform()

class IOSPlatform : Platform {
    override val name: String = UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion
}
```

## 练习

### 练习 1：修改问候语

在 `Greeting.kt` 中修改 `greet()` 方法，添加当前时间：

```kotlin
fun greet(): String {
    val hour = Clock.System.now()
        .toLocalDateTime(TimeZone.currentSystemDefault())
        .hour

    val timeGreeting = when (hour) {
        in 0..11 -> "Good morning"
        in 12..17 -> "Good afternoon"
        else -> "Good evening"
    }

    return "$timeGreeting from ${platform.name}!"
}
```

> 需要添加 `kotlinx-datetime` 依赖

### 练习 2：添加一个新的 Composable

在 `commonMain` 中创建一个新的 Composable 组件，在各平台运行测试。

## 下一步

完成本节后，继续 [02_compose_basics](../02_compose_basics/) 学习跨平台 Compose 开发。

---

## 检查清单

- [ ] 成功创建项目
- [ ] Gradle 同步成功
- [ ] Android 运行成功
- [ ] iOS 运行成功
- [ ] Desktop 运行成功
- [ ] Web 运行成功
- [ ] 理解 expect/actual 机制
- [ ] 完成练习 1
- [ ] 完成练习 2
