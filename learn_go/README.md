# Learn Go - 快速掌握 Go 语言核心

> **面向有 Java/Kotlin 经验的开发者** - 7-10 天掌握 Go 核心概念

---

## 💡 Go 主要用来做什么？

### 设计目标
Go 是为**大规模并发的后端服务**而设计的语言，强调**简单、高效、实用**。

### 与 Java/Kotlin 对比

| 领域 | Java/Kotlin | Go | Go 的优势 |
|------|------------|-----|---------|
| **微服务/Web API** | Spring Boot | Gin, Echo, Chi | 启动快、内存少、部署简单（单一二进制） |
| **云原生基础设施** | 较少 | Docker, K8s, Consul, Prometheus | 并发模型天然适合、编译快 |
| **CLI 工具** | 需要 JVM | 原生支持 | 无依赖、跨平台编译 |
| **系统编程** | 不适合 | 适合 | 接近 C 的性能，但有 GC |

### Go 的"甜蜜区"

✅ **特别擅长**：
- 网络服务（Web API、gRPC、网关）
- 云原生工具（Docker、Kubernetes、Terraform 都是 Go 写的）
- 命令行工具（跨平台、无依赖）
- 高并发场景（百万级并发连接）

⏸️ **可以做，但不是首选**：
- 桌面 GUI（有库，但生态不如 Java/Kotlin）
- 移动开发（有 gomobile，但不如 Kotlin Multiplatform）
- 机器学习（有库，但不如 Python）

---

## 🎯 学习目标

- 理解 Go 的设计理念（简单、高效、并发）
- 掌握 Go 与 Java/Kotlin 的关键差异
- 能够编写地道的 Go 代码
- 独立完成一个 Go 项目（CLI 工具或 Web API）

---

## 📚 核心对比：Go vs Java/Kotlin

| 特性 | Java/Kotlin | Go |
|------|------------|-----|
| 类型系统 | 面向对象、泛型 | 结构体 + 接口（隐式实现） |
| 并发模型 | 线程 + 锁 | Goroutine + Channel |
| 错误处理 | 异常 (try-catch) | 返回值 (error) |
| 包管理 | Maven/Gradle | go.mod |
| 编译速度 | 慢 | 极快 |
| 内存管理 | JVM GC | 自带 GC，更轻量 |

---

## 🚀 快速开始

### 1. 安装 Go

```bash
# macOS
brew install go

# 验证安装
go version
```

### 2. Hello World

```bash
cd learn_go/examples
cat 01_hello.go
go run 01_hello.go
```

**💡 提示**：示例文件已编号，按顺序学习效果最佳！

### 3. 学习路线图

**阶段 1：基础语法（1-2天）**
- 变量、类型、函数
- 控制流（if、for、switch）
- 数组、切片、映射

**阶段 2：Go 特色（2-3天）**
- 结构体和方法
- 接口（隐式实现）
- 错误处理模式
- defer、panic、recover

**阶段 3：并发编程（2-3天）**
- Goroutine
- Channel
- select 语句
- 常见并发模式

**阶段 4：实战项目（2-3天）**
- **第一目标：CLI 工具**（推荐 Cobra）
- **第二目标：Web API**（推荐 Gin/Echo）

#### 💡 为什么先 CLI 后 Web API？

**CLI 工具的优势**（适合入门）：
- ✅ 专注语言本身（函数、结构体、错误处理）
- ✅ 不需要额外框架（标准库足够）
- ✅ 快速看到成果（几十行代码就能做有用的东西）
- ✅ Go 的天然优势（无依赖、跨平台编译）

**Web API 的复杂性**（需要一定基础）：
- 需要理解路由、中间件、请求处理
- 涉及并发处理（虽然 Go 简单，但对新手仍有挑战）
- 需要理解 HTTP 协议细节

**学习路径设计**：
```
CLI 工具（简单）
  ↓  掌握：函数、结构体、错误处理
Web API（中等）
  ↓  掌握：并发、路由、HTTP
微服务/分布式（复杂）
  ↓  掌握：分布式、可观测性
```

