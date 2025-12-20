/**
 * Java JAR 桥接实现
 * 使用子进程 + Java 命令行实现动态调用
 * 注意：回调机制需要通过临时文件或 HTTP 服务实现
 */

import { spawn } from 'child_process';
import { JavaBridgeInterface, PerformanceStats } from './types';
import { existsSync } from 'fs';
import { resolve } from 'path';

export class JavaBridge implements JavaBridgeInterface {
  private initialized = false;
  private jarPath = '';
  private stats: PerformanceStats = {
    initTime: 0,
    executeTime: 0,
    callCount: 0
  };

  /**
   * 初始化 Java 桥接，加载 JAR 文件
   */
  async initialize(jarPath: string): Promise<void> {
    const startTime = Date.now();
    
    try {
      // 解析为绝对路径
      const absolutePath = resolve(jarPath);
      
      // 验证 JAR 文件存在
      if (!existsSync(absolutePath)) {
        throw new Error(`JAR 文件不存在: ${absolutePath}`);
      }

      console.log(`[JavaBridge] 开始加载 JAR: ${absolutePath}`);

      // 测试 Java 是否可用
      await this.testJava();

      this.jarPath = absolutePath;
      this.initialized = true;
      this.stats.initTime = Date.now() - startTime;
      
      console.log(`[JavaBridge] 初始化成功，耗时: ${this.stats.initTime}ms`);
    } catch (error) {
      this.stats.initTime = Date.now() - startTime;
      console.error('[JavaBridge] 初始化失败:', error);
      throw new Error(`Java 桥接初始化失败: ${error}`);
    }
  }

  /**
   * 执行 Java 静态方法
   */
  async execute(className: string, methodName: string, ...args: any[]): Promise<any> {
    if (!this.initialized) {
      throw new Error('JavaBridge 未初始化，请先调用 initialize()');
    }

    const startTime = Date.now();
    this.stats.callCount++;

    try {
      console.log(`[JavaBridge] 调用方法: ${className}.${methodName}`, args);

      // 构建 Java 代码调用指定方法
      const javaCode = this.buildJavaInvokeCode(className, methodName, args);
      
      // 执行 Java 代码
      const result = await this.executeJavaCode(javaCode);

      this.stats.executeTime = Date.now() - startTime;
      console.log(`[JavaBridge] 调用成功，耗时: ${this.stats.executeTime}ms，结果:`, result);

      return result;
    } catch (error) {
      this.stats.executeTime = Date.now() - startTime;
      console.error('[JavaBridge] 调用失败:', error);
      throw new Error(`Java 方法调用失败: ${error}`);
    }
  }

  /**
   * 执行带回调的 Java 方法
   * 注意：简化实现，通过同步方式模拟回调
   */
  async executeWithCallback(
    className: string,
    methodName: string,
    callback: (msg: string) => void,
    ...args: any[]
  ): Promise<void> {
    if (!this.initialized) {
      throw new Error('JavaBridge 未初始化，请先调用 initialize()');
    }

    const startTime = Date.now();
    this.stats.callCount++;

    try {
      console.log(`[JavaBridge] 调用带回调的方法: ${className}.${methodName}`);

      // 为了简化，我们通过 Java 代码直接处理回调并输出结果
      // 真实场景下可以使用 HTTP 服务或临时文件来实现双向通信
      const javaCode = this.buildJavaCallbackCode(className, methodName, args);
      const result = await this.executeJavaCode(javaCode);

      // 调用回调
      callback(result);

      this.stats.executeTime = Date.now() - startTime;
      console.log(`[JavaBridge] 回调方法执行完成，耗时: ${this.stats.executeTime}ms`);
    } catch (error) {
      this.stats.executeTime = Date.now() - startTime;
      console.error('[JavaBridge] 回调方法调用失败:', error);
      throw new Error(`Java 回调方法调用失败: ${error}`);
    }
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
    this.initialized = false;
    this.jarPath = '';
    console.log('[JavaBridge] 资源已清理');
  }

  /**
   * 测试 Java 是否可用
   */
  private async testJava(): Promise<void> {
    return new Promise((resolve, reject) => {
      const java = spawn('java', ['-version']);
      
      java.on('error', (error) => {
        reject(new Error(`Java 未安装或不可用: ${error.message}`));
      });

      java.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Java 测试失败，退出码: ${code}`));
        }
      });
    });
  }

  /**
   * 构建调用 Java 方法的代码
   */
  private buildJavaInvokeCode(className: string, methodName: string, args: any[]): string {
    return className + '|' + methodName + '|' + args.join('|');
  }

  /**
   * 构建带回调的 Java 调用代码
   * 注意：简化实现，暂不支持真正的回调接口
   */
  private buildJavaCallbackCode(className: string, methodName: string, args: any[]): string {
    return className + '|' + methodName + '|' + args.join('|');
  }

  /**
   * 执行 Java 代码（通过 JavaRunner）
   */
  private async executeJavaCode(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // 解析参数
      const parts = code.split('|');
      const className = parts[0];
      const methodName = parts[1];
      const args = parts.slice(2);

      // 构建 classpath（包含 JAR 和 JavaRunner.class）
      const runnerDir = resolve(this.jarPath, '../java-src');
      const classpath = `${this.jarPath}:${runnerDir}`;

      console.log(`[JavaBridge] 执行 Java: java -cp "${classpath}" JavaRunner ${className} ${methodName} ${args.join(' ')}`);

      const java = spawn('java', ['-cp', classpath, 'JavaRunner', className, methodName, ...args]);

      let stdout = '';
      let stderr = '';

      java.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      java.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      java.on('error', (error) => {
        reject(new Error(`执行失败: ${error.message}`));
      });

      java.on('close', (code) => {
        if (code === 0) {
          resolve(stdout.trim());
        } else {
          reject(new Error(`执行失败 (退出码 ${code}): ${stderr}`));
        }
      });
    });
  }
}

// 导出单例
export const javaBridge = new JavaBridge();

