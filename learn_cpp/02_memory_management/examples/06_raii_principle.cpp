#include <iostream>
#include <fstream>
#include <memory>
#include <vector>
#include <mutex>
#include <thread>
#include <chrono>

// RAII示例1：文件资源管理
class FileManager {
private:
    std::ofstream file;
    std::string filename;
    
public:
    FileManager(const std::string& name) : filename(name) {
        file.open(filename);
        if (file.is_open()) {
            std::cout << "文件 '" << filename << "' 打开成功" << std::endl;
        } else {
            throw std::runtime_error("无法打开文件: " + filename);
        }
    }
    
    ~FileManager() {
        if (file.is_open()) {
            file.close();
            std::cout << "文件 '" << filename << "' 已关闭" << std::endl;
        }
    }
    
    // 禁止拷贝，只允许移动
    FileManager(const FileManager&) = delete;
    FileManager& operator=(const FileManager&) = delete;
    
    FileManager(FileManager&& other) noexcept 
        : file(std::move(other.file)), filename(std::move(other.filename)) {
        std::cout << "FileManager移动构造" << std::endl;
    }
    
    FileManager& operator=(FileManager&& other) noexcept {
        if (this != &other) {
            if (file.is_open()) {
                file.close();
            }
            file = std::move(other.file);
            filename = std::move(other.filename);
            std::cout << "FileManager移动赋值" << std::endl;
        }
        return *this;
    }
    
    void write(const std::string& content) {
        if (file.is_open()) {
            file << content << std::endl;
            std::cout << "写入内容: " << content << std::endl;
        }
    }
    
    void flush() {
        if (file.is_open()) {
            file.flush();
            std::cout << "文件缓冲区已刷新" << std::endl;
        }
    }
};

// RAII示例2：内存资源管理
template<typename T>
class RAIIVector {
private:
    T* data;
    size_t size;
    size_t capacity;
    
public:
    explicit RAIIVector(size_t initial_capacity = 10) 
        : data(nullptr), size(0), capacity(initial_capacity) {
        data = new T[capacity];
        std::cout << "RAIIVector构造，容量: " << capacity << std::endl;
    }
    
    ~RAIIVector() {
        delete[] data;
        std::cout << "RAIIVector析构，释放内存" << std::endl;
    }
    
    // 禁止拷贝，实现移动
    RAIIVector(const RAIIVector&) = delete;
    RAIIVector& operator=(const RAIIVector&) = delete;
    
    RAIIVector(RAIIVector&& other) noexcept 
        : data(other.data), size(other.size), capacity(other.capacity) {
        other.data = nullptr;
        other.size = 0;
        other.capacity = 0;
        std::cout << "RAIIVector移动构造" << std::endl;
    }
    
    RAIIVector& operator=(RAIIVector&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            capacity = other.capacity;
            other.data = nullptr;
            other.size = 0;
            other.capacity = 0;
            std::cout << "RAIIVector移动赋值" << std::endl;
        }
        return *this;
    }
    
    void push_back(const T& item) {
        if (size >= capacity) {
            resize();
        }
        data[size++] = item;
    }
    
    T& operator[](size_t index) {
        if (index >= size) {
            throw std::out_of_range("索引超出范围");
        }
        return data[index];
    }
    
    size_t getSize() const { return size; }
    size_t getCapacity() const { return capacity; }
    
private:
    void resize() {
        size_t new_capacity = capacity * 2;
        T* new_data = new T[new_capacity];
        
        for (size_t i = 0; i < size; ++i) {
            new_data[i] = std::move(data[i]);
        }
        
        delete[] data;
        data = new_data;
        capacity = new_capacity;
        std::cout << "RAIIVector扩容至: " << capacity << std::endl;
    }
};

// RAII示例3：锁资源管理
class Counter {
private:
    mutable std::mutex mtx;
    int value;
    
public:
    Counter() : value(0) {}
    
    void increment() {
        std::lock_guard<std::mutex> lock(mtx);  // RAII锁管理
        ++value;
        std::cout << "计数器递增至: " << value << std::endl;
    }
    
    void decrement() {
        std::lock_guard<std::mutex> lock(mtx);
        --value;
        std::cout << "计数器递减至: " << value << std::endl;
    }
    
