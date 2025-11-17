// 11_lists_navigation.swift - 列表和导航
// 学习目标：掌握列表显示和页面导航

import SwiftUI

struct ListsNavigationView: View {
    // 模拟数据
    let fruits = ["苹果", "香蕉", "橙子", "草莓", "葡萄"]
    let categories = [
        Category(name: "水果", items: ["苹果", "香蕉", "橙子"]),
        Category(name: "蔬菜", items: ["胡萝卜", "西红柿", "黄瓜"]),
        Category(name: "饮料", items: ["水", "果汁", "咖啡"])
    ]

    @State private var selectedFruit: String?
    @State private var navigationPath = [String]()

    var body: some View {
        NavigationStack(path: $navigationPath) {
            VStack {
                // 1. 简单列表
                Text("简单列表")
                    .font(.title2)
                    .padding()

                List(fruits, id: \.self) { fruit in
                    Text(fruit)
                }
                .frame(height: 200)
                .cornerRadius(10)

                // 2. 可点击的列表
                Text("可点击列表")
                    .font(.title2)
                    .padding(.top)

                List(fruits, id: \.self) { fruit in
                    HStack {
                        Text(fruit)
                        Spacer()
                        // 添加导航箭头
                        Image(systemName: "chevron.right")
                            .foregroundColor(.gray)
                    }
                    .contentShape(Rectangle())
                    .onTapGesture {
                        selectedFruit = fruit
                        navigationPath.append(fruit)
                    }
                }
                .frame(height: 200)
                .cornerRadius(10)

                // 3. 分组列表
                Text("分组列表")
                    .font(.title2)
                    .padding(.top)

                List {
                    ForEach(categories, id: \.name) { category in
                        Section(header: Text(category.name)) {
                            ForEach(category.items, id: \.self) { item in
                                Text(item)
                            }
                        }
                    }
                }
                .frame(height: 200)
                .cornerRadius(10)

                Spacer()
            }
            .padding()
            .navigationTitle("列表和导航")
            .navigationDestination(for: String.self) { fruit in
                DetailView(fruit: fruit)
            }
        }
    }
}

// 详情页面
struct DetailView: View {
    let fruit: String
    @Environment(\.dismiss) private var dismiss
    @State private var isLiked = false

    var body: some View {
        VStack(spacing: 30) {
            // 大图标
            Image(systemName: "applelogo")
                .font(.system(size: 100))
                .foregroundColor(.red)

            Text(fruit)
                .font(.largeTitle)
                .fontWeight(.bold)

            VStack(alignment: .leading, spacing: 10) {
                Text("营养信息")
                    .font(.title2)
                    .fontWeight(.semibold)

                Text("• 富含维生素")
                Text("• 含有天然糖分")
                Text("• 低热量")
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(10)

            // 点赞按钮
            Button(action: {
                isLiked.toggle()
            }) {
                HStack {
                    Image(systemName: isLiked ? "heart.fill" : "heart")
                    Text(isLiked ? "已喜欢" : "喜欢")
                }
                .foregroundColor(isLiked ? .red : .blue)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(20)
            }
            .buttonStyle(.plain)

            Spacer()

            // 返回按钮
            Button("返回") {
                dismiss()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .navigationTitle("水果详情")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// 数据模型
struct Category {
    let name: String
    let items: [String]
}

#Preview {
    ListsNavigationView()
}

/*
要点总结：
1. List：创建列表，配合ForEach使用
2. NavigationStack：提供导航功能，管理页面栈
3. navigationDestination：定义导航目标页面
4. @Environment(\.dismiss)：用于返回上一页
5. Section：对列表项进行分组
6. onTapGesture：添加点击手势处理导航
7. $binding：在导航中传递路径状态
*/