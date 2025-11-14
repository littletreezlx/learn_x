package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * Spring Boot 示例应用程序
 * 这是一个简单的 Web 应用，用于演示 Docker 容器化部署
 * 包含多个 API 端点展示不同的 Docker 应用场景
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

    /**
     * 健康检查端点
     * 用于 Docker 容器健康状态检查
     * @return 应用状态信息
     */
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        health.put("service", "docker-demo");
        health.put("version", "1.0.0");
        return health;
    }

    /**
     * 获取系统信息
     * 展示容器内部环境信息
     * @return 系统环境信息
     */
    @GetMapping("/info")
    public Map<String, Object> info() {
        Map<String, Object> info = new HashMap<>();
        info.put("java.version", System.getProperty("java.version"));
        info.put("java.vendor", System.getProperty("java.vendor"));
        info.put("os.name", System.getProperty("os.name"));
        info.put("os.arch", System.getProperty("os.arch"));
        info.put("user.name", System.getProperty("user.name"));
        info.put("user.dir", System.getProperty("user.dir"));
        info.put("spring.profiles.active", System.getProperty("spring.profiles.active", "default"));
        
        // 获取环境变量
        Map<String, String> envVars = new HashMap<>();
        envVars.put("JAVA_HOME", System.getenv("JAVA_HOME"));
        envVars.put("PATH", System.getenv("PATH"));
        envVars.put("HOSTNAME", System.getenv("HOSTNAME"));
        info.put("environment", envVars);
        
        return info;
    }

    /**
     * 个性化问候
     * 支持路径参数，展示 RESTful API 设计
     * @param name 用户名
     * @return 个性化问候消息
     */
    @GetMapping("/hello/{name}")
    public Map<String, String> helloName(@PathVariable String name) {
        Map<String, String> response = new HashMap<>();
        response.put("message", String.format("Hello %s, welcome to Docker World!", name));
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("container", System.getenv("HOSTNAME"));
        return response;
    }

    /**
     * 回显服务
     * 返回请求参数，用于测试容器间通信
     * @param message 要回显的消息
     * @return 回显结果
     */
    @GetMapping("/echo")
    public Map<String, Object> echo(@RequestParam(defaultValue = "Hello Docker!") String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("original", message);
        response.put("echoed", message.toUpperCase());
        response.put("length", message.length());
        response.put("timestamp", System.currentTimeMillis());
        response.put("container_id", System.getenv("HOSTNAME"));
        return response;
    }

    /**
     * 模拟负载
     * 用于测试容器资源使用和监控
     * @param seconds 负载持续时间（秒）
     * @return 负载测试结果
     */
    @GetMapping("/load")
    public Map<String, Object> simulateLoad(@RequestParam(defaultValue = "1") int seconds) {
        long startTime = System.currentTimeMillis();
        
        // 模拟CPU密集型任务
        long endTime = startTime + (seconds * 1000L);
        while (System.currentTimeMillis() < endTime) {
            Math.sqrt(Math.random() * 1000000);
        }
        
        long actualDuration = System.currentTimeMillis() - startTime;
        
        Map<String, Object> result = new HashMap<>();
        result.put("requested_duration_seconds", seconds);
        result.put("actual_duration_ms", actualDuration);
        result.put("start_time", startTime);
        result.put("end_time", System.currentTimeMillis());
        result.put("container", System.getenv("HOSTNAME"));
        result.put("status", "completed");
        
        return result;
    }

    /**
     * 内存使用情况
     * 展示 JVM 内存信息，用于监控容器资源使用
     * @return 内存使用统计
     */
    @GetMapping("/memory")
    public Map<String, Object> memoryInfo() {
        Runtime runtime = Runtime.getRuntime();
        
        Map<String, Object> memory = new HashMap<>();
        memory.put("total_memory_mb", runtime.totalMemory() / 1024 / 1024);
        memory.put("free_memory_mb", runtime.freeMemory() / 1024 / 1024);
        memory.put("used_memory_mb", (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024);
        memory.put("max_memory_mb", runtime.maxMemory() / 1024 / 1024);
        memory.put("available_processors", runtime.availableProcessors());
        memory.put("container", System.getenv("HOSTNAME"));
        memory.put("timestamp", LocalDateTime.now().toString());
        
        return memory;
    }
} 