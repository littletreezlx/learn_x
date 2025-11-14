#include <iostream>
#include <string>
#include <limits>

// 函数声明
void showMenu();
double getNumber(const std::string& prompt);
char getOperation();
double calculate(double a, double b, char op);
bool isValidOperation(char op);

int main() {
    std::cout << "=== 简单命令行计算器 ===" << std::endl;
    std::cout << "这是一个练习项目，用于巩固C++基础知识" << std::endl;
    
    char continueCalc = 'y';
    
    do {
        showMenu();
        
        // 获取第一个数字
        double num1 = getNumber("请输入第一个数字: ");
        
        // 获取运算符
        char operation = getOperation();
        
        // 获取第二个数字
        double num2 = getNumber("请输入第二个数字: ");
        
        // 进行计算
        double result = calculate(num1, num2, operation);
        
        // 显示结果
        if (result != std::numeric_limits<double>::quiet_NaN()) {
            std::cout << "\n结果: " << num1 << " " << operation << " " << num2 << " = " << result << std::endl;
        }
        
        // 询问是否继续
        std::cout << "\n是否继续计算? (y/n): ";
        std::cin >> continueCalc;
        
        // 清理输入缓冲区
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        
        std::cout << std::endl;
        
    } while (continueCalc == 'y' || continueCalc == 'Y');
    
    std::cout << "感谢使用计算器！再见！" << std::endl;
    return 0;
}

void showMenu() {
    std::cout << "\n支持的运算符:" << std::endl;
    std::cout << "  + : 加法" << std::endl;
    std::cout << "  - : 减法" << std::endl;
    std::cout << "  * : 乘法" << std::endl;
    std::cout << "  / : 除法" << std::endl;
    std::cout << "  % : 取余 (仅整数)" << std::endl;
    std::cout << std::endl;
}

double getNumber(const std::string& prompt) {
    double number;
    
    while (true) {
        std::cout << prompt;
        
        if (std::cin >> number) {
            // 成功读取数字
            break;
        } else {
            // 输入无效
            std::cout << "输入无效！请输入一个有效的数字。" << std::endl;
            
            // 清理错误状态和输入缓冲区
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        }
    }
    
    return number;
}

char getOperation() {
    char op;
    
    while (true) {
        std::cout << "请选择运算符 (+, -, *, /, %): ";
        std::cin >> op;
        
        if (isValidOperation(op)) {
            break;
        } else {
            std::cout << "无效的运算符！请选择 +, -, *, /, % 中的一个。" << std::endl;
        }
    }
    
    return op;
}

bool isValidOperation(char op) {
    return (op == '+' || op == '-' || op == '*' || op == '/' || op == '%');
}

double calculate(double a, double b, char op) {
    switch (op) {
        case '+':
            return a + b;
            
        case '-':
            return a - b;
            
        case '*':
            return a * b;
            
        case '/':
            if (b == 0) {
                std::cout << "错误: 除数不能为零！" << std::endl;
                return std::numeric_limits<double>::quiet_NaN();
            }
            return a / b;
            
        case '%':
            if (b == 0) {
                std::cout << "错误: 除数不能为零！" << std::endl;
                return std::numeric_limits<double>::quiet_NaN();
            }
            
            // 检查是否为整数
            if (a != static_cast<int>(a) || b != static_cast<int>(b)) {
                std::cout << "错误: 取余运算只能用于整数！" << std::endl;
                return std::numeric_limits<double>::quiet_NaN();
            }
            
            return static_cast<int>(a) % static_cast<int>(b);
            
        default:
            std::cout << "错误: 未知的运算符！" << std::endl;
            return std::numeric_limits<double>::quiet_NaN();
    }
}