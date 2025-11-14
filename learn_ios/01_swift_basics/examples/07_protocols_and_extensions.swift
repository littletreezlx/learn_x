// Swift 基础示例 7: 协议和扩展

// ========================================
// 1. 协议基础
// ========================================

print("=== 协议基础 ===")

// 定义协议
protocol Describable {
    var description: String { get }  // 只读属性
    func describe()
}

// 遵循协议
struct Person: Describable {
    let name: String
    let age: Int

    var description: String {
        "\(name), \(age) years old"
    }

    func describe() {
        print(description)
    }
}

let person = Person(name: "Alice", age: 30)
person.describe()

// ========================================
// 2. 协议属性要求
// ========================================

print("\n=== 协议属性 ===")

protocol FullyNamed {
    var fullName: String { get }  // 只读
}

protocol Aged {
    var age: Int { get set }  // 可读写
}

struct Student: FullyNamed, Aged {
    var firstName: String
    var lastName: String
    var age: Int

    var fullName: String {
        "\(firstName) \(lastName)"
    }
}

var student = Student(firstName: "John", lastName: "Doe", age: 20)
print("Full name: \(student.fullName)")
student.age = 21
print("Age: \(student.age)")

// ========================================
// 3. 协议方法要求
// ========================================

print("\n=== 协议方法 ===")

protocol Toggleable {
    mutating func toggle()  // mutating 用于值类型
}

struct Switch: Toggleable {
    var isOn = false

    mutating func toggle() {
        isOn.toggle()
        print("Switch is \(isOn ? "ON" : "OFF")")
    }
}

var lightSwitch = Switch()
lightSwitch.toggle()
lightSwitch.toggle()

// ========================================
// 4. 协议初始化器
// ========================================

print("\n=== 协议初始化器 ===")

protocol Initializable {
    init(value: String)
}

struct Configuration: Initializable {
    let setting: String

    init(value: String) {
        self.setting = value
    }
}

let config = Configuration(value: "Production")
print("Config: \(config.setting)")

// ========================================
// 5. 协议作为类型
// ========================================

print("\n=== 协议作为类型 ===")

protocol Drawable {
    func draw()
}

struct Circle: Drawable {
    let radius: Double

    func draw() {
        print("Drawing a circle with radius \(radius)")
    }
}

struct Rectangle: Drawable {
    let width: Double
    let height: Double

    func draw() {
        print("Drawing a rectangle \(width)x\(height)")
    }
}

// 协议类型数组
let shapes: [Drawable] = [
    Circle(radius: 5),
    Rectangle(width: 10, height: 20),
    Circle(radius: 3)
]

for shape in shapes {
    shape.draw()
}

// ========================================
// 6. 协议继承
// ========================================

print("\n=== 协议继承 ===")

protocol Named {
    var name: String { get }
}

protocol Identified: Named {
    var id: Int { get }
}

struct User: Identified {
    let name: String
    let id: Int
}

let user = User(name: "Alice", id: 1001)
print("User: \(user.name), ID: \(user.id)")

// ========================================
// 7. 类专用协议
// ========================================

print("\n=== 类专用协议 ===")

// AnyObject 限制只有类可以遵循
protocol ClassOnlyProtocol: AnyObject {
    func doSomething()
}

class MyClass: ClassOnlyProtocol {
    func doSomething() {
        print("Class doing something")
    }
}

// Struct 无法遵循 ClassOnlyProtocol
// struct MyStruct: ClassOnlyProtocol { }  // 编译错误

// ========================================
// 8. 协议组合
// ========================================

print("\n=== 协议组合 ===")

protocol Printable {
    func printInfo()
}

protocol Comparable {
    func compare(to other: Self) -> Bool
}

struct Product: Printable, Comparable {
    let name: String
    let price: Double

    func printInfo() {
        print("\(name): $\(price)")
    }

    func compare(to other: Product) -> Bool {
        self.price < other.price
    }
}