    int getValue() const {
        std::lock_guard<std::mutex> lock(mtx);
        return value;
    }
    
    // 复杂操作，演示RAII在异常情况下的安全性
    void complexOperation() {
        std::lock_guard<std::mutex> lock(mtx);
        std::cout << "开始复杂操作，当前值: " << value << std::endl;
        
        // 模拟可能抛出异常的操作
        if (value > 5) {
            throw std::runtime_error("值过大，操作失败");
        }
        
        value *= 2;
        std::cout << "复杂操作完成，新值: " << value << std::endl;
        // lock_guard自动释放锁，即使发生异常
    }
};

// RAII示例4：数据库连接管理
class DatabaseConnection {
private:
    std::string connection_string;
    bool connected;
    
public:
    explicit DatabaseConnection(const std::string& conn_str) 
        : connection_string(conn_str), connected(false) {
        connect();
    }
    
    ~DatabaseConnection() {
        disconnect();
    }
    
    // 禁止拷贝
    DatabaseConnection(const DatabaseConnection&) = delete;
    DatabaseConnection& operator=(const DatabaseConnection&) = delete;
    
    void execute(const std::string& query) {
        if (!connected) {
            throw std::runtime_error("数据库未连接");
        }
        std::cout << "执行查询: " << query << std::endl;
    }
    
    bool isConnected() const { return connected; }
    
private:
    void connect() {
        std::cout << "连接到数据库: " << connection_string << std::endl;
        // 模拟连接过程
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        connected = true;
        std::cout << "数据库连接成功" << std::endl;
    }
    
    void disconnect() {
        if (connected) {
            std::cout << "断开数据库连接" << std::endl;
            connected = false;
        }
    }
};

// RAII示例5：作用域守卫
class ScopeGuard {
private:
    std::function<void()> cleanup;
    bool dismissed;
    
public:
    explicit ScopeGuard(std::function<void()> f) 
        : cleanup(std::move(f)), dismissed(false) {}
    
    ~ScopeGuard() {
        if (!dismissed && cleanup) {
            cleanup();
        }
    }
    
    void dismiss() {
        dismissed = true;
    }
    
    // 禁止拷贝和移动
    ScopeGuard(const ScopeGuard&) = delete;
    ScopeGuard& operator=(const ScopeGuard&) = delete;
    ScopeGuard(ScopeGuard&&) = delete;
    ScopeGuard& operator=(ScopeGuard&&) = delete;
};

// 便利宏，创建作用域守卫
#define SCOPE_GUARD(code) ScopeGuard guard([&]() { code; })

void demonstrateFileRAII();
void demonstrateMemoryRAII();
void demonstrateLockRAII();
void demonstrateDatabaseRAII();
void demonstrateScopeGuard();
void demonstrateRAIIBestPractices();

int main() {
    std::cout << "=== RAII (Resource Acquisition Is Initialization) 原则演示 ===" << std::endl;
    
    demonstrateFileRAII();
    demonstrateMemoryRAII();
    demonstrateLockRAII();
    demonstrateDatabaseRAII();
    demonstrateScopeGuard();
    demonstrateRAIIBestPractices();
    
    return 0;
}

void demonstrateFileRAII() {
    std::cout << "\n--- 文件资源RAII管理 ---" << std::endl;
    
    // 正确的RAII文件管理
    std::cout << "1. 正确的文件RAII:" << std::endl;
    try {
        FileManager file("raii_test.txt");
        file.write("这是RAII测试文件");
        file.write("RAII确保资源正确释放");
        file.flush();
        
        // 即使这里抛出异常，文件也会在析构函数中正确关闭
        // throw std::runtime_error("模拟异常");
        
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
    }
    std::cout << "文件作用域结束，应该已自动关闭" << std::endl;
    
    // 对比：传统C风格的文件管理（容易出错）
    std::cout << "\n2. 传统文件管理的问题:" << std::endl;
    {
        FILE* file = fopen("traditional.txt", "w");
        if (file) {
            fprintf(file, "传统文件管理\n");
            
            // 如果这里发生异常或者忘记fclose，文件不会被关闭
            // 在C++中应该使用RAII避免这种问题
            
            fclose(file);  // 容易忘记或在异常时跳过
            std::cout << "手动关闭文件" << std::endl;
        }
    }
    
    // 移动语义的RAII
    std::cout << "\n3. 支持移动的RAII:" << std::endl;
    try {
        FileManager file1("move_test.txt");
        file1.write("原始文件");
        
        // 移动构造
        FileManager file2 = std::move(file1);
        file2.write("移动后的文件");
        
    } catch (const std::exception& e) {
        std::cout << "文件操作异常: " << e.what() << std::endl;
    }
}

