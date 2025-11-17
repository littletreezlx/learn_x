// 09_swiftui_basics.swift - SwiftUI基础组件
// 学习目标：掌握常用SwiftUI组件

import SwiftUI

struct BasicsView: View {
    // 状态管理：@State用于管理可变状态
    @State private var name = ""
    @State private var sliderValue = 0.5
    @State private var isOn = false
    @State private var selectedIndex = 0

    let colors = ["红色", "绿色", "蓝色"]

    var body: some View {
        // NavigationStack：提供导航功能
        NavigationStack {
            // ScrollView：当内容超出屏幕时可滚动
            ScrollView {
                // VStack：垂直排列组件
                VStack(spacing: 20) {
                    // 1. 文本输入
                    TextField("请输入姓名", text: $name)
                        .textFieldStyle(.roundedBorder)
                        .padding()

                    Text("你好，\(name.isEmpty ? "陌生人" : name)！")
                        .font(.title2)

                    Divider()

                    // 2. 图片
                    Image(systemName: "star.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.yellow)

                    Divider()

                    // 3. 滑块
                    VStack {
                        Text("滑块值：\(sliderValue, specifier: "%.2f")")
                        Slider(value: $sliderValue, in: 0...1)
                    }
                    .padding()

                    Divider()

                    // 4. 开关
                    Toggle("是否启用", isOn: $isOn)
                        .padding()

                    if isOn {
                        Text("已启用")
                            .foregroundColor(.green)
                    }

                    Divider()

                    // 5. 选择器
                    Picker("选择颜色", selection: $selectedIndex) {
                        ForEach(0..<colors.count, id: \.self) { index in
                            Text(colors[index]).tag(index)
                        }
                    }
                    .pickerStyle(.segmented)
                    .padding()

                    Text("选择了：\(colors[selectedIndex])")

                    Divider()

                    // 6. 进度条
                    ProgressView("加载中...", value: sliderValue, total: 1.0)
                        .padding()

                    // 7. 步进器
                    Stepper("计数：\(selectedIndex)", value: $selectedIndex, in: 0...10)
                        .padding()
                }
                .padding()
            }
            .navigationTitle("SwiftUI基础组件")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

#Preview {
    BasicsView()
}

/*
要点总结：
1. @State：用于管理View内部的可变状态
2. $符号：创建绑定，让UI组件能修改状态
3. 常用组件：TextField、Image、Slider、Toggle、Picker、Stepper
4. NavigationStack：提供导航栏和页面切换功能
5. 布局组件：VStack（垂直）、HStack（水平）、ZStack（层级）
*/