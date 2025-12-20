# 04 - 网络请求

## 目标

掌握在 Compose Multiplatform 中使用 Ktor Client 进行跨平台网络请求。

## 为什么选择 Ktor？

[Ktor](https://ktor.io/) 是 JetBrains 官方的异步 HTTP 客户端和服务器框架，天然支持 Kotlin Multiplatform：

- ✅ 跨平台支持（Android、iOS、Desktop、Web）
- ✅ 协程原生支持
- ✅ 模块化设计（按需添加功能）
- ✅ 灵活的配置和扩展
- ✅ 与 Kotlin 生态系统完美集成

## Ktor Client 核心组件

### 1. HttpClient 核心引擎

| 平台 | 默认引擎 | 可选引擎 |
|------|----------|----------|
| Android | OkHttp | - |
| iOS | Darwin | - |
| Desktop | CIO/OkHttp | Apache, JavaHttp |
| Web (WASM) | Js | - |

### 2. 核心依赖配置

在 `composeApp/build.gradle.kts` 中：

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            // Ktor Core
            implementation("io.ktor:ktor-client-core:2.3.8")
            // JSON 序列化
            implementation("io.ktor:ktor-client-content-negotiation:2.3.8")
            implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.8")
            // 日志
            implementation("io.ktor:ktor-client-logging:2.3.8")
        }

        androidMain.dependencies {
            // Android 使用 OkHttp
            implementation("io.ktor:ktor-client-okhttp:2.3.8")
        }

        iosMain.dependencies {
            // iOS 使用 Darwin
            implementation("io.ktor:ktor-client-darwin:2.3.8")
        }

        desktopMain.dependencies {
            // Desktop 使用 CIO (Coroutines I/O)
            implementation("io.ktor:ktor-client-cio:2.3.8")
        }

        wasmJsMain.dependencies {
            // Web 使用 Js
            implementation("io.ktor:ktor-client-js:2.3.8")
        }
    }
}
```

## 配置 HttpClient

### 1. 基础配置

```kotlin
// commonMain/kotlin/network/HttpClientFactory.kt
object HttpClientFactory {
    fun create(): HttpClient {
        return HttpClient {
            // JSON 配置
            install(ContentNegotiation) {
                json(Json {
                    ignoreUnknownKeys = true
                    isLenient = true
                    encodeDefaults = false
                })
            }

            // 日志配置
            install(Logging) {
                logger = Logger.DEFAULT
                level = LogLevel.INFO
            }

            // 默认请求头
            defaultRequest {
                url {
                    protocol = URLProtocol.HTTPS
                }
                header("Content-Type", "application/json")
            }
        }
    }
}
```

### 2. 平台特定配置

```kotlin
// expect 声明
expect fun createPlatformClient(): HttpClient

// androidMain 实现
actual fun createPlatformClient(): HttpClient {
    return HttpClient(OkHttp) {
        // Android 特定配置
        engine {
            // 配置 OkHttp
            config {
                // 超时设置
                connectTimeout(30, TimeUnit.SECONDS)
                readTimeout(30, TimeUnit.SECONDS)

                // 缓存
                cache(Cache(File(context.cacheDir, "ktor_cache"), 10 * 1024 * 1024))

                // 拦截器
                addInterceptor(HttpLoggingInterceptor().apply {
                    level = HttpLoggingInterceptor.Level.BODY
                })
            }
        }
    }
}

// iosMain 实现
actual fun createPlatformClient(): HttpClient {
    return HttpClient(Darwin) {
        // iOS 特定配置
        engine {
            configureRequest {
                // 配置 URLSession
                setAllowsCellularAccess(true)
                setAllowsExpensiveNetworkAccess(true)
                setCachePolicy(URLRequest.CachePolicy.USE_PROTOCOL_CACHE_POLICY)
            }
        }
    }
}
```

## API 定义

### 1. 数据模型

```kotlin
// commonMain/kotlin/models/Post.kt
@Serializable
data class Post(
    val id: Int,
    val title: String,
    val body: String,
    val userId: Int,
    @SerialName("createdAt")
    val createdAt: String = ""
)

@Serializable
data class CreatePostRequest(
    val title: String,
    val body: String,
    val userId: Int
)

@Serializable
data class ApiResponse<T>(
    val data: T? = null,
    val error: String? = null,
    val code: Int = 0
)
```

### 2. API 接口定义

```kotlin
// commonMain/kotlin/api/ApiService.kt
interface ApiService {
    suspend fun getPosts(): Result<List<Post>>
    suspend fun getPost(id: Int): Result<Post>
    suspend fun createPost(post: CreatePostRequest): Result<Post>
    suspend fun updatePost(id: Int, post: Post): Result<Post>
    suspend fun deletePost(id: Int): Result<Unit>
}

