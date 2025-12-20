/**
 * TypeScript/JavaScript 桥接实现
 * 使用 Node.js 原生 vm 模块实现动态执行和宿主能力注入
 */

import { readFileSync, existsSync } from 'fs';
import { createContext, runInContext, Script } from 'vm';
import { TypeScriptBridgeInterface, StorageApiHandler, PerformanceStats } from './types';

export class TypeScriptBridge implements TypeScriptBridgeInterface {
  private initialized = false;
  private context: any = null;
  private storageHandler: StorageApiHandler | null = null;
  private loadedCode = '';
  private stats: PerformanceStats = {
    initTime: 0,
    executeTime: 0,
    callCount: 0
  };

  /**
   * 初始化 TypeScript 桥接，加载 JS 文件
   */
  async initialize(jsPath: string): Promise<void> {
    const startTime = Date.now();

    try {
      // 验证 JS 文件存在
      if (!existsSync(jsPath)) {
        throw new Error(`JS 文件不存在: ${jsPath}`);
      }

      console.log(`[TypeScriptBridge] 开始加载 JS: ${jsPath}`);

      // 读取文件内容
      this.loadedCode = readFileSync(jsPath, 'utf-8');

      // 创建执行上下文
      this.createExecutionContext();

      // 执行加载的代码（定义函数）
      runInContext(this.loadedCode, this.context);

      this.initialized = true;
      this.stats.initTime = Date.now() - startTime;

      console.log(`[TypeScriptBridge] 初始化成功，耗时: ${this.stats.initTime}ms`);
    } catch (error) {
      this.stats.initTime = Date.now() - startTime;
      console.error('[TypeScriptBridge] 初始化失败:', error);
      throw new Error(`TypeScript 桥接初始化失败: ${error}`);
    }
  }

  /**
   * 执行 JavaScript 代码
   */
  async execute(code: string): Promise<any> {
    if (!this.initialized) {
      throw new Error('TypeScriptBridge 未初始化，请先调用 initialize()');
    }

    const startTime = Date.now();
    this.stats.callCount++;

    try {
      console.log(`[TypeScriptBridge] 执行代码: ${code.substring(0, 50)}...`);

      // 包装异步代码执行
      const wrappedCode = `
        (async () => {
          ${code}
        })()
      `;

      const result = await runInContext(wrappedCode, this.context);

      this.stats.executeTime = Date.now() - startTime;
      console.log(`[TypeScriptBridge] 执行成功，耗时: ${this.stats.executeTime}ms`);

      return result;
    } catch (error) {
      this.stats.executeTime = Date.now() - startTime;
      console.error('[TypeScriptBridge] 执行失败:', error);
      throw new Error(`JavaScript 执行失败: ${error}`);
    }
  }

  /**
   * 注入宿主能力（如存储 API）
   */
  injectStorageApi(handler: StorageApiHandler): void {
    this.storageHandler = handler;
    console.log('[TypeScriptBridge] 存储 API 已注入');

    // 如果已初始化，重新创建上下文以注入 API
    if (this.initialized) {
      this.createExecutionContext();
      // 重新加载之前的代码
      if (this.loadedCode) {
        runInContext(this.loadedCode, this.context);
      }
    }
  }

  /**
   * 执行带宿主能力的 JavaScript 代码
   */
  async executeWithStorageApi(code: string): Promise<any> {
    if (!this.storageHandler) {
      throw new Error('存储 API 未注入，请先调用 injectStorageApi()');
    }

    return this.execute(code);
  }

  /**
   * 获取是否已初始化
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * 获取性能统计
   */
  getStats(): PerformanceStats {
    return { ...this.stats };
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.context = null;
    this.storageHandler = null;
    this.loadedCode = '';
    this.initialized = false;
    console.log('[TypeScriptBridge] 资源已清理');
  }

  /**
   * 创建执行上下文
   */
  private createExecutionContext(): void {
    // 创建沙箱上下文
    const sandbox: any = {
      console: console,
      setTimeout: setTimeout,
      setInterval: setInterval,
      clearTimeout: clearTimeout,
      clearInterval: clearInterval,
      Promise: Promise,
      JSON: JSON,
      Date: Date,
      Math: Math,
      parseInt: parseInt,
      parseFloat: parseFloat,
      isNaN: isNaN,
      isFinite: isFinite,
      String: String,
      Number: Number,
      Boolean: Boolean,
      Array: Array,
      Object: Object,
      Error: Error
    };

    // 如果已注入存储 API，添加到上下文
    if (this.storageHandler) {
      sandbox.HostStorage = {
        createUser: async (id: string, name: string, age: number) => {
          console.log(`[TypeScriptBridge] HostStorage.createUser(${id}, ${name}, ${age})`);
          return await this.storageHandler!.createUser(id, name, age);
        },
        getUser: async (id: string) => {
          console.log(`[TypeScriptBridge] HostStorage.getUser(${id})`);
          return await this.storageHandler!.getUser(id);
        },
        updateUser: async (id: string, newAge: number) => {
          console.log(`[TypeScriptBridge] HostStorage.updateUser(${id}, ${newAge})`);
          return await this.storageHandler!.updateUser(id, newAge);
        },
        deleteUser: async (id: string) => {
          console.log(`[TypeScriptBridge] HostStorage.deleteUser(${id})`);
          return await this.storageHandler!.deleteUser(id);
        }
      };
    }

    this.context = createContext(sandbox);
  }
}

// 导出单例
export const typeScriptBridge = new TypeScriptBridge();