void demonstrateMemoryRAII() {
    std::cout << "\n--- 内存资源RAII管理 ---" << std::endl;
    
    // 自定义RAII内存管理
    std::cout << "1. 自定义RAII向量:" << std::endl;
    {
        RAIIVector<int> vec(5);
        
        for (int i = 0; i < 10; ++i) {
            vec.push_back(i * 10);
        }
        
        std::cout << "向量内容: ";
        for (size_t i = 0; i < vec.getSize(); ++i) {
            std::cout << vec[i] << " ";
        }
        std::cout << std::endl;
        std::cout << "大小: " << vec.getSize() << ", 容量: " << vec.getCapacity() << std::endl;
        
        // 移动操作
        RAIIVector<int> vec2 = std::move(vec);
        std::cout << "移动后 vec2 大小: " << vec2.getSize() << std::endl;
    }  // 自动释放内存
    
    // 智能指针RAII
    std::cout << "\n2. 智能指针RAII:" << std::endl;
    {
        auto ptr = std::make_unique<int[]>(100);
        for (int i = 0; i < 10; ++i) {
            ptr[i] = i;
        }
        
        std::cout << "智能指针数组前5个元素: ";
        for (int i = 0; i < 5; ++i) {
            std::cout << ptr[i] << " ";
        }
        std::cout << std::endl;
    }  // unique_ptr自动释放内存
    
    // 容器的RAII
    std::cout << "\n3. 标准容器RAII:" << std::endl;
    {
        std::vector<std::unique_ptr<int>> ptr_vector;
        for (int i = 0; i < 5; ++i) {
            ptr_vector.push_back(std::make_unique<int>(i * 100));
        }
        
        std::cout << "智能指针向量内容: ";
        for (const auto& ptr : ptr_vector) {
            std::cout << *ptr << " ";
        }
        std::cout << std::endl;
    }  // vector和其中的unique_ptr都自动清理
}

