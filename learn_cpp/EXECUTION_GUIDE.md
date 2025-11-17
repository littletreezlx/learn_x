# C++ 项目整理执行指南

> **安全第一**：所有操作都有备份，可随时回滚

## 🚀 快速执行（推荐）

### 1. 进入C++项目目录
```bash
cd learn_cpp
```

### 2. 执行整理脚本
```bash
# 执行文件重命名和组织
./reorganize_files.sh

# 验证结果
./verify_organization.sh
```

### 3. 检查结果
```bash
# 查看新的文件结构
ls examples/ exercises/ solutions/

# 测试编译示例文件
g++ -std=c++17 examples/01_hello.cpp -o hello && ./hello
```

## 📋 执行步骤详解

### 步骤1: 备份现有文件
脚本会自动创建 `backup_YYYYMMDD_HHMMSS` 目录，包含所有原始文件。

### 步骤2: 文件重命名
按照 `RENAME_PLAN.md` 中的映射表执行重命名：

**阶段1 (01-06)**: 基础语法
- `01_hello_world.cpp` → `01_hello.cpp`
- `02_variables.cpp` → `02_variables.cpp`
- ... 其他基础文件

**阶段2 (07-09)**: 内存管理特色
- `07_pointers_intro.cpp` → `07_pointers.cpp`
- `08_references.cpp` → `08_references.cpp`
- `01_memory_layout.cpp` → `09_memory_layout.cpp`

**阶段3 (10-12)**: 动态内存与智能指针
- `03_dynamic_allocation.cpp` → `10_dynamic_memory.cpp`
- `05_smart_pointers.cpp` → `11_smart_pointers.cpp`
- `06_raii_principle.cpp` → `12_raii.cpp`

**阶段4 (13-15)**: 高级特性
- `02_pointer_arithmetic.cpp` → `13_pointer_arith.cpp`
- `04_memory_errors.cpp` → `14_memory_errors.cpp`
- `15_oop_intro.cpp` (新建，面向对象基础)

### 步骤3: 验证完整性
`verify_organization.sh` 会检查：

1. **文件完整性**：确保所有必需文件存在
2. **编译正确性**：测试关键文件能否编译
3. **结构合理性**：检查基本的C++程序结构

## 🎯 预期结果

### 新的目录结构
```
learn_cpp/
├── examples/          # 15个核心示例文件
│   ├── 01_hello.cpp
│   ├── 02_variables.cpp
│   ├── ...
│   └── 15_oop_intro.cpp
├── exercises/         # 练习题文件
│   ├── 02_calculator.cpp
│   ├── 04_text_processor.cpp
│   └── 10_simple_vector.cpp
├── solutions/         # 练习解答
│   ├── 02_calculator_solution.cpp
│   └── 04_text_processor_solution.cpp
└── backup_*/          # 备份的原始文件
```

### 符合全局规范
- ✅ **连续编号**：01-15，无间断
- ✅ **阶段清晰**：基础→内存管理→智能指针→高级特性
- ✅ **描述性命名**：文件名直接反映学习内容
- ✅ **C++特色**：重点突出内存管理特色

## ⚠️ 注意事项

### 安全保障
1. **自动备份**：所有操作前先备份
2. **非破坏性**：使用`cp`而非`mv`，保留原文件
3. **验证机制**：运行后自动验证完整性
4. **回滚简单**：删除新文件，恢复备份即可

### 可能遇到的问题
1. **权限问题**：确保脚本有执行权限 (`chmod +x`)
2. **编译器缺失**：确保安装了g++ (`g++ --version`)
3. **目录冲突**：确保examples/exercises/solutions目录可创建

## 🔄 后续工作

### 1. 更新文档引用
执行成功后，需要更新以下文档中的文件路径：
- `CORE_CHECKLIST.md` - 更新示例文件路径
- `QUICK_START.md` - 更新快速开始示例
- `01_basics/README.md` - 更新文件引用

### 2. 测试学习流程
验证整理后的文件是否支持原有学习路径：
1. Hello World 能否运行
2. 基础概念示例能否编译
3. 内存管理特色示例是否清晰

### 3. 更新 LEARNING_TRACKER.md
在全局学习追踪器中记录C++项目整理完成。

## 🎉 完成标准

执行成功后，你应该看到：
```
🎉 验证通过！文件重组成功完成！

📝 下一步建议:
   1. 运行一些示例程序
   2. 更新文档中的文件引用
   3. 测试练习题的编译和运行
```

## 🆘 回滚方案

如果遇到问题，可以快速回滚：

```bash
# 删除新创建的文件
rm -rf examples/ exercises/ solutions/

# 恢复备份
cp -r backup_*/01_basics .
cp -r backup_*/02_memory_management .

# 恢复原始状态
```

## 📞 获取帮助

1. **查看详细日志**：脚本执行时显示详细过程
2. **检查验证报告**：`verify_organization.sh` 的输出
3. **手动检查**：对比 `RENAME_PLAN.md` 和实际结果

---

**准备好了吗？** 运行 `./reorganize_files.sh` 开始整理！