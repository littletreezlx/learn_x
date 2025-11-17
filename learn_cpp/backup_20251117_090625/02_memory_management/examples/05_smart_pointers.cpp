#include <iostream>
#include <memory>
#include <string>
#include <vector>

class Resource {
private:
    std::string name;
    std::vector<int> data;
    
public:
    Resource(const std::string& n, int size) : name(n), data(size) {
        for (int i = 0; i < size; ++i) {
            data[i] = i * 10;
        }
        std::cout << "Resource '" << name << "' 构造完成 (大小: " << size << ")" << std::endl;
    }
    
    ~Resource() {
        std::cout << "Resource '" << name << "' 析构" << std::endl;
    }
    
    void display() const {
        std::cout << "Resource '" << name << "' 数据: ";
        for (size_t i = 0; i < std::min(data.size(), size_t(5)); ++i) {
            std::cout << data[i] << " ";
        }
        if (data.size() > 5) std::cout << "...";
        std::cout << std::endl;
    }
    
    void updateData(int index, int value) {
        if (index >= 0 && index < static_cast<int>(data.size())) {
            data[index] = value;
        }
    }
    
    const std::string& getName() const { return name; }
};

void demonstrateUniquePtr();
void demonstrateSharedPtr();
void demonstrateWeakPtr();
void demonstrateCustomDeleter();
void demonstrateArraySmartPointers();
void demonstrateSmartPointerCasting();

int main() {
    std::cout << "=== C++智能指针演示 ===" << std::endl;
    
    demonstrateUniquePtr();
    demonstrateSharedPtr();
    demonstrateWeakPtr();
    demonstrateCustomDeleter();
    demonstrateArraySmartPointers();
    demonstrateSmartPointerCasting();
    
    return 0;
}

void demonstrateUniquePtr() {
    std::cout << "\n--- unique_ptr演示 ---" << std::endl;
    
    // 基本unique_ptr使用
    std::cout << "1. 基本unique_ptr使用:" << std::endl;
    {
        std::unique_ptr<Resource> ptr1(new Resource("UniqueRes1", 5));
        ptr1->display();
        
        // 使用make_unique (C++14推荐方式)
        auto ptr2 = std::make_unique<Resource>("UniqueRes2", 8);
        ptr2->display();
        
        std::cout << "ptr1.get(): " << ptr1.get() << std::endl;
        std::cout << "ptr2.get(): " << ptr2.get() << std::endl;
    }  // 智能指针自动销毁资源
    
    // unique_ptr的移动语义
    std::cout << "\n2. unique_ptr移动语义:" << std::endl;
    {
        auto original = std::make_unique<Resource>("移动测试", 3);
        std::cout << "移动前 original.get(): " << original.get() << std::endl;
        
        // 移动构造
        auto moved = std::move(original);
        std::cout << "移动后 original.get(): " << original.get() << std::endl;
        std::cout << "移动后 moved.get(): " << moved.get() << std::endl;
        
        if (original == nullptr) {
            std::cout << "original现在为空" << std::endl;
        }
        
        moved->display();
    }
    
    // unique_ptr作为函数参数和返回值
    std::cout << "\n3. unique_ptr作为函数参数和返回值:" << std::endl;
    
    // 返回unique_ptr的函数
    auto createResource = [](const std::string& name, int size) -> std::unique_ptr<Resource> {
        return std::make_unique<Resource>(name, size);
    };
    
    // 接受unique_ptr的函数（获取所有权）
    auto processResource = [](std::unique_ptr<Resource> res) {
        std::cout << "处理资源: ";
        res->display();
        // res在函数结束时自动销毁
    };
    
    // 接受unique_ptr引用的函数（不获取所有权）
    auto inspectResource = [](const std::unique_ptr<Resource>& res) {
        std::cout << "检查资源: ";
        res->display();
        // res不会被销毁
    };
    
    auto resource = createResource("函数测试", 4);
    inspectResource(resource);  // 检查但不获取所有权
    processResource(std::move(resource));  // 转移所有权
    
    if (resource == nullptr) {
        std::cout << "resource已被移动，现在为空" << std::endl;
    }
    
    // unique_ptr的reset和release
    std::cout << "\n4. unique_ptr的reset和release:" << std::endl;
    {
        auto ptr = std::make_unique<Resource>("重置测试", 6);
        ptr->display();
        
        // reset - 销毁当前对象并可选地指向新对象
        ptr.reset(new Resource("新资源", 3));
        ptr->display();
        
        // release - 释放所有权但不销毁对象
        Resource* raw_ptr = ptr.release();
        std::cout << "release后 ptr.get(): " << ptr.get() << std::endl;
        std::cout << "raw_ptr: " << raw_ptr << std::endl;
        
        // 现在需要手动删除
        delete raw_ptr;
    }
}

