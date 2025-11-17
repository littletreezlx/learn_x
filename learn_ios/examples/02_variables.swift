// Swift 基础示例 1: 变量和常量

// ========================================
// 1. 变量 (var) vs 常量 (let)
// ========================================

// 变量: 值可以改变
var age = 25
age = 26  // ✅ 可以修改

// 常量: 值不能改变
let name = "Alice"
// name = "Bob"  // ❌ 错误: 常量不能修改

print("Name: \(name), Age: \(age)")

// ========================================
// 2. 类型推断和显式类型
// ========================================

// 类型推断 (Swift自动判断类型)
let inferredInt = 42          // Int
let inferredDouble = 3.14     // Double
let inferredString = "Hello"  // String
let inferredBool = true       // Bool

// 显式类型声明
let explicitInt: Int = 42
let explicitDouble: Double = 3.14
let explicitString: String = "Hello"
let explicitBool: Bool = true

// ========================================
// 3. 基本数据类型
// ========================================

// 整数
let smallInt: Int = 100
let bigInt: Int = 1_000_000  // 可以用下划线分隔，方便阅读

// 浮点数
let pi: Double = 3.14159     // 64位，更精确
let smallFloat: Float = 3.14  // 32位

// 字符串
let greeting = "Hello, World!"
let multiline = """
这是一个
多行字符串
"""

// 布尔值
let isSwiftFun = true
let isHard = false

// ========================================
// 4. 字符串操作
// ========================================

let firstName = "John"
let lastName = "Doe"

// 字符串拼接
let fullName = firstName + " " + lastName
print("Full Name: \(fullName)")

// 字符串插值 (推荐方式)
let introduction = "My name is \(firstName) \(lastName), I'm \(age) years old."
print(introduction)

// 字符串属性
print("Length: \(greeting.count)")
print("Is Empty: \(greeting.isEmpty)")
print("Uppercase: \(greeting.uppercased())")
print("Lowercase: \(greeting.lowercased())")

// ========================================
// 5. 类型转换
// ========================================

let intValue = 42
let doubleValue = Double(intValue)  // Int -> Double
print("Double value: \(doubleValue)")

let stringNumber = "123"
if let number = Int(stringNumber) {  // String -> Int (Optional)
    print("Converted number: \(number)")
}

// ========================================
// 6. 运算符
// ========================================

let a = 10
let b = 3

// 算术运算符
print("加法: \(a + b)")
print("减法: \(a - b)")
print("乘法: \(a * b)")
print("除法: \(a / b)")      // 整数除法，结果为 3
print("取余: \(a % b)")

// 比较运算符
print("相等: \(a == b)")
print("不等: \(a != b)")
print("大于: \(a > b)")
print("小于: \(a < b)")

// 逻辑运算符
let condition1 = true
let condition2 = false
print("AND: \(condition1 && condition2)")  // false
print("OR: \(condition1 || condition2)")   // true
print("NOT: \(!condition1)")                // false

// ========================================
// 7. 元组 (Tuple)
// ========================================

let person = (name: "Alice", age: 30, city: "Beijing")
print("Name: \(person.name)")
print("Age: \(person.age)")
print("City: \(person.city)")

// 元组解包
let (personName, personAge, personCity) = person
print("解包: \(personName), \(personAge), \(personCity)")

// 忽略某些值
let (justName, _, _) = person
print("只要名字: \(justName)")

// ========================================
// 8. 常量和变量的最佳实践
// ========================================

// ✅ 优先使用 let (常量)
// 只有在确实需要修改值时才使用 var
let configuration = "Production"  // 不会改变，用 let

var counter = 0  // 会改变，用 var
counter += 1

print("\n=== 总结 ===")
print("1. 优先使用 let 定义常量")
print("2. 需要修改值时才使用 var 定义变量")
print("3. Swift 会自动推断类型，但也可以显式声明")
print("4. 使用字符串插值 \\(value) 而不是拼接")
