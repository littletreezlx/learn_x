#include <iostream>
#include <string>
#include <vector>

// 用于演示的简单类
class Resource {
private:
    int* data;
    size_t size;
    std::string name;
    
public:
    Resource(const std::string& n, size_t s) : name(n), size(s) {
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = i;
        }
        std::cout << "Resource '" << name << "' 创建，分配 " << size << " 个int" << std::endl;
    }
    
    ~Resource() {
        delete[] data;
        std::cout << "Resource '" << name << "' 销毁，释放内存" << std::endl;
    }
    
    void display() const {
        std::cout << "Resource '" << name << "' 数据: ";
        for (size_t i = 0; i < std::min(size, size_t(5)); ++i) {
            std::cout << data[i] << " ";
        }
        if (size > 5) std::cout << "...";
        std::cout << std::endl;
    }
    
    // 危险的函数，返回内部指针
    int* getData() { return data; }
    size_t getSize() const { return size; }
};

// 各种内存错误演示函数
void demonstrateMemoryLeaks();
void demonstrateDanglingPointers();
void demonstrateDoubleFree();
void demonstrateBufferOverflow();
void demonstrateUninitializedMemory();
void demonstrateWrongDelete();
void demonstratePreventionTechniques();

int main() {
    std::cout << "=== C++常见内存错误演示 ===" << std::endl;
    std::cout << "⚠️  警告：本程序故意包含内存错误用于教学演示" << std::endl;
    std::cout << "    在实际编程中应该避免这些错误！" << std::endl;
    
    demonstrateMemoryLeaks();
    demonstrateDanglingPointers();
    demonstrateDoubleFree();
    demonstrateBufferOverflow();
    demonstrateUninitializedMemory();
    demonstrateWrongDelete();
    demonstratePreventionTechniques();
    
    return 0;
}

void demonstrateMemoryLeaks() {
    std::cout << "\n--- 内存泄漏演示 ---" << std::endl;
    
    // 错误示例1：忘记释放动态分配的内存
    std::cout << "错误1：忘记释放内存" << std::endl;
    {
        int* leaked_ptr = new int[1000];  // 分配内存
        for (int i = 0; i < 10; ++i) {
            leaked_ptr[i] = i;
        }
        std::cout << "分配了1000个int，但忘记释放..." << std::endl;
        // 函数结束时，leaked_ptr超出作用域，但内存没有被释放
        // delete[] leaked_ptr;  // 应该有这行
    }
    
    // 错误示例2：异常导致的内存泄漏
    std::cout << "\n错误2：异常导致的内存泄漏" << std::endl;
    try {
        int* exception_ptr = new int[500];
        std::cout << "分配了500个int" << std::endl;
        
        // 模拟异常
        if (true) {  // 总是为真，模拟异常条件
            throw std::runtime_error("模拟异常");
        }
        
        delete[] exception_ptr;  // 这行永远不会执行
        
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
        std::cout << "内存未被释放！" << std::endl;
    }
    
    // 错误示例3：循环中的内存泄漏
    std::cout << "\n错误3：循环中的内存泄漏" << std::endl;
    for (int i = 0; i < 5; ++i) {
        int* loop_ptr = new int[100];  // 每次循环都分配
        std::cout << "循环 " << i << ": 分配100个int" << std::endl;
        // 忘记在循环中释放内存
        // delete[] loop_ptr;  // 应该有这行
    }
    
    // 错误示例4：对象内存泄漏
    std::cout << "\n错误4：对象内存泄漏" << std::endl;
    {
        Resource* resource = new Resource("泄漏的资源", 200);
        resource->display();
        // 忘记delete resource，导致对象和其内部分配的内存都泄漏
    }
    
    std::cout << "内存泄漏演示完成（实际程序中应避免这些错误）" << std::endl;
}

