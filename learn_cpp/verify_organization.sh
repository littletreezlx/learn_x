#!/bin/bash

# C++ 文件重组验证脚本
# 检查重命名后的文件完整性和编译正确性

set -e

echo "🧪 开始验证文件重组结果..."

# 检查必需的文件是否存在
echo "📋 检查必需文件..."

required_files=(
    "examples/01_hello.cpp"
    "examples/02_variables.cpp"
    "examples/03_operators.cpp"
    "examples/04_control_flow.cpp"
    "examples/05_functions.cpp"
    "examples/06_namespaces.cpp"
    "examples/07_pointers.cpp"
    "examples/08_references.cpp"
    "examples/09_memory_layout.cpp"
    "examples/10_dynamic_memory.cpp"
    "examples/11_smart_pointers.cpp"
    "examples/12_raii.cpp"
    "examples/13_pointer_arith.cpp"
    "examples/14_memory_errors.cpp"
    "examples/15_oop_intro.cpp"
)

missing_files=0
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        ((missing_files++))
    fi
done

# 检查练习文件
echo ""
echo "📝 检查练习文件..."
exercise_files=(
    "exercises/02_calculator.cpp"
    "exercises/04_text_processor.cpp"
    "exercises/10_simple_vector.cpp"
)

for file in "${exercise_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ⚠️  $file (可选)"
    fi
done

# 检查解决方案文件
echo ""
echo "💡 检查解决方案文件..."
solution_files=(
    "solutions/02_calculator_solution.cpp"
    "solutions/04_text_processor_solution.cpp"
)

for file in "${solution_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ⚠️  $file (可选)"
    fi
done

# 编译测试关键文件
echo ""
echo "🔨 编译测试关键文件..."

# 测试基础文件是否能编译
test_files=(
    "examples/01_hello.cpp"
    "examples/02_variables.cpp"
    "examples/07_pointers.cpp"
    "examples/11_smart_pointers.cpp"
    "examples/15_oop_intro.cpp"
)

compilation_errors=0
for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  🔧 测试编译: $file"
        if g++ -std=c++17 -Wall -Wextra "$file" -o "/tmp/test_$(basename "$file" .cpp)" 2>/dev/null; then
            echo "    ✅ 编译成功"
            # 清理测试文件
            rm -f "/tmp/test_$(basename "$file" .cpp)"
        else
            echo "    ❌ 编译失败"
            echo "    🛠️  尝试编译查看详细错误:"
            g++ -std=c++17 -Wall -Wextra "$file" -o "/tmp/test_$(basename "$file" .cpp)"
            ((compilation_errors++))
        fi
    fi
done

# 检查文件内容基础结构
echo ""
echo "📖 检查文件内容结构..."

# 检查文件是否有基本的结构
check_file_structure() {
    local file=$1
    local description=$2

    if [ -f "$file" ]; then
        # 检查是否包含必要的C++结构
        if grep -q "#include" "$file" && grep -q "int main" "$file"; then
            echo "  ✅ $description: 结构完整"
            return 0
        else
            echo "  ⚠️  $description: 结构可能不完整"
            return 1
        fi
    else
        echo "  ❌ $description: 文件不存在"
        return 1
    fi
}

check_file_structure "examples/01_hello.cpp" "Hello World"
check_file_structure "examples/07_pointers.cpp" "指针示例"
check_file_structure "examples/11_smart_pointers.cpp" "智能指针示例"
check_file_structure "examples/15_oop_intro.cpp" "OOP基础示例"

# 生成统计报告
echo ""
echo "📊 重组统计报告:"
echo "   - 示例文件总数: $(ls examples/*.cpp 2>/dev/null | wc -l)"
echo "   - 练习文件总数: $(ls exercises/*.cpp 2>/dev/null | wc -l)"
echo "   - 解决方案总数: $(ls solutions/*.cpp 2>/dev/null | wc -l)"
echo "   - 缺失必需文件: $missing_files"
echo "   - 编译错误文件: $compilation_errors"

# 最终验证结果
echo ""
if [ $missing_files -eq 0 ] && [ $compilation_errors -eq 0 ]; then
    echo "🎉 验证通过！文件重组成功完成！"
    echo ""
    echo "📝 下一步建议:"
    echo "   1. 运行一些示例程序: g++ -std=c++17 examples/01_hello.cpp -o hello && ./hello"
    echo "   2. 更新文档中的文件引用"
    echo "   3. 测试练习题的编译和运行"
else
    echo "⚠️  验证发现问题，需要修复:"
    if [ $missing_files -gt 0 ]; then
        echo "   - 缺失 $missing_files 个必需文件"
    fi
    if [ $compilation_errors -gt 0 ]; then
        echo "   - $compilation_errors 个文件编译失败"
    fi
    echo ""
    echo "🔧 建议运行修复脚本或手动检查问题文件"
fi

# 显示文件列表
echo ""
echo "📁 最终文件结构:"
tree examples exercises solutions 2>/dev/null || ls -la examples exercises solutions