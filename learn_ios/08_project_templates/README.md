# 实战项目模板

> 完整的项目代码模板，可以直接在 Xcode 中运行

---

## 📚 项目列表

| 项目 | 难度 | 时长 | 核心技术点 |
|------|------|------|-----------|
| [计数器应用](#1-计数器应用) | ⭐ | 30分钟 | @State, Button, Text |
| [待办事项应用](#2-待办事项应用) | ⭐⭐ | 2-3小时 | List, ForEach, UserDefaults, Codable |
| [天气查询应用](#3-天气查询应用) | ⭐⭐⭐ | 3-4小时 | async/await, URLSession, JSON, API |
| [笔记应用](#4-笔记应用) | ⭐⭐⭐ | 4-5小时 | NavigationStack, CoreData, CRUD |
| [购物清单应用](#5-购物清单应用) | ⭐⭐ | 2-3小时 | Toggle, 数据持久化, 列表操作 |

---

## 1. 计数器应用

### 功能
- 显示当前计数
- 增加/减少按钮
- 重置按钮

### 完整代码

创建新的 SwiftUI 项目，将 `ContentView.swift` 替换为:

```swift
import SwiftUI

struct ContentView: View {
    // 状态变量
    @State private var count = 0

    var body: some View {
        VStack(spacing: 30) {
            // 标题
            Text("计数器")
                .font(.largeTitle)
                .fontWeight(.bold)

            // 显示计数
            Text("\(count)")
                .font(.system(size: 80))
                .fontWeight(.bold)
                .foregroundColor(count >= 0 ? .blue : .red)

            // 按钮组
            HStack(spacing: 20) {
                // 减少按钮
                Button {
                    count -= 1
                } label: {
                    Image(systemName: "minus.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.red)
                }

                // 增加按钮
                Button {
                    count += 1
                } label: {
                    Image(systemName: "plus.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.green)
                }
            }

            // 重置按钮
            Button("重置", role: .destructive) {
                count = 0
            }
            .font(.title2)
            .padding()
            .background(Color.gray.opacity(0.2))
            .cornerRadius(10)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

### 扩展挑战
1. 添加步长设置 (每次增加/减少的值)
2. 添加最大值和最小值限制
3. 保存计数到 UserDefaults，重启后恢复
4. 添加历史记录功能

---

## 2. 待办事项应用

### 功能
- 添加新待办
- 标记完成/未完成
- 删除待办
- 数据持久化 (UserDefaults)

### 完整代码

```swift
import SwiftUI

// 数据模型
struct TodoItem: Identifiable, Codable {
    let id: UUID
    var title: String
    var isCompleted: Bool

    init(id: UUID = UUID(), title: String, isCompleted: Bool = false) {
        self.id = id
        self.title = title
        self.isCompleted = isCompleted
    }
}

// ViewModel
class TodoViewModel: ObservableObject {
    @Published var todos: [TodoItem] = []

    private let userDefaultsKey = "TodoItems"

    init() {
        loadTodos()
    }

    func addTodo(title: String) {
        let newTodo = TodoItem(title: title)
        todos.append(newTodo)
        saveTodos()
    }

    func toggleCompletion(todo: TodoItem) {
        if let index = todos.firstIndex(where: { $0.id == todo.id }) {
            todos[index].isCompleted.toggle()
            saveTodos()
        }
    }

    func deleteTodo(at offsets: IndexSet) {
        todos.remove(atOffsets: offsets)
        saveTodos()
    }

    private func saveTodos() {
        if let encoded = try? JSONEncoder().encode(todos) {
            UserDefaults.standard.set(encoded, forKey: userDefaultsKey)
        }
    }

    private func loadTodos() {
        if let data = UserDefaults.standard.data(forKey: userDefaultsKey),
           let decoded = try? JSONDecoder().decode([TodoItem].self, from: data) {
            todos = decoded
        }
    }
}

// 主视图
struct ContentView: View {
    @StateObject private var viewModel = TodoViewModel()
    @State private var newTodoTitle = ""

    var body: some View {
        NavigationStack {
            VStack {
                // 输入框
                HStack {
                    TextField("添加新待办", text: $newTodoTitle)
                        .textFieldStyle(.roundedBorder)

                    Button {
                        addTodo()
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title)
                    }
                    .disabled(newTodoTitle.isEmpty)
                }
                .padding()

                // 待办列表
                List {
                    ForEach(viewModel.todos) { todo in
                        TodoRow(todo: todo) {
                            viewModel.toggleCompletion(todo: todo)
                        }
                    }
                    .onDelete(perform: viewModel.deleteTodo)
                }
            }
            .navigationTitle("待办事项")
        }
    }

    private func addTodo() {
        guard !newTodoTitle.isEmpty else { return }
        viewModel.addTodo(title: newTodoTitle)
        newTodoTitle = ""
    }
}

// 单行视图
struct TodoRow: View {
    let todo: TodoItem
    let onToggle: () -> Void

    var body: some View {
        HStack {
            Image(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
                .foregroundColor(todo.isCompleted ? .green : .gray)
                .font(.title2)
                .onTapGesture {
                    onToggle()
                }

            Text(todo.title)
                .strikethrough(todo.isCompleted)
                .foregroundColor(todo.isCompleted ? .gray : .primary)
        }
    }
}

#Preview {
    ContentView()
}
```

### 扩展挑战
1. 添加分类功能 (工作、生活、学习)
2. 添加截止日期
3. 添加优先级标记
4. 支持搜索和过滤

---

## 3. 天气查询应用

### 功能
- 输入城市名称
- 调用天气 API 获取数据
- 显示温度、天气状况、图标
- 错误处理和加载状态

### 完整代码

```swift
import SwiftUI

// 天气数据模型
struct WeatherResponse: Codable {
    let name: String
    let main: MainWeather
    let weather: [Weather]
}

struct MainWeather: Codable {
    let temp: Double
    let feelsLike: Double
    let humidity: Int

    enum CodingKeys: String, CodingKey {
        case temp
        case feelsLike = "feels_like"
        case humidity
    }
}

struct Weather: Codable {
    let main: String
    let description: String
    let icon: String
}

// 网络服务
class WeatherService {
    // 注意: 需要替换为你自己的 API Key
    // 免费申请: https://openweathermap.org/api
    private let apiKey = "YOUR_API_KEY_HERE"
    private let baseURL = "https://api.openweathermap.org/data/2.5/weather"

    func fetchWeather(city: String) async throws -> WeatherResponse {
        let urlString = "\(baseURL)?q=\(city)&appid=\(apiKey)&units=metric"

        guard let url = URL(string: urlString) else {
            throw URLError(.badURL)
        }

        let (data, _) = try await URLSession.shared.data(from: url)
        let weather = try JSONDecoder().decode(WeatherResponse.self, from: data)
        return weather
    }
}

// ViewModel
@MainActor
class WeatherViewModel: ObservableObject {
    @Published var weather: WeatherResponse?
    @Published var isLoading = false
    @Published var errorMessage = ""

    private let service = WeatherService()

    func loadWeather(city: String) async {
        isLoading = true
        errorMessage = ""
        weather = nil

        do {
            weather = try await service.fetchWeather(city: city)
        } catch {
            errorMessage = "无法获取天气信息: \(error.localizedDescription)"
        }

        isLoading = false
    }
}

// 主视图
struct ContentView: View {
    @StateObject private var viewModel = WeatherViewModel()
    @State private var cityName = ""

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // 搜索框
                HStack {
                    TextField("输入城市名称", text: $cityName)
                        .textFieldStyle(.roundedBorder)

                    Button("搜索") {
                        Task {
                            await viewModel.loadWeather(city: cityName)
                        }
                    }
                    .disabled(cityName.isEmpty || viewModel.isLoading)
                }
                .padding()

                // 内容区域
                if viewModel.isLoading {
                    ProgressView("加载中...")
                } else if !viewModel.errorMessage.isEmpty {
                    VStack(spacing: 10) {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.largeTitle)
                            .foregroundColor(.red)
                        Text(viewModel.errorMessage)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.red)
                    }
                    .padding()
                } else if let weather = viewModel.weather {
                    WeatherDetailView(weather: weather)
                } else {
                    VStack(spacing: 10) {
                        Image(systemName: "cloud.sun")
                            .font(.system(size: 80))
                            .foregroundColor(.blue)
                        Text("搜索城市查看天气")
                            .foregroundColor(.gray)
                    }
                }

                Spacer()
            }
            .navigationTitle("天气查询")
        }
    }
}

