/*
 * 练习：实现一个简单的动态数组类
 * 
 * 要求：
 * 1. 实现基本的动态数组功能：push_back, pop_back, size, capacity
 * 2. 实现正确的拷贝构造函数和拷贝赋值运算符
 * 3. 实现移动构造函数和移动赋值运算符
 * 4. 实现析构函数，确保无内存泄漏
 * 5. 实现operator[]用于元素访问
 * 6. 实现自动扩容机制
 * 7. 添加异常安全保证
 * 
 * 学习目标：
 * - 深入理解内存管理
 * - 掌握RAII原则
 * - 理解拷贝控制
 * - 学习异常安全编程
 */

#include <iostream>
#include <stdexcept>
#include <algorithm>
#include <initializer_list>

template<typename T>
class SimpleVector {
private:
    T* data;           // 指向动态分配的数组
    size_t size_;      // 当前元素数量
    size_t capacity_;  // 数组容量
    
public:
    // TODO: 实现默认构造函数
    SimpleVector() {
        // 提示：初始化data为nullptr，size_和capacity_为0
    }
    
    // TODO: 实现带初始容量的构造函数
    explicit SimpleVector(size_t initial_capacity) {
        // 提示：分配initial_capacity个T类型的内存
        // 注意：只分配内存，不调用构造函数
    }
    
    // TODO: 实现初始化列表构造函数
    SimpleVector(std::initializer_list<T> init_list) {
        // 提示：分配足够的内存，然后拷贝init_list中的元素
    }
    
    // TODO: 实现析构函数
    ~SimpleVector() {
        // 提示：释放data指向的内存
        // 注意：确保不重复释放
    }
    
    // TODO: 实现拷贝构造函数
    SimpleVector(const SimpleVector& other) {
        // 提示：深拷贝other的所有元素
    }
    
    // TODO: 实现拷贝赋值运算符
    SimpleVector& operator=(const SimpleVector& other) {
        // 提示：检查自赋值，然后进行深拷贝
        // 考虑异常安全：先分配新内存，成功后再释放旧内存
    }
    
    // TODO: 实现移动构造函数
    SimpleVector(SimpleVector&& other) noexcept {
        // 提示：窃取other的资源，将other置为有效但未指定状态
    }
    
    // TODO: 实现移动赋值运算符
    SimpleVector& operator=(SimpleVector&& other) noexcept {
        // 提示：检查自赋值，释放当前资源，窃取other的资源
    }
    
    // TODO: 实现push_back
    void push_back(const T& value) {
        // 提示：检查是否需要扩容，然后在末尾添加元素
    }
    
    // TODO: 实现emplace_back (C++11特性)
    template<typename... Args>
    void emplace_back(Args&&... args) {
        // 提示：直接在数组末尾构造对象，避免拷贝
    }
    
    // TODO: 实现pop_back
    void pop_back() {
        // 提示：检查是否为空，然后移除最后一个元素
    }
    
    // TODO: 实现operator[]
    T& operator[](size_t index) {
        // 提示：返回指定位置的元素引用
        // 考虑是否需要边界检查
    }
    
    const T& operator[](size_t index) const {
        // TODO: 实现const版本的operator[]
    }
    
    // TODO: 实现at函数（带边界检查的元素访问）
    T& at(size_t index) {
        // 提示：检查边界，如果越界则抛出异常
    }
    
    const T& at(size_t index) const {
        // TODO: 实现const版本的at
    }
    
    // TODO: 实现基本查询函数
    size_t size() const {
        // 返回当前元素数量
    }
    
    size_t capacity() const {
        // 返回当前容量
    }
    
    bool empty() const {
        // 返回是否为空
    }
    
    // TODO: 实现clear函数
    void clear() {
        // 提示：移除所有元素，但保留容量
    }
    
    // TODO: 实现reserve函数
    void reserve(size_t new_capacity) {
        // 提示：如果new_capacity大于当前容量，则扩容
    }
    
    // TODO: 实现resize函数
    void resize(size_t new_size, const T& value = T{}) {
        // 提示：改变size_，如果增大则用value填充新元素
    }
    
    // TODO: 实现迭代器支持（可选的高级功能）
    T* begin() { return data; }
    const T* begin() const { return data; }
    T* end() { return data + size_; }
    const T* end() const { return data + size_; }
    
private:
    // TODO: 实现扩容函数
    void grow() {
        // 提示：将容量扩大（通常是当前容量的2倍）
        // 注意异常安全：先分配新内存，再移动元素，最后释放旧内存
    }
    
    // TODO: 实现内存重新分配函数
    void reallocate(size_t new_capacity) {
        // 提示：分配新内存，移动现有元素，释放旧内存
    }
};