class ApiServiceImpl(
    private val httpClient: HttpClient
) : ApiService {

    companion object {
        private const val BASE_URL = "https://jsonplaceholder.typicode.com"
    }

    override suspend fun getPosts(): Result<List<Post>> {
        return try {
            val response = httpClient.get("$BASE_URL/posts")
                .body<List<Post>>()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun getPost(id: Int): Result<Post> {
        return try {
            val response = httpClient.get("$BASE_URL/posts/$id")
                .body<Post>()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun createPost(post: CreatePostRequest): Result<Post> {
        return try {
            val response = httpClient.post("$BASE_URL/posts") {
                setBody(post)
                contentType(ContentType.Application.Json)
            }.body<Post>()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun updatePost(id: Int, post: Post): Result<Post> {
        return try {
            val response = httpClient.put("$BASE_URL/posts/$id") {
                setBody(post)
                contentType(ContentType.Application.Json)
            }.body<Post>()
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    override suspend fun deletePost(id: Int): Result<Unit> {
        return try {
            httpClient.delete("$BASE_URL/posts/$id")
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

## Repository 层实现

```kotlin
// commonMain/kotlin/repository/PostRepository.kt
class PostRepository(
    private val apiService: ApiService,
    private val cache: PostCache // 本地缓存
) {

    suspend fun getPosts(forceRefresh: Boolean = false): Flow<UiState<List<Post>>> {
        return flow {
            emit(UiState.Loading)

            try {
                // 检查缓存
                if (!forceRefresh) {
                    val cachedPosts = cache.getPosts()
                    if (cachedPosts.isNotEmpty()) {
                        emit(UiState.Success(cachedPosts))
                        return@flow
                    }
                }

                // 从网络获取
                val result = apiService.getPosts()
                result.fold(
                    onSuccess = { posts ->
                        // 更新缓存
                        cache.savePosts(posts)
                        emit(UiState.Success(posts))
                    },
                    onFailure = { error ->
                        // 尝试从缓存加载
                        val cachedPosts = cache.getPosts()
                        if (cachedPosts.isNotEmpty()) {
                            emit(UiState.Success(cachedPosts))
                        } else {
                            emit(UiState.Error(error.message ?: "Unknown error"))
                        }
                    }
                )
            } catch (e: Exception) {
                emit(UiState.Error(e.message ?: "Unknown error"))
            }
        }
    }
}

// UI 状态封装
sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}
```

## ViewModel 与 UI 集成

```kotlin
// commonMain/kotlin/viewmodel/PostViewModel.kt
class PostViewModel(
    private val repository: PostRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(PostUiState())
    val uiState: StateFlow<PostUiState> = _uiState.asStateFlow()

    init {
        loadPosts()
    }

    fun loadPosts(refresh: Boolean = false) {
        viewModelScope.launch {
            repository.getPosts(refresh)
                .collect { state ->
                    _uiState.update { current ->
                        when (state) {
                            is UiState.Loading -> current.copy(isLoading = true)
                            is UiState.Success -> current.copy(
                                isLoading = false,
                                posts = state.data,
                                error = null
                            )
                            is UiState.Error -> current.copy(
                                isLoading = false,
                                error = state.message
                            )
                        }
                    }
                }
        }
    }

    fun createPost(title: String, body: String) {
        viewModelScope.launch {
            _uiState.update { it.copy(isCreatingPost = true) }

            try {
                val request = CreatePostRequest(
                    title = title,
                    body = body,
                    userId = 1 // 模拟用户ID
                )

                val result = repository.createPost(request)
                result.fold(
                    onSuccess = { newPost ->
                        _uiState.update { current ->
                            current.copy(
                                isCreatingPost = false,
                                posts = listOf(newPost) + current.posts
                            )
                        }
                    },
                    onFailure = { error ->
                        _uiState.update { current ->
                            current.copy(
                                isCreatingPost = false,
                                error = error.message
                            )
                        }
                    }
                )
            } catch (e: Exception) {
                _uiState.update { current ->
                    current.copy(
                        isCreatingPost = false,
                        error = e.message
                    )
                }
            }
        }
    }

    fun clearError() {
        _uiState.update { it.copy(error = null) }
    }
}

data class PostUiState(
    val posts: List<Post> = emptyList(),
    val isLoading: Boolean = false,
    val isCreatingPost: Boolean = false,
    val error: String? = null
)
```

## UI 实现

```kotlin
// commonMain/kotlin/screens/PostListScreen.kt
@Composable
fun PostListScreen(
    viewModel: PostViewModel,
    onPostClick: (Post) -> Unit,
    onAddClick: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()

    Box(modifier = Modifier.fillMaxSize()) {
        when {
            uiState.isLoading && uiState.posts.isEmpty() -> {
                LoadingIndicator()
            }

            uiState.error != null -> {
                ErrorView(
                    error = uiState.error,
                    onRetry = { viewModel.loadPosts() }
                )
            }

            else -> {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(uiState.posts) { post ->
                        PostItem(
                            post = post,
                            onClick = { onPostClick(post) }
                        )
                    }
                }
            }
        }

        // 浮动添加按钮
        if (!uiState.isCreatingPost) {
            FloatingActionButton(
                onClick = onAddClick,
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(16.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Add Post"
                )
            }
        }
    }
}

@Composable
fun PostItem(
    post: Post,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = post.title,
                style = MaterialTheme.typography.titleMedium,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = post.body,
                style = MaterialTheme.typography.bodyMedium,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
            )
        }
    }
}
```

## 高级功能

### 1. 请求拦截器

```kotlin
// 认证拦截器
class AuthInterceptor(private val tokenProvider: () -> String?) {
    fun setup(client: HttpClient) {
        client.install("Auth") {
            request {
                tokenProvider()?.let { token ->
                    header("Authorization", "Bearer $token")
                }
            }
        }
    }
}

// 重试机制
fun HttpClient.withRetry(maxRetries: Int = 3): HttpClient {
    return this.config {
        install(HttpRetry) {
            retryOnServerErrors = true
            maxRetries = maxRetries
            retryIf { request, response ->
                response.status.value in 500..599
            }
            delayMillis { 1000L * it } // 指数退避
        }
    }
}
```

### 2. GraphQL 支持

```kotlin
// 安装 GraphQL 客户端
commonMain.dependencies {
    implementation("io.ktor:ktor-client-content-negotiation:2.3.8")
    implementation("com.apurebase:kgraphql-ktor-client:0.19.0")
}

// GraphQL 查询
class GraphQLApi(private val httpClient: HttpClient) {
    suspend fun queryPosts(): Result<List<Post>> {
        val query = """
            query {
                posts {
                    id
                    title
                    body
                    userId
                }
            }
        """.trimIndent()

        return try {
            val response = httpClient.post("https://api.example.com/graphql") {
                contentType(ContentType.Application.Json)
                setBody(mapOf("query" to query))
            }.body<GraphQLResponse<List<Post>>>()

            Result.success(response.data ?: emptyList())
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### 3. 文件上传

```kotlin
suspend fun uploadFile(
    file: ByteArray,
    fileName: String,
    mimeType: String
): Result<String> {
    return try {
        val response = httpClient.post("https://api.example.com/upload") {
            setBody(MultiPartFormDataContent(
                formData {
                    append(
                        key = "file",
                        value = file,
                        headers = Headers.build {
                            append(HttpHeaders.ContentType, mimeType)
                            append(HttpHeaders.ContentDisposition, "filename=\"$fileName\"")
                        }
                    )
                }
            ))
        }.body<UploadResponse>()

        Result.success(response.url)
    } catch (e: Exception) {
        Result.failure(e)
    }
}
```

## 网络状态检测

```kotlin
// expect 声明
expect class NetworkMonitor() {
    val isOnline: StateFlow<Boolean>
}

// Android 实现
actual class NetworkMonitor @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val connectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    private val _isOnline = MutableStateFlow(true)
    override val isOnline: StateFlow<Boolean> = _isOnline.asStateFlow()

    private val callback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            _isOnline.value = true
        }

        override fun onLost(network: Network) {
            _isOnline.value = false
        }
    }

    init {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            connectivityManager.registerDefaultNetworkCallback(callback)
        }
    }
}
```

## 错误处理策略

```kotlin
sealed class NetworkError : Exception() {
    object NetworkUnavailable : NetworkError()
    data class HttpError(val code: Int, override val message: String) : NetworkError()
    data class SerializationError(override val message: String) : NetworkError()
    data class UnknownError(override val message: String) : NetworkError()
}

fun handleNetworkError(exception: Throwable): NetworkError {
    return when (exception) {
        is UnknownHostException -> NetworkError.NetworkUnavailable
        is SocketTimeoutException -> NetworkError.NetworkUnavailable
        is SerializationException -> NetworkError.SerializationError(exception.message ?: "")
        is HttpResponseException -> NetworkError.HttpError(
            code = exception.response.status.value,
            message = exception.response.status.description
        )
        else -> NetworkError.UnknownError(exception.message ?: "")
    }
}
```

## 最佳实践

1. **使用 Repository 模式**：分离网络层和业务逻辑
2. **实现缓存策略**：离线支持，减少网络请求
3. **错误处理**：友好的错误提示和重试机制
4. **取消请求**：ViewModel 清理时取消所有进行中的请求
5. **HTTPS only**：生产环境使用 HTTPS
6. **API 版本控制**：管理 API 变更

## 下一步

完成本节后，继续学习 [05_database](../05_database/) 了解本地数据存储方案。

---

## 检查清单

- [ ] 配置 Ktor Client 和平台特定引擎
- [ ] 实现基本的 CRUD API 调用
- [ ] 创建 Repository 层
- [ ] 集成 ViewModel 和 UI
- [ ] 实现错误处理和重试机制
- [ ] 添加网络状态检测
- [ ] 实现缓存策略
- [ ] 完成文件上传功能（可选）
