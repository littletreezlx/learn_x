package main

import "fmt"

// 映射 (Map) - Go vs Java/Kotlin 对比
func main() {
	fmt.Println("=== 映射 (Map) ===")

	// 1. 创建 map（类似 Java HashMap，Kotlin Map）
	// Java:   Map<String, Integer> ages = new HashMap<>();
	// Kotlin: val ages = mutableMapOf<String, Int>()
	// Go:     ages := make(map[string]int)
	ages := make(map[string]int)
	ages["Alice"] = 25
	ages["Bob"] = 30
	ages["Charlie"] = 35
	fmt.Printf("ages: %v\n", ages)

	// 2. 字面量创建（更常用）
	scores := map[string]int{
		"Math":    95,
		"English": 88,
		"Science": 92,
	}
	fmt.Printf("scores: %v\n", scores)

	// 3. 访问元素
	fmt.Printf("Math score: %d\n", scores["Math"])

	// 4. 检查键是否存在（Go 特色，返回两个值）
	// Java:   if (map.containsKey("Math")) { ... }
	// Go:     if score, exists := scores["Math"]; exists { ... }
	if score, exists := scores["Math"]; exists {
		fmt.Printf("Math exists, score: %d\n", score)
	} else {
		fmt.Println("Math not found")
	}

	// 访问不存在的键，返回零值
	fmt.Printf("History score: %d (不存在，返回零值)\n", scores["History"])

	// 5. 添加/更新元素
	scores["History"] = 85
	scores["Math"] = 98 // 更新已存在的键
	fmt.Printf("after update: %v\n", scores)

	// 6. 删除元素（类似 Java map.remove）
	// Java:   map.remove("English");
	// Go:     delete(map, "English")
	delete(scores, "English")
	fmt.Printf("after delete English: %v\n", scores)

	// 7. 获取长度
	fmt.Printf("map length: %d\n", len(scores))

	// 8. 遍历 map（顺序是随机的！）
	fmt.Println("\n遍历 map (顺序随机):")
	for key, value := range scores {
		fmt.Printf("%s: %d\n", key, value)
	}

	// 只要键
	fmt.Println("\n只要键:")
	for key := range scores {
		fmt.Printf("%s ", key)
	}
	fmt.Println()

	// 9. 嵌套 map（map of maps）
	// Java:   Map<String, Map<String, Integer>>
	// Go:     map[string]map[string]int
	students := map[string]map[string]int{
		"Alice": {
			"Math":    95,
			"English": 88,
		},
		"Bob": {
			"Math":    82,
			"English": 90,
		},
	}
	fmt.Printf("\nstudents: %v\n", students)
	fmt.Printf("Alice's Math: %d\n", students["Alice"]["Math"])

	// 10. map 的零值是 nil（必须用 make 初始化）
	var nilMap map[string]int
	fmt.Printf("\nnil map: %v, is nil: %t\n", nilMap, nilMap == nil)
	// nilMap["key"] = 1  // 运行时错误！必须先 make

	// 正确方式
	nilMap = make(map[string]int)
	nilMap["key"] = 1
	fmt.Printf("after make: %v\n", nilMap)
}
