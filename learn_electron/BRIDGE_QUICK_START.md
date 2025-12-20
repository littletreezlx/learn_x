# 🚀 跨语言桥接快速入门

## 📦 前置条件

1. **系统要求**:
   - Node.js >= 18.x
   - Java JDK >= 8
   - macOS / Windows / Linux

2. **验证 Java 安装**:
   ```bash
   java -version
   # 应该输出: java version "1.8.0_xxx" 或更高
   ```

---

## 🎯 快速开始

### 1. 启动应用

```bash
cd /path/to/learn_electron
pnpm install
pnpm run electron:dev
```

### 2. 打开测试页面

1. 应用启动后，在导航主页点击 **"🌉 跨语言桥接测试"** 卡片
2. 进入测试界面

### 3. 测试 Java Bridge

**步骤**:
1. 点击 **"初始化 Java Bridge"** 按钮
2. 等待初始化完成（约 150ms）
3. 点击 **"调用 sayHello()"** 测试简单调用
4. 查看输出区域的结果

**预期输出**:
```
[17:20:30] === 初始化 Java Bridge ===
[17:20:30] 加载 JAR: ./src/main/external-libs/hello-java.jar
[17:20:30] ✅ Java Bridge 初始化成功
[17:20:31] === 测试 Java sayHello() ===
[17:20:31] ✅ 调用成功: Hello from Java: Electron [v1.0.0]
```

### 4. 测试 TypeScript Bridge

**步骤**:
1. 点击 **"初始化 TS Bridge"** 按钮
2. 点击 **"注入存储 API"** 按钮
3. 点击 **"CRUD 演示"** 测试复杂业务逻辑
4. 查看输出区域的详细日志

**预期输出**:
```
[17:21:00] === 初始化 TypeScript Bridge ===
[17:21:00] ✅ TypeScript Bridge 初始化成功
[17:21:01] === 注入存储 API ===
[17:21:01] ✅ 存储 API 注入成功
[17:21:02] === 测试 CRUD 演示 ===
=== CRUD 演示开始 ===
1. 创建用户 1001...
创建结果: true
2. 查询用户 1001...
查询结果: {"id":"1001","name":"Alice","age":25}
...
[17:21:02] ✅ CRUD 演示完成
```

---

## 📝 使用示例

### 在自己的代码中使用 JavaBridge

```typescript
// 在主进程中
import { javaBridge } from './bridges/JavaBridge';

// 1. 初始化
await javaBridge.initialize('/path/to/your.jar');

// 2. 调用静态方法
const result = await javaBridge.execute(
  'com.yourcompany.YourClass',
  'yourMethod',
  'param1',
  123,
  true
);

console.log(result); // 方法返回值
```

### 在自己的代码中使用 TypeScriptBridge

```typescript
// 在主进程中
import { typeScriptBridge } from './bridges/TypeScriptBridge';

// 1. 初始化
await typeScriptBridge.initialize('/path/to/your-script.js');

// 2. 执行代码
const result = await typeScriptBridge.execute('yourFunction("param")');

// 3. 注入宿主能力
typeScriptBridge.injectStorageApi({
  createUser: async (id, name, age) => {
    // 你的实现
    return true;
  },
  getUser: async (id) => {
    // 你的实现
    return JSON.stringify({ id, name: 'User', age: 25 });
  },
  updateUser: async (id, newAge) => {
    // 你的实现
    return true;
  },
  deleteUser: async (id) => {
    // 你的实现
    return true;
  }
});

// 4. 执行带宿主能力的代码
const crudResult = await typeScriptBridge.executeWithStorageApi(`
  async function test() {
    await HostStorage.createUser("1001", "Alice", 25);
    const user = await HostStorage.getUser("1001");
    return user;
  }
  test()
`);
```

---

## 🔧 自定义 Java 代码

### 创建自己的 Java 类

1. **创建 Java 源文件**:
   ```java
   // src/main/external-libs/java-src/com/mycompany/MyClass.java
   package com.mycompany;
   
   public class MyClass {
       public static String myMethod(String input) {
           return "Processed: " + input;
       }
   }
   ```

2. **编译**:
   ```bash
   cd src/main/external-libs/java-src
   javac com/mycompany/MyClass.java
   ```

3. **打包为 JAR**:
   ```bash
   jar cvf ../my-library.jar com/mycompany/MyClass.class
   ```

4. **在 Electron 中调用**:
   ```typescript
   await javaBridge.initialize('./src/main/external-libs/my-library.jar');
   const result = await javaBridge.execute('com.mycompany.MyClass', 'myMethod', 'test');
   console.log(result); // "Processed: test"
   ```

---

## 🔧 自定义 TypeScript 代码

### 创建自己的 JS 脚本

1. **创建 JS 文件**:
   ```javascript
   // src/main/external-libs/my-script.js
   
   function processOrder(orderId) {
       console.log('Processing order:', orderId);
       return { orderId, status: 'processed' };
   }
   
   async function createAndQueryUser(id, name) {
       // 使用宿主注入的 HostStorage
       await HostStorage.createUser(id, name, 25);
       const user = await HostStorage.getUser(id);
       return JSON.parse(user);
   }
   ```

2. **在 Electron 中加载和执行**:
   ```typescript
   // 加载脚本
   await typeScriptBridge.initialize('./src/main/external-libs/my-script.js');
   
   // 执行函数
   const order = await typeScriptBridge.execute('processOrder("ORDER-001")');
   console.log(order); // { orderId: 'ORDER-001', status: 'processed' }
   
   // 注入 API 后执行
   typeScriptBridge.injectStorageApi(yourStorageHandler);
   const user = await typeScriptBridge.executeWithStorageApi('createAndQueryUser("1001", "Bob")');
   console.log(user); // { id: '1001', name: 'Bob', age: 25 }
   ```

---

## ⚠️ 常见问题

### 1. Java 初始化失败

**问题**: `Java 未安装或不可用`

**解决方案**:
```bash
# 验证 Java 安装
java -version

# 如果未安装，请安装 JDK
# macOS: brew install openjdk@17
# Windows: 下载并安装 JDK
```

### 2. JAR 文件路径错误

**问题**: `JAR 文件不存在: /path/to/jar`

**解决方案**:
- 使用相对路径: `./src/main/external-libs/hello-java.jar`
- 或使用绝对路径: `resolve(__dirname, './external-libs/hello-java.jar')`

### 3. TypeScript 代码执行失败

**问题**: `HostStorage is not defined`

**解决方案**:
- 确保在执行代码前调用了 `injectStorageApi()`
- 使用 `executeWithStorageApi()` 而不是 `execute()`

### 4. Java 方法找不到

**问题**: `Method not found: myMethod`

**解决方案**:
- 确保方法是 `public static`
- 检查方法名拼写是否正确
- 使用 `jar tf your.jar` 查看 JAR 内容

---

## 📊 性能建议

### Java Bridge

- ✅ 适合低频调用（如配置加载）
- ⚠️ 避免高频调用（每次启动新进程）
- 💡 如需高频调用，考虑改为常驻进程

### TypeScript Bridge

- ✅ 适合高频调用（VM 性能优秀）
- ✅ 适合复杂业务逻辑
- ⚠️ 注意内存占用（避免大量数据在沙箱中）

---

## 🔗 相关文档

- [完整技术报告](./BRIDGE_TEST_REPORT.md)
- [项目规则文档](./CLAUDE.md)
- [Electron 官方文档](https://www.electronjs.org/docs)

---

**最后更新**: 2024-11-25