**实际对比**：

CLI 示例：
```go
// 文件搜索工具 - 50-100 行
// 学到：文件操作、正则、错误处理、命令行参数
func main() {
    pattern := os.Args[1]
    searchFiles(pattern)
}
```

Web API 示例：
```go
// RESTful API - 150-250 行
// 学到：路由、JSON、并发安全、中间件
func main() {
    r := gin.Default()
    r.GET("/todos", getTodos)
    r.Run(":8080")
}
```

---

## 📂 示例文件编号说明

所有示例文件采用编号方式组织，方便你直观地看到学习顺序：

### 编号对应关系

**阶段 1：基础语法（01-06）**
- `01_hello.go` - Hello World，最简单的 Go 程序
- `02_variables.go` - 变量和类型（类型推断、零值、常量）
- `03_functions.go` - 函数（多返回值、可变参数、函数作为值）
- `04_control_flow.go` - 控制流（if、for、switch）
- `05_slices.go` - 切片（动态数组、append、切片操作）
- `06_maps.go` - 映射（键值对、遍历、嵌套 map）

**阶段 2：Go 特色（07-09）**
- `07_structs.go` - 结构体和方法（值接收者、指针接收者）
- `08_interfaces.go` - 接口（隐式实现、多态）
- `09_errors.go` - 错误处理（error 值、自定义错误、panic/recover）

**阶段 3：并发编程（10-12）**
- `10_goroutines.go` - Goroutine（轻量级协程、WaitGroup）
- `11_channels.go` - Channel（生产者-消费者模式）
- `12_select.go` - select 语句（多路复用、超时控制）

### 如何使用

```bash
cd learn_go/examples

# 按顺序学习
ls                      # 查看所有示例（自动按编号排序）
go run 01_hello.go      # 从第一个开始
go run 02_variables.go
...

# 直接运行某个阶段
go run 07_structs.go    # 跳到阶段2
go run 10_goroutines.go # 跳到阶段3

# 运行所有示例（测试）
for file in *.go; do
    echo "Running $file..."
    go run "$file"
    echo "---"
done
```

**学习建议**：
- ✅ 按编号顺序学习，每个示例都建立在前面的基础上
- ✅ 运行代码，观察输出，理解概念
- ✅ 修改代码，做实验，加深理解
- ✅ 对比 Java/Kotlin，理解设计差异

---

## 📋 核心知识检查清单

详见 [CORE_CHECKLIST.md](CORE_CHECKLIST.md)

---

## 🔗 推荐资源

- **官方 Tour**: https://go.dev/tour/
- **Go by Example**: https://gobyexample.com/
- **Effective Go**: https://go.dev/doc/effective_go

---

## 📂 目录结构

```
learn_go/
├── README.md              # 本文件
├── QUICK_START.md         # 30分钟快速上手
├── CORE_CHECKLIST.md      # 核心知识检查清单
├── CLAUDE.md              # Go 学习助手规则
├── examples/              # 示例代码
│   ├── hello.go
│   ├── structs.go
│   ├── interfaces.go
│   ├── goroutines.go
│   └── channels.go
└── exercises/             # 练习题目
    └── ...
```

---

## 🎯 学习完成标准

### ✅ 知识维度
- 理解 Go 的并发模型（goroutine、channel）
- 掌握接口的隐式实现
- 熟悉 Go 的错误处理模式
- 了解 defer、panic、recover

### ✅ 实践维度
- 完成至少 1 个 CLI 工具或 Web API
- 能够从零搭建 Go 项目（go mod init）
- 会使用 go fmt、go vet、go test

### ✅ 能力维度
- 能够阅读开源 Go 项目代码
- 知道何时使用 goroutine 和 channel
- 能够查阅官方文档解决问题

---

开始学习：查看 [QUICK_START.md](QUICK_START.md)
