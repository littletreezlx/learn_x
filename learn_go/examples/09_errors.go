package main

import (
	"errors"
	"fmt"
)

// 错误处理 - Go vs Java/Kotlin 对比
//
// 关键差异：
// - Java/Kotlin: 异常 (try-catch-finally)
// - Go: 错误值 (error) + 返回值检查

// 1. 返回错误（Go 惯用法）
// Java:   throw new Exception("message");
// Go:     return error
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

// 2. 自定义错误类型
type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{
			Field:   "age",
			Message: "must be non-negative",
		}
	}
	if age > 150 {
		return &ValidationError{
			Field:   "age",
			Message: "must be realistic",
		}
	}
	return nil
}

// 3. 错误包装（Go 1.13+）
func processFile(filename string) error {
	// 模拟文件操作错误
	if filename == "" {
		return errors.New("filename is empty")
	}

	// 包装错误，保留原始错误信息
	return fmt.Errorf("failed to process file %s: %w", filename, errors.New("file not found"))
}

// 4. panic 和 recover（类似 Java 的异常）
// panic: 程序错误，类似 Java 抛出 RuntimeException
// recover: 捕获 panic，类似 Java 的 catch
func riskyOperation(shouldPanic bool) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("Recovered from panic: %v\n", r)
		}
	}()

	if shouldPanic {
		panic("something went wrong!")
	}
	fmt.Println("Operation completed successfully")
}

func main() {
	fmt.Println("=== 错误处理 ===")

	// 1. 基本错误处理（Go 惯用法）
	// Java:   try { result = divide(10, 2); } catch (Exception e) { ... }
	// Go:     if result, err := divide(10, 2); err != nil { ... }
	fmt.Println("\n1. 基本错误处理:")
	result, err := divide(10, 2)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Printf("Result: %.2f\n", result)
	}

	// 除以0的情况
	result, err = divide(10, 0)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Printf("Result: %.2f\n", result)
	}

	// 2. 自定义错误类型
	fmt.Println("\n2. 自定义错误类型:")
	if err := validateAge(25); err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Println("Age is valid")
	}

	if err := validateAge(-5); err != nil {
		fmt.Printf("Error: %v\n", err)
		// 类型断言，获取详细信息
		if ve, ok := err.(*ValidationError); ok {
			fmt.Printf("  Field: %s, Message: %s\n", ve.Field, ve.Message)
		}
	}

	// 3. 错误包装
	fmt.Println("\n3. 错误包装:")
	if err := processFile(""); err != nil {
		fmt.Printf("Error: %v\n", err)
	}

	// 4. panic 和 recover
	fmt.Println("\n4. panic 和 recover:")
	riskyOperation(false)
	riskyOperation(true)
	fmt.Println("Program continues after recover")

	// 5. 错误处理最佳实践
	fmt.Println("\n5. 错误处理最佳实践:")

	// ✅ 好的做法：立即检查错误
	if err := doSomething(); err != nil {
		// 处理错误
		fmt.Printf("Error: %v\n", err)
		return
	}

	// ❌ 不好的做法：忽略错误
	// _ = doSomething()  // 永远不要这样做！

	// ✅ 如果确定不会出错，可以用 Must 模式
	// value := mustDoSomething()
}

func doSomething() error {
	// 模拟可能出错的操作
	return errors.New("something failed")
}