// 天气详情视图
struct WeatherDetailView: View {
    let weather: WeatherResponse

    var body: some View {
        VStack(spacing: 20) {
            // 城市名称
            Text(weather.name)
                .font(.largeTitle)
                .fontWeight(.bold)

            // 天气图标
            Image(systemName: weatherIcon(weather.weather.first?.main ?? ""))
                .font(.system(size: 100))
                .foregroundColor(.blue)

            // 温度
            Text("\(Int(weather.main.temp))°C")
                .font(.system(size: 60))
                .fontWeight(.bold)

            // 天气描述
            Text(weather.weather.first?.description.capitalized ?? "")
                .font(.title2)
                .foregroundColor(.gray)

            Divider()
                .padding(.horizontal, 40)

            // 详细信息
            HStack(spacing: 40) {
                VStack {
                    Text("体感温度")
                        .font(.caption)
                        .foregroundColor(.gray)
                    Text("\(Int(weather.main.feelsLike))°C")
                        .font(.title3)
                        .fontWeight(.semibold)
                }

                VStack {
                    Text("湿度")
                        .font(.caption)
                        .foregroundColor(.gray)
                    Text("\(weather.main.humidity)%")
                        .font(.title3)
                        .fontWeight(.semibold)
                }
            }
        }
        .padding()
    }

