/**
 * 跨语言桥接类型定义
 */

// ============= 存储 API 接口 =============
export interface StorageApiHandler {
  /**
   * 创建用户
   */
  createUser(id: string, name: string, age: number): Promise<boolean>;
  
  /**
   * 查询用户
   */
  getUser(id: string): Promise<string>;
  
  /**
   * 更新用户年龄
   */
  updateUser(id: string, newAge: number): Promise<boolean>;
  
  /**
   * 删除用户
   */
  deleteUser(id: string): Promise<boolean>;
}

// ============= Java Bridge 接口 =============
export interface JavaBridgeInterface {
  /**
   * 初始化 Java 桥接，加载 JAR 文件
   */
  initialize(jarPath: string): Promise<void>;
  
  /**
   * 执行 Java 静态方法
   * @param className 完整类名，如 "com.example.HelloWorld"
   * @param methodName 方法名
   * @param args 方法参数
   */
  execute(className: string, methodName: string, ...args: any[]): Promise<any>;
  
  /**
   * 执行带回调的 Java 方法
   * @param className 完整类名
   * @param methodName 方法名
   * @param callback 回调函数
   * @param args 其他参数
   */
  executeWithCallback(
    className: string,
    methodName: string,
    callback: (msg: string) => void,
    ...args: any[]
  ): Promise<void>;
  
  /**
   * 获取是否已初始化
   */
  isInitialized(): boolean;
  
  /**
   * 清理资源
   */
  dispose(): void;
}

// ============= TypeScript Bridge 接口 =============
export interface TypeScriptBridgeInterface {
  /**
   * 初始化 TypeScript 桥接，加载 JS 文件
   */
  initialize(jsPath: string): Promise<void>;
  
  /**
   * 执行 JavaScript 代码
   */
  execute(code: string): Promise<any>;
  
  /**
   * 注入宿主能力（如存储 API）
   */
  injectStorageApi(handler: StorageApiHandler): void;
  
  /**
   * 执行带宿主能力的 JavaScript 代码
   */
  executeWithStorageApi(code: string): Promise<any>;
  
  /**
   * 获取是否已初始化
   */
  isInitialized(): boolean;
  
  /**
   * 清理资源
   */
  dispose(): void;
}

// ============= 测试结果类型 =============
export interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  duration?: number;
}

// ============= 性能统计 =============
export interface PerformanceStats {
  initTime: number;      // 初始化耗时
  executeTime: number;   // 执行耗时
  callCount: number;     // 调用次数
}

