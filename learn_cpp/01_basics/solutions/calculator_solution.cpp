/*
 * 计算器练习题解答
 * 
 * 学习要点：
 * 1. 函数的声明和定义
 * 2. 输入验证和错误处理
 * 3. 控制流语句 (switch-case, while循环)
 * 4. 字符串和数值类型转换
 * 5. 条件编译和预处理器
 */

#include <iostream>
#include <string>
#include <limits>
#include <iomanip>

class Calculator {
private:
    double num1, num2;
    char operation;
    
public:
    Calculator() : num1(0), num2(0), operation('+') {}
    
    void run() {
        std::cout << "=== 高级命令行计算器 ===" << std::endl;
        showInstructions();
        
        char continueCalc = 'y';
        while (continueCalc == 'y' || continueCalc == 'Y') {
            performCalculation();
            continueCalc = askToContinue();
        }
        
        std::cout << "感谢使用！" << std::endl;
    }
    
private:
    void showInstructions() {
        std::cout << "\n支持的运算:" << std::endl;
        std::cout << "  基本运算: +, -, *, /, %" << std::endl;
        std::cout << "  高级运算: ^(幂), s(平方根)" << std::endl;
    }
    
    void performCalculation() {
        if (!getInputs()) {
            return; // 输入失败
        }
        
        double result = calculate();
        if (!std::isnan(result)) {
            displayResult(result);
        }
    }
    
    bool getInputs() {
        num1 = getNumber("请输入第一个数字: ");
        
        operation = getOperation();
        
        if (operation != 's') { // 平方根只需要一个数字
            num2 = getNumber("请输入第二个数字: ");
        }
        
        return true;
    }
    
    double getNumber(const std::string& prompt) {
        double number;
        while (true) {
            std::cout << prompt;
            if (std::cin >> number) {
                return number;
            } else {
                std::cout << "输入无效！请输入有效数字。" << std::endl;
                clearInput();
            }
        }
    }
    
    char getOperation() {
        char op;
        while (true) {
            std::cout << "请选择运算 (+, -, *, /, %, ^, s): ";
            std::cin >> op;
            
            if (isValidOperation(op)) {
                return op;
            } else {
                std::cout << "无效运算符！" << std::endl;
            }
        }
    }
    
    bool isValidOperation(char op) {
        return (op == '+' || op == '-' || op == '*' || op == '/' || 
                op == '%' || op == '^' || op == 's');
    }
    
    double calculate() {
        switch (operation) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return divide(num1, num2);
            case '%': return modulo(num1, num2);
            case '^': return power(num1, num2);
            case 's': return squareRoot(num1);
            default: 
                std::cout << "未知运算符！" << std::endl;
                return std::numeric_limits<double>::quiet_NaN();
        }
    }
    
    double divide(double a, double b) {
        if (b == 0) {
            std::cout << "错误: 除数不能为零！" << std::endl;
            return std::numeric_limits<double>::quiet_NaN();
        }
        return a / b;
    }
    
    double modulo(double a, double b) {
        if (b == 0) {
            std::cout << "错误: 除数不能为零！" << std::endl;
            return std::numeric_limits<double>::quiet_NaN();
        }
        
        if (a != static_cast<int>(a) || b != static_cast<int>(b)) {
            std::cout << "错误: 取余运算只能用于整数！" << std::endl;
            return std::numeric_limits<double>::quiet_NaN();
        }
        
        return static_cast<int>(a) % static_cast<int>(b);
    }
    
    double power(double base, double exponent) {
        double result = 1.0;
        int exp = static_cast<int>(exponent);
        
        if (exp < 0) {
            if (base == 0) {
                std::cout << "错误: 0不能进行负数次幂运算！" << std::endl;
                return std::numeric_limits<double>::quiet_NaN();
            }
            base = 1.0 / base;
            exp = -exp;
        }
        
        for (int i = 0; i < exp; ++i) {
            result *= base;
        }
        
        return result;
    }
    
    double squareRoot(double number) {
        if (number < 0) {
            std::cout << "错误: 不能计算负数的平方根！" << std::endl;
            return std::numeric_limits<double>::quiet_NaN();
        }
        
        if (number == 0) return 0;
        
        // 使用牛顿法计算平方根
        double guess = number / 2.0;
        double epsilon = 0.000001;
        
        while (true) {
            double better_guess = (guess + number / guess) / 2.0;
            if (abs(guess - better_guess) < epsilon) {
                return better_guess;
            }
            guess = better_guess;
        }
    }
    
    void displayResult(double result) {
        std::cout << std::fixed << std::setprecision(6);
        std::cout << "\n结果: ";
        
        if (operation == 's') {
            std::cout << "√" << num1 << " = " << result << std::endl;
        } else {
            std::cout << num1 << " " << operation << " " << num2 << " = " << result << std::endl;
        }
    }
    
    char askToContinue() {
        char choice;
        std::cout << "\n继续计算? (y/n): ";
        std::cin >> choice;
        clearInput();
        return choice;
    }
    
    void clearInput() {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
    
    double abs(double x) {
        return x < 0 ? -x : x;
    }
};

int main() {
    Calculator calc;
    calc.run();
    return 0;
}

/*
 * 扩展练习建议：
 * 1. 添加三角函数 (sin, cos, tan)
 * 2. 添加对数函数 (log, ln)
 * 3. 支持括号和复杂表达式
 * 4. 添加历史记录功能
 * 5. 支持科学计数法
 * 6. 添加不同进制转换 (二进制、八进制、十六进制)
 */