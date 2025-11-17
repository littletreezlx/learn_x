package main

import "fmt"

// 函数定义 - Go vs Java/Kotlin 对比

// 1. 基本函数（类似 Java 方法）
// Java:   public int add(int a, int b) { return a + b; }
// Go:     func add(a int, b int) int { return a + b }
func add(a int, b int) int {
	return a + b
}

// 2. 相同类型参数简写
func multiply(a, b int) int {
	return a * b
}

// 3. 多返回值（Go 的特色，Java 需要创建对象）
// Java:   需要定义 Result 类或使用 Pair
// Go:     直接返回多个值
func divmod(a, b int) (int, int) {
	return a / b, a % b
}

// 4. 命名返回值（可读性更好）
func calculate(a, b int) (sum int, product int) {
	sum = a + b
	product = a * b
	return // 自动返回 sum 和 product
}

// 5. 可变参数（类似 Java 的 varargs）
// Java:   public int sum(int... numbers)
// Go:     func sum(numbers ...int) int
func sum(numbers ...int) int {
	total := 0
	for _, num := range numbers {
		total += num
	}
	return total
}

// 6. 函数作为值（类似 Java 的 Lambda，Kotlin 的函数类型）
func applyOperation(a, b int, op func(int, int) int) int {
	return op(a, b)
}

func main() {
	fmt.Println("=== 函数示例 ===")

	// 基本调用
	fmt.Printf("add(10, 5) = %d\n", add(10, 5))
	fmt.Printf("multiply(10, 5) = %d\n", multiply(10, 5))

	// 多返回值
	quotient, remainder := divmod(17, 5)
	fmt.Printf("divmod(17, 5) = %d 余 %d\n", quotient, remainder)

	// 命名返回值
	s, p := calculate(4, 5)
	fmt.Printf("calculate(4, 5) = sum: %d, product: %d\n", s, p)

	// 可变参数
	fmt.Printf("sum(1, 2, 3, 4, 5) = %d\n", sum(1, 2, 3, 4, 5))

	// 函数作为值
	result := applyOperation(10, 5, add)
	fmt.Printf("applyOperation(10, 5, add) = %d\n", result)

	// 匿名函数（类似 Java Lambda）
	// Java:   (a, b) -> a - b
	// Go:     func(a, b int) int { return a - b }
	result = applyOperation(10, 5, func(a, b int) int {
		return a - b
	})
	fmt.Printf("applyOperation(10, 5, subtract) = %d\n", result)
}
