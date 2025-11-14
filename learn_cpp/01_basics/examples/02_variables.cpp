#include <iostream>
#include <string>
#include <climits>

int main() {
    std::cout << "=== C++基本数据类型演示 ===" << std::endl;
    
    // 整数类型
    int age = 25;
    short year = 2024;
    long population = 1400000000L;
    long long big_number = 9223372036854775807LL;
    
    // 无符号类型
    unsigned int positive_count = 1000U;
    
    // 浮点类型
    float pi_f = 3.14159f;
    double pi_d = 3.141592653589793;
    
    // 字符类型
    char grade = 'A';
    
    // 布尔类型
    bool is_student = true;
    bool is_working = false;
    
    // 字符串
    std::string name = "张三";
    std::string university = "清华大学";
    
    // 自动类型推导 (C++11)
    auto height = 175.5;  // 推导为double
    auto weight = 70;     // 推导为int
    
    // 常量
    const double GRAVITY = 9.8;
    const int DAYS_IN_WEEK = 7;
    
    // 输出各种类型的值
    std::cout << "\n--- 整数类型 ---" << std::endl;
    std::cout << "年龄 (int): " << age << std::endl;
    std::cout << "年份 (short): " << year << std::endl;
    std::cout << "人口 (long): " << population << std::endl;
    std::cout << "大数字 (long long): " << big_number << std::endl;
    std::cout << "正数计数 (unsigned): " << positive_count << std::endl;
    
    std::cout << "\n--- 浮点类型 ---" << std::endl;
    std::cout << "圆周率 (float): " << pi_f << std::endl;
    std::cout << "圆周率 (double): " << pi_d << std::endl;
    
    std::cout << "\n--- 字符和布尔类型 ---" << std::endl;
    std::cout << "等级 (char): " << grade << std::endl;
    std::cout << "是学生 (bool): " << is_student << std::endl;
    std::cout << "在工作 (bool): " << is_working << std::endl;
    
    std::cout << "\n--- 字符串类型 ---" << std::endl;
    std::cout << "姓名: " << name << std::endl;
    std::cout << "大学: " << university << std::endl;
    
    std::cout << "\n--- 自动类型推导 ---" << std::endl;
    std::cout << "身高 (auto): " << height << std::endl;
    std::cout << "体重 (auto): " << weight << std::endl;
    
    std::cout << "\n--- 常量 ---" << std::endl;
    std::cout << "重力加速度: " << GRAVITY << " m/s²" << std::endl;
    std::cout << "一周天数: " << DAYS_IN_WEEK << " 天" << std::endl;
    
    // 显示类型大小
    std::cout << "\n--- 类型大小 (字节) ---" << std::endl;
    std::cout << "bool: " << sizeof(bool) << std::endl;
    std::cout << "char: " << sizeof(char) << std::endl;
    std::cout << "short: " << sizeof(short) << std::endl;
    std::cout << "int: " << sizeof(int) << std::endl;
    std::cout << "long: " << sizeof(long) << std::endl;
    std::cout << "long long: " << sizeof(long long) << std::endl;
    std::cout << "float: " << sizeof(float) << std::endl;
    std::cout << "double: " << sizeof(double) << std::endl;
    
    // 显示整数类型的范围
    std::cout << "\n--- 整数类型范围 ---" << std::endl;
    std::cout << "int 最小值: " << INT_MIN << std::endl;
    std::cout << "int 最大值: " << INT_MAX << std::endl;
    std::cout << "unsigned int 最大值: " << UINT_MAX << std::endl;
    
    return 0;
}