void demonstrateSharedPtr() {
    std::cout << "\n--- shared_ptr演示 ---" << std::endl;
    
    // 基本shared_ptr使用
    std::cout << "1. 基本shared_ptr使用:" << std::endl;
    {
        auto ptr1 = std::make_shared<Resource>("SharedRes1", 5);
        std::cout << "ptr1 引用计数: " << ptr1.use_count() << std::endl;
        
        {
            auto ptr2 = ptr1;  // 拷贝，引用计数增加
            std::cout << "拷贝后 ptr1 引用计数: " << ptr1.use_count() << std::endl;
            std::cout << "ptr2 引用计数: " << ptr2.use_count() << std::endl;
            
            ptr1->display();
            ptr2->display();
            
            auto ptr3 = ptr1;  // 再次拷贝
            std::cout << "再次拷贝后引用计数: " << ptr1.use_count() << std::endl;
        }  // ptr2和ptr3超出作用域，引用计数减少
        
        std::cout << "内部作用域结束后 ptr1 引用计数: " << ptr1.use_count() << std::endl;
    }  // ptr1超出作用域，引用计数变为0，对象被销毁
    
    // shared_ptr的循环引用问题
    std::cout << "\n2. shared_ptr循环引用演示:" << std::endl;
    
    struct Node {
        std::string name;
        std::shared_ptr<Node> next;
        std::shared_ptr<Node> prev;
        
        Node(const std::string& n) : name(n) {
            std::cout << "Node '" << name << "' 创建" << std::endl;
        }
        
        ~Node() {
            std::cout << "Node '" << name << "' 销毁" << std::endl;
        }
    };
    
    {
        auto node1 = std::make_shared<Node>("节点1");
        auto node2 = std::make_shared<Node>("节点2");
        
        // 创建循环引用
        node1->next = node2;
        node2->prev = node1;
        
        std::cout << "node1 引用计数: " << node1.use_count() << std::endl;
        std::cout << "node2 引用计数: " << node2.use_count() << std::endl;
    }  // 注意：由于循环引用，节点可能不会被自动销毁！
    
    std::cout << "作用域结束，检查节点是否被销毁..." << std::endl;
    
    // shared_ptr与unique_ptr的转换
    std::cout << "\n3. shared_ptr与unique_ptr的转换:" << std::endl;
    {
        // unique_ptr转shared_ptr
        auto unique_res = std::make_unique<Resource>("转换测试", 4);
        std::shared_ptr<Resource> shared_res = std::move(unique_res);
        
        std::cout << "转换后 unique_res.get(): " << unique_res.get() << std::endl;
        std::cout << "shared_res 引用计数: " << shared_res.use_count() << std::endl;
        shared_res->display();
    }
    
    // 自定义删除器
    std::cout << "\n4. shared_ptr自定义删除器:" << std::endl;
    {
        auto custom_deleter = [](Resource* res) {
            std::cout << "自定义删除器被调用！" << std::endl;
            delete res;
        };
        
        std::shared_ptr<Resource> ptr(new Resource("自定义删除", 3), custom_deleter);
        ptr->display();
    }  // 自定义删除器被调用
}