void demonstrateDanglingPointers() {
    std::cout << "\n--- 悬空指针演示 ---" << std::endl;
    
    // 错误示例1：使用已释放的内存
    std::cout << "错误1：使用已释放的内存" << std::endl;
    int* ptr = new int(42);
    std::cout << "分配并初始化: *ptr = " << *ptr << std::endl;
    
    delete ptr;  // 释放内存
    std::cout << "内存已释放，但ptr仍指向原地址: " << ptr << std::endl;
    
    // 危险：访问已释放的内存
    // std::cout << "*ptr = " << *ptr << std::endl;  // 未定义行为！
    std::cout << "⚠️  访问*ptr现在是未定义行为（已注释掉）" << std::endl;
    
    // 错误示例2：函数返回局部变量的地址
    std::cout << "\n错误2：返回局部变量地址" << std::endl;
    
    auto getDanglingPointer = []() -> int* {
        int local_var = 100;
        return &local_var;  // 危险：返回局部变量地址
    };
    
    int* dangling = getDanglingPointer();
    std::cout << "获取到悬空指针: " << dangling << std::endl;
    // std::cout << "*dangling = " << *dangling << std::endl;  // 未定义行为！
    std::cout << "⚠️  访问*dangling是未定义行为（已注释掉）" << std::endl;
    
    // 错误示例3：数组越界后的悬空引用
    std::cout << "\n错误3：容器失效后的悬空指针" << std::endl;
    int* element_ptr = nullptr;
    {
        std::vector<int> vec = {1, 2, 3, 4, 5};
        element_ptr = &vec[2];  // 获取vector元素的地址
        std::cout << "vector中的元素: *element_ptr = " << *element_ptr << std::endl;
    }  // vec超出作用域，被销毁
    
    std::cout << "vector已销毁，element_ptr成为悬空指针" << std::endl;
    // std::cout << "*element_ptr = " << *element_ptr << std::endl;  // 未定义行为！
    
    // 正确做法：将指针设为nullptr
    ptr = nullptr;
    element_ptr = nullptr;
    std::cout << "正确做法：释放后将指针设为nullptr" << std::endl;
}

void demonstrateDoubleFree() {
    std::cout << "\n--- 重复释放错误演示 ---" << std::endl;
    
    // 错误示例1：重复delete
    std::cout << "错误1：重复delete同一指针" << std::endl;
    int* ptr = new int(123);
    std::cout << "分配内存: *ptr = " << *ptr << std::endl;
    
    delete ptr;
    std::cout << "第一次delete完成" << std::endl;
    
    // delete ptr;  // 危险：重复delete！
    std::cout << "⚠️  第二次delete会导致未定义行为（已注释掉）" << std::endl;
    
    // 错误示例2：多个指针指向同一内存
    std::cout << "\n错误2：多个指针指向同一内存" << std::endl;
    int* ptr1 = new int(456);
    int* ptr2 = ptr1;  // 两个指针指向同一内存
    
    std::cout << "ptr1和ptr2指向同一内存" << std::endl;
    std::cout << "*ptr1 = " << *ptr1 << ", *ptr2 = " << *ptr2 << std::endl;
    
    delete ptr1;
    std::cout << "删除ptr1指向的内存" << std::endl;
    
    // delete ptr2;  // 危险：ptr2指向已释放的内存！
    std::cout << "⚠️  删除ptr2会导致重复释放（已注释掉）" << std::endl;
    
    // 正确做法
    ptr1 = nullptr;
    ptr2 = nullptr;
    
    // 错误示例3：条件分支中的重复释放
    std::cout << "\n错误3：条件分支中的重复释放" << std::endl;
    int* conditional_ptr = new int(789);
    bool condition = true;
    
    if (condition) {
        delete conditional_ptr;
        std::cout << "条件分支中释放了内存" << std::endl;
    }
    
    // 如果忘记检查是否已释放
    if (conditional_ptr != nullptr) {  // 这个检查是不够的！
        // delete conditional_ptr;  // 可能重复释放
        std::cout << "⚠️  这里可能重复释放（已注释掉）" << std::endl;
    }
    
    conditional_ptr = nullptr;  // 正确做法
}

