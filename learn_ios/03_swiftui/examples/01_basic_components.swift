// SwiftUI 示例 1: 基础组件

import SwiftUI

// ========================================
// 1. Text - 文本显示
// ========================================

struct TextExamples: View {
    var body: some View {
        VStack(spacing: 20) {
            // 基础文本
            Text("Hello, SwiftUI!")

            // 字体样式
            Text("Large Title")
                .font(.largeTitle)

            Text("Title")
                .font(.title)

            Text("Headline")
                .font(.headline)

            Text("Body")
                .font(.body)

            Text("Caption")
                .font(.caption)

            // 自定义字体大小
            Text("Custom Size")
                .font(.system(size: 24))

            // 粗体和斜体
            Text("Bold Text")
                .fontWeight(.bold)

            Text("Italic Text")
                .italic()

            // 颜色
            Text("Red Text")
                .foregroundColor(.red)

            Text("Blue Background")
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)

            // 多行文本
            Text("This is a very long text that will automatically wrap to multiple lines when it exceeds the width of the view")
                .lineLimit(3)  // 限制行数
                .multilineTextAlignment(.center)

            // 字符串插值
            let name = "Alice"
            let age = 25
            Text("My name is \(name) and I'm \(age) years old")

            // 格式化日期
            Text(Date(), style: .date)
        }
        .padding()
    }
}

// ========================================
// 2. Image - 图片显示
// ========================================

struct ImageExamples: View {
    var body: some View {
        VStack(spacing: 20) {
            // 系统图标 (SF Symbols)
            Image(systemName: "heart.fill")
                .foregroundColor(.red)
                .font(.largeTitle)

            Image(systemName: "star.fill")
                .foregroundColor(.yellow)
                .font(.system(size: 50))

            // 本地图片 (需要在 Assets.xcassets 中添加)
            // Image("myImage")
            //     .resizable()
            //     .scaledToFit()
            //     .frame(width: 200, height: 200)

            // 网络图片 (使用 AsyncImage)
            AsyncImage(url: URL(string: "https://picsum.photos/200")) { image in
                image
                    .resizable()
                    .scaledToFit()
            } placeholder: {
                ProgressView()
            }
            .frame(width: 200, height: 200)

            // 圆形图片
            Image(systemName: "person.circle.fill")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.gray)

            // 带边框的图片
            Image(systemName: "photo")
                .resizable()
                .scaledToFit()
                .frame(width: 100, height: 100)
                .padding()
                .border(Color.blue, width: 2)
        }
        .padding()
    }
}

// ========================================
// 3. Button - 按钮
// ========================================

struct ButtonExamples: View {
    @State private var counter = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("Counter: \(counter)")
                .font(.largeTitle)

            // 基础按钮
            Button("Increment") {
                counter += 1
            }

            // 自定义样式按钮
            Button {
                counter += 1
            } label: {
                Text("Custom Button")
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }

            // 带图标的按钮
            Button {
                counter += 1
            } label: {
                HStack {
                    Image(systemName: "plus.circle.fill")
                    Text("Add One")
                }
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .cornerRadius(10)
            }

            // 重置按钮
            Button("Reset", role: .destructive) {
                counter = 0
            }

            // 禁用状态
            Button("Disabled") {
                // 不会执行
            }
            .disabled(true)
        }
        .padding()
    }
}

// ========================================
// 4. TextField - 文本输入
// ========================================

struct TextFieldExamples: View {
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        VStack(spacing: 20) {
            // 基础文本框
            TextField("Enter your name", text: $name)
                .textFieldStyle(.roundedBorder)
                .padding()

            // 邮箱输入
            TextField("Email", text: $email)
                .textFieldStyle(.roundedBorder)
                .keyboardType(.emailAddress)
                .textInputAutocapitalization(.never)
                .padding()

            // 密码输入
            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)
                .padding()

            // 显示输入的内容
            if !name.isEmpty {
                Text("Hello, \(name)!")
            }

            if !email.isEmpty {
                Text("Email: \(email)")
            }
        }
        .padding()
    }
}

