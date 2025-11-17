#include <iostream>

int main() {
    std::cout << "=== C++运算符演示 ===" << std::endl;
    
    // 算术运算符
    int a = 10, b = 3;
    std::cout << "\n--- 算术运算符 (a=" << a << ", b=" << b << ") ---" << std::endl;
    std::cout << "a + b = " << (a + b) << std::endl;
    std::cout << "a - b = " << (a - b) << std::endl;
    std::cout << "a * b = " << (a * b) << std::endl;
    std::cout << "a / b = " << (a / b) << " (整数除法)" << std::endl;
    std::cout << "a % b = " << (a % b) << " (取余)" << std::endl;
    std::cout << "a / (double)b = " << (a / (double)b) << " (浮点除法)" << std::endl;
    
    // 递增递减运算符
    int x = 5;
    std::cout << "\n--- 递增递减运算符 (x=" << x << ") ---" << std::endl;
    std::cout << "x++ = " << x++ << " (后递增, x现在是 " << x << ")" << std::endl;
    std::cout << "++x = " << ++x << " (前递增, x现在是 " << x << ")" << std::endl;
    std::cout << "x-- = " << x-- << " (后递减, x现在是 " << x << ")" << std::endl;
    std::cout << "--x = " << --x << " (前递减, x现在是 " << x << ")" << std::endl;
    
    // 赋值运算符
    int y = 10;
    std::cout << "\n--- 赋值运算符 (y=" << y << ") ---" << std::endl;
    y += 5; std::cout << "y += 5: " << y << std::endl;
    y -= 3; std::cout << "y -= 3: " << y << std::endl;
    y *= 2; std::cout << "y *= 2: " << y << std::endl;
    y /= 4; std::cout << "y /= 4: " << y << std::endl;
    y %= 3; std::cout << "y %= 3: " << y << std::endl;
    
    // 比较运算符
    int m = 8, n = 12;
    std::cout << "\n--- 比较运算符 (m=" << m << ", n=" << n << ") ---" << std::endl;
    std::cout << "m == n: " << (m == n) << std::endl;
    std::cout << "m != n: " << (m != n) << std::endl;
    std::cout << "m < n: " << (m < n) << std::endl;
    std::cout << "m > n: " << (m > n) << std::endl;
    std::cout << "m <= n: " << (m <= n) << std::endl;
    std::cout << "m >= n: " << (m >= n) << std::endl;
    
    // 逻辑运算符
    bool p = true, q = false;
    std::cout << "\n--- 逻辑运算符 (p=" << p << ", q=" << q << ") ---" << std::endl;
    std::cout << "p && q: " << (p && q) << " (逻辑与)" << std::endl;
    std::cout << "p || q: " << (p || q) << " (逻辑或)" << std::endl;
    std::cout << "!p: " << (!p) << " (逻辑非)" << std::endl;
    std::cout << "!q: " << (!q) << " (逻辑非)" << std::endl;
    
    // 位运算符
    int bit1 = 5;  // 二进制: 101
    int bit2 = 3;  // 二进制: 011
    std::cout << "\n--- 位运算符 (bit1=" << bit1 << ", bit2=" << bit2 << ") ---" << std::endl;
    std::cout << "bit1 & bit2: " << (bit1 & bit2) << " (按位与)" << std::endl;
    std::cout << "bit1 | bit2: " << (bit1 | bit2) << " (按位或)" << std::endl;
    std::cout << "bit1 ^ bit2: " << (bit1 ^ bit2) << " (按位异或)" << std::endl;
    std::cout << "~bit1: " << (~bit1) << " (按位取反)" << std::endl;
    std::cout << "bit1 << 1: " << (bit1 << 1) << " (左移1位)" << std::endl;
    std::cout << "bit1 >> 1: " << (bit1 >> 1) << " (右移1位)" << std::endl;
    
    // 三元运算符
    int max_val = (a > b) ? a : b;
    std::cout << "\n--- 三元运算符 ---" << std::endl;
    std::cout << "max(" << a << ", " << b << ") = " << max_val << std::endl;
    
    // 运算符优先级演示
    int result = 2 + 3 * 4;
    std::cout << "\n--- 运算符优先级 ---" << std::endl;
    std::cout << "2 + 3 * 4 = " << result << " (乘法优先)" << std::endl;
    std::cout << "(2 + 3) * 4 = " << ((2 + 3) * 4) << " (括号改变优先级)" << std::endl;
    
    return 0;
}