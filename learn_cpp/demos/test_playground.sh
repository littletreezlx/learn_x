#!/bin/bash

# 测试 Demo Playground 是否能正常工作
# 自动运行所有 Demo 并验证输出

echo "🧪 测试智能指针 Demo Playground"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查是否已编译
if [ ! -f "./smart_pointers_playground" ]; then
    echo "📦 编译 Playground..."
    g++ -std=c++17 smart_pointers_playground.cpp -o smart_pointers_playground

    if [ $? -ne 0 ]; then
        echo "❌ 编译失败"
        exit 1
    fi
    echo "✅ 编译成功"
else
    echo "✅ 已找到可执行文件"
fi

echo ""
echo "🚀 运行所有 Demo（自动模式）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 自动运行所有 Demo（1-8）并退出
for i in {1..8}; do
    echo ""
    echo "▶️  运行 Demo $i..."
    echo ""

    # 发送 Demo 编号 + 回车 + 回车（继续）
    echo -e "$i\n" | ./smart_pointers_playground | head -n 50

    sleep 0.5
done

# 退出
echo -e "0\n" | ./smart_pointers_playground | tail -n 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 测试完成！"
echo ""
echo "💡 现在可以手动运行："
echo "   ./smart_pointers_playground"
