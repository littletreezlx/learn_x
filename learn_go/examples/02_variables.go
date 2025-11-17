package main

import "fmt"

// 变量和类型 - Go vs Java/Kotlin 对比
func main() {
	// 1. 类型推断（类似 Kotlin 的 val/var）
	// Java:   String name = "Go";
	// Kotlin: val name = "Go"
	// Go:     var name = "Go"  或  name := "Go" (短声明)
	name := "Go"
	age := 15 // 自动推断为 int

	// 2. 显式类型声明
	var language string = "Golang"
	var year int = 2009

	// 3. 零值（Go 的特色，Java 的默认值）
	// Java: int count = 0; (需要显式初始化)
	// Go:   var count int (自动初始化为 0)
	var count int    // 0
	var flag bool    // false
	var score float64 // 0.0

	fmt.Println("=== 变量和类型 ===")
	fmt.Printf("name: %s, age: %d\n", name, age)
	fmt.Printf("language: %s, year: %d\n", language, year)
	fmt.Printf("零值 - count: %d, flag: %t, score: %.1f\n", count, flag, score)

	// 4. 多变量声明
	// Java:   int x = 1, y = 2;
	// Go:     x, y := 1, 2
	x, y := 1, 2
	fmt.Printf("x: %d, y: %d\n", x, y)

	// 5. 常量（类似 Java 的 final，Kotlin 的 val）
	const PI = 3.14159
	const Greeting = "Hello"
	fmt.Printf("PI: %.5f, Greeting: %s\n", PI, Greeting)

	// 6. 类型转换（Go 必须显式转换）
	// Java:   double d = (double) age;
	// Go:     d := float64(age)
	ageFloat := float64(age)
	fmt.Printf("age as float: %.1f\n", ageFloat)
}
