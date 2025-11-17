package main

import "fmt"

func main() {
	fmt.Println("=== 控制流 ===")

	// 1. if 语句（Go 不需要括号）
	// Java:   if (x > 0) { ... }
	// Go:     if x > 0 { ... }
	x := 10
	if x > 0 {
		fmt.Println("x is positive")
	} else if x < 0 {
		fmt.Println("x is negative")
	} else {
		fmt.Println("x is zero")
	}

	// 2. if 初始化语句（Go 特色）
	// 在 if 中声明变量，作用域仅限于 if-else 块
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}

	// 3. for 循环（Go 只有 for，没有 while）
	// Java:   for (int i = 0; i < 5; i++) { ... }
	// Go:     for i := 0; i < 5; i++ { ... }
	fmt.Println("\n传统 for 循环:")
	for i := 0; i < 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// 4. for 作为 while（Java 的 while 循环）
	// Java:   while (j < 3) { ... }
	// Go:     for j < 3 { ... }
	fmt.Println("\nfor 作为 while:")
	j := 0
	for j < 3 {
		fmt.Printf("%d ", j)
		j++
	}
	fmt.Println()

	// 5. 无限循环（需要 break 退出）
	// Java:   while (true) { ... }
	// Go:     for { ... }
	fmt.Println("\n无限循环（break 退出）:")
	count := 0
	for {
		count++
		if count > 3 {
			break
		}
		fmt.Printf("%d ", count)
	}
	fmt.Println()

	// 6. range 遍历（类似 Java 的增强 for，Kotlin 的 for-in）
	// Java:   for (int n : numbers) { ... }
	// Kotlin: for (n in numbers) { ... }
	// Go:     for i, n := range numbers { ... }
	fmt.Println("\nrange 遍历:")
	numbers := []int{10, 20, 30, 40}
	for i, n := range numbers {
		fmt.Printf("index: %d, value: %d\n", i, n)
	}

	// 7. switch 语句（Go 不需要 break，自动 break）
	// Java:   需要 break 防止 fall through
	// Go:     自动 break，需要 fallthrough 才继续
	fmt.Println("\nswitch 语句:")
	day := 3
	switch day {
	case 1:
		fmt.Println("Monday")
	case 2:
		fmt.Println("Tuesday")
	case 3:
		fmt.Println("Wednesday")
	case 4:
		fmt.Println("Thursday")
	case 5:
		fmt.Println("Friday")
	default:
		fmt.Println("Weekend")
	}

	// 8. switch 无表达式（类似 if-else 链）
	// Go 特色：switch 可以不带表达式
	score := 85
	switch {
	case score >= 90:
		fmt.Println("Grade: A")
	case score >= 80:
		fmt.Println("Grade: B")
	case score >= 70:
		fmt.Println("Grade: C")
	default:
		fmt.Println("Grade: F")
	}
}
