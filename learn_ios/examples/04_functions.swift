// Swift 基础示例 4: 函数和闭包

// ========================================
// 1. 基础函数
// ========================================

print("=== 基础函数 ===")

// 无参数无返回值
func sayHello() {
    print("Hello!")
}

sayHello()

// 有参数无返回值
func greet(name: String) {
    print("Hello, \(name)!")
}

greet(name: "Alice")

// 有参数有返回值
func add(a: Int, b: Int) -> Int {
    return a + b
}

let sum = add(a: 5, b: 3)
print("Sum: \(sum)")

// 简化写法：单行表达式可以省略 return
func multiply(a: Int, b: Int) -> Int {
    a * b  // 自动返回
}

print("Multiply: \(multiply(a: 4, b: 5))")

// ========================================
// 2. 参数标签
// ========================================

print("\n=== 参数标签 ===")

// 外部参数名 和 内部参数名
func greetPerson(firstName first: String, lastName last: String) {
    print("Hello, \(first) \(last)!")
}

greetPerson(firstName: "John", lastName: "Doe")

// 省略外部参数名 (使用 _)
func printMessage(_ message: String) {
    print(message)
}

printMessage("No parameter label!")

// 默认情况下，参数名即是外部参数名
func calculateArea(width: Double, height: Double) -> Double {
    width * height
}

print("Area: \(calculateArea(width: 10, height: 5))")

// ========================================
// 3. 默认参数值
// ========================================

print("\n=== 默认参数值 ===")

func greetWithTime(name: String, time: String = "day") {
    print("Good \(time), \(name)!")
}

greetWithTime(name: "Alice")  // 使用默认值 "day"
greetWithTime(name: "Bob", time: "morning")  // 提供自定义值

// 多个默认参数
func createUser(name: String, age: Int = 18, city: String = "Beijing") {
    print("User: \(name), Age: \(age), City: \(city)")
}

createUser(name: "Alice")
createUser(name: "Bob", age: 25)
createUser(name: "Charlie", age: 30, city: "Shanghai")

// ========================================
// 4. 可变参数
// ========================================

print("\n=== 可变参数 ===")

// 接受任意数量的参数
func average(_ numbers: Double...) -> Double {
    guard !numbers.isEmpty else { return 0 }

    let total = numbers.reduce(0, +)
    return total / Double(numbers.count)
}

print("Average: \(average(1, 2, 3, 4, 5))")
print("Average: \(average(10, 20, 30))")

// 打印多个值
func printAll(_ items: String...) {
    for item in items {
        print("- \(item)")
    }
}

printAll("Apple", "Banana", "Orange")

// ========================================
// 5. inout 参数 (引用传递)
// ========================================

print("\n=== inout 参数 ===")

// 修改外部变量的值
func swap(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

var x = 10
var y = 20
print("Before swap: x=\(x), y=\(y)")
swap(&x, &y)
print("After swap: x=\(x), y=\(y)")

// 实用示例：增加值
func increment(_ value: inout Int, by amount: Int = 1) {
    value += amount
}

var counter = 5
increment(&counter)  // 使用默认值 1
print("Counter: \(counter)")
increment(&counter, by: 10)
print("Counter: \(counter)")

// ========================================
// 6. 返回多个值 (元组)
// ========================================

print("\n=== 返回多个值 ===")

func getMinMax(numbers: [Int]) -> (min: Int, max: Int)? {
    guard !numbers.isEmpty else { return nil }

    var currentMin = numbers[0]
    var currentMax = numbers[0]

    for number in numbers[1...] {
        if number < currentMin {
            currentMin = number
        } else if number > currentMax {
            currentMax = number
        }
    }

    return (currentMin, currentMax)
}

if let result = getMinMax(numbers: [3, 7, 1, 9, 4]) {
    print("Min: \(result.min), Max: \(result.max)")
}

// 解构元组
if let (min, max) = getMinMax(numbers: [5, 2, 8, 1, 9]) {
    print("Min: \(min), Max: \(max)")
}

// ========================================
// 7. 闭包基础
// ========================================

print("\n=== 闭包基础 ===")

// 完整闭包语法
let addClosure: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
    return a + b
}

print("Add closure: \(addClosure(3, 4))")

// 类型推断：省略参数和返回值类型
let multiplyClosure: (Int, Int) -> Int = { a, b in
    return a * b
}

print("Multiply closure: \(multiplyClosure(3, 4))")

// 单行表达式：省略 return
let divideClosure: (Double, Double) -> Double = { a, b in
    a / b
}

print("Divide closure: \(divideClosure(10, 2))")

// 简写参数名：$0, $1, $2...
let subtractClosure: (Int, Int) -> Int = { $0 - $1 }

print("Subtract closure: \(subtractClosure(10, 3))")

// ========================================
// 8. 高阶函数 (接受闭包的函数)
// ========================================

print("\n=== 高阶函数 ===")

// map: 转换数组元素
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
print("Doubled: \(doubled)")

let strings = numbers.map { "Number \($0)" }
print("Strings: \(strings)")

// filter: 过滤数组元素
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print("Even numbers: \(evenNumbers)")

// reduce: 归约数组
let total = numbers.reduce(0) { $0 + $1 }
print("Total: \(total)")

// 简写
let product = numbers.reduce(1, *)
print("Product: \(product)")

