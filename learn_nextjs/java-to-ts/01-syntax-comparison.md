# Java与TypeScript语法对比

本文档对比Java和TypeScript的基础语法差异，帮助Java开发者快速适应TypeScript语法。

## 变量声明

### Java
```java
// 变量声明必须指定类型
int count = 10;
String name = "John";
final double PI = 3.14159;

// Java 10+ 可以使用var进行类型推断
var message = "Hello"; // 推断为String类型
```

### TypeScript
```typescript
// 变量声明可以显式指定类型
let count: number = 10;
const name: string = "John";
const PI: number = 3.14159;

// 可以省略类型，由值自动推断
let message = "Hello"; // 自动推断为string类型
let id = 100;          // 自动推断为number类型

// 声明变量的三种方式
let x = 10;    // 可重新赋值
const y = 20;  // 不可重新赋值（类似Java的final）
var z = 30;    // 老式写法，作用域规则不同，尽量避免使用
```

## 基本数据类型

### Java
```java
// 基本数据类型
byte b = 1;
short s = 2;
int i = 3;
long l = 4L;
float f = 5.0f;
double d = 6.0;
char c = 'A';
boolean bool = true;

// 包装类
Integer num = 7;
String str = "Hello";
```

### TypeScript
```typescript
// 基本数据类型
let num: number = 42;        // 所有数字类型统一为number
let decimal: number = 6.0;   // 没有单独的float/double区分
let hex: number = 0xf00d;    // 十六进制
let binary: number = 0b1010; // 二进制
let octal: number = 0o744;   // 八进制
let big: bigint = 100n;      // 大整数类型（ES2020）

let str: string = "Hello";   // 字符串
let char: string = 'A';      // 单个字符也是string类型
let bool: boolean = true;    // 布尔值

// 特殊类型
let n: null = null;          // null类型
let u: undefined = undefined;// undefined类型
let sym: symbol = Symbol('sym'); // 符号类型
```

## 数组与集合

### Java
```java
// 数组
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
names[0] = "Alice";

// 集合
List<String> list = new ArrayList<>();
list.add("item");

Map<String, Integer> map = new HashMap<>();
map.put("key", 100);

Set<Integer> set = new HashSet<>();
set.add(1);
```

### TypeScript
```typescript
// 数组
let numbers: number[] = [1, 2, 3, 4, 5];
// 或使用泛型语法
let names: Array<string> = ["Alice", "Bob"];

// 元组（固定长度的数组，每个位置有特定类型）
let tuple: [string, number] = ["hello", 10]; // Java中没有直接对应

// 对象和Map
let map: Record<string, number> = {
  key: 100,
  another: 200
};
// 使用Map对象（类似Java Map）
let hashMap: Map<string, number> = new Map();
hashMap.set("key", 100);

// Set集合
let set: Set<number> = new Set([1, 2, 3]);
set.add(4);
```

## 函数定义

### Java
```java
// 方法定义
public int add(int a, int b) {
    return a + b;
}

// 方法重载
public double add(double a, double b) {
    return a + b;
}

// 可变参数
public int sum(int... numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}
```

### TypeScript
```typescript
// 函数声明
function add(a: number, b: number): number {
    return a + b;
}

// 箭头函数（Lambda表达式）
const multiply = (a: number, b: number): number => a * b;

// 可选参数（Java中通过重载或默认值实现）
function greet(name: string, greeting?: string): string {
    return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// 默认参数
function increment(num: number, delta: number = 1): number {
    return num + delta;
}

// 剩余参数（类似Java的可变参数）
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// 函数重载
function process(x: number): number;
function process(x: string): string;
function process(x: number | string): number | string {
    return typeof x === "number" ? x * 2 : x.toUpperCase();
}
```

## 类和接口

### Java
```java
// 接口定义
public interface Vehicle {
    void drive();
    default void honk() {
        System.out.println("Beep!");
    }
}

// 抽象类
public abstract class AbstractVehicle implements Vehicle {
    protected String brand;
    
    public AbstractVehicle(String brand) {
        this.brand = brand;
    }
    
    public abstract double getFuelEfficiency();
}

// 具体类
public class Car extends AbstractVehicle {
    private int doors;
    
    public Car(String brand, int doors) {
        super(brand);
        this.doors = doors;
    }
    
    @Override
    public void drive() {
        System.out.println("Car driving");
    }
    
    @Override
    public double getFuelEfficiency() {
        return 25.5;
    }
}
```

