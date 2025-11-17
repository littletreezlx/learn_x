// 10_state_binding.swift - 状态管理和数据绑定
// 学习目标：理解SwiftUI的状态管理机制

import SwiftUI

struct StateBindingView: View {
    // @State：本地状态，只在当前View中使用
    @State private var counter = 0
    @State private var text = ""
    @State private var isEnabled = true

    var body: some View {
        VStack(spacing: 30) {
            Text("计数器示例")
                .font(.title)

            // 使用@State的计数器
            HStack {
                Button("减1") {
                    counter -= 1
                }
                .disabled(counter <= 0)

                Text("\(counter)")
                    .font(.title2)
                    .frame(width: 50)

                Button("加1") {
                    counter += 1
                }
            }
            .buttonStyle(.bordered)

            Divider()

            Text("文本绑定示例")
                .font(.title)

            // $符号创建双向绑定
            TextField("输入内容", text: $text)
                .textFieldStyle(.roundedBorder)
                .padding()

            if !text.isEmpty {
                Text("你输入了：\(text)")
                    .foregroundColor(.blue)
            }

            Divider()

            Text("开关控制示例")
                .font(.title)

            Toggle("启用功能", isOn: $isEnabled)
                .padding()

            // 根据状态显示不同内容
            VStack {
                if isEnabled {
                    Text("功能已启用")
                        .foregroundColor(.green)
                    Rectangle()
                        .fill(Color.green.opacity(0.3))
                        .frame(height: 100)
                } else {
                    Text("功能已禁用")
                        .foregroundColor(.red)
                    Rectangle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(height: 100)
                }
            }
            .padding()

            Spacer()
        }
        .padding()
        .navigationTitle("状态管理")
    }
}

// 状态传递示例：@State 和 @Binding
struct ParentView: View {
    @State private var message = "来自父组件的消息"

    var body: some View {
        VStack {
            Text("父组件")
                .font(.title)

            Text("当前消息：\(message)")
                .padding()

            // $message 创建绑定传递给子组件
            ChildView(message: $message)
        }
    }
}

struct ChildView: View {
    // @Binding：接收来自父组件的绑定
    @Binding var message: String

    var body: some View {
        VStack {
            Text("子组件")
                .font(.title2)

            TextField("修改消息", text: $message)
                .textFieldStyle(.roundedBorder)
                .padding()

            Button("重置消息") {
                message = "来自父组件的消息"
            }
            .buttonStyle(.bordered)
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(10)
    }
}

#Preview {
    NavigationStack {
        StateBindingView()
    }
}

#Preview("状态传递") {
    ParentView()
}

/*
要点总结：
1. @State：定义本地可变状态，当状态改变时UI自动更新
2. $var：创建状态的双向绑定，让子组件也能修改状态
3. @Binding：接收来自父组件的绑定，实现状态共享
4. 响应式UI：状态改变 → UI自动重新渲染
5. 单向数据流：父组件管理状态，子组件接收绑定
*/