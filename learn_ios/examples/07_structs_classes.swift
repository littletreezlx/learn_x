// Swift 基础示例 5: 结构体和类

// ========================================
// 1. 结构体基础
// ========================================

print("=== 结构体基础 ===")

// 定义结构体
struct Point {
    var x: Double
    var y: Double
}

// 创建实例
let point1 = Point(x: 10, y: 20)
print("Point1: (\(point1.x), \(point1.y))")

// 修改属性 (需要 var)
var point2 = Point(x: 5, y: 15)
point2.x = 8
print("Point2: (\(point2.x), \(point2.y))")

// 结构体是值类型 (复制)
var point3 = point2
point3.y = 100
print("Point2: (\(point2.x), \(point2.y))")  // 不受影响
print("Point3: (\(point3.x), \(point3.y))")

// ========================================
// 2. 结构体方法
// ========================================

print("\n=== 结构体方法 ===")

struct Rectangle {
    var width: Double
    var height: Double

    // 实例方法
    func area() -> Double {
        width * height
    }

    func perimeter() -> Double {
        2 * (width + height)
    }

    // 判断方法
    func isSquare() -> Bool {
        width == height
    }

    // mutating 方法: 修改自身属性
    mutating func scale(by factor: Double) {
        width *= factor
        height *= factor
    }
}

var rect = Rectangle(width: 10, height: 20)
print("Area: \(rect.area())")
print("Perimeter: \(rect.perimeter())")
print("Is square: \(rect.isSquare())")

rect.scale(by: 2)
print("Scaled rect: \(rect.width) x \(rect.height)")

// ========================================
// 3. 计算属性
// ========================================

print("\n=== 计算属性 ===")

struct Circle {
    var radius: Double

    // 计算属性: 动态计算值
    var diameter: Double {
        radius * 2
    }

    var area: Double {
        .pi * radius * radius
    }

    var circumference: Double {
        2 * .pi * radius
    }

    // 可读写的计算属性
    var radiusInCm: Double {
        get {
            radius * 100  // 米转厘米
        }
        set {
            radius = newValue / 100  // 厘米转米
        }
    }
}

var circle = Circle(radius: 5)
print("Diameter: \(circle.diameter)")
print("Area: \(circle.area)")
print("Circumference: \(circle.circumference)")

circle.radiusInCm = 600  // 设置为600厘米
print("Radius: \(circle.radius)m")  // 6米

// ========================================
// 4. 属性观察器
// ========================================

print("\n=== 属性观察器 ===")

struct Temperature {
    var celsius: Double {
        willSet {
            print("Temperature will change to \(newValue)°C")
        }
        didSet {
            print("Temperature changed from \(oldValue)°C to \(celsius)°C")
        }
    }

    var fahrenheit: Double {
        get {
            celsius * 9 / 5 + 32
        }
        set {
            celsius = (newValue - 32) * 5 / 9
        }
    }
}

var temp = Temperature(celsius: 25)
print("Initial: \(temp.celsius)°C = \(temp.fahrenheit)°F")

temp.celsius = 30
temp.fahrenheit = 86
print("Final: \(temp.celsius)°C")

// ========================================
// 5. 类基础
// ========================================

print("\n=== 类基础 ===")

// 定义类
class Person {
    var name: String
    var age: Int

    // 初始化器 (必须)
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    // 方法
    func introduce() {
        print("Hi, I'm \(name), \(age) years old")
    }
}

let person1 = Person(name: "Alice", age: 30)
person1.introduce()

// 类是引用类型 (共享)
let person2 = person1
person2.name = "Bob"
print("Person1 name: \(person1.name)")  // 也变成了 Bob!

// ========================================
// 6. 继承
// ========================================

print("\n=== 继承 ===")

class Vehicle {
    var brand: String
    var year: Int

    init(brand: String, year: Int) {
        self.brand = brand
        self.year = year
    }

    func describe() {
        print("\(brand) (\(year))")
    }
}

// 子类
class Car: Vehicle {
    var numberOfDoors: Int

    init(brand: String, year: Int, numberOfDoors: Int) {
        self.numberOfDoors = numberOfDoors
        super.init(brand: brand, year: year)
    }

    // 重写方法
    override func describe() {
        print("\(brand) (\(year)) - \(numberOfDoors) doors")
    }

    // 新增方法
    func honk() {
        print("Beep beep!")
    }
}

let car = Car(brand: "Toyota", year: 2023, numberOfDoors: 4)
car.describe()
car.honk()

// ========================================
// 7. Struct vs Class 对比
// ========================================

print("\n=== Struct vs Class ===")

// Struct: 值类型
struct StructPoint {
    var x: Int
    var y: Int
}

var sp1 = StructPoint(x: 1, y: 2)
var sp2 = sp1  // 复制
sp2.x = 10
print("Struct - sp1.x: \(sp1.x), sp2.x: \(sp2.x)")  // 互不影响

// Class: 引用类型
class ClassPoint {
    var x: Int
    var y: Int

    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }
}

let cp1 = ClassPoint(x: 1, y: 2)
let cp2 = cp1  // 共享引用
cp2.x = 10
print("Class - cp1.x: \(cp1.x), cp2.x: \(cp2.x)")  // 都变了

// ========================================
// 8. 静态属性和方法
// ========================================

print("\n=== 静态属性和方法 ===")

struct Math {
    // 静态常量
    static let pi = 3.14159

    // 静态方法
    static func square(_ x: Double) -> Double {
        x * x
    }

    static func cube(_ x: Double) -> Double {
        x * x * x
    }
}

