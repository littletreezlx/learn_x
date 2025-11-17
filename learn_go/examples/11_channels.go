package main

import "fmt"

func producer(ch chan<- int) {
	for i := 0; i < 5; i++ {
		ch <- i
		fmt.Printf("Produced: %d\n", i)
	}
	close(ch)
}

func consumer(ch <-chan int) {
	for val := range ch {
		fmt.Printf("Consumed: %d\n", val)
	}
}

func main() {
	ch := make(chan int, 2) // 有缓冲 channel

	go producer(ch)
	consumer(ch)
}
