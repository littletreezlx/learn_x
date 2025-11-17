package main

import "fmt"

// Rectangle 结构体
type Rectangle struct {
	Width  float64
	Height float64
}

// Area 计算面积（值接收者）
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

// Scale 缩放（指针接收者，修改原值）
func (r *Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

func main() {
	rect := Rectangle{Width: 10, Height: 5}

	fmt.Printf("Area: %.2f\n", rect.Area())

	rect.Scale(2)
	fmt.Printf("After scale - Width: %.2f, Height: %.2f\n", rect.Width, rect.Height)
	fmt.Printf("New Area: %.2f\n", rect.Area())
}
