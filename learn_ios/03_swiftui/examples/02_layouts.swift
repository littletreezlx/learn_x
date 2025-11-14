// SwiftUI 示例 2: 布局容器

import SwiftUI

// ========================================
// 1. VStack - 垂直布局
// ========================================

struct VStackExample: View {
    var body: some View {
        VStack {
            Text("Item 1")
            Text("Item 2")
            Text("Item 3")
        }
        .padding()
        .border(Color.blue)
    }
}

struct VStackSpacingExample: View {
    var body: some View {
        VStack(spacing: 20) {  // 自定义间距
            Text("Item 1")
            Text("Item 2")
            Text("Item 3")
        }
        .padding()
    }
}

struct VStackAlignmentExample: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {  // 左对齐
            Text("Short")
            Text("Medium text")
            Text("Very long text here")
        }
        .padding()
        .border(Color.green)
    }
}

// ========================================
// 2. HStack - 水平布局
// ========================================

struct HStackExample: View {
    var body: some View {
        HStack {
            Text("Left")
            Text("Center")
            Text("Right")
        }
        .padding()
        .border(Color.red)
    }
}

struct HStackSpacingExample: View {
    var body: some View {
        HStack(spacing: 30) {
            Image(systemName: "star.fill")
            Image(systemName: "heart.fill")
            Image(systemName: "bell.fill")
        }
        .font(.largeTitle)
        .foregroundColor(.orange)
        .padding()
    }
}

struct HStackAlignmentExample: View {
    var body: some View {
        HStack(alignment: .top, spacing: 10) {  // 顶部对齐
            Text("Top")
                .font(.caption)
            Text("Aligned")
                .font(.title)
            Text("Text")
                .font(.body)
        }
        .padding()
        .border(Color.purple)
    }
}

// ========================================
// 3. ZStack - 层叠布局
// ========================================

struct ZStackExample: View {
    var body: some View {
        ZStack {
            // 背景层
            Rectangle()
                .fill(Color.blue)
                .frame(width: 200, height: 200)

            // 中间层
            Circle()
                .fill(Color.white)
                .frame(width: 150, height: 150)

            // 前景层
            Text("Layered")
                .font(.title)
                .foregroundColor(.blue)
        }
    }
}

struct ZStackAlignmentExample: View {
    var body: some View {
        ZStack(alignment: .topLeading) {  // 左上角对齐
            Rectangle()
                .fill(Color.gray.opacity(0.3))
                .frame(width: 200, height: 200)

            Text("Top Left")
                .padding(5)
                .background(Color.white)
        }
    }
}

struct ZStackOverlayExample: View {
    var body: some View {
        ZStack {
            Image(systemName: "photo")
                .resizable()
                .frame(width: 200, height: 200)
                .foregroundColor(.gray)

            VStack {
                Spacer()
                Text("Image Caption")
                    .padding(5)
                    .background(Color.black.opacity(0.7))
                    .foregroundColor(.white)
            }
        }
        .frame(width: 200, height: 200)
    }
}

// ========================================
// 4. Spacer - 空白占位
// ========================================

struct SpacerExample: View {
    var body: some View {
        VStack {
            // 使用 Spacer 推开元素
            Text("Top")
            Spacer()
            Text("Center")
            Spacer()
            Text("Bottom")
        }
        .frame(height: 300)
        .padding()
        .border(Color.blue)
    }
}

struct SpacerHStackExample: View {
    var body: some View {
        HStack {
            Text("Left")
            Spacer()
            Text("Right")
        }
        .padding()
        .background(Color.gray.opacity(0.2))
    }
}

// ========================================
// 5. Divider - 分割线
// ========================================

struct DividerExample: View {
    var body: some View {
        VStack {
            Text("Section 1")
            Divider()
            Text("Section 2")
            Divider()
            Text("Section 3")
        }
        .padding()
    }
}

struct DividerHStackExample: View {
    var body: some View {
        HStack {
            Text("Left")
            Divider()
            Text("Right")
        }
        .frame(height: 50)
        .padding()
    }
}

// ========================================
// 6. 复杂布局组合
// ========================================