// ========================================
// 5. Toggle - 开关
// ========================================

struct ToggleExamples: View {
    @State private var isOn = false
    @State private var darkMode = false
    @State private var notifications = true

    var body: some View {
        VStack(spacing: 20) {
            // 基础开关
            Toggle("Switch", isOn: $isOn)
                .padding()

            // 带样式的开关
            Toggle(isOn: $darkMode) {
                HStack {
                    Image(systemName: darkMode ? "moon.fill" : "sun.max.fill")
                    Text("Dark Mode")
                }
            }
            .padding()
            .tint(.purple)

            // 通知开关
            Toggle("Enable Notifications", isOn: $notifications)
                .padding()

            // 显示状态
            Text("Dark Mode is \(darkMode ? "ON" : "OFF")")
                .foregroundColor(darkMode ? .white : .black)
                .padding()
                .background(darkMode ? Color.black : Color.white)
        }
        .padding()
    }
}

// ========================================
// 6. Picker - 选择器
// ========================================

struct PickerExamples: View {
    @State private var selectedColor = "Red"
    @State private var selectedNumber = 1

    let colors = ["Red", "Green", "Blue", "Yellow"]
    let numbers = [1, 2, 3, 4, 5]

    var body: some View {
        VStack(spacing: 20) {
            // 基础选择器
            Picker("Color", selection: $selectedColor) {
                ForEach(colors, id: \.self) { color in
                    Text(color)
                }
            }
            .pickerStyle(.segmented)

            Text("Selected color: \(selectedColor)")
                .foregroundColor(colorFromString(selectedColor))

            // 数字选择器
            Picker("Number", selection: $selectedNumber) {
                ForEach(numbers, id: \.self) { number in
                    Text("\(number)")
                }
            }
            .pickerStyle(.wheel)

            Text("Selected number: \(selectedNumber)")
        }
        .padding()
    }

    func colorFromString(_ string: String) -> Color {
        switch string {
        case "Red": return .red
        case "Green": return .green
        case "Blue": return .blue
        case "Yellow": return .yellow
        default: return .black
        }
    }
}

// ========================================
// 7. Slider - 滑块
// ========================================

struct SliderExamples: View {
    @State private var volume: Double = 50
    @State private var brightness: Double = 0.5

    var body: some View {
        VStack(spacing: 30) {
            // 基础滑块
            VStack {
                Text("Volume: \(Int(volume))")
                Slider(value: $volume, in: 0...100)
            }
            .padding()

            // 带步长的滑块
            VStack {
                Text("Brightness: \(brightness, specifier: "%.2f")")
                Slider(value: $brightness, in: 0...1, step: 0.1)
            }
            .padding()

            // 自定义样式滑块
            VStack {
                HStack {
                    Image(systemName: "speaker.fill")
                    Slider(value: $volume, in: 0...100)
                    Image(systemName: "speaker.wave.3.fill")
                }
                .tint(.blue)
            }
            .padding()
        }
        .padding()
    }
}

// ========================================
// 8. Stepper - 步进器
// ========================================

struct StepperExamples: View {
    @State private var count = 0
    @State private var age = 18

    var body: some View {
        VStack(spacing: 20) {
            // 基础步进器
            Stepper("Count: \(count)", value: $count)
                .padding()

            // 带范围的步进器
            Stepper("Age: \(age)", value: $age, in: 0...100)
                .padding()

            // 自定义步长
            Stepper(value: $count, in: 0...100, step: 5) {
                Text("Count (step 5): \(count)")
            }
            .padding()
        }
        .padding()
    }
}

// ========================================
// 预览
// ========================================

#Preview("Text") {
    TextExamples()
}

#Preview("Image") {
    ImageExamples()
}

#Preview("Button") {
    ButtonExamples()
}

#Preview("TextField") {
    TextFieldExamples()
}

#Preview("Toggle") {
    ToggleExamples()
}

#Preview("Picker") {
    PickerExamples()
}

#Preview("Slider") {
    SliderExamples()
}

#Preview("Stepper") {
    StepperExamples()
}
