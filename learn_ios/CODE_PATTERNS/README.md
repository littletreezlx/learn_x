# iOS 开发 5个最常用代码模式

> 速查手册！需要某个功能时直接复制粘贴，快速开发

---

## 使用说明

- 📋 每个模式都是完整可运行的代码
- 🎯 直接复制到你的项目中
- ✏️ 根据需求修改变量名和样式
- 💡 代码中有详细注释说明

---

## 模式1: 表单和用户输入

### 场景
登录界面、注册表单、设置页面

### 完整代码
```swift
import SwiftUI

struct FormView: View {
    // 状态变量
    @State private var username = ""
    @State private var password = ""
    @State private var rememberMe = false

    var body: some View {
        Form {
            Section("账号信息") {
                // 文本输入框
                TextField("用户名", text: $username)
                    .textInputAutocapitalization(.never)  // 禁用首字母大写

                // 密码输入框
                SecureField("密码", text: $password)
            }

            Section {
                // 开关
                Toggle("记住我", isOn: $rememberMe)
            }

            Section {
                // 按钮
                Button("登录") {
                    handleLogin()
                }
                .frame(maxWidth: .infinity)
                .disabled(username.isEmpty || password.isEmpty)
            }
        }
    }

    func handleLogin() {
        print("用户名: \(username)")
        print("密码: \(password)")
        print("记住我: \(rememberMe)")
    }
}

#Preview {
    FormView()
}
```

### 变体: 垂直表单 (不使用 Form)
```swift
struct CustomFormView: View {
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        VStack(spacing: 20) {
            // 邮箱输入
            VStack(alignment: .leading, spacing: 8) {
                Text("邮箱")
                    .font(.headline)

                TextField("输入邮箱", text: $email)
                    .textFieldStyle(.roundedBorder)
                    .keyboardType(.emailAddress)
                    .textInputAutocapitalization(.never)
            }

            // 密码输入
            VStack(alignment: .leading, spacing: 8) {
                Text("密码")
                    .font(.headline)

                SecureField("输入密码", text: $password)
                    .textFieldStyle(.roundedBorder)
            }

            // 登录按钮
            Button {
                // 登录逻辑
            } label: {
                Text("登录")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
    }
}
```

---

## 模式2: 列表和导航

### 场景
联系人列表、新闻列表、设置菜单

### 完整代码
```swift
import SwiftUI

// 数据模型
struct Item: Identifiable {
    let id = UUID()
    let title: String
    let subtitle: String
}

struct ListNavigationView: View {
    // 示例数据
    let items = [
        Item(title: "项目1", subtitle: "描述1"),
        Item(title: "项目2", subtitle: "描述2"),
        Item(title: "项目3", subtitle: "描述3")
    ]

    var body: some View {
        NavigationStack {
            List(items) { item in
                // 可点击的列表项
                NavigationLink {
                    DetailView(item: item)
                } label: {
                    HStack {
                        // 图标
                        Image(systemName: "star.fill")
                            .foregroundColor(.yellow)

                        // 文本
                        VStack(alignment: .leading) {
                            Text(item.title)
                                .font(.headline)
                            Text(item.subtitle)
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                    }
                }
            }
            .navigationTitle("列表标题")
        }
    }
}

// 详情页
struct DetailView: View {
    let item: Item

    var body: some View {
        VStack {
            Text(item.title)
                .font(.largeTitle)
            Text(item.subtitle)
                .font(.body)
        }
        .navigationTitle("详情")
    }
}

#Preview {
    ListNavigationView()
}
```

### 变体: 可编辑列表
```swift
struct EditableListView: View {
    @State private var items = ["苹果", "香蕉", "橙子"]

    var body: some View {
        NavigationStack {
            List {
                ForEach(items, id: \.self) { item in
                    Text(item)
                }
                .onDelete(perform: deleteItems)  // 滑动删除
                .onMove(perform: moveItems)      // 拖动排序
            }
            .navigationTitle("水果列表")
            .toolbar {
                EditButton()  // 编辑按钮
            }
        }
    }

    func deleteItems(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }

    func moveItems(from source: IndexSet, to destination: Int) {
        items.move(fromOffsets: source, toOffset: destination)
    }
}
```

---

## 模式3: 网络请求和 JSON 解析

### 场景
从服务器获取数据、调用 API

### 完整代码
```swift
import SwiftUI

// 1. 定义数据模型 (必须符合 Codable)
struct Post: Codable, Identifiable {
    let id: Int
    let title: String
    let body: String
}

// 2. 网络请求管理器
class NetworkManager {
    static func fetchPosts() async throws -> [Post] {
        let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

        // 发起请求
        let (data, _) = try await URLSession.shared.data(from: url)

        // 解析 JSON
        let posts = try JSONDecoder().decode([Post].self, from: data)
        return posts
    }
}

// 3. 视图
struct NetworkView: View {
    @State private var posts: [Post] = []
    @State private var isLoading = false
    @State private var errorMessage = ""

    var body: some View {
        NavigationStack {
            Group {
                if isLoading {
                    ProgressView("加载中...")
                } else if !errorMessage.isEmpty {
                    VStack {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.largeTitle)
                        Text(errorMessage)
                            .foregroundColor(.red)
                        Button("重试") {
                            Task {
                                await loadPosts()
                            }
                        }
                    }
                } else {
                    List(posts) { post in
                        VStack(alignment: .leading, spacing: 5) {
                            Text(post.title)
                                .font(.headline)
                            Text(post.body)
                                .font(.caption)
                                .foregroundColor(.gray)
                                .lineLimit(2)
                        }
                    }
                }
            }
            .navigationTitle("文章列表")
        }
        .task {
            await loadPosts()
        }
    }

    func loadPosts() async {
        isLoading = true
        errorMessage = ""

        do {
            posts = try await NetworkManager.fetchPosts()
        } catch {
            errorMessage = "加载失败: \(error.localizedDescription)"
        }

        isLoading = false
    }
}

#Preview {
    NetworkView()
}
```