void demonstrateWeakPtr() {
    std::cout << "\n--- weak_ptr演示 ---" << std::endl;
    
    // 基本weak_ptr使用
    std::cout << "1. 基本weak_ptr使用:" << std::endl;
    {
        std::weak_ptr<Resource> weak_res;
        
        {
            auto shared_res = std::make_shared<Resource>("WeakTest", 6);
            weak_res = shared_res;  // weak_ptr不影响引用计数
            
            std::cout << "shared_res 引用计数: " << shared_res.use_count() << std::endl;
            std::cout << "weak_res 过期状态: " << weak_res.expired() << std::endl;
            
            // 通过weak_ptr访问对象
            if (auto locked = weak_res.lock()) {
                locked->display();
                std::cout << "通过weak_ptr成功访问对象" << std::endl;
            }
        }  // shared_res超出作用域，对象被销毁
        
        std::cout << "shared_res销毁后 weak_res 过期状态: " << weak_res.expired() << std::endl;
        
        // 尝试访问已销毁的对象
        if (auto locked = weak_res.lock()) {
            locked->display();  // 这不会执行
        } else {
            std::cout << "weak_ptr指向的对象已销毁，无法访问" << std::endl;
        }
    }
    
    // 使用weak_ptr解决循环引用
    std::cout << "\n2. 使用weak_ptr解决循环引用:" << std::endl;
    
    struct SafeNode {
        std::string name;
        std::shared_ptr<SafeNode> next;
        std::weak_ptr<SafeNode> prev;  // 使用weak_ptr打破循环
        
        SafeNode(const std::string& n) : name(n) {
            std::cout << "SafeNode '" << name << "' 创建" << std::endl;
        }
        
        ~SafeNode() {
            std::cout << "SafeNode '" << name << "' 销毁" << std::endl;
        }
        
        void showConnections() {
            std::cout << "节点 " << name << ":" << std::endl;
            if (next) {
                std::cout << "  next -> " << next->name << std::endl;
            }
            if (auto prev_shared = prev.lock()) {
                std::cout << "  prev -> " << prev_shared->name << std::endl;
            }
        }
    };
    
    {
        auto node1 = std::make_shared<SafeNode>("安全节点1");
        auto node2 = std::make_shared<SafeNode>("安全节点2");
        
        node1->next = node2;
        node2->prev = node1;  // weak_ptr不增加引用计数
        
        std::cout << "node1 引用计数: " << node1.use_count() << std::endl;
        std::cout << "node2 引用计数: " << node2.use_count() << std::endl;
        
        node1->showConnections();
        node2->showConnections();
    }  // 现在节点会正确销毁
    
    std::cout << "作用域结束，节点应该被正确销毁" << std::endl;
    
    // weak_ptr的观察者模式应用
    std::cout << "\n3. weak_ptr观察者模式:" << std::endl;
    
    class Observable {
    private:
        std::vector<std::weak_ptr<Resource>> observers;
        
    public:
        void addObserver(std::shared_ptr<Resource> observer) {
            observers.push_back(observer);
        }
        
        void notifyObservers() {
            std::cout << "通知观察者..." << std::endl;
            auto it = observers.begin();
            while (it != observers.end()) {
                if (auto observer = it->lock()) {
                    std::cout << "  通知: " << observer->getName() << std::endl;
                    ++it;
                } else {
                    std::cout << "  移除过期的观察者" << std::endl;
                    it = observers.erase(it);
                }
            }
        }
    };
    
    Observable subject;
    
    {
        auto observer1 = std::make_shared<Resource>("观察者1", 2);
        auto observer2 = std::make_shared<Resource>("观察者2", 3);
        
        subject.addObserver(observer1);
        subject.addObserver(observer2);
        
        subject.notifyObservers();
    }  // 观察者销毁
    
    std::cout << "观察者销毁后:" << std::endl;
    subject.notifyObservers();  // 自动清理过期的观察者
}

void demonstrateCustomDeleter() {
    std::cout << "\n--- 自定义删除器演示 ---" << std::endl;
    
    // 1. 数组删除器
    std::cout << "1. 数组删除器:" << std::endl;
    {
        auto array_deleter = [](int* ptr) {
            std::cout << "自定义数组删除器被调用" << std::endl;
            delete[] ptr;
        };
        
        std::unique_ptr<int, decltype(array_deleter)> ptr(new int[10], array_deleter);
        for (int i = 0; i < 10; ++i) {
            ptr.get()[i] = i;
        }
        
        std::cout << "数组前5个元素: ";
        for (int i = 0; i < 5; ++i) {
            std::cout << ptr.get()[i] << " ";
        }
        std::cout << std::endl;
    }
    
    // 2. 文件句柄删除器
    std::cout << "\n2. 文件句柄删除器:" << std::endl;
    {
        auto file_deleter = [](FILE* f) {
            if (f) {
                std::cout << "关闭文件" << std::endl;
                fclose(f);
            }
        };
        
        std::unique_ptr<FILE, decltype(file_deleter)> file_ptr(
            fopen("test.txt", "w"), file_deleter);
        
        if (file_ptr) {
            fprintf(file_ptr.get(), "Hello, World!\n");
            std::cout << "写入文件完成" << std::endl;
        }
    }  // 文件自动关闭
    
    // 3. 自定义资源管理
    std::cout << "\n3. 自定义资源管理:" << std::endl;
    {
        class CustomResource {
        public:
            CustomResource(int id) : resource_id(id) {
                std::cout << "获取资源 " << resource_id << std::endl;
            }
            
            ~CustomResource() {
                std::cout << "释放资源 " << resource_id << std::endl;
            }
            
            void use() {
                std::cout << "使用资源 " << resource_id << std::endl;
            }
            
        private:
            int resource_id;
        };
        
        auto custom_deleter = [](CustomResource* res) {
            std::cout << "自定义删除器：准备释放资源" << std::endl;
            delete res;
        };
        
        std::unique_ptr<CustomResource, decltype(custom_deleter)> 
            resource(new CustomResource(123), custom_deleter);
        
        resource->use();
    }
}

