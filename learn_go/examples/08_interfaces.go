package main

import (
	"fmt"
	"math"
)

// Shape 接口
type Shape interface {
	Area() float64
	Perimeter() float64
}

// Rectangle 结构体
type Rectangle struct {
	Width  float64
	Height float64
}

// Circle 结构体
type Circle struct {
	Radius float64
}

// Rectangle 实现 Shape 接口（隐式实现）
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
	return 2 * (r.Width + r.Height)
}

// Circle 实现 Shape 接口（隐式实现）
func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
	return 2 * math.Pi * c.Radius
}

// printShapeInfo 接受任何实现了 Shape 接口的类型
func printShapeInfo(s Shape) {
	fmt.Printf("Area: %.2f\n", s.Area())
	fmt.Printf("Perimeter: %.2f\n", s.Perimeter())
}

func main() {
	rect := Rectangle{Width: 10, Height: 5}
	circle := Circle{Radius: 7}

	fmt.Println("Rectangle:")
	printShapeInfo(rect)

	fmt.Println("\nCircle:")
	printShapeInfo(circle)
}
