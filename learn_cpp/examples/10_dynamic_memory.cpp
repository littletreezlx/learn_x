#include <iostream>
#include <string>
#include <vector>

class SimpleClass {
private:
    int value;
    std::string name;
    
public:
    SimpleClass() : value(0), name("默认") {
        std::cout << "SimpleClass默认构造: " << name << std::endl;
    }
    
    SimpleClass(int val, const std::string& n) : value(val), name(n) {
        std::cout << "SimpleClass构造: " << name << " (值: " << value << ")" << std::endl;
    }
    
    ~SimpleClass() {
        std::cout << "SimpleClass析构: " << name << std::endl;
    }
    
    void display() const {
        std::cout << "对象 " << name << " (值: " << value << ") 地址: " << this << std::endl;
    }
    
    int getValue() const { return value; }
    const std::string& getName() const { return name; }
};

void demonstrateBasicAllocation();
void demonstrateArrayAllocation();
void demonstrateObjectAllocation();
void demonstratePlacementNew();
void demonstrateAllocationFailure();

int main() {
    std::cout << "=== C++动态内存分配演示 ===" << std::endl;
    
    demonstrateBasicAllocation();
    demonstrateArrayAllocation();
    demonstrateObjectAllocation();
    demonstratePlacementNew();
    demonstrateAllocationFailure();
    
    return 0;
}

void demonstrateBasicAllocation() {
    std::cout << "\n--- 基本动态分配 ---" << std::endl;
    
    // 单个变量的动态分配
    int* single_int = new int;           // 未初始化
    int* init_int = new int(42);         // 初始化为42
    int* zero_int = new int();           // 零初始化
    
    std::cout << "动态分配的int值:" << std::endl;
    std::cout << "single_int: " << *single_int << " (未初始化，值不确定)" << std::endl;
    std::cout << "init_int: " << *init_int << std::endl;
    std::cout << "zero_int: " << *zero_int << std::endl;
    
    // 修改动态分配的值
    *single_int = 100;
    std::cout << "修改后 single_int: " << *single_int << std::endl;
    
    // 显示地址
    std::cout << "\n地址信息:" << std::endl;
    std::cout << "single_int指向: " << single_int << std::endl;
    std::cout << "init_int指向: " << init_int << std::endl;
    std::cout << "zero_int指向: " << zero_int << std::endl;
    
    // 计算内存间距
    std::cout << "内存间距: " << (char*)init_int - (char*)single_int << " 字节" << std::endl;
    
    // 释放内存
    delete single_int;
    delete init_int;
    delete zero_int;
    
    // 将指针设为nullptr避免悬空指针
    single_int = nullptr;
    init_int = nullptr;
    zero_int = nullptr;
    
    std::cout << "基本分配演示完成" << std::endl;
}

