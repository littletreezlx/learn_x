#!/bin/bash

# C++ 文件重命名和组织脚本
# 作者: Claude Code Assistant
# 日期: $(date +%Y-%m-%d)

set -e  # 遇到错误立即退出

echo "🚀 开始 C++ 文件重命名和组织..."

# 创建备份目录
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 创建备份目录: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# 创建新的目录结构
echo "📁 创建新的目录结构..."
mkdir -p examples exercises solutions

# 备份现有文件到备份目录
echo "💾 备份现有文件..."
cp -r 01_basics "$BACKUP_DIR/"
cp -r 02_memory_management "$BACKUP_DIR/"

# 第一批重命名: 基础语法文件 (01-06)
echo "🔄 第一批重命名: 基础语法文件..."

# 01_hello.cpp
if [ -f "01_basics/examples/01_hello_world.cpp" ]; then
    echo "  → 01_hello.cpp"
    cp "01_basics/examples/01_hello_world.cpp" "examples/01_hello.cpp"
fi

# 02_variables.cpp (已存在)
if [ -f "01_basics/examples/02_variables.cpp" ]; then
    echo "  → 02_variables.cpp"
    cp "01_basics/examples/02_variables.cpp" "examples/02_variables.cpp"
fi

# 03_operators.cpp (已存在)
if [ -f "01_basics/examples/03_operators.cpp" ]; then
    echo "  → 03_operators.cpp"
    cp "01_basics/examples/03_operators.cpp" "examples/03_operators.cpp"
fi

# 04_control_flow.cpp (已存在)
if [ -f "01_basics/examples/04_control_flow.cpp" ]; then
    echo "  → 04_control_flow.cpp"
    cp "01_basics/examples/04_control_flow.cpp" "examples/04_control_flow.cpp"
fi

# 05_functions.cpp (已存在)
if [ -f "01_basics/examples/05_functions.cpp" ]; then
    echo "  → 05_functions.cpp"
    cp "01_basics/examples/05_functions.cpp" "examples/05_functions.cpp"
fi

# 06_namespaces.cpp (已存在)
if [ -f "01_basics/examples/06_namespaces.cpp" ]; then
    echo "  → 06_namespaces.cpp"
    cp "01_basics/examples/06_namespaces.cpp" "examples/06_namespaces.cpp"
fi

# 第二批重命名: 内存管理特色文件 (07-09) - C++核心特色
echo "🔄 第二批重命名: 内存管理特色文件..."

# 07_pointers.cpp
if [ -f "01_basics/examples/07_pointers_intro.cpp" ]; then
    echo "  → 07_pointers.cpp"
    cp "01_basics/examples/07_pointers_intro.cpp" "examples/07_pointers.cpp"
fi

# 08_references.cpp (已存在)
if [ -f "01_basics/examples/08_references.cpp" ]; then
    echo "  → 08_references.cpp"
    cp "01_basics/examples/08_references.cpp" "examples/08_references.cpp"
fi

# 09_memory_layout.cpp
if [ -f "02_memory_management/examples/01_memory_layout.cpp" ]; then
    echo "  → 09_memory_layout.cpp"
    cp "02_memory_management/examples/01_memory_layout.cpp" "examples/09_memory_layout.cpp"
fi

# 第三批重命名: 动态内存和智能指针 (10-12)
echo "🔄 第三批重命名: 动态内存和智能指针..."

# 10_dynamic_memory.cpp
if [ -f "02_memory_management/examples/03_dynamic_allocation.cpp" ]; then
    echo "  → 10_dynamic_memory.cpp"
    cp "02_memory_management/examples/03_dynamic_allocation.cpp" "examples/10_dynamic_memory.cpp"
fi

# 11_smart_pointers.cpp
if [ -f "02_memory_management/examples/05_smart_pointers.cpp" ]; then
    echo "  → 11_smart_pointers.cpp"
    cp "02_memory_management/examples/05_smart_pointers.cpp" "examples/11_smart_pointers.cpp"
fi

# 12_raii.cpp
if [ -f "02_memory_management/examples/06_raii_principle.cpp" ]; then
    echo "  → 12_raii.cpp"
    cp "02_memory_management/examples/06_raii_principle.cpp" "examples/12_raii.cpp"
fi

# 第四批重命名: 高级特性 (13-15)
echo "🔄 第四批重命名: 高级特性..."

# 13_pointer_arith.cpp
if [ -f "02_memory_management/examples/02_pointer_arithmetic.cpp" ]; then
    echo "  → 13_pointer_arith.cpp"
    cp "02_memory_management/examples/02_pointer_arithmetic.cpp" "examples/13_pointer_arith.cpp"
fi

# 14_memory_errors.cpp
if [ -f "02_memory_management/examples/04_memory_errors.cpp" ]; then
    echo "  → 14_memory_errors.cpp"
    cp "02_memory_management/examples/04_memory_errors.cpp" "examples/14_memory_errors.cpp"
fi

# 复制练习文件
echo "🔄 复制练习文件..."

# 练习文件重命名
if [ -f "01_basics/exercises/calculator.cpp" ]; then
    echo "  → exercises/02_calculator.cpp"
    cp "01_basics/exercises/calculator.cpp" "exercises/02_calculator.cpp"
fi

if [ -f "01_basics/exercises/text_processor.cpp" ]; then
    echo "  → exercises/04_text_processor.cpp"
    cp "01_basics/exercises/text_processor.cpp" "exercises/04_text_processor.cpp"
fi

if [ -f "02_memory_management/exercises/simple_vector.cpp" ]; then
    echo "  → exercises/10_simple_vector.cpp"
    cp "02_memory_management/exercises/simple_vector.cpp" "exercises/10_simple_vector.cpp"
fi

# 复制解决方案文件
echo "🔄 复制解决方案文件..."

if [ -f "01_basics/solutions/calculator_solution.cpp" ]; then
    echo "  → solutions/02_calculator_solution.cpp"
    cp "01_basics/solutions/calculator_solution.cpp" "solutions/02_calculator_solution.cpp"
fi

if [ -f "01_basics/solutions/text_processor_solution.cpp" ]; then
    echo "  → solutions/04_text_processor_solution.cpp"
    cp "01_basics/solutions/text_processor_solution.cpp" "solutions/04_text_processor_solution.cpp"
fi

# 复制其他需要的资源
if [ -f "01_basics/exercises/sample.txt" ]; then
    echo "  → exercises/sample.txt"
    cp "01_basics/exercises/sample.txt" "exercises/"
fi

# 创建一个简单的15_oop_intro.cpp文件作为占位符
echo "📝 创建占位符文件: 15_oop_intro.cpp"
cat > examples/15_oop_intro.cpp << 'EOF'
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
EOF

echo ""
echo "✅ 文件重命名完成！"
echo ""
echo "📊 重命名统计:"
echo "   - 示例文件: $(ls examples/*.cpp | wc -l) 个"
echo "   - 练习文件: $(ls exercises/*.cpp 2>/dev/null | wc -l) 个"
echo "   - 解决方案: $(ls solutions/*.cpp 2>/dev/null | wc -l) 个"
echo ""
echo "📦 备份位置: $BACKUP_DIR"
echo ""
echo "🧪 下一步: 运行验证脚本检查文件完整性"
echo "   ./verify_organization.sh"