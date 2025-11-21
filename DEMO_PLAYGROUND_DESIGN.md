# Demo Playground 设计思想

> **灵感来源**: android-test 和 flutter-test 项目的交互式演示机制

---

## 🎯 核心洞察

### Demo vs Test：本质区别

**测试项目（Test）**：
- 目标：确保代码正确性
- 心态：防御性（不能出错）
- 流程：写测试 → 运行 → 修复 bug → 提交

**演示项目（Demo）**：
- 目标：快速理解和验证概念
- 心态：探索性（试试看会怎样）
- 流程：有个想法 → 写个 Demo → 运行 → 立即看到效果

**learn_x 的本质**：**演示项目，而非测试项目**

---

## 💡 为什么需要 Demo Playground？

### learn_x 当前的痛点

**现状**：
```
learn_cpp/examples/
├── 01_hello.cpp
├── 02_variables.cpp
├── 05_smart_pointers.cpp
└── ...
```

**学习流程**：
```bash
# 1. 打开文件，阅读代码
cat examples/05_smart_pointers.cpp

# 2. 手动编译
g++ examples/05_smart_pointers.cpp -o build/smart_pointers

# 3. 运行
./build/smart_pointers

# 4. 想修改试试？重复步骤 2-3
```

**存在的问题**：
- ❌ 每次都要编译，摩擦力大
- ❌ 一个文件只能演示一个点
- ❌ 想试不同用法，要改文件内容或新建文件
- ❌ 缺少"交互感"
- ❌ 不鼓励"试试看会怎样"的探索性学习

---

### Android-test / Flutter-test 的成功经验

#### Android-test 的方案

```kotlin
// 不是在写"单元测试"，而是在写"交互式教程"
class WebSocketFragment : BaseFunctionsFragment() {

    @TestFun(desc = "连接到服务器")  // 📌 这不是测试，是演示
    fun demoConnect() {
        logD("我要试试 WebSocket 怎么连接")
        webSocket.connect("ws://localhost:8080")
        logI("看！连接成功了")
    }

    @TestFun(desc = "发送消息")
    fun demoSendMessage() {
        logD("试试发送消息")
        webSocket.send("Hello")
        logI("消息发出去了")
    }

    @TestFun(desc = "断开连接")
    fun demoDisconnect() {
        webSocket.disconnect()
        logI("断开了")
    }
}
```

**使用体验**：
1. 打开 App
2. 看到 3 个按钮：「连接到服务器」「发送消息」「断开连接」
3. 点击任意一个 → 立即看到效果和日志
4. 想试另一个？再点一个按钮
5. 想改代码？修改后重新运行 App

**核心价值**：
- ✅ **多个独立 Demo 聚合** - 一个页面展示一个概念的所有用法
- ✅ **零摩擦运行** - 点按钮就行，无需编译
- ✅ **即时反馈** - 立即看到日志和效果
- ✅ **探索友好** - 鼓励"试试看会怎样"

---

#### Flutter-test 的方案

```dart
// 把官方文档变成"可交互的"
class DioDemo extends PackageDemoPage {
  @override
  List<DemoScenario> get demoScenarios => [
    DemoScenario(
      title: 'GET 请求',
      description: '看看 GET 请求怎么用',
      builder: (context) => ElevatedButton(
        onPressed: () async {
          // 官方文档说这样写，我试试
          final dio = Dio();
          final response = await dio.get('https://api.github.com');
          print('返回: ${response.data}');
        },
        child: const Text('试试看'),
      ),
    ),

    DemoScenario(
      title: 'POST 请求',
      description: '试试 POST 怎么发数据',
      builder: (context) => ElevatedButton(
        onPressed: () async {
          final dio = Dio();
          final response = await dio.post(
            'https://httpbin.org/post',
            data: {'name': 'test'},
          );
          print('服务器返回: ${response.data}');
        },
        child: const Text('发送POST'),
      ),
    ),
  ];
}
```

**核心价值**：
- ✅ **官方文档的"可运行版本"** - 不用新建项目，直接运行
- ✅ **多个独立示例的集合** - 一个页面展示一个包的所有用法
- ✅ **即时反馈** - 热重载，改代码立即看效果

