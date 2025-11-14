package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * 用户控制器
 * 提供用户 CRUD 操作的 REST API
 * 用于演示 Docker 应用与数据库的集成
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * 获取所有用户
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        List<User> users = userRepository.findAll();
        
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        response.put("total", users.size());
        response.put("message", "用户列表获取成功");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 根据ID获取用户
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        
        Map<String, Object> response = new HashMap<>();
        if (userOptional.isPresent()) {
            response.put("user", userOptional.get());
            response.put("message", "用户信息获取成功");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "用户不存在");
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * 创建新用户
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody Map<String, String> userRequest) {
        Map<String, Object> response = new HashMap<>();
        
        String username = userRequest.get("username");
        String email = userRequest.get("email");
        
        if (username == null || username.trim().isEmpty()) {
            response.put("message", "用户名不能为空");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (email == null || email.trim().isEmpty()) {
            response.put("message", "邮箱不能为空");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (userRepository.existsByUsername(username)) {
            response.put("message", "用户名已存在");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        
        if (userRepository.existsByEmail(email)) {
            response.put("message", "邮箱已存在");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        
        User user = new User(username, email);
        User savedUser = userRepository.save(user);
        
        response.put("user", savedUser);
        response.put("message", "用户创建成功");
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * 更新用户信息
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id, @RequestBody Map<String, String> userRequest) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            response.put("message", "用户不存在");
            return ResponseEntity.notFound().build();
        }
        
        User user = userOptional.get();
        String username = userRequest.get("username");
        String email = userRequest.get("email");
        
        if (username != null && !username.trim().isEmpty()) {
            if (!username.equals(user.getUsername()) && userRepository.existsByUsername(username)) {
                response.put("message", "用户名已存在");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            user.setUsername(username);
        }
        
        if (email != null && !email.trim().isEmpty()) {
            if (!email.equals(user.getEmail()) && userRepository.existsByEmail(email)) {
                response.put("message", "邮箱已存在");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            user.setEmail(email);
        }
        
        User updatedUser = userRepository.save(user);
        
        response.put("user", updatedUser);
        response.put("message", "用户信息更新成功");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        if (!userRepository.existsById(id)) {
            response.put("message", "用户不存在");
            return ResponseEntity.notFound().build();
        }
        
        userRepository.deleteById(id);
        response.put("message", "用户删除成功");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 搜索用户
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchUsers(@RequestParam String username) {
        List<User> users = userRepository.findByUsernameContainingIgnoreCase(username);
        
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        response.put("total", users.size());
        response.put("query", username);
        response.put("message", "搜索完成");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取用户统计信息
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getUserStats() {
        long totalUsers = userRepository.countAllUsers();
        
        Map<String, Object> response = new HashMap<>();
        response.put("total_users", totalUsers);
        response.put("database_type", "PostgreSQL/H2");
        response.put("container", System.getenv("HOSTNAME"));
        response.put("message", "用户统计信息");
        
        return ResponseEntity.ok(response);
    }
}