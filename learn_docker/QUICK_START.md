# Docker 学习项目 - 快速开始

> 5分钟了解如何使用这个学习项目

---

## 🚀 立即开始

### 第一步: 选择你的学习方式

根据你的学习偏好,选择以下三种方式之一:

#### 方式 1: 交互式学习 (推荐初学者) ⭐

```bash
# 启动交互式学习系统
./learn-interactive.sh
```

**特点**:
- 🎨 友好的图形界面
- 📊 自动追踪学习进度
- 🧪 内置实践练习
- 🎓 知识检查测试

#### 方式 2: 自主学习 (适合有基础)

```bash
# 1. 查看学习路径
cat LEARNING_PATH.md

# 2. 按照 Day 1-10 的内容学习
# 3. 完成每天的实践练习
# 4. 遇到问题查看 TROUBLESHOOTING.md
```

#### 方式 3: 快速实践 (适合动手型)

```bash
# 1. 运行简单示例
cd examples/simple-web-app
docker build -t my-web-app .
docker run -d -p 8080:80 my-web-app
# 访问 http://localhost:8080

# 2. 运行完整项目
cd ../..
docker-compose up --build
# 访问 http://localhost:8080
```

---

## 📚 核心文档速览

### 必读文档

| 文档 | 用途 | 阅读时间 |
|------|------|---------|
| `README.md` | 项目总览 | 5分钟 |
| `CLAUDE.md` | 学习指南和协作方式 | 10分钟 |
| `LEARNING_PATH.md` | 10天完整学习路径 | 30分钟 |

### 参考文档

| 文档 | 用途 | 查阅时机 |
|------|------|---------|
| `TROUBLESHOOTING.md` | 故障排查 | 遇到问题时 |
| `best-practices/` | 最佳实践 | 写代码时 |
| `PROJECT_SUMMARY.md` | 项目总结 | 全面了解时 |

---

## 🎯 10天学习计划

### 时间安排

**工作日**: 每天1小时
- 30分钟理论学习
- 30分钟动手实践

**周末**: 每天2-3小时
- 1小时学习新内容
- 1-2小时完成项目

### 学习节奏

```
Week 1:
├── Day 1-2: Docker 基础      [容器和镜像]
├── Day 3-4: Dockerfile       [镜像构建]
└── Day 5-6: Docker Compose   [多容器编排]

Week 2:
├── Day 7-8: 数据和网络       [持久化和通信]
└── Day 9-10: 生产实践        [部署和运维]
```

---

## 💻 实践项目

### 初级: 简单 Web 应用

```bash
cd examples/simple-web-app
cat README.md  # 查看详细说明

# 构建和运行
docker build -t my-web-app .
docker run -d -p 8080:80 my-web-app

# 访问
open http://localhost:8080
```

**学习要点**:
- Dockerfile 基本结构
- 镜像构建过程
- 容器运行和端口映射

### 中级: 多服务应用

```bash
cd examples/multi-service-app
cat README.md  # 查看详细说明

# 启动所有服务
docker-compose up --build

# 测试服务
curl http://localhost:8080/health
```

**学习要点**:
- Docker Compose 编排
- 服务间通信
- 数据持久化
- 健康检查

### 高级: 完整项目

```bash
# 返回项目根目录
cd ../..

# 开发环境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 测试 API
./test-api.sh
```

**学习要点**:
- 多环境配置
- 资源限制
- 日志管理
- 生产部署

---

## 🛠️ 工具使用

### 自动化练习脚本

```bash
# 查看所有练习
./docker-practice.sh help

# 运行特定练习
./docker-practice.sh 1  # 基础镜像操作
./docker-practice.sh 2  # 构建和运行
./docker-practice.sh 3  # Docker Compose

# 运行所有练习
./docker-practice.sh all
```

### 交互式学习工具

```bash
# 启动学习系统
./learn-interactive.sh

# 功能:
# - Day 1-2 完整课程
# - 理论学习
# - 实践练习
# - 知识测试
# - 进度追踪
```

### API 测试脚本

```bash
# 确保应用正在运行
docker-compose up -d

# 运行测试
./test-api.sh
```

---

## 🔧 环境准备

### 检查环境

```bash
# 检查 Docker 版本
docker --version
# 应该 >= 20.10

# 检查 Docker Compose 版本
docker-compose --version
# 应该 >= 1.29

# 检查 Docker 是否运行
docker ps
```