---

## 🏗️ Demo Playground 设计方案

### 核心理念

**一个概念 → 多个独立 Demo → 交互式运行**

### 跨技术栈的统一模式

| 技术栈 | Demo 组织方式 | 运行方式 | 交互性 |
|--------|--------------|---------|--------|
| **C++** | 一个可执行文件 + 菜单选择 | 编译1次，交互式选择 Demo | 控制台菜单 |
| **Go** | 一个 main 包 + Demo 切换 | 运行1次，交互式选择 Demo | 控制台菜单 |
| **iOS** | Xcode Playground | 实时预览 | 实时预览 |
| **Next.js** | 单页应用 + Demo 切换 | 热重载 | Web UI |
| **Vue** | 单页应用 + Demo 切换 | 热重载 | Web UI |

---

### 方案 1：编译型语言（C++, Go）- 交互式菜单

#### C++ 示例

```cpp
// learn_cpp/demos/smart_pointers_playground.cpp
// 📌 这不是单个示例，而是"智能指针的交互式演示集"

#include <iostream>
#include <memory>
#include <map>
#include <functional>

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 定义区
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

void demo_unique_ptr_basic() {
    std::cout << "\n━━━ Demo: unique_ptr 基础用法 ━━━\n";

    auto ptr = std::make_unique<int>(42);
    std::cout << "值: " << *ptr << "\n";
    std::cout << "地址: " << ptr.get() << "\n";

    std::cout << "✅ unique_ptr 拥有独占所有权\n";
}

void demo_unique_ptr_move() {
    std::cout << "\n━━━ Demo: unique_ptr 所有权转移 ━━━\n";

    auto ptr1 = std::make_unique<int>(100);
    std::cout << "ptr1 持有: " << *ptr1 << "\n";

    auto ptr2 = std::move(ptr1);  // 所有权转移
    std::cout << "转移后，ptr1 是否为空: " << (ptr1 == nullptr) << "\n";
    std::cout << "ptr2 现在持有: " << *ptr2 << "\n";

    std::cout << "✅ 移动后原指针失效\n";
}

void demo_shared_ptr() {
    std::cout << "\n━━━ Demo: shared_ptr 共享所有权 ━━━\n";

    auto ptr1 = std::make_shared<int>(200);
    std::cout << "引用计数: " << ptr1.use_count() << "\n";

    {
        auto ptr2 = ptr1;  // 共享所有权
        std::cout << "增加引用后: " << ptr1.use_count() << "\n";
    }

    std::cout << "ptr2 销毁后: " << ptr1.use_count() << "\n";

    std::cout << "✅ shared_ptr 引用计数管理\n";
}

void demo_weak_ptr() {
    std::cout << "\n━━━ Demo: weak_ptr 打破循环引用 ━━━\n";

    auto shared = std::make_shared<int>(300);
    std::weak_ptr<int> weak = shared;

    std::cout << "shared 引用计数: " << shared.use_count() << "\n";
    std::cout << "weak 不增加引用计数: " << weak.use_count() << "\n";

    if (auto locked = weak.lock()) {
        std::cout << "weak_ptr 可以临时获取 shared_ptr: " << *locked << "\n";
    }

    std::cout << "✅ weak_ptr 用于打破循环引用\n";
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 运行器
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class DemoRunner {
private:
    std::map<int, std::pair<std::string, std::function<void()>>> demos;

public:
    DemoRunner() {
        // 注册所有 Demo（类似 @TestFun 的自动发现）
        demos[1] = {"unique_ptr 基础", demo_unique_ptr_basic};
        demos[2] = {"unique_ptr 移动", demo_unique_ptr_move};
        demos[3] = {"shared_ptr 共享", demo_shared_ptr};
        demos[4] = {"weak_ptr 弱引用", demo_weak_ptr};
    }

    void show_menu() {
        std::cout << "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        std::cout << "   智能指针 Demo Playground\n";
        std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        for (const auto& [id, demo] : demos) {
            std::cout << id << ". " << demo.first << "\n";
        }
        std::cout << "0. 退出\n";
        std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }

    void run() {
        while (true) {
            show_menu();

            std::cout << "选择 Demo (0-" << demos.size() << "): ";
            int choice;
            std::cin >> choice;

            if (choice == 0) break;

            if (demos.count(choice)) {
                demos[choice].second();  // 运行选中的 Demo
            } else {
                std::cout << "❌ 无效选择\n";
            }
        }
    }
};

int main() {
    DemoRunner runner;
    runner.run();
    return 0;
}
```