void demonstrateArrayAllocation() {
    std::cout << "\n--- 数组动态分配 ---" << std::endl;
    
    // 动态分配数组
    const int size = 5;
    int* int_array = new int[size];           // 未初始化数组
    int* init_array = new int[size]();        // 零初始化数组
    int* list_array = new int[size]{1, 2, 3, 4, 5};  // 列表初始化
    
    std::cout << "数组分配结果:" << std::endl;
    
    // 初始化未初始化的数组
    for (int i = 0; i < size; ++i) {
        int_array[i] = i * 10;
    }
    
    // 显示数组内容
    std::cout << "int_array: ";
    for (int i = 0; i < size; ++i) {
        std::cout << int_array[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "init_array: ";
    for (int i = 0; i < size; ++i) {
        std::cout << init_array[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "list_array: ";
    for (int i = 0; i < size; ++i) {
        std::cout << list_array[i] << " ";
    }
    std::cout << std::endl;
    
    // 二维数组的动态分配
    std::cout << "\n二维数组动态分配:" << std::endl;
    const int rows = 3, cols = 4;
    
    // 方法1：分配指针数组，然后为每行分配内存
    int** matrix1 = new int*[rows];
    for (int i = 0; i < rows; ++i) {
        matrix1[i] = new int[cols];
        for (int j = 0; j < cols; ++j) {
            matrix1[i][j] = i * cols + j + 1;
        }
    }
    
    std::cout << "matrix1 (指针数组方式):" << std::endl;
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            std::cout << matrix1[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 方法2：分配连续内存块
    int* matrix2 = new int[rows * cols];
    for (int i = 0; i < rows * cols; ++i) {
        matrix2[i] = i + 1;
    }
    
    std::cout << "\nmatrix2 (连续内存方式):" << std::endl;
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            std::cout << matrix2[i * cols + j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 动态大小数组
    std::cout << "\n运行时确定大小的数组:" << std::endl;
    int user_size;
    std::cout << "请输入数组大小: ";
    std::cin >> user_size;
    
    if (user_size > 0 && user_size <= 100) {  // 安全检查
        double* dynamic_array = new double[user_size];
        
        // 初始化数组
        for (int i = 0; i < user_size; ++i) {
            dynamic_array[i] = i * 1.5;
        }
        
        std::cout << "动态大小数组内容: ";
        for (int i = 0; i < user_size; ++i) {
            std::cout << dynamic_array[i] << " ";
        }
        std::cout << std::endl;
        
        delete[] dynamic_array;
    } else {
        std::cout << "无效的数组大小" << std::endl;
    }
    
    // 清理内存
    delete[] int_array;
    delete[] init_array;
    delete[] list_array;
    
    // 清理二维数组
    for (int i = 0; i < rows; ++i) {
        delete[] matrix1[i];
    }
    delete[] matrix1;
    delete[] matrix2;
    
    std::cout << "数组分配演示完成" << std::endl;
}

void demonstrateObjectAllocation() {
    std::cout << "\n--- 对象动态分配 ---" << std::endl;
    
    // 单个对象分配
    SimpleClass* obj1 = new SimpleClass();                    // 默认构造
    SimpleClass* obj2 = new SimpleClass(100, "动态对象1");     // 参数构造
    
    obj1->display();
    obj2->display();
    
    // 对象数组分配
    std::cout << "\n对象数组分配:" << std::endl;
    const int obj_count = 3;
    SimpleClass* obj_array = new SimpleClass[obj_count];  // 调用默认构造函数
    
    std::cout << "对象数组创建完成" << std::endl;
    
    // 显示对象数组
    for (int i = 0; i < obj_count; ++i) {
        std::cout << "obj_array[" << i << "]: ";
        obj_array[i].display();
    }
    
    // 带初始化的对象数组（C++11）
    std::cout << "\n带初始化的对象数组:" << std::endl;
    SimpleClass* init_obj_array = new SimpleClass[3]{
        SimpleClass(1, "第一个"),
        SimpleClass(2, "第二个"),
        SimpleClass(3, "第三个")
    };
    
    for (int i = 0; i < 3; ++i) {
        init_obj_array[i].display();
    }
    
    // 复杂对象的动态分配
    std::cout << "\n复杂对象动态分配:" << std::endl;
    std::vector<int>* vec_ptr = new std::vector<int>{1, 2, 3, 4, 5};
    
    std::cout << "动态vector内容: ";
    for (const auto& val : *vec_ptr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    std::cout << "vector大小: " << vec_ptr->size() << std::endl;
    std::cout << "vector容量: " << vec_ptr->capacity() << std::endl;
    
    // 清理对象内存
    std::cout << "\n开始清理对象内存:" << std::endl;
    delete obj1;
    delete obj2;
    delete[] obj_array;      // 注意：对象数组要用delete[]
    delete[] init_obj_array;
    delete vec_ptr;
    
    std::cout << "对象分配演示完成" << std::endl;
}

void demonstratePlacementNew() {
    std::cout << "\n--- Placement New演示 ---" << std::endl;
    
    // 预先分配一块内存
    const size_t buffer_size = sizeof(SimpleClass) * 3;
    char* buffer = new char[buffer_size];
    
    std::cout << "预分配缓冲区地址: " << (void*)buffer << std::endl;
    std::cout << "缓冲区大小: " << buffer_size << " 字节" << std::endl;
    
    // 使用placement new在指定位置构造对象
    SimpleClass* obj1 = new (buffer) SimpleClass(1, "Placement1");
    SimpleClass* obj2 = new (buffer + sizeof(SimpleClass)) SimpleClass(2, "Placement2");
    
    obj1->display();
    obj2->display();
    
    // 显示对象在缓冲区中的位置
    std::cout << "\n对象在缓冲区中的位置:" << std::endl;
    std::cout << "obj1相对位置: " << (char*)obj1 - buffer << " 字节" << std::endl;
    std::cout << "obj2相对位置: " << (char*)obj2 - buffer << " 字节" << std::endl;
    
    // 手动调用析构函数（placement new需要手动析构）
    std::cout << "\n手动调用析构函数:" << std::endl;
    obj1->~SimpleClass();
    obj2->~SimpleClass();
    
    // 只释放缓冲区，不要delete对象本身
    delete[] buffer;
    
    // 对齐的placement new
    std::cout << "\n对齐的placement new:" << std::endl;
    alignas(SimpleClass) char aligned_buffer[sizeof(SimpleClass)];
    SimpleClass* aligned_obj = new (aligned_buffer) SimpleClass(99, "对齐对象");
    aligned_obj->display();
    aligned_obj->~SimpleClass();
    
    std::cout << "Placement new演示完成" << std::endl;
}

void demonstrateAllocationFailure() {
    std::cout << "\n--- 内存分配失败处理 ---" << std::endl;
    
    // 设置new失败时的行为
    std::cout << "演示new失败处理..." << std::endl;
    
    try {
        // 尝试分配一个巨大的内存块（可能失败）
        size_t huge_size = SIZE_MAX / 2;  // 非常大的内存请求
        std::cout << "尝试分配 " << huge_size << " 字节..." << std::endl;
        
        int* huge_array = new int[huge_size];
        std::cout << "意外成功分配了巨大内存!" << std::endl;
        delete[] huge_array;
        
    } catch (const std::bad_alloc& e) {
        std::cout << "捕获到bad_alloc异常: " << e.what() << std::endl;
    }
    
    // 使用nothrow版本的new
    std::cout << "\n使用nothrow new:" << std::endl;
    size_t large_size = 1000000000;  // 大内存请求
    int* ptr = new(std::nothrow) int[large_size];
    
    if (ptr == nullptr) {
        std::cout << "nothrow new返回nullptr，分配失败" << std::endl;
    } else {
        std::cout << "nothrow new成功分配内存" << std::endl;
        delete[] ptr;
    }
    
    // 正常大小的分配测试
    std::cout << "\n正常大小分配测试:" << std::endl;
    const int normal_size = 1000;
    int* normal_array = new int[normal_size];
    
    if (normal_array != nullptr) {
        std::cout << "成功分配 " << normal_size << " 个int的数组" << std::endl;
        
        // 初始化并验证
        for (int i = 0; i < 10; ++i) {  // 只验证前10个元素
            normal_array[i] = i;
        }
        
        std::cout << "前10个元素: ";
        for (int i = 0; i < 10; ++i) {
            std::cout << normal_array[i] << " ";
        }
        std::cout << std::endl;
        
        delete[] normal_array;
    }
    
    std::cout << "分配失败处理演示完成" << std::endl;
}