void demonstrateLockRAII() {
    std::cout << "\n--- 锁资源RAII管理 ---" << std::endl;
    
    Counter counter;
    
    // 单线程测试
    std::cout << "1. 单线程锁管理:" << std::endl;
    try {
        counter.increment();
        counter.increment();
        counter.increment();
        
        // 测试异常情况下的锁释放
        counter.complexOperation();  // 应该成功
        
        counter.increment();
        counter.increment();
        counter.increment();
        
        // 这次应该抛出异常
        counter.complexOperation();  // 应该失败
        
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
        std::cout << "即使发生异常，锁也已正确释放" << std::endl;
    }
    
    // 多线程测试
    std::cout << "\n2. 多线程锁管理:" << std::endl;
    std::vector<std::thread> threads;
    
    // 创建多个线程同时操作计数器
    for (int i = 0; i < 3; ++i) {
        threads.emplace_back([&counter, i]() {
            for (int j = 0; j < 3; ++j) {
                if (j % 2 == 0) {
                    counter.increment();
                } else {
                    counter.decrement();
                }
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
        });
    }
    
    // 等待所有线程完成
    for (auto& thread : threads) {
        thread.join();
    }
    
    std::cout << "最终计数器值: " << counter.getValue() << std::endl;
}

void demonstrateDatabaseRAII() {
    std::cout << "\n--- 数据库连接RAII管理 ---" << std::endl;
    
    // 正常的数据库操作
    std::cout << "1. 正常数据库操作:" << std::endl;
    {
        DatabaseConnection db("postgresql://localhost:5432/testdb");
        
        if (db.isConnected()) {
            db.execute("SELECT * FROM users");
            db.execute("INSERT INTO logs VALUES ('RAII test')");
            db.execute("COMMIT");
        }
    }  // 连接自动关闭
    
    // 异常情况下的连接管理
    std::cout << "\n2. 异常情况下的连接管理:" << std::endl;
    try {
        DatabaseConnection db("mysql://localhost:3306/testdb");
        
        db.execute("BEGIN TRANSACTION");
        db.execute("UPDATE balance SET amount = amount - 100 WHERE id = 1");
        
        // 模拟异常
        throw std::runtime_error("网络连接中断");
        
        db.execute("UPDATE balance SET amount = amount + 100 WHERE id = 2");
        db.execute("COMMIT");
        
    } catch (const std::exception& e) {
        std::cout << "数据库操作异常: " << e.what() << std::endl;
        std::cout << "连接会在析构函数中自动关闭" << std::endl;
    }
    
    // 连接池的RAII管理（概念演示）
    std::cout << "\n3. 连接池RAII概念:" << std::endl;
    {
        class ConnectionPool {
        private:
            std::vector<std::unique_ptr<DatabaseConnection>> connections;
            
        public:
            ConnectionPool() {
                std::cout << "初始化连接池" << std::endl;
                // 预创建连接
            }
            
            ~ConnectionPool() {
                std::cout << "销毁连接池，关闭所有连接" << std::endl;
                // unique_ptr自动管理连接
            }
            
            void borrowConnection() {
                std::cout << "借用连接" << std::endl;
            }
            
            void returnConnection() {
                std::cout << "归还连接" << std::endl;
            }
        };
        
        ConnectionPool pool;
        pool.borrowConnection();
        pool.returnConnection();
    }  // 连接池自动清理
}

void demonstrateScopeGuard() {
    std::cout << "\n--- 作用域守卫RAII ---" << std::endl;
    
    // 基本作用域守卫
    std::cout << "1. 基本作用域守卫:" << std::endl;
    {
        std::cout << "进入作用域" << std::endl;
        
        SCOPE_GUARD({
            std::cout << "作用域守卫清理代码执行" << std::endl;
        });
        
        std::cout << "作用域中的代码" << std::endl;
    }  // 守卫在这里执行清理代码
    
    // 带异常的作用域守卫
    std::cout << "\n2. 异常情况下的作用域守卫:" << std::endl;
    try {
        std::cout << "进入可能抛异常的作用域" << std::endl;
        
        ScopeGuard guard([]() {
            std::cout << "异常清理：恢复系统状态" << std::endl;
        });
        
        std::cout << "执行可能失败的操作" << std::endl;
        throw std::runtime_error("模拟操作失败");
        
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
    }
    
    // 可取消的作用域守卫
    std::cout << "\n3. 可取消的作用域守卫:" << std::endl;
    {
        std::cout << "进入条件作用域" << std::endl;
        
        ScopeGuard guard([]() {
            std::cout << "这个清理代码不应该执行" << std::endl;
        });
        
        bool success = true;  // 模拟操作成功
        
        if (success) {
            std::cout << "操作成功，取消清理" << std::endl;
            guard.dismiss();  // 取消清理操作
        }
        
        std::cout << "退出条件作用域" << std::endl;
    }
    
    // 复杂资源管理
    std::cout << "\n4. 复杂资源管理:" << std::endl;
    {
        std::vector<int> temp_data;
        bool data_allocated = false;
        
        ScopeGuard cleanup([&]() {
            if (data_allocated) {
                std::cout << "清理临时数据，大小: " << temp_data.size() << std::endl;
                temp_data.clear();
            }
        });
        
        // 分配资源
        temp_data.resize(1000);
        data_allocated = true;
        std::cout << "分配了临时数据" << std::endl;
        
        // 处理数据
        for (size_t i = 0; i < 10; ++i) {
            temp_data[i] = i;
        }
        
        std::cout << "数据处理完成" << std::endl;
    }  // 自动清理
}

void demonstrateRAIIBestPractices() {
    std::cout << "\n--- RAII最佳实践 ---" << std::endl;
    
    // 1. 总是在构造函数中获取资源
    std::cout << "1. 构造函数获取资源原则:" << std::endl;
    {
        class ResourceManager {
        private:
            std::unique_ptr<int[]> buffer;
            std::ofstream log_file;
            
        public:
            ResourceManager(size_t size, const std::string& log_name) 
                : buffer(std::make_unique<int[]>(size)), log_file(log_name) {
                if (!log_file.is_open()) {
                    throw std::runtime_error("无法打开日志文件");
                }
                std::cout << "ResourceManager: 所有资源获取成功" << std::endl;
            }
            
            ~ResourceManager() {
                std::cout << "ResourceManager: 自动释放所有资源" << std::endl;
                // unique_ptr和ofstream自动清理
            }
            
            void doWork() {
                log_file << "开始工作\n";
                // 使用buffer进行工作
                log_file << "工作完成\n";
            }
        };
        
        try {
            ResourceManager manager(1000, "work.log");
            manager.doWork();
        } catch (const std::exception& e) {
            std::cout << "资源管理异常: " << e.what() << std::endl;
        }
    }
    
    // 2. 避免资源泄漏的模式
    std::cout << "\n2. 避免资源泄漏模式:" << std::endl;
    {
        // 错误模式：先分配再管理
        // auto ptr = new int[100];  // 如果下面的make_unique失败，这里会泄漏
        // auto manager = std::make_unique<int[]>(ptr);  // 错误！
        
        // 正确模式：立即管理
        auto managed_array = std::make_unique<int[]>(100);
        std::cout << "数组已被智能指针管理" << std::endl;
        
        // 或者使用容器
        std::vector<int> safe_vector(100);
        std::cout << "使用容器更安全" << std::endl;
    }
    
    // 3. 异常安全保证
    std::cout << "\n3. 异常安全保证:" << std::endl;
    {
        class ExceptionSafeClass {
        private:
            std::unique_ptr<int[]> data1;
            std::unique_ptr<int[]> data2;
            
        public:
            ExceptionSafeClass(size_t size1, size_t size2) {
                data1 = std::make_unique<int[]>(size1);  // 如果失败，没有资源泄漏
                data2 = std::make_unique<int[]>(size2);  // 如果失败，data1自动清理
                std::cout << "ExceptionSafeClass: 异常安全构造完成" << std::endl;
            }
            
            ~ExceptionSafeClass() {
                std::cout << "ExceptionSafeClass: 自动清理资源" << std::endl;
            }
        };
        
        try {
            ExceptionSafeClass safe_obj(100, 200);
        } catch (const std::exception& e) {
            std::cout << "构造失败: " << e.what() << std::endl;
            // 即使构造失败，也不会有资源泄漏
        }
    }
    
    // 4. 组合RAII对象
    std::cout << "\n4. 组合RAII对象:" << std::endl;
    {
        class ComplexSystem {
        private:
            FileManager config_file;
            DatabaseConnection database;
            RAIIVector<int> cache;
            
        public:
            ComplexSystem() 
                : config_file("system.conf")
                , database("system_db")
                , cache(1000) {
                std::cout << "ComplexSystem: 所有组件初始化完成" << std::endl;
            }
            
            ~ComplexSystem() {
                std::cout << "ComplexSystem: 开始清理所有组件" << std::endl;
                // 析构顺序与构造顺序相反：cache -> database -> config_file
            }
            
            void run() {
                config_file.write("系统启动");
                database.execute("SELECT version()");
                cache.push_back(1);
                cache.push_back(2);
                std::cout << "系统运行中，缓存大小: " << cache.getSize() << std::endl;
            }
        };
        
        try {
            ComplexSystem system;
            system.run();
        } catch (const std::exception& e) {
            std::cout << "系统异常: " << e.what() << std::endl;
        }
    }
    
    std::cout << "\nRAII原则总结:" << std::endl;
    std::cout << "1. 构造函数获取资源，析构函数释放资源" << std::endl;
    std::cout << "2. 资源的生命周期与对象的生命周期绑定" << std::endl;
    std::cout << "3. 异常安全：即使发生异常也能正确清理资源" << std::endl;
    std::cout << "4. 优先使用智能指针和标准容器" << std::endl;
    std::cout << "5. 避免手动new/delete，使用make_unique/make_shared" << std::endl;
}