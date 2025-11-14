# Docker 学习指南 - Claude Code 协作规则

> **目标**: 通过实践掌握 Docker 容器化技术的核心概念和实用技能

---

## 🎯 学习目标和原则

### 核心学习目标
1. **理解容器化核心概念** - 镜像、容器、仓库的关系
2. **掌握 Dockerfile 编写** - 多阶段构建、层缓存优化
3. **熟练使用 Docker Compose** - 多容器编排和环境管理
4. **实践生产部署** - 资源限制、健康检查、日志管理

### 学习方式
- **实践优先**: 每个概念都通过代码验证
- **循序渐进**: 从简单到复杂,逐步深入
- **问题驱动**: 遇到问题时先思考再查询
- **举一反三**: 理解原理后尝试变化场景

---

## 📚 项目结构理解

### 核心文件说明

```
learn_docker/
├── Dockerfile                    # 镜像构建配置 [核心]
├── docker-compose.yml            # 基础编排配置 [核心]
├── docker-compose.dev.yml        # 开发环境覆盖配置
├── docker-compose.db.yml         # 数据库服务配置
├── docker-compose.prod.yml       # 生产环境配置
├── docker-practice.sh            # 自动化练习脚本 [推荐使用]
├── test-api.sh                   # API 测试脚本
├── pom.xml                       # Java 项目配置
├── settings.xml                  # Maven 镜像源配置
├── src/                          # Java 源代码
│   └── main/java/com/example/demo/
│       ├── DemoApplication.java  # 主应用
│       ├── controller/           # REST 控制器
│       ├── entity/               # 数据实体
│       └── repository/           # 数据访问层
├── init-scripts/                 # 数据库初始化脚本
├── README.md                     # 项目说明
├── CLAUDE.md                     # 本文件 - 学习指南
└── LEARNING_PATH.md              # 详细学习路径
```

---

## 🚀 快速开始

### 环境检查

在开始学习前,确保环境就绪:

```bash
# 检查 Docker 版本
docker --version  # 应该 >= 20.10

# 检查 Docker Compose 版本
docker-compose --version  # 应该 >= 1.29

# 检查 Docker 是否运行
docker ps
```

### 第一次运行

```bash
# 1. 构建并启动应用
docker-compose up --build

# 2. 在浏览器访问 http://localhost:8080

# 3. 测试 API
curl http://localhost:8080/health

# 4. 停止应用
docker-compose down
```

---

## 📖 学习路径

### 阶段1: Docker 基础 (第1-2天)

**目标**: 理解镜像和容器的概念

**学习内容**:
- 什么是镜像?什么是容器?
- 镜像层的概念
- 基础命令: `docker run`, `docker ps`, `docker images`

**实践练习**:
```bash
# 使用练习脚本
./docker-practice.sh 1

# 手动练习
docker pull nginx:alpine
docker run -d -p 80:80 nginx:alpine
docker ps
docker stop <container_id>
```

**思考问题**:
- 镜像和容器有什么区别?
- 为什么停止容器后数据会丢失?
- `-d` 参数的作用是什么?

### 阶段2: Dockerfile 编写 (第3-4天)

**目标**: 掌握自定义镜像构建

**学习内容**:
- Dockerfile 基本指令
- 多阶段构建
- 层缓存优化

**实践练习**:
```bash
# 使用练习脚本
./docker-practice.sh 2

# 分析本项目的 Dockerfile
cat Dockerfile  # 查看多阶段构建

# 实验: 修改欢迎消息
# 编辑 src/main/java/com/example/demo/DemoApplication.java
# 重新构建并运行
docker-compose up --build
```

**思考问题**:
- 为什么使用两个 FROM 指令?
- `COPY pom.xml .` 和 `COPY src ./src` 为什么分开写?
- 如何减小镜像大小?

**关键文件**: `Dockerfile:1-42`

### 阶段3: Docker Compose 编排 (第5-6天)

**目标**: 理解多容器应用编排

**学习内容**:
- docker-compose.yml 配置结构
- 服务依赖关系
- 环境变量管理

