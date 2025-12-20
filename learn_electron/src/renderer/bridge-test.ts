/**
 * 跨语言桥接测试逻辑
 */

// 类型定义
declare global {
  interface Window {
    electronAPI: {
      javaBridge: {
        initialize: (jarPath: string) => Promise<any>;
        execute: (className: string, methodName: string, ...args: any[]) => Promise<any>;
        executeWithCallback: (className: string, methodName: string, callback: (msg: string) => void, ...args: any[]) => Promise<any>;
        getStats: () => Promise<any>;
      };
      tsBridge: {
        initialize: (jsPath: string) => Promise<any>;
        execute: (code: string) => Promise<any>;
        injectStorageApi: () => Promise<any>;
        executeWithStorage: (code: string) => Promise<any>;
        getStats: () => Promise<any>;
      };
      navigateToHome: () => Promise<void>;
    };
  }
}

// 状态管理
let javaInitialized = false;
let tsInitialized = false;
let tsApiInjected = false;

// DOM 元素
const output = document.getElementById('output') as HTMLDivElement;
const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;

// Java Bridge 按钮
const javaInitBtn = document.getElementById('javaInitBtn') as HTMLButtonElement;
const javaSayHelloBtn = document.getElementById('javaSayHelloBtn') as HTMLButtonElement;
const javaGetVersionBtn = document.getElementById('javaGetVersionBtn') as HTMLButtonElement;
const javaProcessDataBtn = document.getElementById('javaProcessDataBtn') as HTMLButtonElement;
const javaCallbackBtn = document.getElementById('javaCallbackBtn') as HTMLButtonElement;

// TypeScript Bridge 按钮
const tsInitBtn = document.getElementById('tsInitBtn') as HTMLButtonElement;
const tsSayHelloBtn = document.getElementById('tsSayHelloBtn') as HTMLButtonElement;
const tsGetVersionBtn = document.getElementById('tsGetVersionBtn') as HTMLButtonElement;
const tsProcessDataBtn = document.getElementById('tsProcessDataBtn') as HTMLButtonElement;
const tsInjectApiBtn = document.getElementById('tsInjectApiBtn') as HTMLButtonElement;
const tsCrudDemoBtn = document.getElementById('tsCrudDemoBtn') as HTMLButtonElement;

// 统计显示
const javaInitTime = document.getElementById('javaInitTime') as HTMLDivElement;
const javaExecTime = document.getElementById('javaExecTime') as HTMLDivElement;
const javaCallCount = document.getElementById('javaCallCount') as HTMLDivElement;
const tsInitTime = document.getElementById('tsInitTime') as HTMLDivElement;
const tsExecTime = document.getElementById('tsExecTime') as HTMLDivElement;
const tsCallCount = document.getElementById('tsCallCount') as HTMLDivElement;

// ============= 工具函数 =============

function log(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
  const timestamp = new Date().toLocaleTimeString('zh-CN');
  const line = `<span class="timestamp">[${timestamp}]</span> <span class="${type}">${message}</span>\n`;
  output.innerHTML += line;
  output.scrollTop = output.scrollHeight;
}

function clearOutput(): void {
  output.innerHTML = '';
  log('输出已清空', 'info');
}

function updateJavaStats(): void {
  window.electronAPI.javaBridge.getStats().then((stats) => {
    javaInitTime.textContent = `${stats.initTime}ms`;
    javaExecTime.textContent = `${stats.executeTime}ms`;
    javaCallCount.textContent = `${stats.callCount}`;
  });
}

function updateTsStats(): void {
  window.electronAPI.tsBridge.getStats().then((stats) => {
    tsInitTime.textContent = `${stats.initTime}ms`;
    tsExecTime.textContent = `${stats.executeTime}ms`;
    tsCallCount.textContent = `${stats.callCount}`;
  });
}

// ============= Java Bridge 测试 =============

