#include <iostream>
#include <string>

// 函数参数中的引用
void increment(int& ref) {
    ++ref;
}

void printInfo(const std::string& name) {
    std::cout << "姓名: " << name << std::endl;
}

// 返回引用的函数
int& getElement(int arr[], int index) {
    return arr[index];
}

int main() {
    std::cout << "=== C++引用演示 ===" << std::endl;
    
    // 基本引用概念
    std::cout << "\n--- 基本引用概念 ---" << std::endl;
    int original = 100;
    int& ref = original;  // ref是original的引用（别名）
    
    std::cout << "original = " << original << std::endl;
    std::cout << "ref = " << ref << std::endl;
    std::cout << "original的地址: " << &original << std::endl;
    std::cout << "ref的地址: " << &ref << std::endl;
    std::cout << "地址相同吗? " << (&original == &ref ? "是" : "否") << std::endl;
    
    // 通过引用修改值
    std::cout << "\n--- 通过引用修改值 ---" << std::endl;
    std::cout << "修改前: original=" << original << ", ref=" << ref << std::endl;
    ref = 200;  // 通过引用修改原变量
    std::cout << "修改后: original=" << original << ", ref=" << ref << std::endl;
    
    // 引用与指针的对比
    std::cout << "\n--- 引用与指针的对比 ---" << std::endl;
    int value = 50;
    
    // 使用指针
    int* ptr = &value;
    std::cout << "通过指针: *ptr = " << *ptr << std::endl;
    *ptr = 60;
    std::cout << "修改后: value = " << value << std::endl;
    
    // 使用引用
    int& value_ref = value;
    std::cout << "通过引用: value_ref = " << value_ref << std::endl;
    value_ref = 70;
    std::cout << "修改后: value = " << value << std::endl;
    
    // 引用的特性
    std::cout << "\n--- 引用的特性 ---" << std::endl;
    
    // 1. 引用必须在声明时初始化
    int x = 10;
    int& x_ref = x;  // 必须初始化
    // int& bad_ref;  // 错误！引用必须初始化
    
    // 2. 引用不能重新绑定
    int y = 20;
    std::cout << "x=" << x << ", y=" << y << std::endl;
    std::cout << "x_ref=" << x_ref << " (引用x)" << std::endl;
    x_ref = y;  // 这不是重新绑定，而是将y的值赋给x
    std::cout << "x_ref=y后: x=" << x << ", x_ref=" << x_ref << std::endl;
    
    // 3. 引用不能指向引用（没有"引用的引用"）
    // int&& double_ref = x_ref;  // 这在C++11中是右值引用，不是引用的引用
    
    // 函数参数中的引用
    std::cout << "\n--- 函数参数中的引用 ---" << std::endl;
    int counter = 5;
    std::cout << "调用increment前: counter = " << counter << std::endl;
    increment(counter);
    std::cout << "调用increment后: counter = " << counter << std::endl;
    
    // const引用
    std::cout << "\n--- const引用 ---" << std::endl;
    const int& const_ref = x;
    std::cout << "const引用: const_ref = " << const_ref << std::endl;
    // const_ref = 100;  // 错误！不能通过const引用修改值
    
    // const引用可以绑定到临时对象
    const int& temp_ref = 42;  // 临时对象的生命周期被延长
    std::cout << "绑定到临时值: temp_ref = " << temp_ref << std::endl;
    
    // 字符串的const引用（避免拷贝）
    std::string long_string = "这是一个很长的字符串，用引用传递可以避免拷贝";
    printInfo(long_string);  // 传递const引用，不拷贝字符串
    
    // 返回引用的函数
    std::cout << "\n--- 返回引用的函数 ---" << std::endl;
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << "数组: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    getElement(arr, 2) = 99;  // 通过返回的引用修改数组元素
    std::cout << "修改arr[2]后: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    // 引用作为类成员
    std::cout << "\n--- 引用的使用场景 ---" << std::endl;
    std::cout << "1. 函数参数（避免拷贝大对象）" << std::endl;
    std::cout << "2. 函数返回值（链式调用）" << std::endl;
    std::cout << "3. 范围for循环中修改元素" << std::endl;
    
    int numbers[] = {1, 2, 3, 4, 5};
    std::cout << "修改前: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 使用引用修改数组元素
    for (int& num : numbers) {
        num *= 2;
    }
    
    std::cout << "修改后: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}