#include <iostream>

int main() {
    std::cout << "=== C++指针入门演示 ===" << std::endl;
    
    // 基本指针概念
    std::cout << "\n--- 基本指针概念 ---" << std::endl;
    int number = 42;
    int* ptr = &number;  // ptr是一个指向int的指针，存储number的地址
    
    std::cout << "变量 number 的值: " << number << std::endl;
    std::cout << "变量 number 的地址: " << &number << std::endl;
    std::cout << "指针 ptr 的值(存储的地址): " << ptr << std::endl;
    std::cout << "指针 ptr 指向的值: " << *ptr << std::endl;
    std::cout << "指针 ptr 自身的地址: " << &ptr << std::endl;
    
    // 通过指针修改值
    std::cout << "\n--- 通过指针修改值 ---" << std::endl;
    std::cout << "修改前 number = " << number << std::endl;
    *ptr = 100;  // 通过指针修改number的值
    std::cout << "通过指针修改后 number = " << number << std::endl;
    
    // 空指针
    std::cout << "\n--- 空指针 ---" << std::endl;
    int* null_ptr = nullptr;  // C++11推荐使用nullptr
    int* old_null = NULL;     // 传统方式
    int* zero_ptr = 0;        // 也可以用0
    
    std::cout << "nullptr: " << null_ptr << std::endl;
    std::cout << "NULL: " << old_null << std::endl;
    std::cout << "0: " << zero_ptr << std::endl;
    
    // 检查指针是否为空
    if (null_ptr == nullptr) {
        std::cout << "null_ptr 是空指针" << std::endl;
    }
    
    // 指针算术
    std::cout << "\n--- 指针算术 ---" << std::endl;
    int arr[] = {10, 20, 30, 40, 50};
    int* arr_ptr = arr;  // 数组名就是指向第一个元素的指针
    
    std::cout << "数组元素通过指针访问:" << std::endl;
    for (int i = 0; i < 5; ++i) {
        std::cout << "arr[" << i << "] = " << *(arr_ptr + i) << std::endl;
    }
    
    // 指针自增
    std::cout << "\n通过指针遍历数组:" << std::endl;
    int* current = arr;
    for (int i = 0; i < 5; ++i) {
        std::cout << "*current = " << *current << ", 地址: " << current << std::endl;
        ++current;  // 指针指向下一个元素
    }
    
    // 指针与数组的关系
    std::cout << "\n--- 指针与数组的关系 ---" << std::endl;
    std::cout << "arr = " << arr << std::endl;
    std::cout << "&arr[0] = " << &arr[0] << std::endl;
    std::cout << "arr + 1 = " << (arr + 1) << std::endl;
    std::cout << "&arr[1] = " << &arr[1] << std::endl;
    
    // 指针指向指针
    std::cout << "\n--- 指针指向指针 ---" << std::endl;
    int value = 123;
    int* ptr1 = &value;
    int** ptr2 = &ptr1;  // ptr2是指向指针的指针
    
    std::cout << "value = " << value << std::endl;
    std::cout << "*ptr1 = " << *ptr1 << std::endl;
    std::cout << "**ptr2 = " << **ptr2 << std::endl;
    std::cout << "ptr1 = " << ptr1 << std::endl;
    std::cout << "*ptr2 = " << *ptr2 << std::endl;
    
    // const和指针
    std::cout << "\n--- const和指针 ---" << std::endl;
    int a = 10, b = 20;
    
    // 指向常量的指针
    const int* ptr_to_const = &a;
    std::cout << "指向常量的指针: *ptr_to_const = " << *ptr_to_const << std::endl;
    // *ptr_to_const = 30;  // 错误！不能通过指针修改值
    ptr_to_const = &b;      // 可以指向别的变量
    std::cout << "指向b后: *ptr_to_const = " << *ptr_to_const << std::endl;
    
    // 常量指针
    int* const const_ptr = &a;
    std::cout << "常量指针: *const_ptr = " << *const_ptr << std::endl;
    *const_ptr = 30;        // 可以修改指向的值
    // const_ptr = &b;      // 错误！不能修改指针本身
    std::cout << "修改值后: *const_ptr = " << *const_ptr << std::endl;
    
    // 指向常量的常量指针
    const int* const const_ptr_to_const = &b;
    std::cout << "指向常量的常量指针: *const_ptr_to_const = " << *const_ptr_to_const << std::endl;
    // *const_ptr_to_const = 40;  // 错误！不能修改值
    // const_ptr_to_const = &a;   // 错误！不能修改指针
    
    // 动态内存分配入门
    std::cout << "\n--- 动态内存分配入门 ---" << std::endl;
    int* dynamic_ptr = new int(99);  // 在堆上分配内存
    std::cout << "动态分配的值: " << *dynamic_ptr << std::endl;
    delete dynamic_ptr;  // 释放内存
    dynamic_ptr = nullptr;  // 避免悬空指针
    
    // 动态数组
    int size = 5;
    int* dynamic_array = new int[size]{1, 2, 3, 4, 5};
    std::cout << "动态数组元素: ";
    for (int i = 0; i < size; ++i) {
        std::cout << dynamic_array[i] << " ";
    }
    std::cout << std::endl;
    delete[] dynamic_array;  // 释放数组内存
    
    return 0;
}