### TypeScript
```typescript
// 接口定义
interface Vehicle {
    brand: string;
    drive(): void;
    honk?(): void; // 可选方法
}

// 抽象类 - TypeScript使用abstract关键字
abstract class AbstractVehicle implements Vehicle {
    constructor(public brand: string) {}
    
    abstract drive(): void;
    
    // 默认实现
    honk(): void {
        console.log("Beep!");
    }
    
    abstract getFuelEfficiency(): number;
}

// 具体类
class Car extends AbstractVehicle {
    constructor(
        brand: string,
        private doors: number // 参数属性语法：自动创建并初始化实例属性
    ) {
        super(brand);
    }
    
    drive(): void {
        console.log("Car driving");
    }
    
    getFuelEfficiency(): number {
        return 25.5;
    }
    
    // Getter
    get numberOfDoors(): number {
        return this.doors;
    }
}
```

## 条件与循环语句

Java和TypeScript的条件与循环语句语法非常相似：

### 条件语句

**Java和TypeScript基本相同**
```java
// Java/TypeScript
if (condition) {
    // 代码块
} else if (anotherCondition) {
    // 代码块
} else {
    // 代码块
}

// switch语句
switch (value) {
    case 1:
        // 代码块
        break;
    case 2:
        // 代码块
        break;
    default:
        // 代码块
}
```

**TypeScript特有** - 简化条件赋值
```typescript
// 三元运算符（Java也有）
const result = condition ? valueIfTrue : valueIfFalse;

// 空值合并运算符（Java中没有）
const name = username ?? "Guest"; // 如果username为null或undefined，则使用"Guest"

// 可选链运算符（Java中没有）
const city = user?.address?.city; // 安全访问嵌套属性，不会因null引用抛出异常
```

### 循环语句

**Java和TypeScript基本相同**
```java
// for循环
for (int i = 0; i < 10; i++) {
    // 代码块
}

// while循环
while (condition) {
    // 代码块
}

// do-while循环
do {
    // 代码块
} while (condition);
```

**TypeScript特有** - 增强的遍历方式
```typescript
// for-of循环（类似Java的for-each）
const items = [1, 2, 3];
for (const item of items) {
    console.log(item);
}

// for-in循环（遍历对象属性，Java中没有直接等价物）
const person = { name: "John", age: 30 };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 数组方法（函数式）
items.forEach(item => console.log(item));
const doubled = items.map(item => item * 2);
const sum = items.reduce((total, item) => total + item, 0);
```

## 错误处理

### Java
```java
// 检查型异常必须处理
try {
    FileReader file = new FileReader("file.txt");
    // 代码
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
} catch (IOException e) {
    System.err.println("IO error: " + e.getMessage());
} finally {
    // 清理代码
}

// 抛出异常
public void process() throws IOException {
    throw new IOException("Error processing file");
}
```

### TypeScript
```typescript
// TypeScript没有检查型异常，所有异常都是非检查型
try {
    // 可能抛出异常的代码
    const data = JSON.parse(jsonString);
} catch (error) {
    // error的类型是any或unknown（取决于TypeScript版本）
    console.error("Parsing error:", error);
    
    // 类型守卫检查错误类型
    if (error instanceof SyntaxError) {
        console.error("JSON syntax error");
    }
} finally {
    // 清理代码
}

// 抛出异常（不需要声明throws）
function process(): void {
    throw new Error("Processing error");
}

// 自定义错误类
class ApplicationError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = "ApplicationError";
    }
}
```

## 最佳实践建议

1. **命名约定**：
   - Java使用驼峰命名法，变量和方法首字母小写，类首字母大写
   - TypeScript也遵循相同的惯例，但函数和类的命名通常偏向函数式风格

2. **代码组织**：
   - Java以类为中心组织代码，每个文件通常包含一个公共类
   - TypeScript可以基于模块组织代码，一个文件可以导出多个函数、类或变量

3. **异步编程**：
   - Java使用CompletableFuture、线程池等处理异步
   - TypeScript主要使用Promise和async/await，这是最大的范式差异之一

4. **代码风格**：
   - Java代码通常更加冗长和明确
   - TypeScript鼓励简洁的写法，大量使用类型推断和函数式编程

5. **类型系统使用**：
   - Java的类型系统是名义型的，基于类的继承关系
   - TypeScript的类型系统是结构型的，基于属性和形状的匹配
``` 