let product1 = Product(name: "iPhone", price: 999)
let product2 = Product(name: "iPad", price: 799)

product1.printInfo()
print("iPhone cheaper than iPad: \(product1.compare(to: product2))")

// 函数参数使用协议组合
func processItem(_ item: Printable & Comparable) {
    // item 必须同时遵循两个协议
}

// ========================================
// 9. 扩展基础
// ========================================

print("\n=== 扩展基础 ===")

// 为已有类型添加功能
extension Int {
    func squared() -> Int {
        self * self
    }

    func cubed() -> Int {
        self * self * self
    }

    var isEven: Bool {
        self % 2 == 0
    }

    var isOdd: Bool {
        self % 2 != 0
    }
}

print("5 squared: \(5.squared())")
print("3 cubed: \(3.cubed())")
print("4 is even: \(4.isEven)")
print("7 is odd: \(7.isOdd)")

// ========================================
// 10. 扩展字符串
// ========================================

print("\n=== 扩展字符串 ===")

extension String {
    var firstLetter: Character? {
        first
    }

    var lastLetter: Character? {
        last
    }

    func removeWhitespace() -> String {
        replacingOccurrences(of: " ", with: "")
    }

    func isValidEmail() -> Bool {
        contains("@") && contains(".")
    }
}

let text = "Hello World"
print("First letter: \(text.firstLetter ?? " ")")
print("Last letter: \(text.lastLetter ?? " ")")
print("Remove whitespace: \(text.removeWhitespace())")

let email = "user@example.com"
print("Is valid email: \(email.isValidEmail())")

// ========================================
// 11. 扩展数组
// ========================================

print("\n=== 扩展数组 ===")

extension Array where Element: Numeric {
    func sum() -> Element {
        reduce(0, +)
    }

    func average() -> Double {
        guard !isEmpty else { return 0 }
        let total = reduce(0, +)
        return Double("\(total)")! / Double(count)
    }
}

let numbers = [1, 2, 3, 4, 5]
print("Sum: \(numbers.sum())")
print("Average: \(numbers.average())")

// ========================================
// 12. 通过扩展遵循协议
// ========================================

print("\n=== 扩展遵循协议 ===")

protocol TextRepresentable {
    var textDescription: String { get }
}

struct Point {
    var x: Double
    var y: Double
}

// 在扩展中遵循协议
extension Point: TextRepresentable {
    var textDescription: String {
        "Point at (\(x), \(y))"
    }
}

let point = Point(x: 3, y: 4)
print(point.textDescription)

// ========================================
// 13. 条件扩展
// ========================================

print("\n=== 条件扩展 ===")

extension Array where Element == Int {
    func sumOfEvens() -> Int {
        filter { $0 % 2 == 0 }.reduce(0, +)
    }
}

let intArray = [1, 2, 3, 4, 5, 6]
print("Sum of evens: \(intArray.sumOfEvens())")

// ========================================
// 14. 实用示例 - 验证
// ========================================

print("\n=== 实用示例: 验证 ===")

protocol Validatable {
    func isValid() -> Bool
}

struct EmailAddress: Validatable {
    let value: String

    func isValid() -> Bool {
        value.contains("@") && value.contains(".")
    }
}

struct PhoneNumber: Validatable {
    let value: String

    func isValid() -> Bool {
        value.count >= 10 && value.allSatisfy { $0.isNumber }
    }
}

let email = EmailAddress(value: "user@example.com")
let phone = PhoneNumber(value: "1234567890")

print("Email valid: \(email.isValid())")
print("Phone valid: \(phone.isValid())")

// 通用验证函数
func validate(_ items: [Validatable]) -> Bool {
    items.allSatisfy { $0.isValid() }
}

print("All valid: \(validate([email, phone]))")

// ========================================
// 15. 实用示例 - 数据源
// ========================================

print("\n=== 实用示例: 数据源 ===")

protocol DataSource {
    associatedtype Item  // 关联类型
    func fetchItems() -> [Item]
}

