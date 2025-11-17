// 12_networking.swift - 网络请求
// 学习目标：掌握SwiftUI中的网络请求处理

import SwiftUI

struct NetworkingView: View {
    @State private var posts: [Post] = []
    @State private var isLoading = false
    @State private var errorMessage: String?
    @State private var searchText = ""

    var filteredPosts: [Post] {
        if searchText.isEmpty {
            return posts
        } else {
            return posts.filter { $0.title.lowercased().contains(searchText.lowercased()) }
        }
    }

    var body: some View {
        NavigationStack {
            VStack {
                // 搜索框
                TextField("搜索文章...", text: $searchText)
                    .textFieldStyle(.roundedBorder)
                    .padding(.horizontal)

                // 加载状态
                if isLoading {
                    ProgressView("加载中...")
                        .padding()
                }

                // 错误显示
                if let errorMessage = errorMessage {
                    VStack {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.largeTitle)
                            .foregroundColor(.orange)
                        Text(errorMessage)
                            .foregroundColor(.red)
                            .multilineTextAlignment(.center)
                        Button("重试") {
                            loadPosts()
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                }

                // 文章列表
                List(filteredPosts, id: \.id) { post in
                    VStack(alignment: .leading, spacing: 8) {
                        Text(post.title)
                            .font(.headline)
                            .foregroundColor(.primary)

                        Text(post.body)
                            .font(.body)
                            .foregroundColor(.secondary)
                            .lineLimit(2)

                        HStack {
                            Text("用户 \(post.userId)")
                                .font(.caption)
                                .foregroundColor(.gray)
                            Spacer()
                            Text("ID: \(post.id)")
                                .font(.caption)
                                .foregroundColor(.gray)
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("网络请求示例")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("刷新") {
                        loadPosts()
                    }
                }
            }
            .onAppear {
                loadPosts()
            }
        }
    }

    private func loadPosts() {
        isLoading = true
        errorMessage = nil

        Task {
            do {
                // 模拟网络延迟
                try await Task.sleep(nanoseconds: 1_000_000_000)

                posts = try await fetchPosts()
                isLoading = false
            } catch {
                errorMessage = "加载失败: \(error.localizedDescription)"
                isLoading = false
            }
        }
    }

    // 模拟网络请求
    private func fetchPosts() async throws -> [Post] {
        let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

        let (data, _) = try await URLSession.shared.data(from: url)

        // 解析JSON
        let decoder = JSONDecoder()
        return try decoder.decode([Post].self, from: data)
    }
}

// 数据模型
struct Post: Codable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}

// 简单的网络请求管理器
class NetworkManager {
    static let shared = NetworkManager()
    private let session = URLSession.shared

    private init() {}

    func request<T: Codable>(
        url: URL,
        type: T.Type
    ) async throws -> T {
        let (data, response) = try await session.data(from: url)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.invalidResponse
        }

        guard 200...299 ~= httpResponse.statusCode else {
            throw NetworkError.serverError(httpResponse.statusCode)
        }

        let decoder = JSONDecoder()
        return try decoder.decode(type, from: data)
    }
}

// 网络错误类型
enum NetworkError: Error, LocalizedError {
    case invalidResponse
    case serverError(Int)
    case decodingError

    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "无效的服务器响应"
        case .serverError(let code):
            return "服务器错误: \(code)"
        case .decodingError:
            return "数据解析失败"
        }
    }
}

// 使用示例：更简洁的网络请求
struct AdvancedNetworkingView: View {
    @State private var posts: [Post] = []

    var body: some View {
        NavigationStack {
            List(posts, id: \.id) { post in
                VStack(alignment: .leading) {
                    Text(post.title)
                        .font(.headline)
                    Text(post.body)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
            }
            .navigationTitle("高级网络示例")
            .task {
                await loadPostsAdvanced()
            }
        }
    }

    private func loadPostsAdvanced() async {
        do {
            let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
            posts = try await NetworkManager.shared.request(url: url, type: [Post].self)
        } catch {
            print("加载失败: \(error.localizedDescription)")
        }
    }
}

#Preview {
    NetworkingView()
}

/*
要点总结：
1. URLSession：用于发送网络请求
2. async/await：现代Swift的异步编程方式
3. Task：在SwiftUI中执行异步操作
4. @State：管理网络请求的状态
5. JSONDecoder：解析JSON数据
6. 错误处理：捕获和处理网络错误
7. Codable：用于JSON序列化/反序列化
8. .task modifier：在View出现时执行异步操作
*/