**使用体验**：
```bash
$ ./demos/smart_pointers_playground

━━━━━━━━━━━━━━━━━━━━━━━━━━━
   智能指针 Demo Playground
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. unique_ptr 基础
2. unique_ptr 移动
3. shared_ptr 共享
4. weak_ptr 弱引用
0. 退出
━━━━━━━━━━━━━━━━━━━━━━━━━━━

选择 Demo (0-4): 1

━━━ Demo: unique_ptr 基础用法 ━━━
值: 42
地址: 0x7f8e5c405e70
✅ unique_ptr 拥有独占所有权

选择 Demo (0-4): 3

━━━ Demo: shared_ptr 共享所有权 ━━━
引用计数: 1
增加引用后: 2
ptr2 销毁后: 1
✅ shared_ptr 引用计数管理

选择 Demo (0-4): 0
```

---

#### Go 示例

```go
// learn_go/demos/goroutine_playground.go
package main

import (
    "fmt"
    "time"
)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 类型定义
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Demo struct {
    Name string
    Desc string
    Run  func()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 定义区
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

var demoBasicGoroutine = Demo{
    Name: "基础 Goroutine",
    Desc: "演示如何启动 goroutine",
    Run: func() {
        fmt.Println("\n━━━ Demo: 基础 Goroutine ━━━")

        go func() {
            fmt.Println("这是在 goroutine 里运行")
        }()

        time.Sleep(100 * time.Millisecond)
        fmt.Println("✅ 主程序继续执行")
    },
}

var demoChannelCommunication = Demo{
    Name: "Channel 通信",
    Desc: "演示 goroutine 之间通过 channel 通信",
    Run: func() {
        fmt.Println("\n━━━ Demo: Channel 通信 ━━━")

        ch := make(chan string)

        go func() {
            ch <- "来自 goroutine 的消息"
        }()

        msg := <-ch
        fmt.Println("收到:", msg)
        fmt.Println("✅ Channel 实现了安全通信")
    },
}

var demoBufferedChannel = Demo{
    Name: "缓冲 Channel",
    Desc: "演示带缓冲的 channel",
    Run: func() {
        fmt.Println("\n━━━ Demo: 缓冲 Channel ━━━")

        ch := make(chan int, 2)  // 缓冲区大小为 2

        ch <- 1  // 不会阻塞
        ch <- 2  // 不会阻塞
        fmt.Println("已发送 2 个值，未阻塞")

        fmt.Println("接收:", <-ch)
        fmt.Println("接收:", <-ch)

        fmt.Println("✅ 缓冲 channel 可以暂存数据")
    },
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 运行器
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

func main() {
    demos := []Demo{
        demoBasicGoroutine,
        demoChannelCommunication,
        demoBufferedChannel,
    }

    for {
        fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        fmt.Println("   Goroutine Demo Playground")
        fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━")

        for i, demo := range demos {
            fmt.Printf("%d. %s - %s\n", i+1, demo.Name, demo.Desc)
        }
        fmt.Println("0. 退出")
        fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━")

        var choice int
        fmt.Print("选择 Demo: ")
        fmt.Scan(&choice)

        if choice == 0 {
            break
        }

        if choice > 0 && choice <= len(demos) {
            demos[choice-1].Run()
        } else {
            fmt.Println("❌ 无效选择")
        }
    }
}
```

---

### 方案 2：Web 技术（Next.js, Vue）- 交互式 UI

#### Next.js 示例

