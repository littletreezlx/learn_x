#include <iostream>
#include <string>

// 定义自己的命名空间
namespace MathUtils {
    const double PI = 3.14159265359;
    
    double add(double a, double b) {
        return a + b;
    }
    
    double multiply(double a, double b) {
        return a * b;
    }
    
    double circleArea(double radius) {
        return PI * radius * radius;
    }
}

namespace StringUtils {
    std::string toUpper(const std::string& str) {
        std::string result = str;
        for (char& c : result) {
            if (c >= 'a' && c <= 'z') {
                c = c - 'a' + 'A';
            }
        }
        return result;
    }
    
    std::string toLower(const std::string& str) {
        std::string result = str;
        for (char& c : result) {
            if (c >= 'A' && c <= 'Z') {
                c = c - 'A' + 'a';
            }
        }
        return result;
    }
    
    int length(const std::string& str) {
        return str.length();
    }
}

// 嵌套命名空间
namespace Company {
    namespace Engineering {
        namespace Backend {
            void deployService() {
                std::cout << "部署后端服务..." << std::endl;
            }
        }
        
        namespace Frontend {
            void buildApp() {
                std::cout << "构建前端应用..." << std::endl;
            }
        }
    }
    
    namespace Marketing {
        void launchCampaign() {
            std::cout << "启动营销活动..." << std::endl;
        }
    }
}

// 命名空间别名
namespace Math = MathUtils;
namespace Str = StringUtils;

int main() {
    std::cout << "=== C++命名空间演示 ===" << std::endl;
    
    // 使用std命名空间的不同方式
    std::cout << "\n--- std命名空间的使用 ---" << std::endl;
    std::cout << "使用 std::cout 输出" << std::endl;
    
    // 使用using声明
    using std::string;
    string message = "这是一个字符串";
    std::cout << "使用using声明: " << message << std::endl;
    
    // 自定义命名空间的使用
    std::cout << "\n--- 自定义命名空间 ---" << std::endl;
    
    // 完全限定名
    double result1 = MathUtils::add(10.5, 20.3);
    std::cout << "MathUtils::add(10.5, 20.3) = " << result1 << std::endl;
    
    double area = MathUtils::circleArea(5.0);
    std::cout << "圆的面积 (半径=5): " << area << std::endl;
    std::cout << "PI的值: " << MathUtils::PI << std::endl;
    
    // 字符串工具
    string text = "Hello World";
    std::cout << "\n原始字符串: " << text << std::endl;
    std::cout << "转大写: " << StringUtils::toUpper(text) << std::endl;
    std::cout << "转小写: " << StringUtils::toLower(text) << std::endl;
    std::cout << "长度: " << StringUtils::length(text) << std::endl;
    
    // 使用using指令
    std::cout << "\n--- 使用using指令 ---" << std::endl;
    {
        using namespace MathUtils;
        double result2 = add(5.5, 3.2);  // 不需要MathUtils::前缀
        std::cout << "在using namespace后: add(5.5, 3.2) = " << result2 << std::endl;
        std::cout << "PI = " << PI << std::endl;
    }
    
    // 嵌套命名空间的使用
    std::cout << "\n--- 嵌套命名空间 ---" << std::endl;
    Company::Engineering::Backend::deployService();
    Company::Engineering::Frontend::buildApp();
    Company::Marketing::launchCampaign();
    
    // 命名空间别名的使用
    std::cout << "\n--- 命名空间别名 ---" << std::endl;
    double result3 = Math::multiply(4.0, 6.0);
    std::cout << "使用别名Math: multiply(4.0, 6.0) = " << result3 << std::endl;
    
    string upper_text = Str::toUpper("cpp programming");
    std::cout << "使用别名Str: toUpper('cpp programming') = " << upper_text << std::endl;
    
    // 全局命名空间
    std::cout << "\n--- 全局命名空间 ---" << std::endl;
    std::cout << "如果有全局函数，可以用 ::functionName() 访问" << std::endl;
    
    // 匿名命名空间示例（文件内部链接）
    namespace {
        int internal_counter = 0;
        void incrementCounter() {
            ++internal_counter;
        }
    }
    
    incrementCounter();
    std::cout << "匿名命名空间中的计数器: " << internal_counter << std::endl;
    
    return 0;
}