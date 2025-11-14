// Swift 基础示例 2: 集合类型 (数组、字典、集合)

// ========================================
// 1. 数组 (Array)
// ========================================

// 创建数组
var fruits = ["Apple", "Banana", "Orange"]
let numbers = [1, 2, 3, 4, 5]
var emptyArray: [String] = []  // 空数组

print("=== 数组操作 ===")
print("Fruits: \(fruits)")

// 访问元素
print("First fruit: \(fruits[0])")
print("Last fruit: \(fruits[fruits.count - 1])")

// 安全访问 (推荐)
if let firstFruit = fruits.first {
    print("First fruit (safe): \(firstFruit)")
}

if let lastFruit = fruits.last {
    print("Last fruit (safe): \(lastFruit)")
}

// 添加元素
fruits.append("Grape")           // 添加到末尾
fruits.insert("Mango", at: 0)    // 插入到指定位置
print("After adding: \(fruits)")

// 删除元素
fruits.remove(at: 0)              // 删除指定位置
fruits.removeLast()               // 删除最后一个
print("After removing: \(fruits)")

// 数组属性
print("Count: \(fruits.count)")
print("Is Empty: \(fruits.isEmpty)")

// 遍历数组
print("\n遍历数组:")
for fruit in fruits {
    print("- \(fruit)")
}

// 带索引遍历
print("\n带索引遍历:")
for (index, fruit) in fruits.enumerated() {
    print("\(index): \(fruit)")
}

// 数组方法
let uppercasedFruits = fruits.map { $0.uppercased() }
print("Uppercased: \(uppercasedFruits)")

let filteredFruits = fruits.filter { $0.count > 5 }
print("Long names: \(filteredFruits)")

// ========================================
// 2. 字典 (Dictionary)
// ========================================

print("\n=== 字典操作 ===")

// 创建字典
var ages = ["Alice": 25, "Bob": 30, "Charlie": 35]
var emptyDict: [String: Int] = [:]

print("Ages: \(ages)")

// 访问值 (返回Optional)
if let aliceAge = ages["Alice"] {
    print("Alice's age: \(aliceAge)")
}

// 使用默认值
let davidAge = ages["David", default: 0]
print("David's age: \(davidAge)")  // 0

// 添加/修改
ages["David"] = 28               // 添加新键值对
ages["Alice"] = 26               // 修改已有值
print("After updating: \(ages)")

// 删除
ages.removeValue(forKey: "David")
ages["Bob"] = nil                // 也可以这样删除
print("After deleting: \(ages)")

// 字典属性
print("Count: \(ages.count)")
print("Keys: \(ages.keys)")
print("Values: \(ages.values)")

// 遍历字典
print("\n遍历字典:")
for (name, age) in ages {
    print("\(name) is \(age) years old")
}

// 只遍历键
print("\n只遍历键:")
for name in ages.keys {
    print("Name: \(name)")
}

// 只遍历值
print("\n只遍历值:")
for age in ages.values {
    print("Age: \(age)")
}

// ========================================
// 3. 集合 (Set)
// ========================================

print("\n=== 集合操作 ===")

// 创建集合 (无序、唯一)
var colors: Set<String> = ["Red", "Green", "Blue"]
var numbers: Set = [1, 2, 3, 3, 4]  // 重复的3会被去掉

print("Colors: \(colors)")
print("Numbers: \(numbers)")

// 添加元素
colors.insert("Yellow")
print("After insert: \(colors)")

// 删除元素
colors.remove("Red")
print("After remove: \(colors)")

// 检查是否包含
if colors.contains("Blue") {
    print("Contains Blue")
}

// 集合运算
let set1: Set = [1, 2, 3, 4]
let set2: Set = [3, 4, 5, 6]

print("\n集合运算:")
print("Union: \(set1.union(set2))")              // 并集: [1,2,3,4,5,6]
print("Intersection: \(set1.intersection(set2))") // 交集: [3,4]
print("Subtracting: \(set1.subtracting(set2))")   // 差集: [1,2]
print("Symmetric Difference: \(set1.symmetricDifference(set2))") // [1,2,5,6]

// ========================================
// 4. 集合类型选择指南
// ========================================

print("\n=== 集合类型选择 ===")
print("""
Array (数组):
  - 有序集合
  - 允许重复元素
  - 按索引访问
  - 适合: 需要保持顺序的数据列表

Dictionary (字典):
  - 键值对集合
  - 无序
  - 键唯一
  - 适合: 需要快速查找的关联数据

Set (集合):
  - 无序集合
  - 元素唯一
  - 快速查找
  - 适合: 需要去重或集合运算的场景
""")

// ========================================
// 5. 实用示例
// ========================================

print("\n=== 实用示例 ===")

// 示例1: 购物清单
var shoppingList = ["Milk", "Eggs", "Bread"]
shoppingList.append("Cheese")
print("Shopping List: \(shoppingList)")

// 示例2: 联系人
var contacts = [
    "Alice": "123-456-7890",
    "Bob": "234-567-8901"
]
if let alicePhone = contacts["Alice"] {
    print("Alice's phone: \(alicePhone)")
}

// 示例3: 去重
let duplicates = [1, 2, 2, 3, 3, 3, 4]
let unique = Set(duplicates)
print("Unique numbers: \(unique)")

// 示例4: 统计
let scores = [85, 92, 78, 95, 88]
let total = scores.reduce(0, +)  // 求和
let average = Double(total) / Double(scores.count)
print("Average score: \(average)")

// 示例5: 分组
let words = ["apple", "banana", "avocado", "blueberry", "cherry"]
var grouped: [Character: [String]] = [:]
for word in words {
    let firstChar = word.first!
    if grouped[firstChar] != nil {
        grouped[firstChar]?.append(word)
    } else {
        grouped[firstChar] = [word]
    }
}
print("Grouped by first letter: \(grouped)")

print("\n=== 总结 ===")
print("1. 优先使用 Array，需要键值对时用 Dictionary")
print("2. 需要去重或集合运算时用 Set")
print("3. 访问字典值时注意处理 Optional")
print("4. 使用 map, filter, reduce 等高阶函数简化操作")
