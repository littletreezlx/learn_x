# Docker 核心知识检查清单

> **完成这些检查点，你就掌握了 Docker 的核心**

---

## 阶段 1: 基础概念（1-2天）

### ✅ 理解容器化
- [ ] 能够解释容器 vs 虚拟机的区别
- [ ] 理解镜像、容器、仓库的概念
- [ ] 知道为什么要使用 Docker
- [ ] 了解 Docker 的应用场景

**验证练习**：
```bash
# 运行你的第一个容器
docker run hello-world

# 解释：这背后发生了什么？
```

---

### ✅ 基本命令
- [ ] 能够使用 `docker run` 启动容器
- [ ] 会使用 `docker ps` 查看运行状态
- [ ] 能够使用 `docker images` 查看镜像
- [ ] 知道如何停止和删除容器

**验证练习**：
```bash
# 启动一个 nginx 容器
docker run -d -p 8080:80 --name my-nginx nginx

# 访问 http://localhost:8080
# 查看容器状态
docker ps

# 停止并删除容器
docker stop my-nginx
docker rm my-nginx
```

---

## 阶段 2: 镜像管理（2-3天）

### ✅ Dockerfile 基础
- [ ] 能够编写简单的 Dockerfile
- [ ] 理解 FROM、RUN、COPY、ADD、CMD、ENTRYPOINT 的区别
- [ ] 知道如何优化镜像大小
- [ ] 理解镜像分层和缓存

**验证练习**：
```dockerfile
# 编写一个简单的 Web 应用 Dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### ✅ 镜像构建和优化
- [ ] 能够使用 `docker build` 构建镜像
- [ ] 理解多阶段构建的优势
- [ ] 知道如何减小镜像大小
- [ ] 会使用 `.dockerignore` 文件

**验证练习**：
```dockerfile
# 多阶段构建示例
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

---

## 阶段 3: 容器编排（2-3天）

### ✅ Docker Compose 基础
- [ ] 能够编写 docker-compose.yml 文件
- [ ] 理解服务、网络、卷的概念
- [ ] 会配置环境变量和端口映射
- [ ] 知道如何管理多容器应用

**验证练习**：
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

---

### ✅ 多环境配置
- [ ] 能够使用不同环境的配置文件
- [ ] 理解配置文件覆盖机制
- [ ] 会管理开发和生产环境的差异
- [ ] 知道如何进行服务编排

**验证练习**：
```bash
# 使用不同配置启动
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 阶段 4: 数据管理（1-2天）

### ✅ 数据持久化
- [ ] 理解 Volume 和 Bind Mount 的区别
- [ ] 能够创建和管理数据卷
- [ ] 知道如何备份和恢复数据
- [ ] 会配置数据持久化策略

**验证练习**：
```yaml
version: '3.8'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

### ✅ 网络管理
- [ ] 理解 Docker 网络类型
- [ ] 能够创建自定义网络
- [ ] 知道容器间通信的原理
- [ ] 会配置网络策略

**验证练习**：
```bash
# 创建自定义网络
docker network create my-app-network

# 运行容器并连接到网络
docker run -d --name web --network my-app-network nginx
docker run -d --name api --network my-app-network my-api
```

---

## 阶段 5: 生产实践（2-3天）

### ✅ 镜像仓库
- [ ] 知道如何使用 Docker Hub
- [ ] 能够推送和拉取镜像
- [ ] 理解私有仓库的概念
- [ ] 会使用镜像标签和版本管理

**验证练习**：
```bash
# 构建并推送镜像
docker build -t yourname/myapp:1.0 .
docker push yourname/myapp:1.0

# 在另一台机器上拉取并运行
docker pull yourname/myapp:1.0
docker run -p 8080:80 yourname/myapp:1.0
```

---

### ✅ 监控和日志
- [ ] 能够查看容器日志
- [ ] 理解资源限制的配置
- [ ] 知道如何监控容器状态
- [ ] 会配置健康检查

**验证练习**：
```yaml
version: '3.8'
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## 阶段 6: 实战项目（2-3天）

### ✅ 完整项目容器化
- [ ] 能够容器化一个 Web 应用
- [ ] 会配置数据库服务
- [ ] 能够实现服务间通信
- [ ] 知道如何进行生产部署

**项目示例**：
- 博客系统（Web + 数据库）
- API 服务（API + 数据库 + Redis）
- 静态网站（Nginx + 静态文件）

---

## 🎯 完成标准

### ✅ 知识维度
- [ ] 理解 Docker 核心概念和架构
- [ ] 掌握镜像构建和优化技巧
- [ ] 熟悉容器编排和多服务管理
- [ ] 了解生产环境最佳实践

### ✅ 实践维度
- [ ] 能够编写高质量的 Dockerfile
- [ ] 能够使用 Docker Compose 管理多服务应用
- [ ] 能够进行数据持久化和网络配置
- [ ] 能够排查和解决常见问题

### ✅ 能力维度
- [ ] 能够独立容器化一个应用
- [ ] 能够设计多容器系统架构
- [ ] 能够查阅文档解决复杂问题
- [ ] 理解容器化在生产环境中的应用

---

## 📚 学习资源

- **官方文档**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **最佳实践**: https://docs.docker.com/develop/dev-best-practices/
- **Play with Docker**: https://labs.play-with-docker.com/

---

**记住**：Docker 是基础工具，关键是理解容器化思想。完成这些检查点后，你就可以应对大部分容器化需求！