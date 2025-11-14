#include <iostream>

void demonstrateBasicArithmetic();
void demonstrateArrayAccess();
void demonstratePointerComparison();
void demonstrateMultiLevelPointers();
void demonstrateFunctionPointers();

int main() {
    std::cout << "=== C++指针算术演示 ===" << std::endl;
    
    demonstrateBasicArithmetic();
    demonstrateArrayAccess();
    demonstratePointerComparison();
    demonstrateMultiLevelPointers();
    demonstrateFunctionPointers();
    
    return 0;
}

void demonstrateBasicArithmetic() {
    std::cout << "\n--- 基本指针算术 ---" << std::endl;
    
    int numbers[] = {10, 20, 30, 40, 50};
    int* ptr = numbers;  // 指向数组第一个元素
    
    std::cout << "数组: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n指针算术演示:" << std::endl;
    std::cout << "ptr指向: " << ptr << ", 值: " << *ptr << std::endl;
    
    // 指针递增
    ptr++;
    std::cout << "ptr++后: " << ptr << ", 值: " << *ptr << std::endl;
    
    // 指针加法
    ptr = ptr + 2;
    std::cout << "ptr+2后: " << ptr << ", 值: " << *ptr << std::endl;
    
    // 指针递减
    ptr--;
    std::cout << "ptr--后: " << ptr << ", 值: " << *ptr << std::endl;
    
    // 指针减法
    ptr = ptr - 1;
    std::cout << "ptr-1后: " << ptr << ", 值: " << *ptr << std::endl;
    
    // 计算指针之间的距离
    int* start = numbers;
    int* end = numbers + 4;
    std::cout << "\n指针距离: end - start = " << (end - start) << " 个元素" << std::endl;
    std::cout << "字节距离: " << (char*)end - (char*)start << " 字节" << std::endl;
    
    // 不同类型的指针算术
    std::cout << "\n不同类型的指针步长:" << std::endl;
    
    char chars[] = {'a', 'b', 'c', 'd'};
    char* char_ptr = chars;
    std::cout << "char指针: " << (void*)char_ptr << " -> " << (void*)(char_ptr + 1) 
              << " (步长: " << sizeof(char) << ")" << std::endl;
    
    double doubles[] = {1.1, 2.2, 3.3};
    double* double_ptr = doubles;
    std::cout << "double指针: " << double_ptr << " -> " << (double_ptr + 1) 
              << " (步长: " << sizeof(double) << ")" << std::endl;
}

