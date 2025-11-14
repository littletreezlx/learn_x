# Docker 学习项目

这是一个完整的 Docker 学习项目，通过一个实际的 Spring Boot 应用来演示 Docker 的各种功能和最佳实践。

## 项目结构

```
learn_docker/
├── Dockerfile              # Docker 镜像构建文件
├── docker-compose.yml      # Docker Compose 配置文件
├── pom.xml                 # Maven 项目配置
├── settings.xml           # Maven 镜像源配置
├── src/                   # 源代码目录
│   └── main/java/com/example/demo/
│       └── DemoApplication.java
└── README.md              # 项目说明文档
```

## 项目介绍

这个项目包含一个简单的 Spring Boot Web 应用，主要用于：
- 学习 Docker 基础概念
- 掌握 Dockerfile 编写技巧
- 了解 Docker Compose 多容器编排
- 实践容器化部署最佳实践

## 快速开始

### 前提条件

确保你的系统已安装：
- Docker (版本 20.10+)
- Docker Compose (版本 1.29+)

### 运行应用

#### 方式1: 使用 Docker Compose (推荐)

```bash
# 构建并启动应用
docker-compose up --build

# 后台运行
docker-compose up -d --build

# 停止应用
docker-compose down
```

#### 方式2: 手动构建和运行

```bash
# 构建镜像
docker build -t learn-docker .

# 运行容器
docker run -p 8080:8080 learn-docker
```

### 访问应用

应用启动后，在浏览器中访问：http://localhost:8080

你应该能看到 "Hello Docker World!" 的欢迎消息。

### API 端点

应用提供以下 API 端点：

- `GET /` - 欢迎消息
- `GET /health` - 健康检查
- `GET /info` - 系统信息
- `GET /hello/{name}` - 个性化问候
- `GET /echo?message=xxx` - 回显服务
- `GET /load?seconds=x` - 负载测试
- `GET /memory` - 内存使用信息
- `GET /api/users` - 获取所有用户
- `POST /api/users` - 创建用户
- `GET /api/users/{id}` - 获取特定用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户
- `GET /api/users/search?username=xxx` - 搜索用户
- `GET /api/users/stats` - 用户统计信息

### 快速测试

使用提供的测试脚本快速验证所有功能：

```bash
./test-api.sh
```

## Docker 学习要点

### 1. Dockerfile 分析

本项目使用**多阶段构建**技术：

```dockerfile
# 第一阶段：构建应用
FROM maven:3.8.4-openjdk-11-slim AS builder
# ... 构建过程

# 第二阶段：运行应用  
FROM openjdk:11-jre-slim
# ... 运行环境
```

**优势：**
- 减小最终镜像大小
- 提高安全性（运行镜像不包含构建工具）
- 分离构建和运行环境

### 2. Docker Compose 配置

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    restart: unless-stopped
```

**学习要点：**
- 服务定义和端口映射
- 环境变量配置
- 重启策略设置

### 3. 镜像优化技巧

- **分层缓存**：先复制 pom.xml，再复制源码
- **依赖预下载**：`mvn dependency:go-offline`
- **精简基础镜像**：使用 `slim` 版本

## 常用 Docker 命令

### 镜像管理

```bash
# 查看镜像列表
docker images

# 删除镜像
docker rmi learn-docker

# 清理未使用的镜像
docker image prune
```

### 容器管理

```bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 进入容器
docker exec -it <container_id> /bin/bash

# 查看容器日志
docker logs <container_id>

# 停止容器
docker stop <container_id>

# 删除容器
docker rm <container_id>
```

### Docker Compose 命令

```bash
# 启动服务
docker-compose up

# 后台启动
docker-compose up -d

# 重新构建并启动
docker-compose up --build

# 停止服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs app
```

## 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   lsof -i :8080
   # 或使用其他端口
   docker run -p 8081:8080 learn-docker
   ```

2. **镜像构建失败**
   ```bash
   # 清理构建缓存
   docker builder prune
   # 重新构建
   docker build --no-cache -t learn-docker .
   ```

3. **容器无法启动**
   ```bash
   # 查看详细日志
   docker logs <container_id>
   ```

## 多环境部署

### 开发环境

```bash
# 启动开发环境（使用 H2 内存数据库）
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 访问 H2 控制台：http://localhost:8080/h2-console
# JDBC URL: jdbc:h2:mem:testdb
# Username: sa
# Password: (留空)
```

### 生产环境

```bash
# 启动生产环境（PostgreSQL 数据库）
docker-compose -f docker-compose.yml -f docker-compose.db.yml up --build

# 应用：http://localhost:8080
# 数据库：localhost:5432 (用户名: demo_user, 密码: demo_password)
```

### 仅数据库服务

```bash
# 仅启动数据库相关服务
docker-compose -f docker-compose.db.yml up postgres redis
```

## 自动化练习

使用提供的练习脚本进行系统化学习：

```bash
# 查看所有可用练习
./docker-practice.sh help

# 运行特定练习
./docker-practice.sh 1    # 基础镜像操作
./docker-practice.sh 2    # 构建和运行应用
./docker-practice.sh 3    # Docker Compose
./docker-practice.sh 4    # 多环境配置
./docker-practice.sh 5    # 高级容器管理
./docker-practice.sh 6    # 镜像管理优化
./docker-practice.sh 7    # 网络和存储

# 运行所有练习
./docker-practice.sh all

# 清理所有 Docker 资源
./docker-practice.sh cleanup
```

## 学习练习

### 基础练习

1. 修改 `DemoApplication.java` 中的返回消息
2. 重新构建镜像并运行
3. 观察镜像分层和缓存效果
4. 测试健康检查功能

### 进阶练习

1. 添加新的 REST 端点
2. 配置不同的环境变量
3. 尝试挂载卷（volume）存储数据
4. 集成数据库服务
5. 使用多环境配置文件
6. 测试用户 CRUD API

### 数据库练习

1. 使用 H2 控制台查看数据
2. 切换到 PostgreSQL 数据库
3. 测试数据持久化
4. 查看数据库初始化脚本执行结果

### 实验任务

- [x] 修改应用代码，添加 `/health` 健康检查端点
- [x] 使用环境变量配置应用端口
- [x] 尝试多服务 Docker Compose 配置
- [x] 优化 Dockerfile，进一步减小镜像大小
- [x] 集成 PostgreSQL 数据库
- [x] 添加用户管理 API
- [x] 实现多环境配置

## 扩展学习

1. **安全最佳实践**
   - 使用非 root 用户运行应用
   - 扫描镜像漏洞
   - 最小权限原则

2. **生产环境考虑**
   - 健康检查配置
   - 资源限制设置
   - 日志管理
   - 监控和告警

3. **CI/CD 集成**
   - 自动化构建
   - 镜像推送到仓库
   - 自动化部署

## 参考资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Spring Boot Docker 指南](https://spring.io/guides/topicals/spring-boot-docker/)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