void demonstrateBufferOverflow() {
    std::cout << "\n--- 缓冲区溢出演示 ---" << std::endl;
    
    // 错误示例1：数组越界写入
    std::cout << "错误1：数组越界写入" << std::endl;
    int* buffer = new int[5];
    
    std::cout << "正常写入前5个元素:" << std::endl;
    for (int i = 0; i < 5; ++i) {
        buffer[i] = i * 10;
        std::cout << "buffer[" << i << "] = " << buffer[i] << std::endl;
    }
    
    std::cout << "⚠️  越界写入（在安全的演示环境中）:" << std::endl;
    // 在实际程序中，这会导致严重问题！
    // buffer[5] = 999;  // 越界写入！
    // buffer[10] = 888; // 更严重的越界！
    std::cout << "已注释掉危险的越界写入代码" << std::endl;
    
    delete[] buffer;
    
    // 错误示例2：字符串缓冲区溢出
    std::cout << "\n错误2：字符串缓冲区溢出" << std::endl;
    char* str_buffer = new char[10];
    
    // 安全的字符串操作
    std::cout << "安全的字符串复制:" << std::endl;
    strncpy(str_buffer, "Hello", 9);
    str_buffer[9] = '\0';  // 确保null终止
    std::cout << "str_buffer: " << str_buffer << std::endl;
    
    // 危险的操作（已注释）
    // strcpy(str_buffer, "This string is too long for the buffer");  // 溢出！
    std::cout << "⚠️  strcpy长字符串会导致溢出（已注释掉）" << std::endl;
    
    delete[] str_buffer;
    
    // 错误示例3：栈缓冲区溢出
    std::cout << "\n错误3：栈缓冲区溢出演示" << std::endl;
    char stack_buffer[20];
    
    std::cout << "安全的栈缓冲区使用:" << std::endl;
    snprintf(stack_buffer, sizeof(stack_buffer), "Safe string");
    std::cout << "stack_buffer: " << stack_buffer << std::endl;
    
    // 展示正确的边界检查
    const char* long_string = "This is a very long string that exceeds buffer size";
    size_t copy_length = std::min(strlen(long_string), sizeof(stack_buffer) - 1);
    strncpy(stack_buffer, long_string, copy_length);
    stack_buffer[copy_length] = '\0';
    std::cout << "截断后的字符串: " << stack_buffer << std::endl;
}

void demonstrateUninitializedMemory() {
    std::cout << "\n--- 未初始化内存演示 ---" << std::endl;
    
    // 错误示例1：使用未初始化的动态内存
    std::cout << "错误1：未初始化的动态内存" << std::endl;
    int* uninit_ptr = new int;  // 未初始化
    std::cout << "未初始化的值: " << *uninit_ptr << " (值不确定)" << std::endl;
    
    // 正确做法
    int* init_ptr = new int(0);  // 显式初始化
    std::cout << "显式初始化的值: " << *init_ptr << std::endl;
    
    delete uninit_ptr;
    delete init_ptr;
    
    // 错误示例2：未初始化的数组
    std::cout << "\n错误2：未初始化的数组" << std::endl;
    int* uninit_array = new int[5];  // 未初始化
    
    std::cout << "未初始化数组的值: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << uninit_array[i] << " ";
    }
    std::cout << " (值不确定)" << std::endl;
    
    // 正确做法
    int* init_array = new int[5]();  // 零初始化
    std::cout << "零初始化数组的值: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << init_array[i] << " ";
    }
    std::cout << std::endl;
    
    delete[] uninit_array;
    delete[] init_array;
    
    // 错误示例3：局部变量未初始化
    std::cout << "\n错误3：局部变量未初始化" << std::endl;
    {
        int uninit_local;  // 未初始化
        std::cout << "未初始化局部变量: " << uninit_local << " (值不确定)" << std::endl;
        
        int init_local = 0;  // 正确初始化
        std::cout << "初始化局部变量: " << init_local << std::endl;
    }
}