### 如果 Docker 未安装

**macOS**:
```bash
# 下载 Docker Desktop
# https://docs.docker.com/desktop/mac/install/
```

**Linux (Ubuntu)**:
```bash
# 安装 Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 添加当前用户到 docker 组
sudo usermod -aG docker $USER
```

---

## 📖 学习技巧

### 高效学习方法

1. **理论 + 实践 = 1:2**
   - 30% 时间看文档
   - 70% 时间动手练

2. **小步快跑**
   - 每次只学一个概念
   - 立即实践验证
   - 确保理解后再继续

3. **记录笔记**
   - 记录关键命令
   - 总结核心概念
   - 记录遇到的问题

4. **定期复习**
   - 每周回顾学过的内容
   - 重复实践练习
   - 巩固记忆

### 遇到问题怎么办?

1. **查看错误信息**
   ```bash
   docker logs <container_id>
   ```

2. **查阅故障排查指南**
   ```bash
   cat TROUBLESHOOTING.md
   ```

3. **使用诊断流程**
   ```
   错误信息 → 查看日志 → 验证配置 → 检查资源 → 查文档
   ```

4. **实验和验证**
   - 尝试不同的解决方案
   - 记录有效的方法
   - 理解为什么有效

---

## 🎓 学习目标

完成这个项目后,你应该能够:

### 基础技能 ✅
- [ ] 运行和管理容器
- [ ] 编写 Dockerfile
- [ ] 使用 Docker Compose

### 进阶技能 ✅
- [ ] 优化镜像大小
- [ ] 配置多环境部署
- [ ] 排查常见问题

### 生产技能 ✅
- [ ] 实施最佳实践
- [ ] 配置监控和日志
- [ ] 设计容器化架构

---

## 📊 学习进度追踪

### 自我检查

每完成一个阶段,使用这个清单检查:

**Day 1-2**: Docker 基础
- [ ] 理解容器和镜像的区别
- [ ] 掌握基本命令
- [ ] 能运行和管理容器

**Day 3-4**: Dockerfile
- [ ] 能编写简单的 Dockerfile
- [ ] 理解多阶段构建
- [ ] 会优化镜像大小

**Day 5-6**: Docker Compose
- [ ] 能编写 docker-compose.yml
- [ ] 理解服务编排
- [ ] 会配置多环境

**Day 7-8**: 数据和网络
- [ ] 理解数据持久化
- [ ] 掌握容器网络
- [ ] 能排查连接问题

**Day 9-10**: 生产实践
- [ ] 会配置健康检查
- [ ] 理解资源限制
- [ ] 掌握运维技巧

---

## 🚦 下一步

### 完成基础学习后

1. **实战项目**
   - 容器化自己的应用
   - 搭建完整的开发环境
   - 部署到生产环境

2. **深入学习**
   - Kubernetes 编排
   - CI/CD 集成
   - 监控和日志

3. **社区参与**
   - 分享学习经验
   - 贡献开源项目
   - 帮助其他学习者

---

## 💡 最佳实践提示

### 学习建议

✅ **DO**:
- 按顺序学习,不跳步
- 每个概念都实践
- 记录学习笔记
- 定期复习巩固

❌ **DON'T**:
- 只看不练
- 遇到问题就放弃
- 死记命令不理解原理
- 学完不复习

### 实践建议

✅ **DO**:
- 使用版本控制 (Git)
- 遵循最佳实践
- 编写清晰的注释
- 定期清理资源

❌ **DON'T**:
- 在生产环境试验
- 忽略安全问题
- 使用 latest 标签
- 不配置资源限制

---

## 📞 获取帮助

### 项目内资源

```bash
# 查看文档
cat CLAUDE.md          # 学习指南
cat TROUBLESHOOTING.md # 故障排查

# 使用工具
./learn-interactive.sh # 交互式学习
./docker-practice.sh   # 自动化练习
```

### 外部资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/docker)

---

## 🎉 准备好了吗?

选择你的学习方式,开始 Docker 之旅吧!

```bash
# 初学者推荐
./learn-interactive.sh

# 或者直接开始实践
cd examples/simple-web-app
docker build -t my-first-app .
docker run -d -p 8080:80 my-first-app
open http://localhost:8080
```

**祝学习愉快! 🚀**
