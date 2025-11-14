# iOS 开发深度学习路线

> 完成核心检查清单后，想要深入某个方向？这里是你的进阶指南

---

## 🎯 使用说明

- 本文档适合**已完成 CORE_CHECKLIST.md** 的学习者
- 每个方向都是独立的，可以根据兴趣选择
- 深度学习需要更多时间投入（每个方向 1-4 周）

---

## 📚 学习方向总览

| 方向 | 难度 | 时长 | 适合人群 |
|------|------|------|---------|
| [Swift 进阶](#1-swift-进阶) | ⭐⭐⭐ | 2-3周 | 想深入理解 Swift 语言 |
| [SwiftUI 进阶](#2-swiftui-进阶) | ⭐⭐⭐⭐ | 3-4周 | 想掌握复杂 UI 开发 |
| [UIKit 基础](#3-uikit-基础) | ⭐⭐⭐ | 2-3周 | 需要维护老项目 |
| [架构模式](#4-架构模式) | ⭐⭐⭐⭐ | 2-3周 | 想写出可维护的代码 |
| [数据管理](#5-数据管理) | ⭐⭐⭐ | 1-2周 | 需要复杂数据处理 |
| [网络和 API](#6-网络和-api) | ⭐⭐⭐ | 1-2周 | 后端集成需求 |
| [性能优化](#7-性能优化) | ⭐⭐⭐⭐⭐ | 2-4周 | 应用性能有问题 |
| [测试](#8-测试) | ⭐⭐⭐ | 1-2周 | 想保证代码质量 |
| [发布上架](#9-app-store-发布) | ⭐⭐ | 3-5天 | 准备发布应用 |

---

## 1. Swift 进阶

### 学习目标
深入理解 Swift 语言特性，写出更优雅的代码

### 核心内容

#### 1.1 高级类型系统
- **Generics (泛型)**
  - 泛型函数和类型
  - 类型约束
  - 关联类型

  ```swift
  // 泛型函数
  func swap<T>(_ a: inout T, _ b: inout T) {
      let temp = a
      a = b
      b = temp
  }

  // 泛型类型约束
  func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
      for (index, value) in array.enumerated() {
          if value == valueToFind {
              return index
          }
      }
      return nil
  }
  ```

- **Protocol (协议)**
  - 协议定义和遵循
  - 协议扩展
  - 协议组合
  - 面向协议编程 (POP)

#### 1.2 高级语法特性
- **闭包进阶**
  - 逃逸闭包 (@escaping)
  - 自动闭包 (@autoclosure)
  - 捕获列表

- **错误处理**
  - throws/try/catch
  - Result 类型
  - 自定义错误类型

- **内存管理**
  - ARC 原理
  - 强引用、弱引用、无主引用
  - 循环引用的识别和解决

- **并发编程**
  - async/await
  - Task 和 TaskGroup
  - Actor 模型

### 实践项目
- 实现一个通用的网络请求库
- 使用 Protocol 重构现有代码
- 实现一个支持泛型的数据存储层

### 推荐资源
- [Swift官方文档 - 高级特性](https://docs.swift.org/swift-book/)
- [Swift by Sundell](https://www.swiftbysundell.com/)
- [100 Days of Swift](https://www.hackingwithswift.com/100)

---

## 2. SwiftUI 进阶

### 学习目标
掌握复杂 UI 开发，实现流畅的用户体验

### 核心内容

#### 2.1 高级布局
- **GeometryReader**
  - 获取视图尺寸和位置
  - 响应式布局

- **自定义布局**
  - Layout 协议
  - 自定义容器

- **ScrollView 进阶**
  - LazyVStack/LazyHStack
  - ScrollViewReader
  - Sticky Headers

#### 2.2 动画和过渡
- **基础动画**
  - .animation() 修饰符
  - withAnimation
  - 动画曲线

- **高级动画**
  - matchedGeometryEffect
  - TimelineView
  - Canvas 绘图

- **手势组合**
  - 同时手势
  - 顺序手势
  - 自定义手势

#### 2.3 状态管理进阶
- **@StateObject vs @ObservedObject**
- **@EnvironmentObject** 全局状态
- **@AppStorage** 持久化状态
- **Combine 框架**集成

#### 2.4 自定义组件
- **ViewModifier**
- **ButtonStyle/ToggleStyle**
- **ViewBuilder**
- **可复用组件库**

### 实践项目
- 实现一个复杂的动画转场效果
- 构建一个自定义组件库
- 实现一个类似 Instagram 的图片浏览器

### 推荐资源
- [SwiftUI 官方教程](https://developer.apple.com/tutorials/swiftui)
- [Hacking with Swift - SwiftUI](https://www.hackingwithswift.com/books/ios-swiftui)
- [Design+Code](https://designcode.io/)

---

## 3. UIKit 基础

### 学习目标
掌握传统 UIKit 开发，维护老项目或需要 UIKit 特性时使用

### 核心内容

#### 3.1 UIKit 基础
- **UIViewController**
  - 生命周期
  - 视图层级
  - 导航和模态展示

- **Auto Layout**
  - NSLayoutConstraint
  - UIStackView
  - Safe Area

- **UITableView/UICollectionView**
  - DataSource 和 Delegate
  - 自定义 Cell
  - 性能优化

#### 3.2 UIKit 与 SwiftUI 混用
- **UIViewRepresentable**
  - 在 SwiftUI 中使用 UIKit 组件

- **UIHostingController**
  - 在 UIKit 中使用 SwiftUI 视图

### 实践项目
- 用 UIKit 重写一个 SwiftUI 项目
- 实现一个复杂的 UICollectionView 布局

### 推荐资源
- [UIKit 官方文档](https://developer.apple.com/documentation/uikit)
- [Ray Wenderlich - UIKit](https://www.raywenderlich.com/ios)

---

## 4. 架构模式

### 学习目标
写出可维护、可测试的代码

### 核心内容

#### 4.1 MVC (Model-View-Controller)
- iOS 默认架构
- 优缺点分析
- 适用场景

#### 4.2 MVVM (Model-View-ViewModel)
- **SwiftUI 的推荐架构**
- ViewModel 设计
- 数据绑定

```swift
// MVVM 示例
class UserViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage = ""

    private let userService: UserService

    init(userService: UserService = UserService()) {
        self.userService = userService
    }

    func loadUsers() async {
        isLoading = true
        defer { isLoading = false }

        do {
            users = try await userService.fetchUsers()
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// View
struct UserListView: View {
    @StateObject private var viewModel = UserViewModel()

    var body: some View {
        List(viewModel.users) { user in
            Text(user.name)
        }
        .task {
            await viewModel.loadUsers()
        }
    }
}
```

#### 4.3 其他架构
- **VIPER** (复杂项目)
- **TCA (The Composable Architecture)** (函数式)
- **Clean Architecture**

### 实践项目
- 用 MVVM 重构现有项目
- 实现一个符合 Clean Architecture 的应用

### 推荐资源
- [iOS Architecture Patterns](https://medium.com/ios-os-x-development/ios-architecture-patterns-ecba4c38de52)

---

## 5. 数据管理

### 学习目标
掌握复杂数据的存储和管理

### 核心内容

#### 5.1 CoreData
- **数据模型设计**
  - Entity 和 Attribute
  - Relationship
  - Fetch Request

- **CRUD 操作**
  - 创建、读取、更新、删除

- **与 SwiftUI 集成**
  - @FetchRequest
  - NSManagedObjectContext

```swift
// CoreData + SwiftUI
struct TodoListView: View {
    @Environment(\.managedObjectContext) private var viewContext

    @FetchRequest(
        sortDescriptors: [NSSortDescriptor(keyPath: \Todo.timestamp, ascending: true)],
        animation: .default)
    private var todos: FetchedResults<Todo>

    var body: some View {
        List {
            ForEach(todos) { todo in
                Text(todo.title ?? "")
            }
            .onDelete(perform: deleteTodos)
        }
    }

    private func deleteTodos(offsets: IndexSet) {
        withAnimation {
            offsets.map { todos[$0] }.forEach(viewContext.delete)
            try? viewContext.save()
        }
    }
}
```

#### 5.2 SwiftData (iOS 17+)
- **现代化数据持久化**
- 更简洁的 API
- 与 SwiftUI 深度集成

#### 5.3 其他存储方案
- **Realm** - 移动数据库
- **SQLite** - 轻量级数据库
- **Keychain** - 敏感数据存储

### 实践项目
- 实现一个笔记应用 (CoreData)
- 实现离线缓存机制

---

## 6. 网络和 API

### 学习目标
掌握复杂的网络请求和数据处理

### 核心内容

#### 6.1 URLSession 进阶
- **自定义请求配置**
- **多部分上传 (Multipart)**
- **下载和上传进度**
- **后台传输**

#### 6.2 网络层设计
- **抽象网络层**
  - Endpoint 定义
  - 请求拦截器
  - 响应处理

```swift
// 网络层设计示例
protocol NetworkService {
    func request<T: Decodable>(_ endpoint: Endpoint) async throws -> T
}

struct Endpoint {
    let path: String
    let method: HTTPMethod
    let headers: [String: String]?
    let body: Data?
}

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}
```

#### 6.3 常见场景
- **分页加载**
- **下拉刷新和上拉加载**
- **图片缓存**
- **离线模式**

#### 6.4 第三方库
- **Alamofire** - 网络请求
- **Kingfisher** - 图片加载和缓存
- **Moya** - 网络抽象层

### 实践项目
- 实现一个完整的网络层
- 集成真实的 REST API

---

## 7. 性能优化

### 学习目标
识别和解决性能问题

### 核心内容

#### 7.1 性能分析工具
- **Instruments**
  - Time Profiler - CPU 分析
  - Allocations - 内存分析
  - Leaks - 内存泄漏检测
  - Energy Log - 电量消耗

#### 7.2 常见优化
- **列表性能优化**
  - LazyVStack/LazyHStack
  - 虚拟化滚动
  - Cell 重用

- **图片优化**
  - 图片压缩
  - 异步加载
  - 缓存策略

- **内存优化**
  - 避免循环引用
  - 及时释放资源
  - 使用 weak/unowned

#### 7.3 启动优化
- **冷启动时间**
- **懒加载**
- **预加载策略**

### 实践项目
- 优化一个卡顿的列表
- 减少应用启动时间

---

## 8. 测试

### 学习目标
写出高质量、可测试的代码

### 核心内容

#### 8.1 单元测试
- **XCTest 框架**
- **测试用例编写**
- **Mock 和 Stub**
- **测试覆盖率**

```swift
// 单元测试示例
import XCTest
@testable import MyApp

class UserViewModelTests: XCTestCase {
    var viewModel: UserViewModel!
    var mockService: MockUserService!

    override func setUp() {
        mockService = MockUserService()
        viewModel = UserViewModel(userService: mockService)
    }

    func testLoadUsers() async {
        // Given
        let expectedUsers = [User(id: 1, name: "Alice")]
        mockService.usersToReturn = expectedUsers

        // When
        await viewModel.loadUsers()

        // Then
        XCTAssertEqual(viewModel.users, expectedUsers)
    }
}
```

#### 8.2 UI 测试
- **XCUITest**
- **界面元素查找**
- **用户交互模拟**

#### 8.3 测试驱动开发 (TDD)
- **红-绿-重构**循环
- **先写测试再写代码**

### 实践项目
- 为现有项目添加测试
- 用 TDD 开发新功能

---

## 9. App Store 发布

### 学习目标
将应用发布到 App Store

### 核心内容

#### 9.1 发布准备
- **Apple Developer 账号**
  - 个人账号 vs 企业账号
  - 年费 $99

- **App ID 和证书**
  - Bundle Identifier
  - Provisioning Profile
  - Certificates

#### 9.2 应用元数据
- **App Store Connect**
  - 应用名称和描述
  - 截图和预览视频
  - 关键词优化 (ASO)
  - 分级和隐私政策

#### 9.3 TestFlight
- **内部测试**
- **外部测试**
- **Beta 版本管理**

#### 9.4 提交审核
- **审核指南**
- **常见拒审原因**
- **如何申诉**

#### 9.5 发布后
- **版本更新**
- **Crash 分析**
- **用户反馈处理**

### 实践项目
- 发布一个简单的应用到 App Store

### 推荐资源
- [App Store 审核指南](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## 🎯 学习路径建议

### 路径 1: 全栈 iOS 开发者
```
Swift 进阶 → SwiftUI 进阶 → 架构模式 → 数据管理 → 网络和 API → 测试 → 发布
时长: 3-4 个月
```

### 路径 2: UI/UX 专家
```
SwiftUI 进阶 → 动画和交互 → 性能优化 → 发布
时长: 2-3 个月
```

### 路径 3: 维护老项目
```
Swift 进阶 → UIKit 基础 → 架构模式 → 性能优化
时长: 2-3 个月
```

### 路径 4: 快速上架
```
网络和 API → 数据管理 → 测试 → 发布
时长: 1-2 个月
```

---

## 📚 综合学习资源

### 官方资源
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [WWDC Videos](https://developer.apple.com/videos/)
- [Swift.org](https://swift.org/)

### 在线教程
- [Hacking with Swift](https://www.hackingwithswift.com/)
- [Ray Wenderlich](https://www.raywenderlich.com/)
- [Design+Code](https://designcode.io/)
- [SwiftUI Lab](https://swiftui-lab.com/)

### 书籍
- "iOS Programming: The Big Nerd Ranch Guide"
- "Swift Programming: The Big Nerd Ranch Guide"
- "Advanced Swift" by objc.io

### 社区
- [Swift Forums](https://forums.swift.org/)
- [Stack Overflow - iOS](https://stackoverflow.com/questions/tagged/ios)
- [Reddit r/iOSProgramming](https://www.reddit.com/r/iOSProgramming/)

---

## 💡 持续学习建议

1. **关注 WWDC**: 每年6月的苹果开发者大会，了解最新技术
2. **阅读优秀代码**: GitHub 上的开源项目
3. **参与社区**: 提问、回答、分享
4. **实践项目**: 理论结合实践才能真正掌握
5. **保持更新**: iOS 系统每年更新，持续学习新特性

---

**记住**: 深度学习需要时间和耐心，不要急于求成。选择一个方向，深入研究，逐步扩展！