    private func weatherIcon(_ main: String) -> String {
        switch main.lowercased() {
        case "clear": return "sun.max.fill"
        case "clouds": return "cloud.fill"
        case "rain": return "cloud.rain.fill"
        case "snow": return "cloud.snow.fill"
        case "thunderstorm": return "cloud.bolt.fill"
        default: return "cloud.sun.fill"
        }
    }
}

#Preview {
    ContentView()
}
```

### 使用说明
1. 注册免费 API Key: https://openweathermap.org/api
2. 替换代码中的 `YOUR_API_KEY_HERE`
3. 运行应用，搜索城市名称

### 扩展挑战
1. 添加 5天天气预报
2. 使用地理位置自动获取当前位置天气
3. 添加收藏城市功能
4. 显示更多天气信息 (风速、气压等)

---

## 📝 使用建议

### 开始新项目的步骤
1. 打开 Xcode
2. File → New → Project
3. 选择 iOS → App
4. Interface 选择 SwiftUI
5. 复制对应项目的代码到 `ContentView.swift`
6. 按 Cmd+R 运行

### 学习建议
1. **先运行原始代码** - 理解基本功能
2. **修改界面样式** - 练习 SwiftUI 修饰符
3. **添加新功能** - 尝试扩展挑战
4. **重构代码** - 改进代码结构

### 调试技巧
- 使用 `print()` 输出调试信息
- 使用断点查看变量值
- 使用 Xcode Preview 快速迭代 UI

---

## 🎯 进阶方向

完成这些项目后，可以尝试:
1. **组合项目** - 将多个项目的功能组合成一个应用
2. **添加动画** - 使UI更生动
3. **优化体验** - 添加更好的错误提示和加载状态
4. **发布应用** - 学习完整的发布流程

---

**开始实践**: 选择一个项目，创建 Xcode 工程，开始编码吧！
