/**
 * TypeScript/JavaScript 桥接测试代码
 * 演示简单调用、回调机制、异步操作和宿主能力注入
 */

// ============= 简单调用 =============

function sayHello(name) {
    return "Hello from TypeScript: " + name + " [v1.0.0]";
}

function getVersion() {
    return "1.0.0";
}

// ============= 回调机制 =============

/**
 * 带回调的方法（同步回调）
 */
function sayHelloWithCallback(name, callback) {
    var result = "Callback result: " + name;
    if (callback) {
        callback(result);
    }
}

// ============= 全局监听器（异步回调演示）=============

var systemListener = null;

function registerSystemListener(listener) {
    systemListener = listener;
    
    // 模拟异步事件（3秒后触发）
    setTimeout(function() {
        if (systemListener) {
            systemListener("System event triggered!");
        }
    }, 3000);
}

// ============= 复杂业务逻辑演示 =============

/**
 * 数据处理方法（演示条件分支）
 */
function processData(age, status) {
    var result = "Processing data: age=" + age + ", status=" + status;
    
    // 条件判断
    if (age < 18) {
        result += " -> Category: Minor";
    } else if (age < 30) {
        result += " -> Category: Young Adult";
    } else if (age < 60) {
        result += " -> Category: Adult";
    } else {
        result += " -> Category: Senior";
    }
    
    // 状态判断
    if (status === "active") {
        result += ", Status: ACTIVE";
    } else {
        result += ", Status: INACTIVE";
    }
    
    return result;
}

// ============= 宿主能力注入演示 (CRUD) =============

/**
 * 复杂业务逻辑 - CRUD 演示
 * 需要宿主注入 HostStorage API
 */
async function processCrudDemo() {
    console.log("=== CRUD 演示开始 ===");
    
    try {
        // 1. 增 (Create)
        console.log("1. 创建用户 1001...");
        var created = await HostStorage.createUser("1001", "Alice", 25);
        console.log("创建结果:", created);
        
        if (!created) {
            throw new Error("创建用户失败");
        }
        
        // 2. 查 (Read)
        console.log("2. 查询用户 1001...");
        var userJson = await HostStorage.getUser("1001");
        console.log("查询结果:", userJson);
        
        var user = JSON.parse(userJson);
        
        // 3. 改 (Update) - 条件判断
        if (user.age < 30) {
            console.log("3. 用户年龄小于30，更新为30...");
            var updated = await HostStorage.updateUser("1001", 30);
            console.log("更新结果:", updated);
        } else {
            console.log("3. 用户年龄已满30，无需更新");
        }
        
        // 4. 再次查询确认
        console.log("4. 再次查询确认...");
        var updatedUserJson = await HostStorage.getUser("1001");
        console.log("最终结果:", updatedUserJson);
        
        // 5. 删 (Delete)
        console.log("5. 删除用户 1001...");
        var deleted = await HostStorage.deleteUser("1001");
        console.log("删除结果:", deleted);
        
        console.log("=== CRUD 演示完成 ===");
        return { 
            success: true, 
            message: "CRUD demo completed",
            originalAge: user.age,
            finalAge: 30
        };
    } catch (error) {
        console.error("=== CRUD 演示失败 ===", error);
        throw error;
    }
}

/**
 * 异步数据处理（演示 Promise 和 await）
 */
async function asyncDataProcessing(userId) {
    console.log("开始异步数据处理...");
    
    // 查询用户
    var userJson = await HostStorage.getUser(userId);
    var user = JSON.parse(userJson);
    
    // 根据年龄决定操作
    if (user.age < 18) {
        console.log("用户未成年，删除记录");
        await HostStorage.deleteUser(userId);
        return { action: "deleted", reason: "underage" };
    } else if (user.age > 60) {
        console.log("用户已退休，更新年龄为61");
        await HostStorage.updateUser(userId, 61);
        return { action: "updated", newAge: 61 };
    } else {
        console.log("用户年龄正常，无需操作");
        return { action: "none", age: user.age };
    }
}

