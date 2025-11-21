/**
 * 智能指针 Demo Playground
 *
 * 这不是测试，而是交互式演示集合！
 * 目标：让你快速试验智能指针的各种用法
 *
 * 编译方式：
 *   g++ -std=c++17 smart_pointers_playground.cpp -o smart_pointers_playground
 *
 * 使用方式：
 *   ./smart_pointers_playground
 *   然后选择想运行的 Demo
 */

#include <iostream>
#include <memory>
#include <string>
#include <map>
#include <functional>
#include <iomanip>

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 辅助类：模拟资源
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class Resource {
private:
    std::string name;
    int value;

public:
    Resource(const std::string& n, int v) : name(n), value(v) {
        std::cout << "  ✅ Resource '" << name << "' 创建 (值: " << value << ")" << std::endl;
    }

    ~Resource() {
        std::cout << "  ❌ Resource '" << name << "' 销毁" << std::endl;
    }

    void display() const {
        std::cout << "  📦 Resource '" << name << "': " << value << std::endl;
    }

    void setValue(int v) { value = v; }
    int getValue() const { return value; }
    const std::string& getName() const { return name; }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 函数定义
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

void demo_unique_ptr_basic() {
    std::cout << "\n━━━ Demo 1: unique_ptr 基础用法 ━━━\n";
    std::cout << "unique_ptr 拥有独占所有权\n" << std::endl;

    {
        std::cout << "创建 unique_ptr:" << std::endl;
        auto ptr = std::make_unique<Resource>("独占资源", 42);

        std::cout << "\n访问资源:" << std::endl;
        ptr->display();
        std::cout << "  地址: " << ptr.get() << std::endl;

        std::cout << "\n修改值:" << std::endl;
        ptr->setValue(100);
        ptr->display();
    }  // 离开作用域，自动销毁

    std::cout << "\n💡 关键点: unique_ptr 离开作用域时自动释放资源" << std::endl;
}

void demo_unique_ptr_move() {
    std::cout << "\n━━━ Demo 2: unique_ptr 所有权转移 ━━━\n";
    std::cout << "unique_ptr 不能复制，只能移动\n" << std::endl;

    std::cout << "创建原始指针:" << std::endl;
    auto ptr1 = std::make_unique<Resource>("可移动资源", 200);
    std::cout << "  ptr1 地址: " << ptr1.get() << std::endl;

    std::cout << "\n转移所有权 (std::move):" << std::endl;
    auto ptr2 = std::move(ptr1);  // 所有权转移
    std::cout << "  ptr1 地址: " << ptr1.get() << " (已失效)" << std::endl;
    std::cout << "  ptr2 地址: " << ptr2.get() << " (新拥有者)" << std::endl;

    if (ptr1 == nullptr) {
        std::cout << "\n✅ 确认: ptr1 现在为 nullptr" << std::endl;
    }

    std::cout << "\n💡 关键点: 移动后，原指针失效 (nullptr)" << std::endl;
}

void demo_unique_ptr_reset() {
    std::cout << "\n━━━ Demo 3: unique_ptr reset 操作 ━━━\n";
    std::cout << "reset() 可以释放旧资源并指向新资源\n" << std::endl;

    std::cout << "创建初始资源:" << std::endl;
    auto ptr = std::make_unique<Resource>("初始资源", 10);

    std::cout << "\nreset 指向新资源:" << std::endl;
    ptr.reset(new Resource("新资源", 20));  // 旧资源自动销毁

    std::cout << "\nreset 为空:" << std::endl;
    ptr.reset();  // 释放资源

    std::cout << "  ptr 是否为空: " << (ptr == nullptr ? "是" : "否") << std::endl;

    std::cout << "\n💡 关键点: reset() 会先销毁旧资源" << std::endl;
}

void demo_shared_ptr_basic() {
    std::cout << "\n━━━ Demo 4: shared_ptr 基础用法 ━━━\n";
    std::cout << "shared_ptr 允许多个指针共享同一资源\n" << std::endl;

    std::cout << "创建 shared_ptr:" << std::endl;
    auto ptr1 = std::make_shared<Resource>("共享资源", 300);
    std::cout << "  引用计数: " << ptr1.use_count() << std::endl;

    {
        std::cout << "\n创建第二个共享者:" << std::endl;
        auto ptr2 = ptr1;  // 共享所有权
        std::cout << "  引用计数: " << ptr1.use_count() << std::endl;

        std::cout << "\n创建第三个共享者:" << std::endl;
        auto ptr3 = ptr1;
        std::cout << "  引用计数: " << ptr1.use_count() << std::endl;

        std::cout << "\nptr2 和 ptr3 即将离开作用域..." << std::endl;
    }

    std::cout << "\nptr2 和 ptr3 已销毁，引用计数: " << ptr1.use_count() << std::endl;
    std::cout << "资源还存在:" << std::endl;
    ptr1->display();

    std::cout << "\n💡 关键点: 只有最后一个 shared_ptr 销毁时，资源才会释放" << std::endl;
}

void demo_shared_ptr_cycle() {
    std::cout << "\n━━━ Demo 5: shared_ptr 引用计数观察 ━━━\n";
    std::cout << "观察引用计数如何变化\n" << std::endl;

    auto shared = std::make_shared<Resource>("计数观察", 400);

    std::cout << "初始引用计数: " << shared.use_count() << std::endl;

    auto copy1 = shared;
    std::cout << "复制后: " << shared.use_count() << std::endl;

    auto copy2 = shared;
    std::cout << "再次复制: " << shared.use_count() << std::endl;

    copy1.reset();
    std::cout << "copy1.reset() 后: " << shared.use_count() << std::endl;

    copy2.reset();
    std::cout << "copy2.reset() 后: " << shared.use_count() << std::endl;

    std::cout << "\n💡 关键点: 每次复制增加计数，每次销毁/reset 减少计数" << std::endl;
}

void demo_weak_ptr() {
    std::cout << "\n━━━ Demo 6: weak_ptr 打破循环引用 ━━━\n";
    std::cout << "weak_ptr 不增加引用计数\n" << std::endl;

    std::cout << "创建 shared_ptr:" << std::endl;
    auto shared = std::make_shared<Resource>("弱观察目标", 500);
    std::cout << "  引用计数: " << shared.use_count() << std::endl;

    std::cout << "\n创建 weak_ptr:" << std::endl;
    std::weak_ptr<Resource> weak = shared;
    std::cout << "  引用计数: " << shared.use_count() << " (未增加!)" << std::endl;

    std::cout << "\n从 weak_ptr 临时获取 shared_ptr:" << std::endl;
    if (auto temp = weak.lock()) {
        std::cout << "  ✅ 资源仍然存在" << std::endl;
        temp->display();
        std::cout << "  临时引用计数: " << shared.use_count() << std::endl;
    }

    std::cout << "\n销毁 shared_ptr..." << std::endl;
    shared.reset();

    std::cout << "\n再次尝试从 weak_ptr 获取:" << std::endl;
    if (auto temp = weak.lock()) {
        std::cout << "  资源存在" << std::endl;
    } else {
        std::cout << "  ❌ 资源已销毁，无法获取" << std::endl;
    }

    std::cout << "\n💡 关键点: weak_ptr 不拥有资源，只能观察资源是否存在" << std::endl;
}

void demo_custom_deleter() {
    std::cout << "\n━━━ Demo 7: 自定义删除器 ━━━\n";
    std::cout << "可以自定义资源释放方式\n" << std::endl;

    std::cout << "使用 lambda 作为删除器:" << std::endl;
    {
        std::shared_ptr<Resource> ptr(
            new Resource("自定义删除", 600),
            [](Resource* p) {
                std::cout << "  🔧 自定义删除器被调用!" << std::endl;
                delete p;
            }
        );

        ptr->display();
    }  // 离开作用域，调用自定义删除器

    std::cout << "\n💡 关键点: 可以自定义资源释放逻辑（如关闭文件、释放锁等）" << std::endl;
}

void demo_comparison() {
    std::cout << "\n━━━ Demo 8: unique_ptr vs shared_ptr 对比 ━━━\n" << std::endl;

    std::cout << "unique_ptr 特点:" << std::endl;
    std::cout << "  ✅ 独占所有权，性能最优" << std::endl;
    std::cout << "  ✅ 不能复制，只能移动" << std::endl;
    std::cout << "  ✅ 适合：明确只有一个拥有者的情况" << std::endl;

    std::cout << "\nshared_ptr 特点:" << std::endl;
    std::cout << "  ✅ 共享所有权，多个指针可同时持有" << std::endl;
    std::cout << "  ⚠️  引用计数有开销" << std::endl;
    std::cout << "  ✅ 适合：多个对象需要共享同一资源" << std::endl;

    std::cout << "\nweak_ptr 特点:" << std::endl;
    std::cout << "  ✅ 不拥有资源，只观察" << std::endl;
    std::cout << "  ✅ 打破 shared_ptr 循环引用" << std::endl;
    std::cout << "  ✅ 适合：缓存、观察者模式等" << std::endl;

    std::cout << "\n💡 选择原则: 优先 unique_ptr，需要共享时用 shared_ptr" << std::endl;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo 运行器
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class DemoRunner {
private:
    std::map<int, std::pair<std::string, std::function<void()>>> demos;

public:
    DemoRunner() {
        // 注册所有 Demo
        demos[1] = {"unique_ptr 基础", demo_unique_ptr_basic};
        demos[2] = {"unique_ptr 移动", demo_unique_ptr_move};
        demos[3] = {"unique_ptr reset", demo_unique_ptr_reset};
        demos[4] = {"shared_ptr 基础", demo_shared_ptr_basic};
        demos[5] = {"shared_ptr 引用计数", demo_shared_ptr_cycle};
        demos[6] = {"weak_ptr 用法", demo_weak_ptr};
        demos[7] = {"自定义删除器", demo_custom_deleter};
        demos[8] = {"三者对比总结", demo_comparison};
    }

    void show_menu() {
        std::cout << "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        std::cout << "   🎮 智能指针 Demo Playground\n";
        std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

        for (const auto& [id, demo] : demos) {
            std::cout << "  " << id << ". " << demo.first << "\n";
        }

        std::cout << "  0. 退出\n";
        std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }

    void run() {
        std::cout << "\n欢迎使用智能指针 Demo Playground!" << std::endl;
        std::cout << "这里有 " << demos.size() << " 个交互式演示" << std::endl;
        std::cout << "编译1次，随意试验所有用法 🚀" << std::endl;

        while (true) {
            show_menu();

            std::cout << "\n请选择 Demo (0-" << demos.size() << "): ";
            int choice;

            if (!(std::cin >> choice)) {
                std::cout << "❌ 无效输入，请输入数字" << std::endl;
                std::cin.clear();
                std::cin.ignore(10000, '\n');
                continue;
            }

            if (choice == 0) {
                std::cout << "\n👋 感谢使用！继续学习加油！" << std::endl;
                break;
            }

            if (demos.count(choice)) {
                demos[choice].second();  // 运行选中的 Demo

                std::cout << "\n按回车键继续...";
                std::cin.ignore(10000, '\n');
                std::cin.get();
            } else {
                std::cout << "❌ 无效选择，请输入 0-" << demos.size() << std::endl;
            }
        }
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 主函数
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

int main() {
    DemoRunner runner;
    runner.run();
    return 0;
}