**实践练习**:
```bash
# 使用练习脚本
./docker-practice.sh 3

# 多环境部署
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# 查看日志
docker-compose logs -f app
```

**思考问题**:
- 服务间如何通信?
- 如何配置不同环境的数据库?
- 端口映射的规则是什么?

**关键文件**: `docker-compose.yml:1-50`

### 阶段4: 数据持久化和网络 (第7-8天)

**目标**: 理解数据存储和容器网络

**学习内容**:
- Volume 数据卷
- 网络模式
- 容器间通信

**实践练习**:
```bash
# 使用练习脚本
./docker-practice.sh 7

# 启动数据库服务
docker-compose -f docker-compose.db.yml up -d postgres

# 检查数据持久化
docker volume ls
```

**思考问题**:
- 数据卷和绑定挂载的区别?
- 容器重启后数据会丢失吗?
- 如何备份容器中的数据?

### 阶段5: 生产环境实践 (第9-10天)

**目标**: 掌握生产部署最佳实践

**学习内容**:
- 健康检查配置
- 资源限制
- 日志管理
- 安全加固

**实践练习**:
```bash
# 使用练习脚本
./docker-practice.sh 5

# 生产环境部署
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 监控资源使用
docker stats
```

**思考问题**:
- 如何确保应用高可用?
- 资源限制为什么重要?
- 如何收集和分析日志?

---

## 💡 关键概念理解

### 镜像 vs 容器

**镜像 (Image)**:
- 只读的模板,包含运行应用所需的一切
- 类比: 类 (Class)
- 通过 Dockerfile 构建

**容器 (Container)**:
- 镜像的运行实例
- 类比: 对象 (Object)
- 可读写,有独立的文件系统

### 多阶段构建的优势

```dockerfile
# 阶段1: 构建 (使用完整工具链)
FROM maven:3.8.4-openjdk-11-slim AS builder
# ... 编译代码

# 阶段2: 运行 (只包含运行时)
FROM openjdk:11-jre-slim
COPY --from=builder /app/target/*.jar app.jar
```

**优势**:
- **镜像更小**: 运行镜像不包含构建工具
- **更安全**: 减少攻击面
- **更快**: 部署和启动更快

### Docker Compose 配置覆盖

