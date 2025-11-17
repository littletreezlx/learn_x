// Swift 基础示例 3: Optional (可选类型)

// ========================================
// 1. Optional 的概念
// ========================================

print("=== Optional 基础 ===")

// Optional: 可能有值，也可能是 nil
var name: String? = "Alice"
var age: Int? = nil

print("Name: \(String(describing: name))")
print("Age: \(String(describing: age))")

// ❌ 错误示例: 不能直接使用 Optional
// let greeting = "Hello, " + name  // 编译错误

// ========================================
// 2. 解包方式 1: if let (可选绑定)
// ========================================

print("\n=== if let 解包 ===")

let optionalName: String? = "Bob"

// 安全解包
if let unwrappedName = optionalName {
    print("Name is: \(unwrappedName)")
} else {
    print("Name is nil")
}

// 同时解包多个 Optional
let firstName: String? = "John"
let lastName: String? = "Doe"

if let first = firstName, let last = lastName {
    print("Full name: \(first) \(last)")
}

// ========================================
// 3. 解包方式 2: guard let (提前返回)
// ========================================

print("\n=== guard let 解包 ===")

func greet(_ name: String?) {
    // guard let: 如果是 nil，提前返回
    guard let unwrappedName = name else {
        print("Name is nil, cannot greet")
        return
    }

    // unwrappedName 在 guard 后的整个作用域内可用
    print("Hello, \(unwrappedName)!")
}

greet("Alice")
greet(nil)

// ========================================
// 4. 解包方式 3: nil coalescing (??)
// ========================================

print("\n=== nil coalescing (??) ===")

let optionalAge: Int? = nil
let defaultAge = 18

// 如果 optionalAge 是 nil，使用 defaultAge
let finalAge = optionalAge ?? defaultAge
print("Age: \(finalAge)")  // 18

// 链式使用
let age1: Int? = nil
let age2: Int? = nil
let age3: Int? = 25
let result = age1 ?? age2 ?? age3 ?? 0
print("Result: \(result)")  // 25

// ========================================
// 5. 解包方式 4: 强制解包 (!)
// ========================================

print("\n=== 强制解包 (!) ===")

let definitelyHasValue: String? = "Hello"

// ⚠️ 危险: 如果是 nil 会崩溃!
let forced = definitelyHasValue!
print("Forced: \(forced)")

// ❌ 这会崩溃:
// let nilValue: String? = nil
// let crash = nilValue!  // 运行时崩溃

// ✅ 只在 100% 确定有值时使用强制解包
// 例如: 从 storyboard 加载的 IBOutlet

// ========================================
// 6. Optional Chaining (?.)
// ========================================

print("\n=== Optional Chaining (?.) ===")

struct Person {
    var name: String
    var address: Address?
}

struct Address {
    var street: String
    var city: String
}

let person1 = Person(name: "Alice", address: Address(street: "Main St", city: "Beijing"))
let person2 = Person(name: "Bob", address: nil)

// Optional Chaining: 如果中间任何一步是 nil，整个表达式返回 nil
let city1 = person1.address?.city  // "Beijing"
let city2 = person2.address?.city  // nil

print("City 1: \(city1 ?? "Unknown")")
print("City 2: \(city2 ?? "Unknown")")

// 链式调用
let uppercasedCity = person1.address?.city.uppercased()
print("Uppercased city: \(uppercasedCity ?? "Unknown")")

// ========================================
// 7. 隐式解包 Optional (!)
// ========================================

print("\n=== 隐式解包 Optional ===")

// 声明时用 !，使用时自动解包
var implicitlyUnwrapped: String! = "Hello"
let value = implicitlyUnwrapped  // 自动解包
print("Value: \(value)")

// ⚠️ 注意: 如果是 nil，访问时会崩溃
// 主要用于 UIKit 的 IBOutlet

// ========================================
// 8. Optional 与函数
// ========================================

print("\n=== Optional 与函数 ===")

// 返回 Optional
func findUser(byID id: Int) -> String? {
    let users = [1: "Alice", 2: "Bob", 3: "Charlie"]
    return users[id]
}

if let user = findUser(byID: 2) {
    print("Found user: \(user)")
} else {
    print("User not found")
}

// Optional 参数
func greetOptional(name: String? = nil) {
    let finalName = name ?? "Guest"
    print("Hello, \(finalName)")
}

greetOptional(name: "Alice")
greetOptional()

// ========================================
// 9. Optional 与集合
// ========================================

print("\n=== Optional 与集合 ===")

let numbers: [Int?] = [1, 2, nil, 4, nil, 6]

// 过滤掉 nil
let validNumbers = numbers.compactMap { $0 }
print("Valid numbers: \(validNumbers)")  // [1, 2, 4, 6]

// 字典访问返回 Optional
let dict = ["a": 1, "b": 2]
let valueA = dict["a"]  // Int?
let valueC = dict["c"]  // nil

print("Value A: \(valueA ?? 0)")
print("Value C: \(valueC ?? 0)")

// ========================================
// 10. Optional 最佳实践
// ========================================

print("\n=== Optional 最佳实践 ===")

// ✅ 推荐: 使用 if let 或 guard let
func processUser(_ name: String?) {
    guard let name = name else {
        print("Invalid name")
        return
    }
    print("Processing user: \(name)")
}

// ✅ 推荐: 使用 ?? 提供默认值
func displayAge(_ age: Int?) {
    let ageToDisplay = age ?? 0
    print("Age: \(ageToDisplay)")
}

// ✅ 推荐: 使用 Optional Chaining
struct Order {
    var customer: Customer?
}

struct Customer {
    var email: String
}

func sendReceipt(for order: Order) {
    if let email = order.customer?.email {
        print("Sending receipt to \(email)")
    }
}

// ❌ 避免: 过多使用强制解包
// let value = optionalValue!  // 危险!

// ❌ 避免: 嵌套太深的 Optional
// if let a = optA {
//     if let b = optB {
//         if let c = optC {
//             ...  // 难以阅读
//         }
//     }
// }

// ✅ 使用 guard 或多重绑定
func betterNesting() {
    let optA: String? = "A"
    let optB: String? = "B"
    let optC: String? = "C"

    guard let a = optA, let b = optB, let c = optC else {
        print("Some value is nil")
        return
    }

    print("All values: \(a), \(b), \(c)")
}

betterNesting()

// ========================================
// 11. 实用示例
// ========================================

print("\n=== 实用示例 ===")

// 示例1: 表单验证
func validateForm(email: String?, password: String?) -> Bool {
    guard let email = email, !email.isEmpty,
          let password = password, password.count >= 6 else {
        return false
    }
    return true
}

print("Valid form: \(validateForm(email: "test@example.com", password: "123456"))")
print("Invalid form: \(validateForm(email: nil, password: "123"))")

// 示例2: 安全转换
let stringNumber = "123"
if let number = Int(stringNumber) {
    print("Converted: \(number)")
}

// 示例3: 链式访问
struct AppConfig {
    var theme: Theme?
}

struct Theme {
    var primaryColor: String
}

let config = AppConfig(theme: Theme(primaryColor: "Blue"))
let color = config.theme?.primaryColor ?? "Default"
print("Theme color: \(color)")

print("\n=== 总结 ===")
print("""
1. Optional 用 ? 声明，表示可能有值或 nil
2. 解包方式:
   - if let: 安全解包，适合单次使用
   - guard let: 提前返回，适合函数参数校验
   - ??: 提供默认值
   - !: 强制解包 (危险，避免使用)
   - ?.: Optional Chaining
3. 优先使用 if let/guard let，避免强制解包
4. 使用 compactMap 过滤集合中的 nil
""")
