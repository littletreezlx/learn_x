#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, C++ World!" << std::endl;
    
    std::string name;
    std::cout << "请输入您的姓名: ";
    std::getline(std::cin, name);
    
    std::cout << "你好, " << name << "!" << std::endl;
    std::cout << "欢迎来到C++学习之旅!" << std::endl;
    
    return 0;
}