---

## 模式4: 数据持久化 (UserDefaults)

### 场景
保存用户设置、主题偏好、登录状态

### 完整代码
```swift
import SwiftUI

// 1. 创建 UserDefaults 管理器
class SettingsManager: ObservableObject {
    @Published var isDarkMode: Bool {
        didSet {
            UserDefaults.standard.set(isDarkMode, forKey: "isDarkMode")
        }
    }

    @Published var username: String {
        didSet {
            UserDefaults.standard.set(username, forKey: "username")
        }
    }

    init() {
        // 从 UserDefaults 读取数据
        self.isDarkMode = UserDefaults.standard.bool(forKey: "isDarkMode")
        self.username = UserDefaults.standard.string(forKey: "username") ?? ""
    }

    func clearAll() {
        UserDefaults.standard.removeObject(forKey: "isDarkMode")
        UserDefaults.standard.removeObject(forKey: "username")
    }
}

// 2. 视图
struct SettingsView: View {
    @StateObject private var settings = SettingsManager()

    var body: some View {
        Form {
            Section("用户信息") {
                TextField("用户名", text: $settings.username)
            }

            Section("外观") {
                Toggle("深色模式", isOn: $settings.isDarkMode)
            }

            Section {
                Button("清除所有设置", role: .destructive) {
                    settings.clearAll()
                }
            }
        }
        .preferredColorScheme(settings.isDarkMode ? .dark : .light)
    }
}

#Preview {
    SettingsView()
}
```

### 变体: 保存复杂对象
```swift
// 定义可编码的数据模型
struct User: Codable {
    let name: String
    let age: Int
    let email: String
}

class UserManager {
    static let shared = UserManager()
    private let userKey = "savedUser"

    // 保存用户
    func saveUser(_ user: User) {
        if let encoded = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(encoded, forKey: userKey)
        }
    }

    // 读取用户
    func loadUser() -> User? {
        guard let data = UserDefaults.standard.data(forKey: userKey) else {
            return nil
        }
        return try? JSONDecoder().decode(User.self, from: data)
    }

    // 删除用户
    func deleteUser() {
        UserDefaults.standard.removeObject(forKey: userKey)
    }
}
```

---

## 模式5: 图片和资源

### 场景
显示图片、图标、资源文件

### 完整代码
```swift
import SwiftUI

struct ImageView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {

                // 1. 系统图标 (SF Symbols)
                Section {
                    Text("系统图标").font(.headline)

                    HStack(spacing: 20) {
                        Image(systemName: "heart.fill")
                            .foregroundColor(.red)
                            .font(.largeTitle)

                        Image(systemName: "star.fill")
                            .foregroundColor(.yellow)
                            .font(.largeTitle)

                        Image(systemName: "house.fill")
                            .foregroundColor(.blue)
                            .font(.largeTitle)
                    }
                }

                Divider()

                // 2. Assets 中的图片
                Section {
                    Text("本地图片").font(.headline)

                    Image("myImage")  // Assets.xcassets 中的图片
                        .resizable()
                        .scaledToFit()
                        .frame(width: 200, height: 200)
                        .cornerRadius(10)
                }

                Divider()

                // 3. 网络图片
                Section {
                    Text("网络图片").font(.headline)

                    AsyncImage(url: URL(string: "https://picsum.photos/300")) { image in
                        image
                            .resizable()
                            .scaledToFit()
                    } placeholder: {
                        ProgressView()
                    }
                    .frame(width: 200, height: 200)
                    .cornerRadius(10)
                }

                Divider()

                // 4. 圆形头像
                Section {
                    Text("圆形头像").font(.headline)

                    Image(systemName: "person.circle.fill")
                        .resizable()
                        .frame(width: 100, height: 100)
                        .foregroundColor(.gray)
                }
            }
            .padding()
        }
    }
}

#Preview {
    ImageView()
}
```

### 变体: 带缓存的网络图片
```swift
import SwiftUI

struct CachedAsyncImage: View {
    let url: URL?

    var body: some View {
        AsyncImage(url: url) { phase in
            switch phase {
            case .empty:
                // 加载中
                ProgressView()
            case .success(let image):
                // 加载成功
                image
                    .resizable()
                    .scaledToFill()
            case .failure:
                // 加载失败
                Image(systemName: "photo")
                    .foregroundColor(.gray)
            @unknown default:
                EmptyView()
            }
        }
    }
}

// 使用
struct ExampleView: View {
    var body: some View {
        CachedAsyncImage(url: URL(string: "https://picsum.photos/300"))
            .frame(width: 200, height: 200)
            .cornerRadius(10)
    }
}
```

---

## 🎯 使用建议

### 如何使用这些模式？

1. **找到对应场景**: 根据你要实现的功能，找到对应模式
2. **复制完整代码**: 复制整个代码块到你的项目
3. **修改变量名**: 根据你的需求修改数据模型和变量名
4. **调整样式**: 修改颜色、字体、间距等
5. **测试运行**: 在 Xcode 中运行验证

### 组合使用

这些模式可以组合使用，例如:
- **列表 + 网络请求**: 从服务器获取数据并显示列表
- **表单 + 数据持久化**: 保存用户输入的设置
- **列表 + 图片**: 显示带图片的列表

---

**需要更多示例？** 查看 [01_swift_basics](../01_swift_basics/) 和 [03_swiftui](../03_swiftui/) 目录！