void demonstrateWrongDelete() {
    std::cout << "\n--- 错误的delete使用演示 ---" << std::endl;
    
    // 错误示例1：new[]与delete不匹配
    std::cout << "错误1：new[]与delete不匹配" << std::endl;
    int* array = new int[10];
    for (int i = 0; i < 10; ++i) {
        array[i] = i;
    }
    
    // delete array;    // 错误！应该用delete[]
    delete[] array;     // 正确
    std::cout << "已使用正确的delete[]释放数组" << std::endl;
    
    // 错误示例2：删除栈上的对象
    std::cout << "\n错误2：尝试删除栈对象" << std::endl;
    {
        int stack_var = 100;
        int* stack_ptr = &stack_var;
        std::cout << "栈变量地址: " << stack_ptr << std::endl;
        
        // delete stack_ptr;  // 错误！不能删除栈上的对象
        std::cout << "⚠️  不能delete栈对象（已注释掉）" << std::endl;
    }
    
    // 错误示例3：删除已经在栈上析构的对象
    std::cout << "\n错误3：混合栈和堆对象管理" << std::endl;
    Resource* resource_ptr = nullptr;
    {
        Resource stack_resource("栈资源", 50);
        resource_ptr = &stack_resource;
        stack_resource.display();
    }  // stack_resource在这里自动析构
    
    // delete resource_ptr;  // 错误！对象已经析构
    std::cout << "⚠️  栈对象已自动析构，不能再delete（已注释掉）" << std::endl;
    
    // 正确的堆对象管理
    std::cout << "\n正确的堆对象管理:" << std::endl;
    Resource* heap_resource = new Resource("堆资源", 100);
    heap_resource->display();
    delete heap_resource;  // 正确
}

void demonstratePreventionTechniques() {
    std::cout << "\n--- 内存错误预防技术 ---" << std::endl;
    
    // 技术1：RAII (Resource Acquisition Is Initialization)
    std::cout << "技术1：RAII - 使用智能指针" << std::endl;
    {
        std::unique_ptr<int[]> smart_array(new int[100]);
        for (int i = 0; i < 10; ++i) {
            smart_array[i] = i * i;
        }
        std::cout << "智能指针数组前5个元素: ";
        for (int i = 0; i < 5; ++i) {
            std::cout << smart_array[i] << " ";
        }
        std::cout << std::endl;
        // 自动释放，无需手动delete
    }
    
    // 技术2：使用标准容器
    std::cout << "\n技术2：使用标准容器替代原始数组" << std::endl;
    {
        std::vector<int> safe_vector(100);
        for (size_t i = 0; i < 10; ++i) {
            safe_vector[i] = i * 2;
        }
        std::cout << "vector前5个元素: ";
        for (size_t i = 0; i < 5; ++i) {
            std::cout << safe_vector[i] << " ";
        }
        std::cout << std::endl;
        // vector自动管理内存
    }
    
    // 技术3：初始化所有变量
    std::cout << "\n技术3：总是初始化变量" << std::endl;
    {
        int initialized_var = 0;
        int* initialized_ptr = nullptr;
        std::cout << "初始化变量: " << initialized_var << std::endl;
        std::cout << "初始化指针: " << initialized_ptr << std::endl;
    }
    
    // 技术4：使用现代C++特性
    std::cout << "\n技术4：使用现代C++特性" << std::endl;
    {
        // 使用make_unique
        auto resource = std::make_unique<Resource>("现代资源", 50);
        resource->display();
        
        // 使用std::string替代char*
        std::string safe_string = "安全的字符串";
        std::cout << "安全字符串: " << safe_string << std::endl;
        
        // 使用范围for循环
        std::vector<int> numbers = {1, 2, 3, 4, 5};
        std::cout << "范围for循环: ";
        for (const auto& num : numbers) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
    
    std::cout << "\n内存错误预防技术演示完成" << std::endl;
    std::cout << "记住：预防胜于治疗！" << std::endl;
}