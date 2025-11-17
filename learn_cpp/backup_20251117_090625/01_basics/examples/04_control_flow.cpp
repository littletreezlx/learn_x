#include <iostream>
#include <string>

int main() {
    std::cout << "=== C++控制流演示 ===" << std::endl;
    
    // if-else语句
    std::cout << "\n--- if-else语句 ---" << std::endl;
    int score = 85;
    std::cout << "学生成绩: " << score << std::endl;
    
    if (score >= 90) {
        std::cout << "等级: A (优秀)" << std::endl;
    } else if (score >= 80) {
        std::cout << "等级: B (良好)" << std::endl;
    } else if (score >= 70) {
        std::cout << "等级: C (中等)" << std::endl;
    } else if (score >= 60) {
        std::cout << "等级: D (及格)" << std::endl;
    } else {
        std::cout << "等级: F (不及格)" << std::endl;
    }
    
    // switch-case语句
    std::cout << "\n--- switch-case语句 ---" << std::endl;
    char grade = 'B';
    std::cout << "等级: " << grade << std::endl;
    
    switch (grade) {
        case 'A':
            std::cout << "优秀！继续保持！" << std::endl;
            break;
        case 'B':
            std::cout << "良好！再接再厉！" << std::endl;
            break;
        case 'C':
            std::cout << "中等，需要努力！" << std::endl;
            break;
        case 'D':
            std::cout << "及格了，但要加油！" << std::endl;
            break;
        case 'F':
            std::cout << "不及格，需要重修！" << std::endl;
            break;
        default:
            std::cout << "无效的等级！" << std::endl;
            break;
    }
    
    // for循环
    std::cout << "\n--- for循环 ---" << std::endl;
    std::cout << "1到10的数字: ";
    for (int i = 1; i <= 10; ++i) {
        std::cout << i;
        if (i < 10) std::cout << ", ";
    }
    std::cout << std::endl;
    
    // 计算1到100的和
    int sum = 0;
    for (int i = 1; i <= 100; ++i) {
        sum += i;
    }
    std::cout << "1到100的和: " << sum << std::endl;
    
    // while循环
    std::cout << "\n--- while循环 ---" << std::endl;
    int countdown = 5;
    std::cout << "倒计时: ";
    while (countdown > 0) {
        std::cout << countdown << " ";
        --countdown;
    }
    std::cout << "发射！" << std::endl;
    
    // do-while循环
    std::cout << "\n--- do-while循环 ---" << std::endl;
    int number;
    do {
        std::cout << "请输入一个正数 (输入0退出): ";
        std::cin >> number;
        if (number > 0) {
            std::cout << "你输入的正数是: " << number << std::endl;
        } else if (number < 0) {
            std::cout << "这是负数，请输入正数!" << std::endl;
        }
    } while (number != 0);
    std::cout << "程序结束!" << std::endl;
    
    // 嵌套循环 - 打印乘法表
    std::cout << "\n--- 嵌套循环：九九乘法表 ---" << std::endl;
    for (int i = 1; i <= 9; ++i) {
        for (int j = 1; j <= i; ++j) {
            std::cout << j << "*" << i << "=" << (i * j);
            if (j < i) std::cout << "  ";
        }
        std::cout << std::endl;
    }
    
    // break和continue
    std::cout << "\n--- break和continue ---" << std::endl;
    std::cout << "找到第一个能被7整除的两位数: ";
    for (int i = 10; i < 100; ++i) {
        if (i % 2 == 0) {
            continue;  // 跳过偶数
        }
        if (i % 7 == 0) {
            std::cout << i << std::endl;
            break;  // 找到后退出循环
        }
    }
    
    // 范围for循环 (C++11)
    std::cout << "\n--- 范围for循环 (C++11) ---" << std::endl;
    int numbers[] = {1, 2, 3, 4, 5};
    std::cout << "数组元素: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::string word = "C++";
    std::cout << "字符串 \"" << word << "\" 的字符: ";
    for (char c : word) {
        std::cout << c << " ";
    }
    std::cout << std::endl;
    
    return 0;
}