package main

import (
	"fmt"
	"time"
)

// select 语句 - Go 并发的核心工具
//
// select 类似 switch，但用于 channel 操作
// Java/Kotlin 没有直接对应的概念

func main() {
	fmt.Println("=== select 语句 ===")

	// 1. 基本 select（从多个 channel 中选择）
	fmt.Println("\n1. 基本 select:")
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		ch1 <- "from channel 1"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- "from channel 2"
	}()

	// select 会等待第一个准备好的 channel
	select {
	case msg1 := <-ch1:
		fmt.Println("Received:", msg1)
	case msg2 := <-ch2:
		fmt.Println("Received:", msg2)
	}

	// 2. 带超时的 select
	fmt.Println("\n2. 带超时的 select:")
	ch3 := make(chan string)

	go func() {
		time.Sleep(2 * time.Second)
		ch3 <- "result"
	}()

	select {
	case res := <-ch3:
		fmt.Println("Received:", res)
	case <-time.After(1 * time.Second):
		fmt.Println("Timeout! Operation took too long")
	}

	// 3. 非阻塞 channel 操作（default 分支）
	fmt.Println("\n3. 非阻塞操作:")
	messages := make(chan string, 1) // 有缓冲 channel

	// 尝试接收（不阻塞）
	select {
	case msg := <-messages:
		fmt.Println("Received:", msg)
	default:
		fmt.Println("No message received (non-blocking)")
	}

	// 尝试发送（不阻塞）
	msg := "hello"
	select {
	case messages <- msg:
		fmt.Println("Sent:", msg)
	default:
		fmt.Println("Cannot send (channel full)")
	}

	// 4. 多路复用（同时监听多个 channel）
	fmt.Println("\n4. 多路复用:")
	ch4 := make(chan string)
	ch5 := make(chan string)
	done := make(chan bool)

	// 生产者1
	go func() {
		for i := 0; i < 3; i++ {
			ch4 <- fmt.Sprintf("ch4: message %d", i)
			time.Sleep(500 * time.Millisecond)
		}
	}()

	// 生产者2
	go func() {
		for i := 0; i < 3; i++ {
			ch5 <- fmt.Sprintf("ch5: message %d", i)
			time.Sleep(700 * time.Millisecond)
		}
	}()

	// 定时器：3秒后停止
	go func() {
		time.Sleep(3 * time.Second)
		done <- true
	}()

	// 消费者（多路复用）
	for {
		select {
		case msg := <-ch4:
			fmt.Println(msg)
		case msg := <-ch5:
			fmt.Println(msg)
		case <-done:
			fmt.Println("Done!")
			return
		}
	}
}

// 5. 实际应用场景：超时控制
func fetchWithTimeout(url string, timeout time.Duration) (string, error) {
	result := make(chan string)
	errCh := make(chan error)

	go func() {
		// 模拟网络请求
		time.Sleep(1 * time.Second)
		result <- fmt.Sprintf("Data from %s", url)
	}()

	select {
	case data := <-result:
		return data, nil
	case err := <-errCh:
		return "", err
	case <-time.After(timeout):
		return "", fmt.Errorf("request timeout after %v", timeout)
	}
}

// 6. 实际应用场景：取消操作
func worker(id int, jobs <-chan int, results chan<- int, done <-chan bool) {
	for {
		select {
		case job := <-jobs:
			fmt.Printf("Worker %d processing job %d\n", id, job)
			time.Sleep(500 * time.Millisecond)
			results <- job * 2
		case <-done:
			fmt.Printf("Worker %d stopped\n", id)
			return
		}
	}
}
