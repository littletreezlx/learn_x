# 05 - 本地存储

## 目标

掌握在 KMP 中使用 SQLDelight 进行本地数据库操作，以及使用 DataStore 进行偏好设置存储。

## 存储方案对比

| 方案 | 类型 | 适用场景 | 特点 |
|------|------|----------|------|
| SQLDelight | 关系数据库 | 结构化数据、复杂查询 | SQL 生成、类型安全 |
| DataStore | 键值对 | 简单配置、用户偏好 | 异步、类型安全 |
| 多平台Settings | 键值对 | 简单设置 | 基于 SharedPreferences/UserDefaults |
| 文件系统 | 文件存储 | 大文件、缓存 | 平台文件 API |

## SQLDelight - 类型安全的 SQL 数据库

[SQLDelight](https://cashapp.github.io/sqldelight/) 是一个生成 Kotlin 代码的 SQL 数据库库。

### 1. 依赖配置

在 `composeApp/build.gradle.kts` 中：

```kotlin
plugins {
    id("app.cash.sqldelight") version "2.0.1"
}

sqldelight {
    databases {
        create("AppDatabase") {
            packageName.set("com.example.database")
        }
    }
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("app.cash.sqldelight:runtime:2.0.1")
            implementation("app.cash.sqldelight:coroutines-extensions:2.0.1")
            implementation("app.cash.sqldelight:primitive-adapters:2.0.1")
        }

        androidMain.dependencies {
            implementation("app.cash.sqldelight:android-driver:2.0.1")
        }

        iosMain.dependencies {
            implementation("app.cash.sqldelight:native-driver:2.0.1")
        }

        desktopMain.dependencies {
            implementation("app.cash.sqldelight:sqlite-driver:2.0.1")
        }

        wasmJsMain.dependencies {
            implementation("app.cash.sqldelight:sqljs-driver:2.0.1")
        }
    }
}
```

### 2. 定义数据库 Schema

在 `composeApp/src/commonMain/sqldelight/com/example/database/AppDatabase.sq` 中：

```sql
CREATE TABLE PostEntity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    remoteId INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    userId INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
);

-- 插入帖子
insert:
INSERT INTO PostEntity (remoteId, title, body, userId, createdAt, updatedAt)
VALUES (?, ?, ?, ?, ?, ?);

-- 获取所有帖子
selectAll:
SELECT * FROM PostEntity ORDER BY createdAt DESC;

-- 根据 remoteId 获取帖子
selectByRemoteId:
SELECT * FROM PostEntity WHERE remoteId = ?;

-- 更新帖子
update:
UPDATE PostEntity
SET title = ?, body = ?, updatedAt = ?
WHERE remoteId = ?;

-- 删除帖子
deleteByRemoteId:
DELETE FROM PostEntity WHERE remoteId = ?;

-- 清空所有数据
clearAll:
DELETE FROM PostEntity;

-- 计数
count:
SELECT COUNT(*) FROM PostEntity;

CREATE TABLE UserEntity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT,
    isActive INTEGER NOT NULL DEFAULT 1
);

insertUser:
INSERT INTO UserEntity (name, email, avatar, isActive)
VALUES (?, ?, ?, ?);

selectActiveUsers:
SELECT * FROM UserEntity WHERE isActive = 1;

-- 多表连接查询示例
getPostsWithAuthor:
SELECT
    p.*,
    u.name as authorName,
    u.email as authorEmail
FROM PostEntity p
LEFT JOIN UserEntity u ON p.userId = u.id
ORDER BY p.createdAt DESC;
```

### 3. 数据库驱动实现

```kotlin
// commonMain/kotlin/database/DatabaseDriverFactory.kt
expect class DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}

// androidMain 实现
actual class DatabaseDriverFactory(
    private val context: Context
) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(
            AppDatabase.Schema,
            context,
            "app.db"
        )
    }
}

// iosMain 实现
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(
            AppDatabase.Schema,
            "app.db"
        )
    }
}

// desktopMain 实现
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        val path = "${System.getProperty("user.home")}/app.db"
        return JdbcSqliteDriver("jdbc:sqlite:$path")
    }
}
```

### 4. Database 实例

```kotlin
// commonMain/kotlin/database/AppDatabase.kt
class AppDatabase(driverFactory: DatabaseDriverFactory) {
    private val driver = driverFactory.createDriver()
    val database = AppDatabase(driver)

    // DAO 层
    val postDao = PostDao(database)
    val userDao = UserDao(database)

    init {
        // 创建数据库表
        database.AppDatabase.Schema.create(driver)
    }
}

// Post DAO
class PostDao(private val database: AppDatabase) {

    suspend fun insertPost(post: PostEntity): Long {
        return database.appDatabaseQueries.insertPost(
            remoteId = post.remoteId,
            title = post.title,
            body = post.body,
            userId = post.userId,
            createdAt = post.createdAt,
            updatedAt = post.updatedAt
        ).executeAsOne()
    }

    suspend fun getAllPosts(): List<PostEntity> {
        return database.appDatabaseQueries.selectAll()
            .asFlow()
            .mapToList(Dispatchers.Default)
            .first()
    }

    suspend fun getPostByRemoteId(remoteId: Long): PostEntity? {
        return database.appDatabaseQueries.selectByRemoteId(remoteId)
            .executeAsOneOrNull()
    }

    suspend fun updatePost(post: PostEntity) {
        database.appDatabaseQueries.update(
            title = post.title,
            body = post.body,
            updatedAt = Clock.System.now().epochSeconds,
            remoteId = post.remoteId
        )
    }

    suspend fun deletePost(remoteId: Long) {
        database.appDatabaseQueries.deleteByRemoteId(remoteId)
    }

    // 观察数据变化
    fun observePosts(): Flow<List<PostEntity>> {
        return database.appDatabaseQueries.selectAll()
            .asFlow()
            .mapToList(Dispatchers.Default)
    }

    suspend fun clearAll() {
        database.appDatabaseQueries.clearAll()
    }
}

// 数据实体
data class PostEntity(
    val id: Long = 0,
    val remoteId: Long,
    val title: String,
    val body: String,
    val userId: Long,
    val createdAt: Long,
    val updatedAt: Long
)
```

## DataStore - 偏好设置存储

### 1. 依赖配置

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("androidx.datastore:datastore-core-okio:1.1.0")
            implementation("androidx.datastore:datastore-preferences-core:1.1.0")
        }

        androidMain.dependencies {
            implementation("androidx.datastore:datastore:1.1.0")
            implementation("androidx.datastore:datastore-preferences:1.1.0")
        }
    }
}
```

### 2. 偏好设置管理

```kotlin
// commonMain/kotlin/preferences/PreferencesDataStore.kt
expect class PreferencesDataStore(context: Any?) {
    suspend fun putString(key: String, value: String)
    suspend fun getString(key: String, defaultValue: String): Flow<String>
    suspend fun putInt(key: String, value: Int)
    suspend fun getInt(key: String, defaultValue: Int): Flow<Int>
    suspend fun putBoolean(key: String, value: Boolean)
    suspend fun getBoolean(key: String, defaultValue: Boolean): Flow<Boolean>
    suspend fun remove(key: String)
    suspend fun clear()
}