```tsx
// learn_nextjs/app/playground/hooks/page.tsx
// 📌 这是"交互式 Hooks 文档"，不是测试

'use client';

import { useState } from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 场景类型
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface DemoScenario {
  title: string;
  description: string;
  component: React.ComponentType;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 组件定义区
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function UseStateBasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-card">
      <h3>Demo: useState 基础</h3>
      <p>当前计数: <strong>{count}</strong></p>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>重置</button>
      </div>
      <div className="explanation">
        ✅ useState 返回 [状态, 更新函数]
      </div>
    </div>
  );
}

function UseStateObjectDemo() {
  const [user, setUser] = useState({ name: '', age: 0 });

  return (
    <div className="demo-card">
      <h3>Demo: useState 管理对象</h3>
      <input
        placeholder="姓名"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="年龄"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
      />
      <p>用户: {user.name}, {user.age}岁</p>
      <div className="explanation">
        ✅ 更新对象状态需要展开运算符（...）
      </div>
    </div>
  );
}

function UseStateArrayDemo() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput('');
    }
  };

  return (
    <div className="demo-card">
      <h3>Demo: useState 管理数组</h3>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入项目"
        />
        <button onClick={addItem}>添加</button>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
              删除
            </button>
          </li>
        ))}
      </ul>
      <div className="explanation">
        ✅ 添加/删除数组元素需要创建新数组
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo Playground 主页面
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function HooksPlayground() {
  const scenarios: DemoScenario[] = [
    {
      title: 'useState 基础',
      description: '最简单的状态管理',
      component: UseStateBasicDemo,
    },
    {
      title: 'useState 对象',
      description: '管理复杂对象状态',
      component: UseStateObjectDemo,
    },
    {
      title: 'useState 数组',
      description: '管理数组状态',
      component: UseStateArrayDemo,
    },
  ];

  const [activeDemo, setActiveDemo] = useState(0);
  const ActiveComponent = scenarios[activeDemo].component;

  return (
    <div className="playground">
      <h1>React Hooks 交互式演示</h1>

      {/* Demo 选择器 */}
      <div className="demo-selector">
        {scenarios.map((scenario, index) => (
          <button
            key={index}
            onClick={() => setActiveDemo(index)}
            className={activeDemo === index ? 'active' : ''}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      {/* 当前 Demo */}
      <div className="demo-area">
        <ActiveComponent />
      </div>

      {/* 说明 */}
      <div className="description">
        <h3>{scenarios[activeDemo].title}</h3>
        <p>{scenarios[activeDemo].description}</p>
      </div>
    </div>
  );
}
```

**使用体验**：
1. 打开页面：`http://localhost:3000/playground/hooks`
2. 看到 3 个 Demo 按钮
3. 点击任意一个 → 立即看到交互式演示
4. 修改输入、点击按钮 → 实时看到状态变化
5. 想试其他 Demo？点击另一个按钮
6. 想修改代码？编辑文件 → 热重载 → 立即生效

---

### 方案 3：iOS（Xcode Playground）

