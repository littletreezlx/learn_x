// Swift 基础示例 6: 控制流

// ========================================
// 1. if-else 条件判断
// ========================================

print("=== if-else ===")

let temperature = 25

if temperature > 30 {
    print("It's hot!")
} else if temperature > 20 {
    print("It's warm")
} else if temperature > 10 {
    print("It's cool")
} else {
    print("It's cold!")
}

// 单行 if (不推荐在生产代码中使用)
let age = 18
if age >= 18 { print("Adult") }

// 组合条件
let isWeekend = true
let isSunny = true

if isWeekend && isSunny {
    print("Perfect day for a picnic!")
}

if isWeekend || isSunny {
    print("Good day to go outside")
}

// ========================================
// 2. switch 语句
// ========================================

print("\n=== switch ===")

let fruit = "apple"

switch fruit {
case "apple":
    print("Red fruit")
case "banana":
    print("Yellow fruit")
case "orange":
    print("Orange fruit")
default:
    print("Unknown fruit")
}

// switch 必须详尽 (或有 default)
let number = 5

switch number {
case 0:
    print("Zero")
case 1...5:  // 范围匹配
    print("Small number (1-5)")
case 6...10:
    print("Medium number (6-10)")
default:
    print("Large number")
}

// 多个值匹配
let character = "a"

switch character {
case "a", "e", "i", "o", "u":  // 多个值
    print("Vowel")
default:
    print("Consonant")
}

// 元组匹配
let point = (x: 2, y: 3)

switch point {
case (0, 0):
    print("Origin")
case (_, 0):  // _ 匹配任意值
    print("On x-axis")
case (0, _):
    print("On y-axis")
case (-2...2, -2...2):
    print("In the box")
default:
    print("Outside the box")
}

// 值绑定
switch point {
case (let x, 0):
    print("On x-axis at x = \(x)")
case (0, let y):
    print("On y-axis at y = \(y)")
case let (x, y):
    print("At (\(x), \(y))")
}

// where 条件
switch point {
case let (x, y) where x == y:
    print("On the diagonal")
case let (x, y) where x == -y:
    print("On the anti-diagonal")
case let (x, y):
    print("Just a point at (\(x), \(y))")
}

// ========================================
// 3. for-in 循环
// ========================================

print("\n=== for-in ===")

// 遍历范围
for i in 1...5 {  // 闭区间: 1, 2, 3, 4, 5
    print("Count: \(i)")
}

print()

for i in 1..<5 {  // 半开区间: 1, 2, 3, 4
    print("Half-open: \(i)")
}

print()

// 倒序遍历
for i in (1...5).reversed() {
    print("Countdown: \(i)")
}

print()

// 步长遍历
for i in stride(from: 0, to: 10, by: 2) {  // 0, 2, 4, 6, 8
    print("Even: \(i)")
}

print()

// 遍历数组
let fruits = ["Apple", "Banana", "Orange"]

for fruit in fruits {
    print("Fruit: \(fruit)")
}

print()

// 带索引遍历
for (index, fruit) in fruits.enumerated() {
    print("\(index + 1). \(fruit)")
}

print()

// 遍历字典
let scores = ["Alice": 95, "Bob": 87, "Charlie": 92]

for (name, score) in scores {
    print("\(name): \(score)")
}

print()

// 忽略值 (_)
for _ in 1...3 {
    print("Repeat")
}

// ========================================
// 4. while 循环
// ========================================

print("\n=== while ===")

var countdown = 5

while countdown > 0 {
    print("Countdown: \(countdown)")
    countdown -= 1
}

print("Liftoff!")

// repeat-while (do-while)
var counter = 0

repeat {
    print("Counter: \(counter)")
    counter += 1
} while counter < 3

// ========================================
// 5. 循环控制: break 和 continue
// ========================================

print("\n=== break 和 continue ===")

// continue: 跳过当前迭代
print("Skip even numbers:")
for i in 1...10 {
    if i % 2 == 0 {
        continue  // 跳过偶数
    }
    print(i)
}

print()

// break: 终止循环
print("Find first number > 50:")
for i in 1...100 {
    if i > 50 {
        print("Found: \(i)")
        break
    }
}

print()

// 嵌套循环中的 break
print("Multiplication table (stop at 5x5):")
outerLoop: for i in 1...10 {
    for j in 1...10 {
        if i == 5 && j == 5 {
            break outerLoop  // 跳出外层循环
        }
        print("\(i) x \(j) = \(i * j)")
    }
}

// ========================================
// 6. guard 语句
// ========================================

print("\n=== guard ===")

func greet(name: String?) {
    // guard: 提前返回，条件为 false 时执行
    guard let name = name else {
        print("No name provided")
        return
    }

    // name 在这里已解包，可以直接使用
    print("Hello, \(name)!")
}

greet(name: "Alice")
greet(name: nil)

// guard 多个条件
func processUser(name: String?, age: Int?, email: String?) {
    guard let name = name,
          let age = age,
          let email = email,
          age >= 18 else {
        print("Invalid user data")
        return
    }

    print("Processing user: \(name), \(age), \(email)")
}

processUser(name: "Bob", age: 25, email: "bob@example.com")
processUser(name: "Charlie", age: 15, email: "charlie@example.com")

// ========================================
// 7. defer 语句
// ========================================

print("\n=== defer ===")

func processFile() {
    print("Opening file")

    defer {
        print("Closing file")  // 函数退出时执行
    }

    print("Processing file")
    print("Writing data")

    // defer 会在这里执行，即使提前 return
}

processFile()

print()

// 多个 defer (后进先出)
func multipleDeferExample() {
    defer { print("Defer 1") }
    defer { print("Defer 2") }
    defer { print("Defer 3") }

    print("Function body")
}