// 定义所有偏好设置的键
object PreferencesKeys {
    const val USER_TOKEN = "user_token"
    const val USER_ID = "user_id"
    const val THEME_MODE = "theme_mode"
    const val NOTIFICATION_ENABLED = "notification_enabled"
    const val LAST_SYNC_TIME = "last_sync_time"
}
```

### 3. 平台实现

```kotlin
// androidMain 实现
actual class PreferencesDataStore(context: Any?) {
    private val context = context as Context

    private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
        name = "app_preferences"
    )

    private val dataStore = context.dataStore

    actual suspend fun putString(key: String, value: String) {
        dataStore.edit { preferences ->
            preferences[stringPreferencesKey(key)] = value
        }
    }

    actual suspend fun getString(key: String, defaultValue: String): Flow<String> {
        return dataStore.data.map { preferences ->
            preferences[stringPreferencesKey(key)] ?: defaultValue
        }
    }

    actual suspend fun putInt(key: String, value: Int) {
        dataStore.edit { preferences ->
            preferences[intPreferencesKey(key)] = value
        }
    }

    actual suspend fun getInt(key: String, defaultValue: Int): Flow<Int> {
        return dataStore.data.map { preferences ->
            preferences[intPreferencesKey(key)] ?: defaultValue
        }
    }

    actual suspend fun putBoolean(key: String, value: Boolean) {
        dataStore.edit { preferences ->
            preferences[booleanPreferencesKey(key)] = value
        }
    }

    actual suspend fun getBoolean(key: String, defaultValue: Boolean): Flow<Boolean> {
        return dataStore.data.map { preferences ->
            preferences[booleanPreferencesKey(key)] ?: defaultValue
        }
    }

    actual suspend fun remove(key: String) {
        dataStore.edit { preferences ->
            preferences.remove(stringPreferencesKey(key))
        }
    }

    actual suspend fun clear() {
        dataStore.edit { preferences ->
            preferences.clear()
        }
    }
}