```swift
// learn_ios/demos/SwiftUIBasicsPlayground.playground

import SwiftUI
import PlaygroundSupport

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 场景定义
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

struct Demo {
    let title: String
    let description: String
    let view: AnyView
}

// Demo 1: State 基础
struct StateBasicDemo: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("Demo: @State 基础")
                .font(.headline)

            Text("当前计数: \(count)")
                .font(.title)

            HStack {
                Button("+1") { count += 1 }
                Button("-1") { count -= 1 }
                Button("重置") { count = 0 }
            }
            .buttonStyle(.borderedProminent)

            Text("✅ @State 创建可变状态")
                .foregroundColor(.green)
                .padding()
                .background(Color.green.opacity(0.1))
                .cornerRadius(8)
        }
        .padding()
    }
}

// Demo 2: Binding 使用
struct BindingDemo: View {
    @State private var text = ""

    var body: some View {
        VStack(spacing: 16) {
            Text("Demo: @Binding 数据传递")
                .font(.headline)

            TextField("输入文本", text: $text)
                .textFieldStyle(.roundedBorder)

            TextDisplay(text: $text)

            Text("✅ @Binding 实现双向绑定")
                .foregroundColor(.green)
                .padding()
                .background(Color.green.opacity(0.1))
                .cornerRadius(8)
        }
        .padding()
    }
}

struct TextDisplay: View {
    @Binding var text: String

    var body: some View {
        VStack {
            Text("子组件显示: \(text)")
            Button("清空") { text = "" }
        }
        .padding()
        .background(Color.blue.opacity(0.1))
        .cornerRadius(8)
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo Playground 主视图
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

struct PlaygroundView: View {
    let demos = [
        Demo(
            title: "@State 基础",
            description: "最简单的状态管理",
            view: AnyView(StateBasicDemo())
        ),
        Demo(
            title: "@Binding 绑定",
            description: "父子组件数据传递",
            view: AnyView(BindingDemo())
        ),
    ]

    @State private var selectedDemo = 0

    var body: some View {
        VStack {
            Text("SwiftUI 基础 Demo Playground")
                .font(.title)
                .padding()

            // Demo 选择器
            Picker("选择 Demo", selection: $selectedDemo) {
                ForEach(demos.indices, id: \.self) { index in
                    Text(demos[index].title)
                }
            }
            .pickerStyle(.segmented)
            .padding()

            // 当前 Demo
            demos[selectedDemo].view

            Spacer()
        }
    }
}

// 在 Playground 中显示
PlaygroundPage.current.setLiveView(PlaygroundView())
```

---

## 📂 项目结构建议

### 与现有 examples/ 的关系

**不是替代，是补充**：

```
learn_cpp/
├── examples/           # 📖 按顺序学习的教程式示例
│   ├── 01_hello.cpp
│   ├── 02_variables.cpp
│   ├── 05_smart_pointers.cpp
│   └── ...
│
└── demos/              # 🎮 按概念聚合的交互式演示
    ├── pointers_playground.cpp       # 指针的所有用法
    ├── smart_pointers_playground.cpp # 智能指针的所有用法
    └── containers_playground.cpp     # STL 容器的所有用法
```

**区别与联系**：

| 维度 | examples/ | demos/ |
|------|-----------|--------|
| **目的** | 线性学习路径 | 深入探索工具 |
| **组织** | 按学习顺序（01-13） | 按概念聚合 |
| **运行** | 一个文件一个程序 | 一个文件多个 Demo |
| **使用场景** | 第一次学习某个概念 | 深入理解某个概念的各种用法 |
| **对应关系** | 教材的章节 | 教材的习题集 |

**学习流程**：
1. 先过一遍 `examples/` (01-06) - 建立基础
2. 觉得某个概念不够清楚 → 打开对应 `demos/` 深入试验
3. 继续 `examples/` (07-13)
4. 完成后，回到 `demos/` 巩固和探索

---

## 🎯 统一设计原则

### 1. 零摩擦原则

**目标**：从"想验证概念"到"看到结果"的时间最短

**实现**：
- C++/Go：编译1次，菜单选择运行
- Web：热重载，改代码立即生效
- iOS：Playground 实时预览

### 2. 多示例聚合原则

**目标**：一个概念的所有用法集中展示

**实现**：
- 每个 Playground 文件包含 5-10 个独立 Demo
- 按难度递进：基础 → 进阶 → 高级
- 每个 Demo 独立可运行

### 3. 即时反馈原则

**目标**：运行后立即看到清晰的输出

**实现**：
- 统一的输出格式（`━━━ Demo: xxx ━━━`）
- 清晰的成功/失败标识（`✅` / `❌`）
- 有意义的解释文本

### 4. 探索友好原则

**目标**：鼓励"试试看会怎样"的心态

**实现**：
- 低成本试错（改代码不会破坏项目）
- 安全的沙盒环境
- 鼓励修改和实验

---

## 📊 价值总结

### 对比传统方式

| 维度 | 传统方式 | Demo Playground |
|------|---------|----------------|
| **运行成本** | 每次编译/启动 | 编译1次，多次运行 |
| **试错成本** | 高（要改文件、重编译） | 低（菜单选择） |
| **概念覆盖** | 一个文件一个点 | 一个文件多个点 |
| **学习曲线** | 陡峭 | 平缓 |
| **探索意愿** | 低 | 高 |