// sorted: 排序
let unsorted = [3, 7, 1, 9, 4]
let sorted = unsorted.sorted { $0 < $1 }
print("Sorted: \(sorted)")

// 更简洁
let sortedDescending = unsorted.sorted { $0 > $1 }
print("Sorted descending: \(sortedDescending)")

// ========================================
// 9. 函数作为参数
// ========================================

print("\n=== 函数作为参数 ===")

// 定义操作类型
typealias Operation = (Int, Int) -> Int

// 接受函数作为参数
func calculate(a: Int, b: Int, operation: Operation) -> Int {
    return operation(a, b)
}

// 传入不同的操作
let addResult = calculate(a: 5, b: 3, operation: { $0 + $1 })
let multiplyResult = calculate(a: 5, b: 3, operation: { $0 * $1 })

print("Add: \(addResult)")
print("Multiply: \(multiplyResult)")

// 尾随闭包语法
let divideResult = calculate(a: 10, b: 2) { $0 / $1 }
print("Divide: \(divideResult)")

// ========================================
// 10. 捕获值
// ========================================

print("\n=== 捕获值 ===")

func makeIncrementer(incrementAmount: Int) -> () -> Int {
    var total = 0

    let incrementer: () -> Int = {
        total += incrementAmount
        return total
    }

    return incrementer
}

let incrementByTwo = makeIncrementer(incrementAmount: 2)
print(incrementByTwo())  // 2
print(incrementByTwo())  // 4
print(incrementByTwo())  // 6

let incrementByTen = makeIncrementer(incrementAmount: 10)
print(incrementByTen())  // 10
print(incrementByTen())  // 20

// ========================================
// 11. @escaping 闭包
// ========================================

print("\n=== @escaping 闭包 ===")

// 存储闭包以便后续调用
var completionHandlers: [() -> Void] = []

func addCompletionHandler(handler: @escaping () -> Void) {
    completionHandlers.append(handler)
}

addCompletionHandler {
    print("Completion handler 1")
}

addCompletionHandler {
    print("Completion handler 2")
}

// 执行所有闭包
for handler in completionHandlers {
    handler()
}

// 模拟异步操作
func fetchData(completion: @escaping (String) -> Void) {
    // 模拟延迟
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
        completion("Data fetched successfully")
    }
}

fetchData { result in
    print("Async result: \(result)")
}

// ========================================
// 12. 实用示例
// ========================================

print("\n=== 实用示例 ===")

// 示例1: 字符串处理
func formatName(_ name: String) -> String {
    name.trimmingCharacters(in: .whitespaces).capitalized
}

print("Formatted: \(formatName("  alice smith  "))")

// 示例2: 数组处理
func processNumbers(_ numbers: [Int], operation: (Int) -> Int) -> [Int] {
    numbers.map(operation)
}

let processedNumbers = processNumbers([1, 2, 3, 4, 5]) { $0 * $0 }
print("Squared: \(processedNumbers)")

// 示例3: 链式调用
let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .filter { $0 % 2 == 0 }      // 偶数
    .map { $0 * $0 }              // 平方
    .reduce(0, +)                 // 求和

print("Result: \(result)")  // 2² + 4² + 6² + 8² + 10² = 220

// 示例4: 自定义排序
struct Person {
    let name: String
    let age: Int
}

let people = [
    Person(name: "Alice", age: 30),
    Person(name: "Bob", age: 25),
    Person(name: "Charlie", age: 35)
]

let sortedByAge = people.sorted { $0.age < $1.age }
for person in sortedByAge {
    print("\(person.name): \(person.age)")
}

// 示例5: 条件检查
func isValid(email: String) -> Bool {
    email.contains("@") && email.contains(".")
}

let emails = ["test@example.com", "invalid", "user@mail.com"]
let validEmails = emails.filter(isValid)
print("Valid emails: \(validEmails)")

// ========================================
// 13. 最佳实践
// ========================================

print("\n=== 最佳实践 ===")

// ✅ 使用有意义的函数名
func calculateTotalPrice(items: [Double], taxRate: Double) -> Double {
    let subtotal = items.reduce(0, +)
    return subtotal * (1 + taxRate)
}

// ✅ 使用参数标签提高可读性
func sendEmail(to recipient: String, subject: String, body: String) {
    print("Sending email to \(recipient)")
    print("Subject: \(subject)")
    print("Body: \(body)")
}

sendEmail(to: "user@example.com", subject: "Hello", body: "Welcome!")

// ✅ 优先使用简洁的闭包语法
let names = ["Alice", "Bob", "Charlie"]
let uppercased = names.map { $0.uppercased() }
print("Uppercased: \(uppercased)")

// ✅ 使用类型别名简化复杂类型
typealias CompletionHandler = (Result<String, Error>) -> Void

func performOperation(completion: CompletionHandler) {
    // 模拟操作
    completion(.success("Operation completed"))
}

print("\n=== 总结 ===")
print("""
1. 函数是 Swift 的一等公民，可以作为参数和返回值
2. 使用参数标签提高函数调用的可读性
3. 闭包是匿名函数，语法可以极度简化
4. 高阶函数 (map, filter, reduce) 是函数式编程的核心
5. @escaping 用于标记需要在函数返回后执行的闭包
6. 链式调用可以让代码更简洁清晰
7. 使用有意义的命名，让代码自解释
""")
