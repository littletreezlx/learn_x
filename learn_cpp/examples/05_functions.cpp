#include <iostream>
#include <string>
#include <cmath>

// 函数声明
int add(int a, int b);
void printInfo(const std::string& name, int age = 25);  // 默认参数
double calculateArea(double radius);
void swapByValue(int a, int b);
void swapByReference(int& a, int& b);
void swapByPointer(int* a, int* b);

// 函数重载
int multiply(int a, int b);
double multiply(double a, double b);
int multiply(int a, int b, int c);

// 递归函数
long factorial(int n);
int fibonacci(int n);

int main() {
    std::cout << "=== C++函数演示 ===" << std::endl;
    
    // 基本函数调用
    std::cout << "\n--- 基本函数调用 ---" << std::endl;
    int result = add(10, 20);
    std::cout << "add(10, 20) = " << result << std::endl;
    
    // 默认参数
    std::cout << "\n--- 默认参数 ---" << std::endl;
    printInfo("张三");           // 使用默认年龄
    printInfo("李四", 30);       // 指定年龄
    
    // 几何计算
    std::cout << "\n--- 函数应用：几何计算 ---" << std::endl;
    double radius = 5.0;
    double area = calculateArea(radius);
    std::cout << "半径为 " << radius << " 的圆的面积: " << area << std::endl;
    
    // 参数传递方式对比
    std::cout << "\n--- 参数传递方式对比 ---" << std::endl;
    int x = 10, y = 20;
    std::cout << "交换前: x=" << x << ", y=" << y << std::endl;
    
    // 值传递 - 不会改变原变量
    swapByValue(x, y);
    std::cout << "值传递后: x=" << x << ", y=" << y << " (无变化)" << std::endl;
    
    // 引用传递 - 会改变原变量
    swapByReference(x, y);
    std::cout << "引用传递后: x=" << x << ", y=" << y << " (已交换)" << std::endl;
    
    // 指针传递 - 会改变原变量
    swapByPointer(&x, &y);
    std::cout << "指针传递后: x=" << x << ", y=" << y << " (再次交换)" << std::endl;
    
    // 函数重载
    std::cout << "\n--- 函数重载 ---" << std::endl;
    std::cout << "multiply(3, 4) = " << multiply(3, 4) << std::endl;
    std::cout << "multiply(3.5, 2.0) = " << multiply(3.5, 2.0) << std::endl;
    std::cout << "multiply(2, 3, 4) = " << multiply(2, 3, 4) << std::endl;
    
    // 递归函数
    std::cout << "\n--- 递归函数 ---" << std::endl;
    int n = 5;
    std::cout << n << "! = " << factorial(n) << std::endl;
    
    std::cout << "斐波那契数列前10项: ";
    for (int i = 0; i < 10; ++i) {
        std::cout << fibonacci(i) << " ";
    }
    std::cout << std::endl;
    
    return 0;
}

// 函数定义
int add(int a, int b) {
    return a + b;
}

void printInfo(const std::string& name, int age) {
    std::cout << "姓名: " << name << ", 年龄: " << age << std::endl;
}

double calculateArea(double radius) {
    const double PI = 3.14159265359;
    return PI * radius * radius;
}

void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    std::cout << "函数内部交换后: a=" << a << ", b=" << b << std::endl;
}

void swapByReference(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

void swapByPointer(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 函数重载实现
int multiply(int a, int b) {
    return a * b;
}

double multiply(double a, double b) {
    return a * b;
}

int multiply(int a, int b, int c) {
    return a * b * c;
}

// 递归函数实现
long factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}