struct ProfileCardExample: View {
    var body: some View {
        VStack(spacing: 15) {
            // 头像
            Image(systemName: "person.circle.fill")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.blue)

            // 姓名和职位
            VStack(spacing: 5) {
                Text("John Doe")
                    .font(.title)
                    .fontWeight(.bold)

                Text("iOS Developer")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }

            Divider()
                .padding(.horizontal, 40)

            // 统计信息
            HStack(spacing: 40) {
                VStack {
                    Text("128")
                        .font(.title2)
                        .fontWeight(.bold)
                    Text("Posts")
                        .font(.caption)
                        .foregroundColor(.gray)
                }

                VStack {
                    Text("1.2K")
                        .font(.title2)
                        .fontWeight(.bold)
                    Text("Followers")
                        .font(.caption)
                        .foregroundColor(.gray)
                }

                VStack {
                    Text("856")
                        .font(.title2)
                        .fontWeight(.bold)
                    Text("Following")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }

            // 按钮
            HStack(spacing: 20) {
                Button {
                    // Follow action
                } label: {
                    Text("Follow")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }

                Button {
                    // Message action
                } label: {
                    Text("Message")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.gray.opacity(0.2))
                        .foregroundColor(.blue)
                        .cornerRadius(10)
                }
            }
            .padding(.horizontal)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(20)
        .shadow(radius: 10)
        .padding()
    }
}

struct HeaderExample: View {
    var body: some View {
        HStack {
            // 左侧菜单按钮
            Button {
                // Menu action
            } label: {
                Image(systemName: "line.3.horizontal")
                    .font(.title2)
                    .foregroundColor(.primary)
            }

            Spacer()

            // 标题
            Text("Messages")
                .font(.headline)

            Spacer()

            // 右侧搜索按钮
            Button {
                // Search action
            } label: {
                Image(systemName: "magnifyingglass")
                    .font(.title2)
                    .foregroundColor(.primary)
            }
        }
        .padding()
        .background(Color.white)
        .shadow(radius: 2)
    }
}

struct ListItemExample: View {
    var body: some View {
        HStack(spacing: 15) {
            // 图标
            Image(systemName: "envelope.fill")
                .font(.title2)
                .foregroundColor(.blue)
                .frame(width: 50, height: 50)
                .background(Color.blue.opacity(0.1))
                .cornerRadius(10)

            // 文本内容
            VStack(alignment: .leading, spacing: 5) {
                Text("New Message")
                    .font(.headline)

                Text("You have 3 unread messages")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }

            Spacer()

            // 右侧时间和箭头
            VStack(alignment: .trailing, spacing: 5) {
                Text("2:30 PM")
                    .font(.caption)
                    .foregroundColor(.gray)

                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 2)
        .padding(.horizontal)
    }
}

// ========================================
// 7. 网格布局 (LazyVGrid/LazyHGrid)
// ========================================

struct GridExample: View {
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 20) {
                ForEach(1...12, id: \.self) { index in
                    Rectangle()
                        .fill(Color.blue.opacity(0.5))
                        .frame(height: 100)
                        .overlay(Text("\(index)"))
                }
            }
            .padding()
        }
    }
}

struct AdaptiveGridExample: View {
    let columns = [
        GridItem(.adaptive(minimum: 100))  // 自适应列数
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 20) {
                ForEach(1...20, id: \.self) { index in
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.green.opacity(0.5))
                        .frame(height: 100)
                        .overlay(Text("\(index)"))
                }
            }
            .padding()
        }
    }
}

// ========================================
// 预览
// ========================================

#Preview("VStack") {
    VStack(spacing: 30) {
        VStackExample()
        VStackSpacingExample()
        VStackAlignmentExample()
    }
}

#Preview("HStack") {
    VStack(spacing: 30) {
        HStackExample()
        HStackSpacingExample()
        HStackAlignmentExample()
    }
}

#Preview("ZStack") {
    VStack(spacing: 30) {
        ZStackExample()
        ZStackAlignmentExample()
        ZStackOverlayExample()
    }
}

#Preview("Spacer") {
    VStack(spacing: 30) {
        SpacerExample()
        SpacerHStackExample()
    }
}

#Preview("Divider") {
    VStack(spacing: 30) {
        DividerExample()
        DividerHStackExample()
    }
}

#Preview("Profile Card") {
    ProfileCardExample()
}

#Preview("Header") {
    HeaderExample()
}

#Preview("List Item") {
    ListItemExample()
}

#Preview("Grid") {
    GridExample()
}

#Preview("Adaptive Grid") {
    AdaptiveGridExample()
}
