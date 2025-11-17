# Go 核心知识检查清单

> **完成这些检查点，你就掌握了 Go 的核心**

---

## 阶段 1: 基础语法（1-2天）

### ✅ 变量和类型
- [ ] 能够使用 `:=` 声明变量
- [ ] 理解 Go 的基本类型（int, string, bool, float64）
- [ ] 知道零值（zero value）的概念
- [ ] 会使用数组、切片、映射

**验证练习**：
```go
// 创建一个切片，添加元素，遍历输出
```

---

### ✅ 函数
- [ ] 能够定义和调用函数
- [ ] 理解多返回值
- [ ] 会使用命名返回值
- [ ] 理解可变参数（variadic）

**验证练习**：
```go
// 写一个函数，接受任意数量的整数，返回它们的和与平均值
func sum(nums ...int) (total int, avg float64) {
    // 你的代码
}
```

---

### ✅ 控制流
- [ ] 掌握 if-else（注意没有括号）
- [ ] 掌握 for 循环（Go 只有 for，没有 while）
- [ ] 掌握 switch（自动 break）
- [ ] 理解 range 遍历

**验证练习**：
```go
// 使用 range 遍历切片和映射
```

---

## 阶段 2: Go 特色（2-3天）

### ✅ 结构体和方法
- [ ] 能够定义结构体
- [ ] 能够为结构体添加方法
- [ ] 理解值接收者 vs 指针接收者
- [ ] 会使用结构体嵌入（embedding）

**验证练习**：
```go
// 定义一个 Rectangle 结构体，添加计算面积和周长的方法
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    // 你的代码
}

func (r *Rectangle) Scale(factor float64) {
    // 你的代码（修改原结构体）
}
```

---

### ✅ 接口
- [ ] 理解接口的隐式实现
- [ ] 能够定义和使用接口
- [ ] 理解空接口 `interface{}`（现在推荐用 `any`）
- [ ] 会进行类型断言和类型判断

**验证练习**：
```go
// 定义一个 Shape 接口，让 Rectangle 和 Circle 都实现它
type Shape interface {
    Area() float64
}

func printArea(s Shape) {
    fmt.Println("Area:", s.Area())
}
```

---

### ✅ 错误处理
- [ ] 理解 error 是接口类型
- [ ] 会检查和处理错误
- [ ] 能够创建自定义错误
- [ ] 会使用 `fmt.Errorf` 包装错误

**验证练习**：
```go
// 写一个函数，读取文件，正确处理错误
func readFile(filename string) ([]byte, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return nil, fmt.Errorf("failed to read %s: %w", filename, err)
    }
    return data, nil
}
```

---

### ✅ Defer, Panic, Recover
- [ ] 理解 defer 的执行顺序（LIFO）
- [ ] 知道何时使用 defer（资源清理）
- [ ] 理解 panic 和 recover（类似异常）
- [ ] 知道 panic 的使用场景（程序错误，而非业务错误）

**验证练习**：
```go
// 使用 defer 确保文件关闭
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()  // 确保关闭

    // 处理文件...
    return nil
}
```

---

## 阶段 3: 并发编程（2-3天）

### ✅ Goroutine
- [ ] 能够启动 goroutine
- [ ] 理解 goroutine 的轻量级特性
- [ ] 知道如何等待 goroutine 完成（WaitGroup）
- [ ] 理解并发 vs 并行

**验证练习**：
```go
// 使用 WaitGroup 等待多个 goroutine 完成
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Println("Goroutine", id)
    }(i)
}

wg.Wait()
```

---

### ✅ Channel
- [ ] 能够创建和使用 channel
- [ ] 理解有缓冲 vs 无缓冲 channel
- [ ] 会关闭 channel 并检测关闭
- [ ] 理解 channel 的阻塞行为

**验证练习**：
```go
// 使用 channel 实现生产者-消费者模式
func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consumer(ch <-chan int) {
    for val := range ch {
        fmt.Println(val)
    }
}

ch := make(chan int)
go producer(ch)
consumer(ch)
```

---

### ✅ Select
- [ ] 能够使用 select 处理多个 channel
- [ ] 理解 select 的非确定性选择
- [ ] 会使用 default 实现非阻塞操作
- [ ] 会使用 time.After 实现超时

**验证练习**：
```go
// 使用 select 实现超时控制
select {
case result := <-ch:
    fmt.Println("Received:", result)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout")
}
```

---

### ✅ 常见并发模式
- [ ] 会实现 Worker Pool
- [ ] 会使用 Context 控制 goroutine 生命周期
- [ ] 理解何时使用 Mutex vs Channel
- [ ] 知道如何避免 goroutine 泄漏

**验证练习**：
```go
// 实现一个简单的 Worker Pool（3个worker，5个任务）
```

---

## 阶段 4: 实战项目（2-3天）

### ✅ CLI 工具（推荐 Cobra）
- [ ] 能够使用 flag 或 Cobra 解析命令行参数
- [ ] 能够读写文件
- [ ] 能够处理 JSON 数据
- [ ] 能够编译成可执行文件

**项目示例**：
- 文件搜索工具
- 日志分析器
- 数据格式转换器

---

### ✅ Web API（推荐 Gin/Echo）
- [ ] 能够创建 HTTP 服务器
- [ ] 能够定义路由和处理器
- [ ] 能够解析 JSON 请求和响应
- [ ] 能够处理中间件（如日志、错误处理）

**项目示例**：
- RESTful API（CRUD）
- 文件上传服务
- 简单的认证服务

---

## 🎯 完成标准

### ✅ 知识维度
- [ ] 理解 goroutine 和 channel 的并发模型
- [ ] 掌握接口的隐式实现
- [ ] 熟悉 Go 的错误处理模式
- [ ] 了解 defer、panic、recover 的使用

### ✅ 实践维度
- [ ] 完成至少 1 个 CLI 工具或 Web API
- [ ] 能够从零搭建 Go 项目（go mod init）
- [ ] 会使用 go fmt、go vet、go test

### ✅ 能力维度
- [ ] 能够阅读开源 Go 项目代码
- [ ] 知道何时使用 goroutine 和 channel
- [ ] 能够查阅官方文档解决问题

---

## 📚 学习资源

- **官方 Tour**: https://go.dev/tour/
- **Go by Example**: https://gobyexample.com/
- **Effective Go**: https://go.dev/doc/effective_go

---

**记住**：完成这些检查点后，你就可以开始写实际的 Go 项目了！
