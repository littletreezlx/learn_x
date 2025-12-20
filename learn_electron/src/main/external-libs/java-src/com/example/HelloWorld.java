package com.example;

/**
 * Java 桥接测试类
 * 演示简单调用、回调机制和版本管理
 */
public class HelloWorld {
    
    // ============= 简单调用 =============
    
    /**
     * 简单的问候方法
     */
    public static String sayHello(String name) {
        return "Hello from Java: " + name + " [v1.0.0]";
    }
    
    /**
     * 获取版本号
     */
    public static String getVersion() {
        return "1.0.0";
    }
    
    // ============= 回调机制 =============
    
    /**
     * 回调接口
     */
    public interface Callback {
        void onResult(String message);
    }
    
    /**
     * 带回调的方法（同步回调）
     */
    public static void sayHelloWithCallback(String name, Callback callback) {
        // 执行一些业务逻辑
        String result = "Callback result: " + name;
        
        // 调用宿主回调（同步）
        if (callback != null) {
            callback.onResult(result);
        }
    }
    
    // ============= 全局监听器（异步回调演示）=============
    
    private static Callback systemListener;
    
    /**
     * 注册系统事件监听器
     */
    public static void registerSystemListener(Callback listener) {
        systemListener = listener;
        
        // 模拟异步事件（3秒后触发）
        new Thread(() -> {
            try {
                Thread.sleep(3000);
                if (systemListener != null) {
                    systemListener.onResult("System event triggered!");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
    
    // ============= 复杂业务逻辑演示 =============
    
    /**
     * 数据处理方法（演示条件分支）
     */
    public static String processData(int age, String status) {
        StringBuilder result = new StringBuilder();
        
        result.append("Processing data: age=").append(age).append(", status=").append(status);
        
        // 条件判断
        if (age < 18) {
            result.append(" -> Category: Minor");
        } else if (age < 30) {
            result.append(" -> Category: Young Adult");
        } else if (age < 60) {
            result.append(" -> Category: Adult");
        } else {
            result.append(" -> Category: Senior");
        }
        
        // 状态判断
        if ("active".equals(status)) {
            result.append(", Status: ACTIVE");
        } else {
            result.append(", Status: INACTIVE");
        }
        
        return result.toString();
    }
}