print("Pi: \(Math.pi)")
print("Square of 5: \(Math.square(5))")
print("Cube of 3: \(Math.cube(3))")

// 实例计数器示例
class Counter {
    static var instanceCount = 0

    init() {
        Counter.instanceCount += 1
    }

    deinit {
        Counter.instanceCount -= 1
    }
}

print("Initial count: \(Counter.instanceCount)")
var c1: Counter? = Counter()
var c2: Counter? = Counter()
print("After creating: \(Counter.instanceCount)")
c1 = nil
print("After releasing c1: \(Counter.instanceCount)")

// ========================================
// 9. 便利初始化器
// ========================================

print("\n=== 便利初始化器 ===")

struct User {
    var username: String
    var email: String
    var age: Int

    // 指定初始化器
    init(username: String, email: String, age: Int) {
        self.username = username
        self.email = email
        self.age = age
    }

    // 便利初始化器
    init(username: String, email: String) {
        self.init(username: username, email: email, age: 18)
    }

    init(username: String) {
        self.init(username: username, email: "\(username)@example.com", age: 18)
    }
}

let user1 = User(username: "alice", email: "alice@example.com", age: 25)
let user2 = User(username: "bob", email: "bob@example.com")
let user3 = User(username: "charlie")

print("User1: \(user1.username), \(user1.email), \(user1.age)")
print("User2: \(user2.username), \(user2.email), \(user2.age)")
print("User3: \(user3.username), \(user3.email), \(user3.age)")

// ========================================
// 10. 实用示例 - Todo 应用
// ========================================

print("\n=== 实用示例: Todo 应用 ===")

struct TodoItem {
    let id: UUID
    var title: String
    var isCompleted: Bool
    let createdAt: Date

    // 便利初始化器
    init(title: String) {
        self.id = UUID()
        self.title = title
        self.isCompleted = false
        self.createdAt = Date()
    }

    // 完整初始化器
    init(id: UUID = UUID(), title: String, isCompleted: Bool = false, createdAt: Date = Date()) {
        self.id = id
        self.title = title
        self.isCompleted = isCompleted
        self.createdAt = createdAt
    }

    // 标记完成
    mutating func toggleCompletion() {
        isCompleted.toggle()
    }

    // 描述
    func description() -> String {
        let status = isCompleted ? "✓" : "○"
        return "\(status) \(title)"
    }
}

var todo1 = TodoItem(title: "学习 Swift")
print(todo1.description())

todo1.toggleCompletion()
print(todo1.description())

// ========================================
// 11. 实用示例 - 用户管理
// ========================================

print("\n=== 实用示例: 用户管理 ===")

class UserAccount {
    private var username: String  // 私有属性
    private(set) var balance: Double  // 只能内部修改

    init(username: String, initialBalance: Double = 0) {
        self.username = username
        self.balance = initialBalance
    }

    // 公开方法
    func deposit(_ amount: Double) {
        guard amount > 0 else {
            print("Invalid amount")
            return
        }
        balance += amount
        print("\(username) deposited \(amount), new balance: \(balance)")
    }

    func withdraw(_ amount: Double) -> Bool {
        guard amount > 0 && amount <= balance else {
            print("Invalid or insufficient funds")
            return false
        }
        balance -= amount
        print("\(username) withdrew \(amount), new balance: \(balance)")
        return true
    }

    func getUsername() -> String {
        username
    }
}

let account = UserAccount(username: "Alice", initialBalance: 100)
account.deposit(50)
account.withdraw(30)
print("Username: \(account.getUsername()), Balance: \(account.balance)")

// ========================================
// 12. 何时使用 Struct vs Class
// ========================================

print("\n=== Struct vs Class 使用指南 ===")
print("""
优先使用 Struct:
✅ 简单的数据模型 (Point, Size, Rectangle)
✅ 不需要继承
✅ 值语义更合理 (复制而非共享)
✅ 线程安全 (值类型)

使用 Class:
✅ 需要继承
✅ 需要引用语义 (共享数据)
✅ 需要析构器 (deinit)
✅ Objective-C 互操作性
✅ 身份很重要 (两个实例是否是同一个对象)

示例:
- Struct: Point, Size, Rectangle, Color, TodoItem
- Class: ViewController, NetworkManager, DatabaseManager, UserSession
""")

// ========================================
// 13. 最佳实践
// ========================================

print("\n=== 最佳实践 ===")

// ✅ 使用 struct 作为数据模型
struct Product {
    let id: Int
    let name: String
    let price: Double

    var formattedPrice: String {
        String(format: "$%.2f", price)
    }
}

let product = Product(id: 1, name: "iPhone", price: 999.99)
print("Product: \(product.name) - \(product.formattedPrice)")

// ✅ 使用 class 管理状态
class ShoppingCart {
    private var items: [Product] = []

    func addItem(_ product: Product) {
        items.append(product)
    }

    func total() -> Double {
        items.reduce(0) { $0 + $1.price }
    }

    func itemCount() -> Int {
        items.count
    }
}

let cart = ShoppingCart()
cart.addItem(Product(id: 1, name: "iPhone", price: 999))
cart.addItem(Product(id: 2, name: "AirPods", price: 199))
print("Cart total: $\(cart.total()), items: \(cart.itemCount())")

print("\n=== 总结 ===")
print("""
1. Struct 是值类型，Class 是引用类型
2. Struct 不支持继承，Class 支持
3. 优先使用 Struct，除非需要 Class 特有功能
4. 使用计算属性避免存储冗余数据
5. 使用属性观察器响应值变化
6. mutating 关键字用于修改 Struct 自身
7. 私有属性用 private，限制访问提高安全性
""")
