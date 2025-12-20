# 03 - 状态管理与架构

## 目标

掌握 Compose Multiplatform 中的状态管理方案，包括跨平台的 ViewModel、导航系统等。

## 状态管理方案对比

### 选项 1：Compose State + remember (简单场景)

```kotlin
@Composable
fun CounterScreen() {
    var count by remember { mutableIntStateOf(0) }

    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

**适用场景**：
- 简单的 UI 状态
- 不需要持久化的数据
- 组件内使用的临时状态

### 选项 2：ViewModel + StateFlow (推荐)

Compose Multiplatform 还没有官方的 ViewModel，但社区提供了多种解决方案：

#### 使用 mvvm-core

```kotlin
// build.gradle.kts
commonMain.dependencies {
    implementation("org.jetbrains.androidx.lifecycle:lifecycle-viewmodel-compose:2.8.0")
    implementation("org.jetbrains.androidx.lifecycle:lifecycle-runtime-compose:2.8.0")
}
```

```kotlin
@Composable
fun CounterViewModelScreen() {
    val viewModel: CounterViewModel = viewModel()
    val uiState by viewModel.uiState.collectAsState()

    Column {
        Text("Count: ${uiState.count}")
        Button(onClick = { viewModel.increment() }) {
            Text("Increment")
        }
    }
}
```

#### ViewModel 实现

```kotlin
class CounterViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    fun increment() {
        _uiState.update { it.copy(count = it.count + 1) }
    }

    fun decrement() {
        _uiState.update { it.copy(count = it.count - 1) }
    }
}

data class UiState(
    val count: Int = 0,
    val isLoading: Boolean = false,
    val error: String? = null
)
```

### 选项 3：MVI 架构

```kotlin
sealed class CounterAction {
    object Increment : CounterAction()
    object Decrement : CounterAction()
}

@Composable
fun MviCounterScreen() {
    val store = rememberMviStore(
        initialState = CounterState(),
        reducer = ::counterReducer
    )

    val state by store.state.collectAsState()

    Column {
        Text("Count: ${state.count}")
        Button(onClick = { store.dispatch(CounterAction.Increment) }) {
            Text("Increment")
        }
    }
}
```

## 导航系统

Compose Multiplatform 提供了多种导航方案，这里介绍最常用的两种：

### 方案 1：Voyager (推荐)

[Documentation](https://voyager.adriel.cafe/)

#### 依赖配置

```kotlin
commonMain.dependencies {
    implementation("cafe.adriel.voyager:voyager-navigator:1.0.0")
    implementation("cafe.adriel.voyager:voyager-screen-model:1.0.0")
    implementation("cafe.adriel.voyager:voyager-transitions:1.0.0")
}
```

#### 基本用法

```kotlin
// 定义 Screen
@Serializable
data class HomeScreen(val title: String) : ScreenModel

@Composable
fun HomeScreen() {
    Screen {
        Text("Home Screen")
    }
}

// 主 App
@Composable
fun MyApp() {
    VoyagerNavigator(
        screen = HomeScreen()
    )
}
```

#### 带参数的导航

```kotlin
@Composable
fun ProductListScreen(
    navigator: Navigator
) {
    val products = remember { loadProducts() }

    LazyColumn {
        items(products) { product ->
            ProductItem(
                product = product,
                onClick = {
                    // 导航到详情页
                    navigator.push(ProductDetailScreen(product.id))
                }
            )
        }
    }
}

@Serializable
data class ProductDetailScreen(val productId: String) : ScreenModel

@Composable
fun ProductDetailScreen(
    screenModel: ProductDetailScreen,
    navigator: Navigator
) {
    val product = remember { loadProduct(screenModel.productId) }

    Column {
        Text(product.name)
        Button(
            onClick = { navigator.pop() }
        ) {
            Text("Back")
        }
    }
}
```

### 方案 2：Decompose

[Documentation](https://arkivanov.github.io/Decompose/)

```kotlin
// 使用 Decompose 的导航示例
@Composable
fun RootContent(
    component: RootComponent
) {
    Children(
        stack = component.stack,
        animation = stackAnimation(fade())
    ) { child ->
        when (val instance = child.instance) {
            is RootComponent.Child.Home -> HomeContent(instance.component)
            is RootComponent.Child.Details -> DetailsContent(instance.component)
        }
    }
}
```

## 依赖注入

### Koin (推荐)

#### 依赖配置

```kotlin
commonMain.dependencies {
    implementation("io.insert-koin:koin-core:3.5.0")
    implementation("io.insert-koin:koin-android:3.5.0")
    implementation("io.insert-koin:koin-compose:3.5.0")
}
```

#### 定义模块

```kotlin
val appModule = module {
    // 单例
    single { ApiClient() }
    // 工厂
    factory { (id: String) -> UserRepository(get(), id) }
    // ViewModel
    viewModel { CounterViewModel(get()) }
}
```

#### 使用依赖注入

```kotlin
@Composable
fun App() {
    startKoin {
        androidContext(context)
        modules(appModule)
    }

    val viewModel: CounterViewModel by koinInject()

    CounterScreen(viewModel)
}
```

## 实战示例：TODO 应用

### 1. 定义数据模型

```kotlin
// commonMain/kotlin/model/Todo.kt
@Serializable
data class Todo(
    val id: String = UUID().toString(),
    val title: String,
    val description: String = "",
    val isCompleted: Boolean = false,
    val createdAt: Instant = Clock.System.now()
)