void demonstrateArrayAccess() {
    std::cout << "\n--- 数组访问的多种方式 ---" << std::endl;
    
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    std::cout << "二维数组内容:" << std::endl;
    
    // 方式1：传统数组访问
    std::cout << "方式1 - 数组下标:" << std::endl;
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 4; ++j) {
            std::cout << matrix[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 方式2：指针算术访问
    std::cout << "\n方式2 - 指针算术:" << std::endl;
    int* flat_ptr = (int*)matrix;  // 将二维数组看作一维
    for (int i = 0; i < 12; ++i) {
        std::cout << *(flat_ptr + i) << " ";
        if ((i + 1) % 4 == 0) std::cout << std::endl;
    }
    
    // 方式3：行指针
    std::cout << "\n方式3 - 行指针:" << std::endl;
    int (*row_ptr)[4] = matrix;  // 指向包含4个int的数组的指针
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 4; ++j) {
            std::cout << (*(row_ptr + i))[j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 方式4：指针的指针
    std::cout << "\n方式4 - 动态二维数组访问:" << std::endl;
    
    // 创建动态二维数组
    int** dynamic_matrix = new int*[3];
    for (int i = 0; i < 3; ++i) {
        dynamic_matrix[i] = new int[4];
        for (int j = 0; j < 4; ++j) {
            dynamic_matrix[i][j] = matrix[i][j];
        }
    }
    
    // 访问动态数组
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 4; ++j) {
            std::cout << dynamic_matrix[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 清理动态数组
    for (int i = 0; i < 3; ++i) {
        delete[] dynamic_matrix[i];
    }
    delete[] dynamic_matrix;
}

void demonstratePointerComparison() {
    std::cout << "\n--- 指针比较和关系运算 ---" << std::endl;
    
    int array[5] = {1, 2, 3, 4, 5};
    int* ptr1 = array;
    int* ptr2 = array + 2;
    int* ptr3 = array + 4;
    
    std::cout << "ptr1指向array[0]: " << ptr1 << " (值: " << *ptr1 << ")" << std::endl;
    std::cout << "ptr2指向array[2]: " << ptr2 << " (值: " << *ptr2 << ")" << std::endl;
    std::cout << "ptr3指向array[4]: " << ptr3 << " (值: " << *ptr3 << ")" << std::endl;
    
    // 指针比较
    std::cout << "\n指针比较结果:" << std::endl;
    std::cout << "ptr1 == ptr2: " << (ptr1 == ptr2) << std::endl;
    std::cout << "ptr1 < ptr2:  " << (ptr1 < ptr2) << std::endl;
    std::cout << "ptr2 < ptr3:  " << (ptr2 < ptr3) << std::endl;
    std::cout << "ptr1 <= ptr3: " << (ptr1 <= ptr3) << std::endl;
    
    // 使用指针比较进行数组遍历
    std::cout << "\n使用指针比较遍历数组:" << std::endl;
    int* current = array;
    int* end = array + 5;
    
    while (current < end) {
        std::cout << "地址: " << current << ", 值: " << *current << std::endl;
        ++current;
    }
    
    // 指针的安全检查
    std::cout << "\n指针安全检查:" << std::endl;
    int* safe_ptr = array + 2;
    
    if (safe_ptr >= array && safe_ptr < array + 5) {
        std::cout << "safe_ptr在数组范围内，值: " << *safe_ptr << std::endl;
    } else {
        std::cout << "safe_ptr超出数组范围！" << std::endl;
    }
}

void demonstrateMultiLevelPointers() {
    std::cout << "\n--- 多级指针演示 ---" << std::endl;
    
    int value = 100;
    int* ptr1 = &value;           // 一级指针
    int** ptr2 = &ptr1;           // 二级指针
    int*** ptr3 = &ptr2;          // 三级指针
    
    std::cout << "多级指针关系:" << std::endl;
    std::cout << "value = " << value << ", 地址: " << &value << std::endl;
    std::cout << "ptr1 = " << ptr1 << ", *ptr1 = " << *ptr1 << ", 地址: " << &ptr1 << std::endl;
    std::cout << "ptr2 = " << ptr2 << ", *ptr2 = " << *ptr2 << ", **ptr2 = " << **ptr2 << ", 地址: " << &ptr2 << std::endl;
    std::cout << "ptr3 = " << ptr3 << ", *ptr3 = " << *ptr3 << ", **ptr3 = " << **ptr3 << ", ***ptr3 = " << ***ptr3 << std::endl;
    
    // 通过多级指针修改值
    std::cout << "\n通过三级指针修改原始值:" << std::endl;
    ***ptr3 = 200;
    std::cout << "修改后 value = " << value << std::endl;
    
    // 动态分配的多级指针
    std::cout << "\n动态多级指针数组:" << std::endl;
    
    // 创建指针数组
    const int rows = 3;
    const int cols = 4;
    int** matrix = new int*[rows];
    
    for (int i = 0; i < rows; ++i) {
        matrix[i] = new int[cols];
        for (int j = 0; j < cols; ++j) {
            matrix[i][j] = i * cols + j + 1;
        }
    }
    
    // 显示矩阵
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            std::cout << matrix[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    // 显示地址信息
    std::cout << "\n地址信息:" << std::endl;
    std::cout << "matrix (指针数组地址): " << matrix << std::endl;
    for (int i = 0; i < rows; ++i) {
        std::cout << "matrix[" << i << "] (行" << i << "地址): " << matrix[i] << std::endl;
    }
    
    // 清理内存
    for (int i = 0; i < rows; ++i) {
        delete[] matrix[i];
    }
    delete[] matrix;
}

// 示例函数，用于函数指针演示
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int subtract(int a, int b) {
    return a - b;
}

void demonstrateFunctionPointers() {
    std::cout << "\n--- 函数指针演示 ---" << std::endl;
    
    // 函数指针的声明和初始化
    int (*operation)(int, int) = add;
    
    std::cout << "函数指针基本用法:" << std::endl;
    std::cout << "add(5, 3) = " << operation(5, 3) << std::endl;
    
    // 改变函数指针指向
    operation = multiply;
    std::cout << "multiply(5, 3) = " << operation(5, 3) << std::endl;
    
    operation = subtract;
    std::cout << "subtract(5, 3) = " << operation(5, 3) << std::endl;
    
    // 函数指针数组
    std::cout << "\n函数指针数组:" << std::endl;
    int (*operations[])(int, int) = {add, subtract, multiply};
    const char* op_names[] = {"加法", "减法", "乘法"};
    
    int x = 10, y = 4;
    for (int i = 0; i < 3; ++i) {
        std::cout << op_names[i] << ": " << x << " 和 " << y << " = " 
                  << operations[i](x, y) << std::endl;
    }
    
    // 使用typedef简化函数指针声明
    typedef int (*BinaryOp)(int, int);
    BinaryOp current_op = add;
    
    std::cout << "\n使用typedef的函数指针:" << std::endl;
    std::cout << "current_op(7, 8) = " << current_op(7, 8) << std::endl;
    
    // 函数指针作为参数
    auto calculator = [](int a, int b, BinaryOp op) -> int {
        return op(a, b);
    };
    
    std::cout << "\n函数指针作为参数:" << std::endl;
    std::cout << "calculator(6, 9, add) = " << calculator(6, 9, add) << std::endl;
    std::cout << "calculator(6, 9, multiply) = " << calculator(6, 9, multiply) << std::endl;
}