// iosMain 实现
actual class PreferencesDataStore(context: Any?) {
    private val userDefaults = NSUserDefaults.standardUserDefaults

    actual suspend fun putString(key: String, value: String) {
        withContext(Dispatchers.Main) {
            userDefaults.setObject(value, key)
        }
    }

    actual suspend fun getString(key: String, defaultValue: String): Flow<String> = flow {
        val value = userDefaults.stringForKey(key) ?: defaultValue
        emit(value)
    }

    // ... 其他方法类似实现
}
```

### 4. 封装管理器

```kotlin
// commonMain/kotlin/preferences/UserPreferencesManager.kt
class UserPreferencesManager(
    private val dataStore: PreferencesDataStore
) {
    // 用户 Token
    suspend fun setUserToken(token: String) {
        dataStore.putString(PreferencesKeys.USER_TOKEN, token)
    }

    fun getUserToken(): Flow<String> {
        return dataStore.getString(PreferencesKeys.USER_TOKEN, "")
    }

    // 主题模式
    suspend fun setThemeMode(mode: ThemeMode) {
        dataStore.putString(PreferencesKeys.THEME_MODE, mode.name)
    }

    fun getThemeMode(): Flow<ThemeMode> {
        return dataStore.getString(PreferencesKeys.THEME_MODE, "System")
            .map { ThemeMode.valueOf(it) }
    }

    // 通知设置
    suspend fun setNotificationEnabled(enabled: Boolean) {
        dataStore.putBoolean(PreferencesKeys.NOTIFICATION_ENABLED, enabled)
    }

    fun isNotificationEnabled(): Flow<Boolean> {
        return dataStore.getBoolean(PreferencesKeys.NOTIFICATION_ENABLED, true)
    }

    // 最后同步时间
    suspend fun setLastSyncTime(timestamp: Long) {
        dataStore.putLong(PreferencesKeys.LAST_SYNC_TIME, timestamp)
    }

    fun getLastSyncTime(): Flow<Long> {
        return dataStore.getLong(PreferencesKeys.LAST_SYNC_TIME, 0L)
    }

    // 登出
    suspend fun logout() {
        dataStore.clear()
    }
}

enum class ThemeMode {
    Light, Dark, System
}
```

## 缓存策略实现

### 1. Repository 缓存层

```kotlin
// commonMain/kotlin/repository/CachedPostRepository.kt
class CachedPostRepository(
    private val apiService: ApiService,
    private val database: AppDatabase,
    private val preferences: UserPreferencesManager
) : PostRepository {

    override suspend fun getPosts(refresh: Boolean = false): Flow<List<Post>> {
        return flow {
            val cacheKey = "posts_cache"

            // 检查是否需要刷新
            val lastSync = preferences.getLastSyncTime().first()
            val isExpired = Clock.System.now().epochSeconds - lastSync > CACHE_EXPIRY_SECONDS

            if (refresh || isExpired) {
                try {
                    // 从网络获取
                    val posts = apiService.getPosts().getOrThrow()

                    // 缓存到数据库
                    database.postDao.clearAll()
                    posts.forEach { post ->
                        database.postDao.insertPost(
                            PostEntity(
                                remoteId = post.id.toLong(),
                                title = post.title,
                                body = post.body,
                                userId = post.userId.toLong(),
                                createdAt = Clock.System.now().epochSeconds,
                                updatedAt = Clock.System.now().epochSeconds
                            )
                        )
                    }

                    // 更新同步时间
                    preferences.setLastSyncTime(Clock.System.now().epochSeconds)

                    emit(posts)
                } catch (e: Exception) {
                    // 网络失败，从数据库读取缓存
                    val cachedPosts = database.postDao.getAllPosts()
                        .map { entity ->
                            Post(
                                id = entity.remoteId.toInt(),
                                title = entity.title,
                                body = entity.body,
                                userId = entity.userId.toInt()
                            )
                        }

                    if (cachedPosts.isNotEmpty()) {
                        emit(cachedPosts)
                    } else {
                        throw e
                    }
                }
            } else {
                // 从数据库读取缓存
                val cachedPosts = database.postDao.getAllPosts()
                    .map { entity ->
                        Post(
                            id = entity.remoteId.toInt(),
                            title = entity.title,
                            body = entity.body,
                            userId = entity.userId.toInt()
                        )
                    }
                emit(cachedPosts)
            }
        }
    }

    companion object {
        private const val CACHE_EXPIRY_SECONDS = 300L // 5分钟缓存
    }
}
```

### 2. 离线支持

```kotlin
// commonMain/kotlin/repository/OfflineFirstRepository.kt
class OfflineFirstRepository(
    private val database: AppDatabase,
    private val apiService: ApiService,
    private val networkMonitor: NetworkMonitor
) {

    suspend fun syncData() {
        if (networkMonitor.isOnline.first()) {
            // 同步待上传的数据
            val pendingUpdates = database.postDao.getPendingUpdates()

            pendingUpdates.forEach { update ->
                when (update.action) {
                    "create" -> {
                        val post = apiService.createPost(update.toCreateRequest()).getOrNull()
                        post?.let { database.postDao.markAsSynced(it.id.toLong()) }
                    }
                    "update" -> {
                        apiService.updatePost(update.remoteId, update.toPost()).getOrNull()
                            ?.let { database.postDao.markAsSynced(update.remoteId) }
                    }
                    "delete" -> {
                        apiService.deletePost(update.remoteId).getOrNull()
                            ?.let { database.postDao.deletePendingUpdate(update.remoteId) }
                    }
                }
            }
        }
    }
}
```

## 数据库迁移

```kotlin
// 在 AppDatabase.sq 中添加迁移脚本
CREATE TABLE UserEntity_v2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT,
    isActive INTEGER NOT NULL DEFAULT 1,
    bio TEXT, -- 新增字段
    followersCount INTEGER NOT NULL DEFAULT 0 -- 新增字段
);