```bash
# 基础配置
docker-compose.yml          # 通用配置

# 环境特定配置
docker-compose.dev.yml      # 开发环境覆盖
docker-compose.prod.yml     # 生产环境覆盖

# 合并使用
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

---

## 🛠️ Claude Code 协作方式

### 我的职责

**引导学习**:
- 解释核心概念,不直接给答案
- 通过问题引导你思考
- 提供实践建议和调试思路

**协助实践**:
- 帮助分析错误信息
- 提供配置修改建议
- 展示最佳实践示例

**不会做的**:
- 直接完成你的学习任务
- 代替你思考和实践
- 跳过学习步骤

### 你的学习方式

**有效的提问**:
✅ "为什么这个容器无法启动?这是错误信息: ..."
✅ "我尝试修改了端口映射,但还是不工作,可能是什么原因?"
✅ "Dockerfile 的这两行有什么区别?"

**低效的提问**:
❌ "帮我写一个 Dockerfile"
❌ "Docker 怎么用?"
❌ "我的项目报错了"

### 学习节奏建议

**每日学习计划**:
- 工作日: 1小时 (30分钟理论 + 30分钟实践)
- 周末: 2-3小时 (深入实践项目)

**学习检查点**:
- 每个阶段结束后完成练习
- 能够用自己的话解释核心概念
- 独立完成一个小项目

---

## 🎯 实践项目建议

### 初级项目 (阶段1-2完成后)

**目标**: 容器化一个静态网站
- 使用 nginx 镜像
- 编写简单的 Dockerfile
- 映射端口并访问

### 中级项目 (阶段3-4完成后)

**目标**: 部署前后端分离应用
- 前端: nginx + 静态文件
- 后端: Node.js 或 Python API
- 数据库: PostgreSQL 或 MySQL
- 使用 Docker Compose 编排

### 高级项目 (阶段5完成后)

**目标**: 生产级部署
- 多环境配置
- 健康检查和自动重启
- 日志收集
- 资源限制和监控

---

## 🔍 常见问题处理

### 问题分析流程

当遇到问题时,按以下步骤分析:

1. **查看日志**
   ```bash
   docker logs <container_id>
   docker-compose logs app
   ```

2. **检查容器状态**
   ```bash
   docker ps -a
   docker inspect <container_id>
   ```

3. **进入容器调试**
   ```bash
   docker exec -it <container_id> /bin/bash
   ```

4. **检查网络和端口**
   ```bash
   docker network ls
   lsof -i :8080  # 检查端口占用
   ```

### 常见错误类型

**构建失败**:
- 检查 Dockerfile 语法
- 查看构建日志中的错误信息
- 验证基础镜像是否可访问

**容器无法启动**:
- 查看容器日志
- 检查端口是否被占用
- 验证环境变量配置

**网络连接问题**:
- 确认端口映射正确
- 检查防火墙设置
- 验证服务间网络配置

---

## 📊 学习进度追踪

### 自我检测清单

**阶段1: 基础概念** (目标2天)
- [ ] 能解释镜像和容器的区别
- [ ] 会使用基本的 docker 命令
- [ ] 理解容器的生命周期

**阶段2: Dockerfile** (目标2天)
- [ ] 能编写简单的 Dockerfile
- [ ] 理解多阶段构建的优势
- [ ] 知道如何优化镜像大小

**阶段3: Docker Compose** (目标2天)
- [ ] 能编写基础的 docker-compose.yml
- [ ] 理解服务编排的概念
- [ ] 会配置环境变量和端口映射

**阶段4: 数据和网络** (目标2天)
- [ ] 理解数据卷的作用
- [ ] 知道容器网络的工作原理
- [ ] 能配置容器间通信

**阶段5: 生产实践** (目标2天)
- [ ] 能配置健康检查
- [ ] 理解资源限制的重要性
- [ ] 知道生产部署的最佳实践

### 完成标准

**知识维度**:
- 理解 Docker 核心概念 (镜像、容器、网络、存储)
- 掌握常用命令和配置
- 了解生产部署考虑因素

**实践维度**:
- 能独立容器化一个应用
- 能使用 Docker Compose 编排多服务
- 能排查常见问题

**能力维度**:
- 能阅读和理解 Dockerfile
- 能根据需求修改配置
- 知道如何查阅文档解决问题

---

## 🚦 学习信号判断

### 可以继续的信号 ✅
- 完成了阶段练习
- 能够解释核心概念
- 独立解决了实践问题

### 需要巩固的信号 ⚠️
- 概念理解模糊
- 实践过程频繁出错
- 无法独立完成练习

### 需要调整的信号 🔄
- 感觉进度太快或太慢
- 对某个主题特别感兴趣
- 需要更多实践时间

---

## 📚 推荐资源

### 官方文档
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Dockerfile 参考](https://docs.docker.com/engine/reference/builder/)

### 实践工具
- `docker-practice.sh` - 本项目的自动化练习脚本
- [Play with Docker](https://labs.play-with-docker.com/) - 在线 Docker 环境

### 进阶学习
- Docker 网络深入
- Docker 安全最佳实践
- Kubernetes 容器编排 (下一步学习)

---

## 🎓 学习完成后

### 你应该能够:
- 独立容器化任何应用
- 编写生产级的 Dockerfile
- 使用 Docker Compose 管理多服务
- 排查和解决常见问题
- 理解容器化的最佳实践

### 下一步学习建议:
- **Kubernetes**: 大规模容器编排
- **CI/CD**: 自动化构建和部署
- **微服务架构**: 容器化微服务实践
- **监控和日志**: 生产环境可观测性

---

**记住**: Docker 是工具,关键是理解容器化思想和实践经验。多动手,多思考,遇到问题先分析再寻求帮助!
