// 01_hello.swift - SwiftUI Hello World
// 学习目标：理解最简单的SwiftUI应用结构

import SwiftUI

// SwiftUI应用的基本结构：遵循App协议
struct HelloApp: App {
    // body属性：定义应用的内容
    var body: some Scene {
        // WindowGroup：创建应用的窗口
        WindowGroup {
            // ContentView：显示的界面
            ContentView()
        }
    }
}

// SwiftUI界面：遵循View协议
struct ContentView: View {
    // body属性：描述界面长什么样
    var body: some View {
        // Text：显示文本的组件
        Text("Hello, SwiftUI!")
            .padding() // 添加内边距
    }
}

// Preview：在Xcode中实时预览界面
#Preview {
    ContentView()
}

/*
要点总结：
1. SwiftUI应用 = App + View
2. App管理应用生命周期，View描述界面
3. body属性用@ViewBuilder标记，可以返回多个View
4. #Preview让你在Xcode中直接看到界面效果
*/