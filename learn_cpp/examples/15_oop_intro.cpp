/**
 * 15_oop_intro.cpp - 面向对象编程基础
 *
 * 这个文件展示C++面向对象编程的基本概念
 */

#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int age;

public:
    // 构造函数
    Student(std::string n, int a) : name(n), age(a) {}

    // 成员函数
    void display() {
        std::cout << "Student: " << name << ", Age: " << age << std::endl;
    }

    // Getter方法
    std::string getName() const { return name; }
    int getAge() const { return age; }
};

int main() {
    // 创建对象
    Student alice("Alice", 20);
    Student bob("Bob", 22);

    // 使用对象方法
    alice.display();
    bob.display();

    std::cout << "Total students: 2" << std::endl;

    return 0;
}