// 测试函数
void testBasicOperations() {
    std::cout << "=== 基本操作测试 ===" << std::endl;
    
    // TODO: 测试默认构造
    SimpleVector<int> vec1;
    std::cout << "默认构造后: size=" << vec1.size() << ", capacity=" << vec1.capacity() << std::endl;
    
    // TODO: 测试push_back
    for (int i = 0; i < 10; ++i) {
        vec1.push_back(i);
    }
    std::cout << "push_back 10个元素后: size=" << vec1.size() << ", capacity=" << vec1.capacity() << std::endl;
    
    // TODO: 测试元素访问
    std::cout << "元素: ";
    for (size_t i = 0; i < vec1.size(); ++i) {
        std::cout << vec1[i] << " ";
    }
    std::cout << std::endl;
    
    // TODO: 测试pop_back
    vec1.pop_back();
    vec1.pop_back();
    std::cout << "pop_back 2次后: size=" << vec1.size() << std::endl;
}

void testCopyOperations() {
    std::cout << "\n=== 拷贝操作测试 ===" << std::endl;
    
    SimpleVector<int> vec1{1, 2, 3, 4, 5};
    std::cout << "原始vector: ";
    for (const auto& val : vec1) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // TODO: 测试拷贝构造
    SimpleVector<int> vec2 = vec1;
    std::cout << "拷贝构造后: ";
    for (const auto& val : vec2) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // TODO: 测试拷贝赋值
    SimpleVector<int> vec3;
    vec3 = vec1;
    std::cout << "拷贝赋值后: ";
    for (const auto& val : vec3) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // 修改原vector，确保深拷贝
    vec1[0] = 999;
    std::cout << "修改原vector后，拷贝的vector应该不变: ";
    for (const auto& val : vec2) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
}

void testMoveOperations() {
    std::cout << "\n=== 移动操作测试 ===" << std::endl;
    
    SimpleVector<int> vec1{10, 20, 30, 40, 50};
    std::cout << "移动前: size=" << vec1.size() << std::endl;
    
    // TODO: 测试移动构造
    SimpleVector<int> vec2 = std::move(vec1);
    std::cout << "移动构造后: vec1.size=" << vec1.size() << ", vec2.size=" << vec2.size() << std::endl;
    
    // TODO: 测试移动赋值
    SimpleVector<int> vec3;
    vec3 = std::move(vec2);
    std::cout << "移动赋值后: vec2.size=" << vec2.size() << ", vec3.size=" << vec3.size() << std::endl;
}

void testExceptionSafety() {
    std::cout << "\n=== 异常安全测试 ===" << std::endl;
    
    SimpleVector<int> vec;
    
    try {
        // TODO: 测试边界检查
        vec.at(0);  // 应该抛出异常
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
    }
    
    // TODO: 测试空vector的pop_back
    try {
        vec.pop_back();  // 应该抛出异常或安全处理
    } catch (const std::exception& e) {
        std::cout << "捕获异常: " << e.what() << std::endl;
    }
}

void testAdvancedFeatures() {
    std::cout << "\n=== 高级功能测试 ===" << std::endl;
    
    // TODO: 测试reserve
    SimpleVector<int> vec;
    vec.reserve(100);
    std::cout << "reserve后: capacity=" << vec.capacity() << std::endl;
    
    // TODO: 测试resize
    vec.resize(10, 42);
    std::cout << "resize后: size=" << vec.size() << std::endl;
    std::cout << "元素: ";
    for (const auto& val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // TODO: 测试clear
    vec.clear();
    std::cout << "clear后: size=" << vec.size() << ", empty=" << vec.empty() << std::endl;
}

int main() {
    std::cout << "SimpleVector练习 - 实现你自己的动态数组！" << std::endl;
    std::cout << "请在标有TODO的地方实现相应功能" << std::endl;
    
    try {
        testBasicOperations();
        testCopyOperations();
        testMoveOperations();
        testExceptionSafety();
        testAdvancedFeatures();
        
        std::cout << "\n所有测试完成！" << std::endl;
        
    } catch (const std::exception& e) {
        std::cout << "测试过程中发生异常: " << e.what() << std::endl;
    }
    
    return 0;
}

/*
 * 实现提示：
 * 
 * 1. 内存管理：
 *    - 使用new[]分配内存，delete[]释放
 *    - 或者使用std::allocator进行更精细的控制
 * 
 * 2. 扩容策略：
 *    - 常用策略：容量翻倍（capacity * 2）
 *    - 初始容量建议为1或2
 * 
 * 3. 异常安全：
 *    - 强异常安全保证：操作要么成功，要么不改变对象状态
 *    - 使用RAII原则管理资源
 * 
 * 4. 移动语义：
 *    - 移动后的对象应该处于有效但未指定状态
 *    - 通常将moved-from对象重置为默认状态
 * 
 * 5. 性能考虑：
 *    - 避免不必要的拷贝
 *    - 使用移动语义优化性能
 *    - 考虑使用emplace_back替代push_back
 */