async function testJavaInit(): Promise<void> {
  log('=== 初始化 Java Bridge ===', 'info');
  javaInitBtn.disabled = true;
  
  try {
    // 使用相对路径
    const jarPath = './src/main/external-libs/hello-java.jar';
    log(`加载 JAR: ${jarPath}`, 'info');
    
    const result = await window.electronAPI.javaBridge.initialize(jarPath);
    
    if (result.success) {
      log('✅ Java Bridge 初始化成功', 'success');
      javaInitialized = true;
      javaInitBtn.classList.add('success');
      
      // 启用其他按钮
      javaSayHelloBtn.disabled = false;
      javaGetVersionBtn.disabled = false;
      javaProcessDataBtn.disabled = false;
      javaCallbackBtn.disabled = false;
      
      updateJavaStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 初始化失败: ${error}`, 'error');
    javaInitBtn.classList.add('error');
    javaInitBtn.disabled = false;
  }
}

async function testJavaSayHello(): Promise<void> {
  log('=== 测试 Java sayHello() ===', 'info');
  
  try {
    const result = await window.electronAPI.javaBridge.execute(
      'com.example.HelloWorld',
      'sayHello',
      'Electron'
    );
    
    if (result.success) {
      log(`✅ 调用成功: ${result.result}`, 'success');
      updateJavaStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testJavaGetVersion(): Promise<void> {
  log('=== 测试 Java getVersion() ===', 'info');
  
  try {
    const result = await window.electronAPI.javaBridge.execute(
      'com.example.HelloWorld',
      'getVersion'
    );
    
    if (result.success) {
      log(`✅ 版本号: ${result.result}`, 'success');
      updateJavaStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testJavaProcessData(): Promise<void> {
  log('=== 测试 Java processData() ===', 'info');
  
  try {
    const result = await window.electronAPI.javaBridge.execute(
      'com.example.HelloWorld',
      'processData',
      25,
      'active'
    );
    
    if (result.success) {
      log(`✅ 处理结果: ${result.result}`, 'success');
      updateJavaStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testJavaCallback(): Promise<void> {
  log('=== 测试 Java 回调机制 ===', 'info');
  
  try {
    await window.electronAPI.javaBridge.executeWithCallback(
      'com.example.HelloWorld',
      'sayHelloWithCallback',
      (msg: string) => {
        log(`📞 收到 Java 回调: ${msg}`, 'success');
      },
      'CallbackTest'
    );
    
    log('✅ 回调方法执行完成', 'success');
    updateJavaStats();
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

// ============= TypeScript Bridge 测试 =============

async function testTsInit(): Promise<void> {
  log('=== 初始化 TypeScript Bridge ===', 'info');
  tsInitBtn.disabled = true;
  
  try {
    const jsPath = './src/main/external-libs/hello.js';
    log(`加载 JS: ${jsPath}`, 'info');
    
    const result = await window.electronAPI.tsBridge.initialize(jsPath);
    
    if (result.success) {
      log('✅ TypeScript Bridge 初始化成功', 'success');
      tsInitialized = true;
      tsInitBtn.classList.add('success');
      
      // 启用其他按钮
      tsSayHelloBtn.disabled = false;
      tsGetVersionBtn.disabled = false;
      tsProcessDataBtn.disabled = false;
      tsInjectApiBtn.disabled = false;
      
      updateTsStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 初始化失败: ${error}`, 'error');
    tsInitBtn.classList.add('error');
    tsInitBtn.disabled = false;
  }
}

async function testTsSayHello(): Promise<void> {
  log('=== 测试 TS sayHello() ===', 'info');
  
  try {
    const result = await window.electronAPI.tsBridge.execute('sayHello("Electron")');
    
    if (result.success) {
      log(`✅ 调用成功: ${result.result}`, 'success');
      updateTsStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testTsGetVersion(): Promise<void> {
  log('=== 测试 TS getVersion() ===', 'info');
  
  try {
    const result = await window.electronAPI.tsBridge.execute('getVersion()');
    
    if (result.success) {
      log(`✅ 版本号: ${result.result}`, 'success');
      updateTsStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testTsProcessData(): Promise<void> {
  log('=== 测试 TS processData() ===', 'info');
  
  try {
    const result = await window.electronAPI.tsBridge.execute('processData(25, "active")');
    
    if (result.success) {
      log(`✅ 处理结果: ${result.result}`, 'success');
      updateTsStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 调用失败: ${error}`, 'error');
  }
}

async function testTsInjectApi(): Promise<void> {
  log('=== 注入存储 API ===', 'info');
  
  try {
    const result = await window.electronAPI.tsBridge.injectStorageApi();
    
    if (result.success) {
      log('✅ 存储 API 注入成功', 'success');
      tsApiInjected = true;
      tsInjectApiBtn.classList.add('success');
      tsCrudDemoBtn.disabled = false;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 注入失败: ${error}`, 'error');
  }
}

async function testTsCrudDemo(): Promise<void> {
  log('=== 测试 CRUD 演示 ===', 'info');
  
  try {
    const result = await window.electronAPI.tsBridge.executeWithStorage('processCrudDemo()');
    
    if (result.success) {
      log('✅ CRUD 演示完成', 'success');
      log(`结果: ${JSON.stringify(result.result, null, 2)}`, 'info');
      updateTsStats();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    log(`❌ 执行失败: ${error}`, 'error');
  }
}

// ============= 事件监听 =============

backBtn.addEventListener('click', () => {
  window.electronAPI.navigateToHome();
});

clearBtn.addEventListener('click', clearOutput);

// Java Bridge 事件
javaInitBtn.addEventListener('click', testJavaInit);
javaSayHelloBtn.addEventListener('click', testJavaSayHello);
javaGetVersionBtn.addEventListener('click', testJavaGetVersion);
javaProcessDataBtn.addEventListener('click', testJavaProcessData);
javaCallbackBtn.addEventListener('click', testJavaCallback);

// TypeScript Bridge 事件
tsInitBtn.addEventListener('click', testTsInit);
tsSayHelloBtn.addEventListener('click', testTsSayHello);
tsGetVersionBtn.addEventListener('click', testTsGetVersion);
tsProcessDataBtn.addEventListener('click', testTsProcessData);
tsInjectApiBtn.addEventListener('click', testTsInjectApi);
tsCrudDemoBtn.addEventListener('click', testTsCrudDemo);

// 初始化
log('📦 跨语言桥接测试就绪', 'info');
log('请先初始化 Java Bridge 和 TypeScript Bridge', 'info');

