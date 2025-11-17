# Go 30分钟快速上手

> **面向 Java/Kotlin 开发者** - 通过对比快速理解 Go 核心概念

---

## 1. 基础语法（10分钟）

### 变量声明

```go
// Go - 类型后置
var name string = "Alice"
age := 25  // 类型推断（最常用）

// Java
String name = "Alice";
int age = 25;
```

### 函数

```go
// Go - 多返回值
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    // 处理错误
}

// Java - 异常
public int divide(int a, int b) throws Exception {
    if (b == 0) {
        throw new Exception("division by zero");
    }
    return a / b;
}
```

### 结构体 vs 类

```go
// Go - 结构体 + 方法
type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return "Hello, " + p.Name
}

// 使用
p := Person{Name: "Alice", Age: 25}
fmt.Println(p.Greet())

// Kotlin - 数据类
data class Person(val name: String, val age: Int) {
    fun greet() = "Hello, $name"
}
```

---

## 2. Go 特色（10分钟）

### 接口（隐式实现）

```go
// Go - 只要实现了方法就满足接口
type Writer interface {
    Write([]byte) (int, error)
}

type FileWriter struct{}

// 自动实现 Writer 接口
func (f FileWriter) Write(data []byte) (int, error) {
    // ...
    return len(data), nil
}

// Java - 显式声明
class FileWriter implements Writer {
    @Override
    public void write(byte[] data) { }
}
```

### 错误处理

```go
// Go - 错误是值
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // 确保关闭

// Java - 异常
try (FileInputStream file = new FileInputStream("file.txt")) {
    // ...
} catch (IOException e) {
    e.printStackTrace();
}
```

### Defer

```go
// Go - defer 在函数返回前执行（逆序）
func example() {
    defer fmt.Println("3")
    defer fmt.Println("2")
    fmt.Println("1")
}
// 输出: 1, 2, 3

// Java - 需要 finally 或 try-with-resources
```

---

## 3. 并发（10分钟）

### Goroutine vs Thread

```go
// Go - 轻量级协程
go func() {
    fmt.Println("Running in goroutine")
}()

// Java - 线程
new Thread(() -> {
    System.out.println("Running in thread");
}).start();
```

### Channel - Go 的杀手锏

```go
// 创建 channel
ch := make(chan int)

// 发送者
go func() {
    ch <- 42  // 发送数据
}()

// 接收者
value := <-ch  // 接收数据
fmt.Println(value)

// Java - 需要 BlockingQueue
BlockingQueue<Integer> queue = new LinkedBlockingQueue<>();
new Thread(() -> queue.put(42)).start();
int value = queue.take();
```

### Select - 多路复用

```go
select {
case msg := <-ch1:
    fmt.Println("Received from ch1:", msg)
case msg := <-ch2:
    fmt.Println("Received from ch2:", msg)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout")
}

// Java - 没有直接等价物，需要手动实现
```

---

## 4. 常用模式

### 错误处理模式

```go
// 包装错误
if err != nil {
    return fmt.Errorf("failed to open file: %w", err)
}

// 自定义错误
type ValidationError struct {
    Field string
    Msg   string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Msg)
}
```

### 资源管理

```go
// defer 确保清理
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()  // 无论如何都会执行

    // 处理文件...
    return nil
}
```

### 并发模式

```go
// Worker Pool
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

jobs := make(chan int, 100)
results := make(chan int, 100)

// 启动 3 个 worker
for w := 1; w <= 3; w++ {
    go worker(w, jobs, results)
}

// 发送任务
for j := 1; j <= 5; j++ {
    jobs <- j
}
close(jobs)

// 收集结果
for a := 1; a <= 5; a++ {
    <-results
}
```

---

## 5. 快速项目搭建

```bash
# 创建项目
mkdir myapp
cd myapp
go mod init github.com/yourusername/myapp

# 添加依赖
go get github.com/gin-gonic/gin

# 创建 main.go
cat > main.go << 'EOF'
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    r.Run(":8080")
}
EOF

# 运行
go run main.go

# 编译
go build
```

---

## 🎯 30分钟后你应该掌握

- ✅ Go 的基础语法（变量、函数、结构体）
- ✅ 错误处理方式（error vs exception）
- ✅ 接口的隐式实现
- ✅ Goroutine 和 Channel 的基本用法
- ✅ 能够运行和编译简单的 Go 程序

---

## 🚀 下一步

1. 查看 [examples/](examples/) 目录的示例代码
2. 完成 [CORE_CHECKLIST.md](CORE_CHECKLIST.md) 的练习
3. 选择一个实战项目：
   - CLI 工具（文件处理、数据转换）
   - Web API（RESTful 服务）
   - 并发任务处理器

---

**记住**：Go 的哲学是简单和实用。不要用 Java 思维写 Go 代码！