void demonstrateArraySmartPointers() {
    std::cout << "\n--- 数组智能指针演示 ---" << std::endl;
    
    // unique_ptr数组
    std::cout << "1. unique_ptr数组:" << std::endl;
    {
        std::unique_ptr<int[]> array_ptr(new int[10]);
        
        for (int i = 0; i < 10; ++i) {
            array_ptr[i] = i * i;
        }
        
        std::cout << "unique_ptr数组: ";
        for (int i = 0; i < 10; ++i) {
            std::cout << array_ptr[i] << " ";
        }
        std::cout << std::endl;
        
        // 使用make_unique for arrays (C++14)
        auto array_ptr2 = std::make_unique<int[]>(5);
        for (int i = 0; i < 5; ++i) {
            array_ptr2[i] = i + 10;
        }
        
        std::cout << "make_unique数组: ";
        for (int i = 0; i < 5; ++i) {
            std::cout << array_ptr2[i] << " ";
        }
        std::cout << std::endl;
    }
    
    // shared_ptr数组
    std::cout << "\n2. shared_ptr数组:" << std::endl;
    {
        // 注意：shared_ptr需要自定义删除器处理数组
        std::shared_ptr<int> array_ptr(new int[8], std::default_delete<int[]>());
        
        for (int i = 0; i < 8; ++i) {
            array_ptr.get()[i] = i * 2;
        }
        
        std::cout << "shared_ptr数组: ";
        for (int i = 0; i < 8; ++i) {
            std::cout << array_ptr.get()[i] << " ";
        }
        std::cout << std::endl;
        
        // 更好的方式：使用make_shared with array (C++17)
        // auto better_array = std::make_shared<int[]>(6);
    }
    
    // 对象数组
    std::cout << "\n3. 对象数组智能指针:" << std::endl;
    {
        auto obj_array = std::make_unique<Resource[]>(3);
        
        // 注意：数组元素使用默认构造函数
        std::cout << "对象数组创建完成" << std::endl;
    }  // 自动调用所有对象的析构函数
}

void demonstrateSmartPointerCasting() {
    std::cout << "\n--- 智能指针类型转换演示 ---" << std::endl;
    
    class Base {
    public:
        virtual ~Base() { std::cout << "Base析构" << std::endl; }
        virtual void show() { std::cout << "Base::show()" << std::endl; }
    };
    
    class Derived : public Base {
    public:
        ~Derived() { std::cout << "Derived析构" << std::endl; }
        void show() override { std::cout << "Derived::show()" << std::endl; }
        void derivedMethod() { std::cout << "Derived特有方法" << std::endl; }
    };
    
    // static_pointer_cast
    std::cout << "1. static_pointer_cast:" << std::endl;
    {
        auto derived = std::make_shared<Derived>();
        std::shared_ptr<Base> base = derived;  // 隐式向上转换
        
        // 向下转换（需要确保安全）
        auto derived_again = std::static_pointer_cast<Derived>(base);
        derived_again->derivedMethod();
    }
    
    // dynamic_pointer_cast
    std::cout << "\n2. dynamic_pointer_cast:" << std::endl;
    {
        auto derived = std::make_shared<Derived>();
        std::shared_ptr<Base> base = derived;
        
        // 安全的向下转换
        if (auto casted = std::dynamic_pointer_cast<Derived>(base)) {
            std::cout << "dynamic_cast成功" << std::endl;
            casted->derivedMethod();
        } else {
            std::cout << "dynamic_cast失败" << std::endl;
        }
        
        // 尝试错误的转换
        class Other : public Base {
        public:
            void otherMethod() { std::cout << "Other方法" << std::endl; }
        };
        
        if (auto failed_cast = std::dynamic_pointer_cast<Other>(base)) {
            failed_cast->otherMethod();
        } else {
            std::cout << "错误的dynamic_cast返回nullptr" << std::endl;
        }
    }
    
    // const_pointer_cast
    std::cout << "\n3. const_pointer_cast:" << std::endl;
    {
        auto resource = std::make_shared<const Resource>("常量资源", 5);
        
        // 去除const
        auto mutable_resource = std::const_pointer_cast<Resource>(resource);
        mutable_resource->updateData(0, 999);
        
        std::cout << "const_cast后的资源:" << std::endl;
        resource->display();  // 注意：原始const对象也被修改了
    }
    
    std::cout << "智能指针演示完成" << std::endl;
}