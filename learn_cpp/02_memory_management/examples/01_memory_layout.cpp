#include <iostream>
#include <string>

// 全局变量 - 存储在全局/静态区
int global_var = 100;
static int static_global = 200;

// 全局常量 - 通常存储在只读数据段
const int global_const = 300;

// 函数声明
void demonstrateStack();
void demonstrateHeap();
void analyzeAddresses();

int main() {
    std::cout << "=== C++内存布局演示 ===" << std::endl;
    
    analyzeAddresses();
    demonstrateStack();
    demonstrateHeap();
    
    return 0;
}

void analyzeAddresses() {
    std::cout << "\n--- 内存地址分析 ---" << std::endl;
    
    // 局部变量 - 存储在栈上
    int local_var = 10;
    static int static_local = 20;  // 静态局部变量 - 存储在静态区
    
    // 动态分配 - 存储在堆上
    int* heap_var = new int(30);
    
    // 显示各种变量的地址
    std::cout << "=== 内存地址比较 ===" << std::endl;
    std::cout << "栈区域:" << std::endl;
    std::cout << "  local_var地址:     " << &local_var << std::endl;
    std::cout << "  main函数地址:      " << (void*)main << std::endl;
    
    std::cout << "\n全局/静态区域:" << std::endl;
    std::cout << "  global_var地址:    " << &global_var << std::endl;
    std::cout << "  static_global地址: " << &static_global << std::endl;
    std::cout << "  static_local地址:  " << &static_local << std::endl;
    std::cout << "  global_const地址:  " << &global_const << std::endl;
    
    std::cout << "\n堆区域:" << std::endl;
    std::cout << "  heap_var指向:      " << heap_var << std::endl;
    std::cout << "  heap_var地址:      " << &heap_var << std::endl;
    
    // 分析地址范围
    std::cout << "\n=== 内存布局分析 ===" << std::endl;
    
    uintptr_t stack_addr = reinterpret_cast<uintptr_t>(&local_var);
    uintptr_t global_addr = reinterpret_cast<uintptr_t>(&global_var);
    uintptr_t heap_addr = reinterpret_cast<uintptr_t>(heap_var);
    uintptr_t code_addr = reinterpret_cast<uintptr_t>(main);
    
    std::cout << "栈地址:   0x" << std::hex << stack_addr << std::dec << std::endl;
    std::cout << "全局地址: 0x" << std::hex << global_addr << std::dec << std::endl;
    std::cout << "堆地址:   0x" << std::hex << heap_addr << std::dec << std::endl;
    std::cout << "代码地址: 0x" << std::hex << code_addr << std::dec << std::endl;
    
    // 清理堆内存
    delete heap_var;
    heap_var = nullptr;
}

void demonstrateStack() {
    std::cout << "\n--- 栈内存演示 ---" << std::endl;
    
    // 局部变量自动分配在栈上
    int stack_array[5] = {1, 2, 3, 4, 5};
    char stack_buffer[100];
    std::string stack_string = "栈上的字符串";
    
    std::cout << "栈变量地址:" << std::endl;
    std::cout << "  stack_array:  " << stack_array << std::endl;
    std::cout << "  stack_buffer: " << (void*)stack_buffer << std::endl;
    std::cout << "  stack_string: " << &stack_string << std::endl;
    
    // 显示栈地址的连续性
    std::cout << "\n栈地址连续性:" << std::endl;
    for (int i = 0; i < 5; ++i) {
        std::cout << "  stack_array[" << i << "]: " << &stack_array[i] 
                  << " (值: " << stack_array[i] << ")" << std::endl;
    }
    
    // 递归调用显示栈的增长
    static int depth = 0;
    if (depth < 3) {
        depth++;
        int nested_var = depth * 10;
        std::cout << "\n递归深度 " << depth << ", nested_var地址: " << &nested_var << std::endl;
        demonstrateStack();
        depth--;
    }
}

void demonstrateHeap() {
    std::cout << "\n--- 堆内存演示 ---" << std::endl;
    
    // 动态分配单个对象
    int* single_int = new int(42);
    std::cout << "单个int分配: " << single_int << " (值: " << *single_int << ")" << std::endl;
    
    // 动态分配数组
    int* int_array = new int[10];
    for (int i = 0; i < 10; ++i) {
        int_array[i] = i * i;
    }
    
    std::cout << "数组分配: " << int_array << std::endl;
    std::cout << "数组元素地址:" << std::endl;
    for (int i = 0; i < 5; ++i) {
        std::cout << "  int_array[" << i << "]: " << &int_array[i] 
                  << " (值: " << int_array[i] << ")" << std::endl;
    }
    
    // 动态分配字符串
    std::string* heap_string = new std::string("堆上的字符串");
    std::cout << "字符串对象: " << heap_string << " (内容: " << *heap_string << ")" << std::endl;
    
    // 显示内存分配的随机性
    std::cout << "\n多次分配显示堆的非连续性:" << std::endl;
    int* ptrs[5];
    for (int i = 0; i < 5; ++i) {
        ptrs[i] = new int(i);
        std::cout << "  分配" << i << ": " << ptrs[i] << std::endl;
    }
    
    // 内存大小分析
    std::cout << "\n=== 内存使用分析 ===" << std::endl;
    std::cout << "基本类型大小:" << std::endl;
    std::cout << "  int: " << sizeof(int) << " 字节" << std::endl;
    std::cout << "  int*: " << sizeof(int*) << " 字节" << std::endl;
    std::cout << "  std::string: " << sizeof(std::string) << " 字节" << std::endl;
    
    std::cout << "数组大小:" << std::endl;
    std::cout << "  10个int: " << 10 * sizeof(int) << " 字节" << std::endl;
    
    // 清理所有堆内存
    std::cout << "\n清理堆内存..." << std::endl;
    delete single_int;
    delete[] int_array;
    delete heap_string;
    
    for (int i = 0; i < 5; ++i) {
        delete ptrs[i];
    }
    
    std::cout << "堆内存清理完成" << std::endl;
}

// 演示不同存储类别的变量
class MemoryDemo {
public:
    static int static_member;    // 静态成员变量 - 存储在静态区
    int instance_member;         // 实例成员变量 - 随对象存储
    
    MemoryDemo(int val) : instance_member(val) {
        std::cout << "MemoryDemo对象创建，地址: " << this << std::endl;
        std::cout << "  instance_member地址: " << &instance_member << std::endl;
        std::cout << "  static_member地址: " << &static_member << std::endl;
    }
    
    void showAddresses() {
        int local_in_method = 999;
        std::cout << "方法内局部变量地址: " << &local_in_method << std::endl;
    }
};

// 静态成员定义
int MemoryDemo::static_member = 888;

// 在main函数的最后添加类演示
static void demonstrateClassMemory() {
    std::cout << "\n--- 类内存布局演示 ---" << std::endl;
    
    // 栈上的对象
    MemoryDemo stack_obj(100);
    stack_obj.showAddresses();
    
    // 堆上的对象
    MemoryDemo* heap_obj = new MemoryDemo(200);
    heap_obj->showAddresses();
    
    delete heap_obj;
}