multipleDeferExample()

// ========================================
// 8. 实用示例 - 验证
// ========================================

print("\n=== 实用示例: 验证 ===")

// 示例1: 用户注册验证
func validateRegistration(username: String?, password: String?, email: String?) -> Bool {
    guard let username = username, !username.isEmpty else {
        print("Error: Username is required")
        return false
    }

    guard let password = password, password.count >= 6 else {
        print("Error: Password must be at least 6 characters")
        return false
    }

    guard let email = email, email.contains("@") else {
        print("Error: Invalid email")
        return false
    }

    print("Registration successful for \(username)")
    return true
}

_ = validateRegistration(username: "alice", password: "123456", email: "alice@example.com")
_ = validateRegistration(username: "bob", password: "123", email: "bob@example.com")

print()

// 示例2: 评分系统
func getGrade(score: Int) -> String {
    switch score {
    case 90...100:
        return "A"
    case 80..<90:
        return "B"
    case 70..<80:
        return "C"
    case 60..<70:
        return "D"
    case 0..<60:
        return "F"
    default:
        return "Invalid score"
    }
}

print("Score 95: Grade \(getGrade(score: 95))")
print("Score 75: Grade \(getGrade(score: 75))")
print("Score 55: Grade \(getGrade(score: 55))")

print()

// 示例3: 查找数组中的元素
func findFirst<T: Equatable>(_ array: [T], matching condition: (T) -> Bool) -> T? {
    for element in array {
        if condition(element) {
            return element
        }
    }
    return nil
}

let numbers = [1, 3, 5, 7, 9, 12, 15]

if let firstEven = findFirst(numbers, matching: { $0 % 2 == 0 }) {
    print("First even number: \(firstEven)")
}

if let firstGreaterThan10 = findFirst(numbers, matching: { $0 > 10 }) {
    print("First number > 10: \(firstGreaterThan10)")
}

// ========================================
// 9. 实用示例 - 数据处理
// ========================================

print("\n=== 实用示例: 数据处理 ===")

// 示例1: 统计
let testScores = [85, 92, 78, 95, 88, 72, 90]

var sum = 0
var count = 0
var highest = testScores[0]
var lowest = testScores[0]

for score in testScores {
    sum += score
    count += 1

    if score > highest {
        highest = score
    }

    if score < lowest {
        lowest = score
    }
}

let average = Double(sum) / Double(count)
print("Average: \(average)")
print("Highest: \(highest)")
print("Lowest: \(lowest)")

print()

// 示例2: 过滤和分类
let allScores = [45, 88, 92, 55, 78, 95, 62, 85]

var passing: [Int] = []
var failing: [Int] = []

for score in allScores {
    if score >= 60 {
        passing.append(score)
    } else {
        failing.append(score)
    }
}

print("Passing: \(passing)")
print("Failing: \(failing)")

print()

// 示例3: 嵌套循环 - 乘法表
print("Multiplication Table:")
for i in 1...5 {
    var row = ""
    for j in 1...5 {
        row += String(format: "%3d ", i * j)
    }
    print(row)
}

// ========================================
// 10. 实用示例 - 字符串处理
// ========================================

print("\n=== 实用示例: 字符串处理 ===")

// 示例1: 统计字符
let text = "Hello, World!"
var vowelCount = 0
var consonantCount = 0

for char in text.lowercased() {
    switch char {
    case "a", "e", "i", "o", "u":
        vowelCount += 1
    case "a"..."z":
        consonantCount += 1
    default:
        break
    }
}

print("Vowels: \(vowelCount), Consonants: \(consonantCount)")

print()

// 示例2: 查找和替换
var message = "Swift is great! Swift is powerful!"

if message.contains("Swift") {
    message = message.replacingOccurrences(of: "Swift", with: "iOS")
    print(message)
}

// ========================================
// 11. 控制流最佳实践
// ========================================

print("\n=== 最佳实践 ===")

// ✅ 使用 guard 提前返回
func calculateDiscount(price: Double?, discountRate: Double?) -> Double? {
    guard let price = price,
          let discountRate = discountRate,
          price > 0,
          discountRate >= 0,
          discountRate <= 1 else {
        return nil
    }

    return price * (1 - discountRate)
}

if let finalPrice = calculateDiscount(price: 100, discountRate: 0.2) {
    print("Final price: \(finalPrice)")
}

// ✅ 使用 switch 而非多个 if-else
enum Status {
    case pending
    case processing
    case completed
    case failed
}

func handleStatus(_ status: Status) {
    switch status {
    case .pending:
        print("Waiting...")
    case .processing:
        print("Processing...")
    case .completed:
        print("Done!")
    case .failed:
        print("Error occurred")
    }
}

handleStatus(.completed)

// ✅ 使用高阶函数替代循环 (更简洁)
let nums = [1, 2, 3, 4, 5]

// 传统方式
var doubled: [Int] = []
for num in nums {
    doubled.append(num * 2)
}
print("Doubled (loop): \(doubled)")

// 更好的方式
let doubledBetter = nums.map { $0 * 2 }
print("Doubled (map): \(doubledBetter)")

print("\n=== 总结 ===")
print("""
1. if-else: 简单条件判断
2. switch: 多分支判断，必须详尽
3. for-in: 遍历序列
4. while/repeat-while: 条件循环
5. guard: 提前返回，代码更清晰
6. defer: 保证清理代码执行
7. break/continue: 控制循环流程
8. 优先使用 guard 处理错误情况
9. 复杂条件用 switch，简单条件用 if
10. 能用高阶函数就不用循环
""")
