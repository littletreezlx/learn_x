package main

import "fmt"

// 切片 (Slice) - Go vs Java/Kotlin 对比
func main() {
	fmt.Println("=== 切片 (Slice) ===")

	// 1. 创建切片（类似 Java ArrayList，Kotlin List）
	// Java:   ArrayList<Integer> nums = new ArrayList<>();
	// Kotlin: val nums = mutableListOf<Int>()
	// Go:     nums := []int{1, 2, 3}
	nums := []int{1, 2, 3, 4, 5}
	fmt.Printf("nums: %v\n", nums)

	// 2. 访问元素（和 Java/Kotlin 一样）
	fmt.Printf("nums[0]: %d\n", nums[0])
	fmt.Printf("length: %d\n", len(nums))

	// 3. 切片操作（Go 特色）
	// Java:   需要 subList
	// Go:     直接用切片语法
	fmt.Printf("nums[1:3]: %v (包含索引1，不包含索引3)\n", nums[1:3])
	fmt.Printf("nums[:3]: %v (前3个元素)\n", nums[:3])
	fmt.Printf("nums[3:]: %v (从索引3到末尾)\n", nums[3:])

	// 4. append 添加元素（类似 Java ArrayList.add）
	// Java:   nums.add(6);
	// Go:     nums = append(nums, 6)
	nums = append(nums, 6)
	fmt.Printf("after append(6): %v\n", nums)

	// 追加多个元素
	nums = append(nums, 7, 8, 9)
	fmt.Printf("after append(7,8,9): %v\n", nums)

	// 5. make 创建切片（指定长度和容量）
	// Java:   new ArrayList<>(capacity)
	// Go:     make([]int, length, capacity)
	empty := make([]int, 5)      // 长度5，初始值都是0
	fmt.Printf("make([]int, 5): %v\n", empty)

	withCapacity := make([]int, 3, 10) // 长度3，容量10
	fmt.Printf("make([]int, 3, 10): %v, len=%d, cap=%d\n",
		withCapacity, len(withCapacity), cap(withCapacity))

	// 6. copy 复制切片
	// Java:   Collections.copy 或 clone
	// Go:     copy(dst, src)
	source := []int{10, 20, 30}
	dest := make([]int, len(source))
	copy(dest, source)
	fmt.Printf("copied: %v\n", dest)

	// 7. 遍历切片
	fmt.Println("\n遍历切片:")
	for i, v := range nums {
		fmt.Printf("index: %d, value: %d\n", i, v)
	}

	// 只要值，忽略索引
	fmt.Println("\n只要值:")
	for _, v := range nums {
		fmt.Printf("%d ", v)
	}
	fmt.Println()

	// 8. 二维切片（类似 Java 的二维数组）
	// Java:   int[][] matrix = new int[3][3];
	// Go:     matrix := make([][]int, 3)
	matrix := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	fmt.Printf("\n二维切片: %v\n", matrix)
	fmt.Printf("matrix[1][2]: %d\n", matrix[1][2])
}
