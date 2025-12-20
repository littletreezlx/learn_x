package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Spring Boot 示例应用程序
 * 这是一个简单的 Web 应用，用于演示 Docker 容器化部署
 */
@SpringBootApplication  // 标记这是一个 Spring Boot 应用程序
@RestController        // 标记这是一个 REST 控制器，可以处理 HTTP 请求
public class DemoApplication {

    /**
     * 应用程序入口点
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // 启动 Spring Boot 应用
        SpringApplication.run(DemoApplication.class, args);
    }

    /**
     * 处理根路径的 GET 请求
     * @return 返回问候消息
     */
    @GetMapping("/")   // 映射 HTTP GET 请求到根路径
    public String hello() {
        return "Hello Docker World!";  // 返回简单的问候消息
    }
} 