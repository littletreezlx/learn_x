# 02 - Compose Multiplatform 基础

## 目标

掌握 Compose Multiplatform 的核心概念，学习如何编写跨平台的 Composable 组件。

## 核心差异：Jetpack Compose vs Compose Multiplatform

### ✅ 相同之处

- 所有基础 Composable（Column、Row、Text、Button 等）
- 布局系统
- 状态管理（remember、state）
- 动画 API
- 大部分 Modifier

### ⚠️ 需要注意的差异

| 概念 | Jetpack Compose | Compose Multiplatform |
|------|----------------|----------------------|
| 资源 | `R.string.title` | `Res.string.title` |
| 图片 | `R.drawable.logo` | `Res.drawable.logo` |
| 颜色 | `MaterialTheme.colors.primary` | `MaterialTheme.colorScheme.primary` |
| 尺寸 | `R.dimen.padding_large` | `Res.dimens.padding_large` |

## 资源管理

Compose Multiplatform 使用资源库管理资源：

### 1. 添加依赖

在 `composeApp/build.gradle.kts` 中：

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation(compose.components.resources)
        }
    }
}
```

### 2. 创建资源目录结构

```
composeApp/src/commonMain/composeResources/
├── drawable/      # 图片资源
│   └── logo.png
├── values/        # 字符串、颜色、尺寸
│   ├── strings.xml
│   └── dimens.xml
└── mipmap/        # 应用图标
```

### 3. 使用资源

```kotlin
@Composable
fun MyScreen() {
    Text(
        text = Res.string.welcome_message, // 字符串
        modifier = Modifier.padding(
            start = Res.dimens.padding_medium // 尺寸
        )
    )
    Image(
        painter = painterResource(Res.drawable.logo), // 图片
        contentDescription = "Logo"
    )
}
```

## 平台特定 UI 处理

### 1. 平台检测

```kotlin
@Composable
fun PlatformAwareContent() {
    val platform = getPlatform()

    when (platform.name) {
        "Android" -> AndroidSpecificUI()
        "iOS" -> iOSSpecificUI()
        "Desktop" -> DesktopSpecificUI()
        "Web" -> WebSpecificUI()
    }
}
```

### 2. 平台样式适配

```kotlin
@Composable
fun AdaptiveButton() {
    Button(
        onClick = { /* 处理点击 */ },
        modifier = Modifier
            .fillMaxWidth()
            .padding(
                // iOS 需要更大的点击区域
                top = if (getPlatform().name == "iOS") 24.dp else 16.dp
            ),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (getPlatform().name == "iOS") {
                Color.Blue // iOS 蓝色
            } else {
                Color.Green // 其他平台绿色
            }
        )
    ) {
        Text("Click Me")
    }
}
```

## 常用 Composable 示例

### 1. 响应式布局

```kotlin
@Composable
fun ResponsiveLayout() {
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp

    // 根据屏幕宽度调整布局
    if (screenWidth < 600.dp) {
        // 手机布局 - 垂直
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            TopSection()
            Spacer(modifier = Modifier.height(16.dp))
            BottomSection()
        }
    } else {
        // 平板/桌面布局 - 水平
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            TopSection()
            Spacer(modifier = Modifier.width(32.dp))
            BottomSection()
        }
    }
}
```

### 2. 自定义输入框

```kotlin
@Composable
fun CustomTextField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    modifier: Modifier = Modifier
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        placeholder = { Text(placeholder) },
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Text,
            imeAction = ImeAction.Next
        ),
        keyboardActions = KeyboardActions(
            onNext = { /* 处理下一个 */ }
        ),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = MaterialTheme.colorScheme.primary,
            unfocusedBorderColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.3f)
        )
    )
}
```

### 3. 卡片组件

```kotlin
@Composable
fun InfoCard(
    title: String,
    description: String,
    imageUrl: String? = null,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(
            defaultElevation = 4.dp
        ),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            if (imageUrl != null) {
                AsyncImage(
                    model = imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                        .clip(MaterialTheme.shapes.medium),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.height(16.dp))
            }

            Text(
                text = title,
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.onSurface
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
            )
        }
    }
}
```

## 主题与设计系统

### 1. 自定义颜色方案

```kotlin
@Composable
fun MyTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) {
        darkColorScheme(
            primary = Color(0xFF6200EE),
            secondary = Color(0xFF03DAC6),
            background = Color(0xFF121212),
            surface = Color(0xFF1E1E1E)
        )
    } else {
        lightColorScheme(
            primary = Color(0xFF6200EE),
            secondary = Color(0xFF03DAC6),
            background = Color(0xFFFFFBFE),
            surface = Color(0xFFFFFBFE)
        )
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

### 2. 响应式字体大小

```kotlin
val Typography = Typography(
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    // 为大屏幕调整字体
    bodyMedium = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.25.sp
    )
)
```

## 实践练习

### 练习 1：创建一个跨平台组件

创建一个 `ProfileCard` 组件，要求：
1. 显示头像、姓名、职位
2. 适配不同屏幕尺寸
3. 平台特定的点击反馈（Android：Ripple，iOS：缩放动画）

```kotlin
@Composable
fun ProfileCard(
    name: String,
    title: String,
    avatarUrl: String,
    onCardClick: () -> Unit
) {
    // TODO: 实现这个组件
}
```

### 练习 2：实现响应式网格

创建一个响应式网格布局，根据屏幕宽度显示不同列数：
- 手机：1 列
- 平板：2 列
- 桌面：3 列

### 练习 3：添加暗色模式支持

修改你的 App，添加暗色模式切换功能，并让所有组件正确支持暗色主题。

## 最佳实践

1. **使用 CompositionLocal 传递平台信息**
   ```kotlin
   val LocalPlatform = staticCompositionLocalOf<Platform> {
       error("No platform provided")
   }
   ```

2. **创建可复用的组件库**
   - 将常用组件放在 `commonMain/compose/ui/`
   - 使用参数化设计，避免硬编码

3. **性能优化**
   ```kotlin
   @Composable
   fun ExpensiveComposable(data: Data) {
       // 使用 remember 避免重复计算
       val processedData = remember(data) {
           processData(data)
       }

       LazyColumn {
           // 使用 LazyColumn 处理长列表
       }
   }
   ```

4. **测试各平台**
   - 定期在各平台测试
   - 注意平台特定的 UI/UX 差异

## 下一步

完成本节后，继续学习 [03_state_management](../03_state_management/) 了解如何在 Compose Multiplatform 中管理状态。

---

## 检查清单

- [ ] 理解资源管理方式
- [ ] 实现平台特定 UI 适配
- [ ] 完成练习 1：ProfileCard 组件
- [ ] 完成练习 2：响应式网格
- [ ] 完成练习 3：暗色模式支持
- [ ] 了解最佳实践