// Repository
class TodoRepository(
    private val database: SqlDelightDriver
) {
    suspend fun getAllTodos(): Flow<List<Todo>> = database.getAllTodos()
    suspend fun addTodo(todo: Todo) = database.addTodo(todo)
    suspend fun updateTodo(todo: Todo) = database.updateTodo(todo)
    suspend fun deleteTodo(id: String) = database.deleteTodo(id)
}
```

### 2. ViewModel 实现

```kotlin
class TodoViewModel(
    private val repository: TodoRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(TodoUiState())
    val uiState: StateFlow<TodoUiState> = _uiState.asStateFlow()

    init {
        loadTodos()
    }

    private fun loadTodos() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }

            repository.getAllTodos()
                .catch { error ->
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            error = error.message
                        )
                    }
                }
                .collect { todos ->
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            todos = todos,
                            error = null
                        )
                    }
                }
        }
    }

    fun addTodo(title: String) {
        if (title.isBlank()) return

        viewModelScope.launch {
            repository.addTodo(
                Todo(title = title)
            )
        }
    }

    fun toggleTodo(todo: Todo) {
        viewModelScope.launch {
            repository.updateTodo(
                todo.copy(isCompleted = !todo.isCompleted)
            )
        }
    }

    fun deleteTodo(todo: Todo) {
        viewModelScope.launch {
            repository.deleteTodo(todo.id)
        }
    }
}

data class TodoUiState(
    val todos: List<Todo> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val newTodoTitle: String = ""
)
```

### 3. UI 实现

```kotlin
@Composable
fun TodoScreen(
    viewModel: TodoViewModel,
    navigator: Navigator
) {
    val uiState by viewModel.uiState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // 输入区域
        TodoInput(
            title = uiState.newTodoTitle,
            onTitleChange = { viewModel.updateNewTodoTitle(it) },
            onAddClick = { viewModel.addTodo(uiState.newTodoTitle) }
        )

        Spacer(modifier = Modifier.height(16.dp))

        // 列表区域
        when {
            uiState.isLoading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
            uiState.error != null -> {
                ErrorView(
                    error = uiState.error,
                    onRetry = { viewModel.loadTodos() }
                )
            }
            else -> {
                TodoList(
                    todos = uiState.todos,
                    onToggle = viewModel::toggleTodo,
                    onDelete = viewModel::deleteTodo,
                    onItemClick = { todo ->
                        navigator.push(TodoDetailScreen(todo.id))
                    }
                )
            }
        }
    }
}

@Composable
fun TodoList(
    todos: List<Todo>,
    onToggle: (Todo) -> Unit,
    onDelete: (Todo) -> Unit,
    onItemClick: (Todo) -> Unit
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(todos) { todo ->
            TodoItem(
                todo = todo,
                onToggle = { onToggle(todo) },
                onDelete = { onDelete(todo) },
                onClick = { onItemClick(todo) }
            )
        }
    }
}

@Composable
fun TodoItem(
    todo: Todo,
    onToggle: () -> Unit,
    onDelete: () -> Unit,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = todo.isCompleted,
                onCheckedChange = { onToggle() }
            )

            Spacer(modifier = Modifier.width(16.dp))

            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = todo.title,
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (todo.isCompleted) {
                        TextDecoration.LineThrough
                    } else null
                )

                if (todo.description.isNotBlank()) {
                    Text(
                        text = todo.description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                    )
                }
            }

            IconButton(onClick = onDelete) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Delete"
                )
            }
        }
    }
}
```

## 最佳实践

### 1. 状态提升

```kotlin
// ✅ 好的做法 - 状态在父组件
@Composable
fun ParentComponent() {
    var text by remember { mutableStateOf("") }

    ChildComponent(
        text = text,
        onTextChange = { text = it }
    )
}

@Composable
fun ChildComponent(
    text: String,
    onTextChange: (String) -> Unit
) {
    TextField(
        value = text,
        onValueChange = onTextChange
    )
}

// ❌ 避免 - 状态在子组件中
@Composable
fun BadChildComponent() {
    var text by remember { mutableStateOf("") }
    // 父组件无法访问这个状态
}
```

### 2. 使用不可变数据

```kotlin
// ✅ 使用 data class + copy
data class User(
    val name: String,
    val age: Int
)

// 更新时
val updatedUser = user.copy(age = user.age + 1)

// ❌ 避免使用可变数据
class User(var name: String, var age: Int)
```

### 3. 分离关注点

```
UI Layer (Composable)
    ↓ 状态
ViewModel (业务逻辑)
    ↓
Repository (数据层)
    ↓
Data Source (数据库、网络等)
```

### 4. 错误处理

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Throwable) : Result<Nothing>()
    object Loading : Result<Nothing>()
}
```

## 下一步

完成本节后，继续学习 [04_networking](../04_networking/) 了解如何在 KMP 中处理网络请求。

---

## 检查清单

- [ ] 选择并实现状态管理方案
- [ ] 配置导航系统（Voyager 或 Decompose）
- [ ] 实现依赖注入
- [ ] 完成 TODO 应用示例
- [ ] 理解最佳实践
- [ ] 实现错误处理机制