struct UserDataSource: DataSource {
    typealias Item = String

    func fetchItems() -> [String] {
        ["Alice", "Bob", "Charlie"]
    }
}

struct ProductDataSource: DataSource {
    typealias Item = Int

    func fetchItems() -> [Int] {
        [101, 102, 103]
    }
}

let userSource = UserDataSource()
print("Users: \(userSource.fetchItems())")

let productSource = ProductDataSource()
print("Product IDs: \(productSource.fetchItems())")

// ========================================
// 16. 实用示例 - 计算
// ========================================

print("\n=== 实用示例: 计算 ===")

protocol Calculable {
    static func add(_ a: Self, _ b: Self) -> Self
    static func subtract(_ a: Self, _ b: Self) -> Self
}

extension Int: Calculable {
    static func add(_ a: Int, _ b: Int) -> Int {
        a + b
    }

    static func subtract(_ a: Int, _ b: Int) -> Int {
        a - b
    }
}

extension Double: Calculable {
    static func add(_ a: Double, _ b: Double) -> Double {
        a + b
    }

    static func subtract(_ a: Double, _ b: Double) -> Double {
        a - b
    }
}

print("Int add: \(Int.add(5, 3))")
print("Double subtract: \(Double.subtract(10.5, 3.2))")

// ========================================
// 17. 实用示例 - 格式化
// ========================================

print("\n=== 实用示例: 格式化 ===")

protocol Formattable {
    func formatted() -> String
}

extension Double: Formattable {
    func formatted() -> String {
        String(format: "%.2f", self)
    }
}

extension Int: Formattable {
    func formatted() -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter.string(from: NSNumber(value: self)) ?? "\(self)"
    }
}

let price: Double = 1234.56789
let quantity: Int = 1000000

print("Price: $\(price.formatted())")
print("Quantity: \(quantity.formatted())")

// ========================================
// 18. 协议默认实现
// ========================================

print("\n=== 协议默认实现 ===")

protocol Greetable {
    var name: String { get }
    func greet()
}

// 为协议提供默认实现
extension Greetable {
    func greet() {
        print("Hello, \(name)!")
    }
}

struct Employee: Greetable {
    let name: String
    // 自动获得 greet() 的默认实现
}

struct Customer: Greetable {
    let name: String

    // 可以重写默认实现
    func greet() {
        print("Welcome, \(name)!")
    }
}

let employee = Employee(name: "Alice")
let customer = Customer(name: "Bob")

employee.greet()  // 使用默认实现
customer.greet()  // 使用自定义实现

// ========================================
// 19. 面向协议编程
// ========================================

print("\n=== 面向协议编程 (POP) ===")

// 定义能力协议
protocol Flyable {
    func fly()
}

protocol Swimmable {
    func swim()
}

protocol Walkable {
    func walk()
}

// 组合不同能力
struct Bird: Flyable, Walkable {
    func fly() {
        print("Bird is flying")
    }

    func walk() {
        print("Bird is walking")
    }
}

struct Fish: Swimmable {
    func swim() {
        print("Fish is swimming")
    }
}

struct Duck: Flyable, Swimmable, Walkable {
    func fly() {
        print("Duck is flying")
    }

    func swim() {
        print("Duck is swimming")
    }

    func walk() {
        print("Duck is walking")
    }
}

let bird = Bird()
let fish = Fish()
let duck = Duck()

bird.fly()
fish.swim()
duck.fly()
duck.swim()
duck.walk()

print("\n=== 总结 ===")
print("""
1. 协议定义类型必须遵循的要求
2. 协议可以要求属性、方法、初始化器
3. 协议可以继承其他协议
4. 扩展可以为已有类型添加功能
5. 扩展可以让类型遵循协议
6. 协议可以有默认实现
7. 关联类型让协议更灵活
8. 面向协议编程比继承更灵活
9. 协议组合实现多种能力
10. Swift 推荐面向协议编程 (POP)
""")