### 核心价值

1. ✅ **降低学习摩擦力** - 从"想试"到"看到结果"的时间最短
2. ✅ **鼓励探索式学习** - "试试看会怎样"的心态
3. ✅ **完整概念覆盖** - 一个概念的所有用法集中展示
4. ✅ **即时反馈循环** - 快速验证理解是否正确
5. ✅ **符合 learn_x 本质** - 快速验证概念，而非完美实现

---

## 🚀 实施计划

### Phase 1: 原型验证（1-2天）

**目标**：验证 Demo Playground 的有效性

**任务**：
1. 为 `learn_cpp` 创建第一个 Playground
   - `demos/smart_pointers_playground.cpp`
   - 包含 4-5 个独立 Demo
   - 实现交互式菜单
2. 试用并收集反馈
3. 确认是否继续推广

**验证标准**：
- ✅ 编译 1 次，可运行所有 Demo
- ✅ 每个 Demo 有清晰的输出
- ✅ 比传统方式更高效

---

### Phase 2: 推广到其他技术栈（3-5天）

**C++**:
```
learn_cpp/demos/
├── pointers_playground.cpp
├── smart_pointers_playground.cpp
├── containers_playground.cpp
└── templates_playground.cpp
```

**Go**:
```
learn_go/demos/
├── goroutine_playground.go
├── channel_playground.go
├── interface_playground.go
└── error_handling_playground.go
```

**Next.js**:
```
learn_nextjs/app/playground/
├── hooks/page.tsx
├── routing/page.tsx
├── api-routes/page.tsx
└── server-components/page.tsx
```

**iOS**:
```
learn_ios/demos/
├── SwiftUIBasicsPlayground.playground
├── StateManagementPlayground.playground
└── NetworkingPlayground.playground
```

---

### Phase 3: 文档和整合（1-2天）

**更新每个子项目的文档**：

1. **README.md** 添加章节：
```markdown
## 📚 学习资源

### 线性学习（从零开始）
- [01-13 按序示例](examples/) - 顺序学习，打基础

### 深入探索（概念沙盒）
- [Demo Playgrounds](demos/) - 交互式演示，深入某个概念

**推荐路径**：
1. 先过一遍 examples/ (01-06)
2. 觉得某个概念不够清楚 → 打开对应 playground 深入试验
3. 继续 examples/ (07-13)
```

2. **CLAUDE.md** 添加使用指导：
```markdown
## 🎮 Demo Playground 使用

想深入理解某个概念？使用 Playground：

bash
# C++
cd demos
./smart_pointers_playground

# Go
cd demos
go run goroutine_playground.go

# Next.js
访问 http://localhost:3000/playground/hooks
```

---

## 💡 关键洞察总结

1. **Demo ≠ Test**
   - Demo 是探索性的，Test 是防御性的
   - learn_x 需要的是 Demo，而非 Test

2. **多示例聚合 > 单一示例**
   - 一个概念的所有用法放在一起
   - 降低运行成本，提高学习效率

3. **即时反馈是关键**
   - 编译型语言用交互式菜单
   - 动态语言/Web 用热重载
   - 目标：最短反馈循环

4. **探索友好 > 完美实现**
   - 鼓励"试试看"的心态
   - 安全的沙盒环境
   - 低成本试错

5. **补充现有体系，不替代**
   - examples/ 是线性学习路径
   - demos/ 是探索式工具
   - 两者相辅相成

---

## 🔗 参考资料

- **android-test 项目**: `@TestFun` 注解机制
  - 文件: `/Users/zhanglingxiao/LittleTree_Projects/app/android-test/android-base/src/main/java/com/littletree/baselib/common_test/BaseFunctionsFragment.kt`

- **flutter-test 项目**: `PackageDemoPage` 演示框架
  - 文件: `/Users/zhanglingxiao/LittleTree_Projects/flutter/flutter_test/CLAUDE.md`

---

**最后更新**: 2025-11-20