-- 迁移数据
ALTER TABLE UserEntity ADD COLUMN bio TEXT;
ALTER TABLE UserEntity ADD COLUMN followersCount INTEGER NOT NULL DEFAULT 0;

-- 创建索引
CREATE INDEX idx_post_userId ON PostEntity(userId);
CREATE INDEX idx_post_createdAt ON PostEntity(createdAt);
```

## 性能优化

### 1. 数据库优化

```kotlin
// 使用事务
database.transaction {
    posts.forEach { post ->
        insertPost(post)
    }
}

// 批量插入
fun PostDao.insertPosts(posts: List<PostEntity>) {
    database.appDatabaseQueries.transaction {
        posts.forEach { post ->
            insertPost(post)
        }
    }
}

// 使用索引优化查询
CREATE INDEX idx_user_active ON UserEntity(isActive);
CREATE INDEX idx_post_date_user ON PostEntity(createdAt, userId);
```

### 2. 内存缓存

```kotlin
// LRU Cache
class MemoryCache<T>(
    private val maxSize: Int
) {
    private val cache = LinkedHashMap<String, T>(maxSize, 0.75f, true)

    fun get(key: String): T? {
        return cache[key]
    }

    fun put(key: String, value: T) {
        if (cache.size >= maxSize) {
            val oldest = cache.entries.first()
            cache.remove(oldest.key)
        }
        cache[key] = value
    }

    fun clear() {
        cache.clear()
    }
}
```

## 测试数据库

```kotlin
// 测试时使用内存数据库
class TestDatabaseDriverFactory : DatabaseDriverFactory {
    override fun createDriver(): SqlDriver {
        return JdbcSqliteDriver(JdbcSqliteDriver.IN_MEMORY).apply {
            AppDatabase.Schema.create(this)
        }
    }
}

@Test
fun testInsertAndGetPost() {
    val database = AppDatabase(TestDatabaseDriverFactory())
    val postDao = database.postDao

    val post = PostEntity(
        remoteId = 1,
        title = "Test Post",
        body = "Test Content",
        userId = 1,
        createdAt = Clock.System.now().epochSeconds,
        updatedAt = Clock.System.now().epochSeconds
    )

    runTest {
        postDao.insertPost(post)
        val posts = postDao.getAllPosts()

        assertEquals(1, posts.size)
        assertEquals("Test Post", posts.first().title)
    }
}
```

## 下一步

完成本节后，继续学习 [06_platform_specific](../06_platform_specific/) 了解如何处理平台特定功能。

---

## 检查清单

- [ ] 配置 SQLDelight 依赖
- [ ] 创建数据库 Schema
- [ ] 实现平台特定的数据库驱动
- [ ] 创建 DAO 层和数据访问方法
- [ ] 配置 DataStore 偏好设置
- [ ] 实现缓存策略
- [ ] 添加数据库迁移支持
- [ ] 实现离线支持
- [ ] 编写数据库测试