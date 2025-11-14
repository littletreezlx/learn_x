# Docker 学习路径 - 10天进阶计划

> **设计理念**: 从零基础到生产部署,通过实践项目系统掌握 Docker

---

## 📋 学习路径总览

```
Day 1-2: Docker 基础        → 理解容器核心概念
Day 3-4: Dockerfile 编写    → 掌握镜像构建
Day 5-6: Docker Compose     → 多容器编排
Day 7-8: 数据和网络         → 持久化和通信
Day 9-10: 生产实践          → 部署和运维
```

**总时长**: 10天 (每天1-2小时)
**学习方式**: 理论 + 实践 + 反思

---

## 🎯 Day 1-2: Docker 基础概念

### 学习目标
- 理解什么是容器和镜像
- 掌握 Docker 基本命令
- 能够运行和管理容器

### 理论知识 (30分钟)

#### 核心概念

**容器 vs 虚拟机**:
```
虚拟机:
[App A] [App B]
[Guest OS] [Guest OS]
[Hypervisor]
[Host OS]
[Hardware]

容器:
[App A] [App B]
[Docker Engine]
[Host OS]
[Hardware]
```

**关键区别**:
- 容器共享主机内核,启动更快
- 容器更轻量,资源占用更少
- 容器隔离性略低于虚拟机

**镜像的层结构**:
```
[Your App Layer]
[Dependencies Layer]
[Runtime Layer]
[Base OS Layer]
```

每层都是只读的,容器运行时添加一个可写层

### 实践练习 (60分钟)

#### 练习1: 运行第一个容器

```bash
# 拉取 nginx 镜像
docker pull nginx:alpine

# 查看镜像
docker images

# 运行容器
docker run -d -p 8080:80 --name my-nginx nginx:alpine

# 访问
curl http://localhost:8080

# 查看运行中的容器
docker ps

# 查看容器日志
docker logs my-nginx

# 停止容器
docker stop my-nginx

# 删除容器
docker rm my-nginx
```

**思考问题**:
1. `-d` 参数的作用是什么?
2. `-p 8080:80` 是什么意思?
3. 停止容器后再次启动会怎样?

#### 练习2: 容器生命周期管理

```bash
# 创建但不启动
docker create --name test-nginx nginx:alpine

# 启动容器
docker start test-nginx

# 重启容器
docker restart test-nginx

# 暂停容器
docker pause test-nginx

# 恢复容器
docker unpause test-nginx

# 查看容器详细信息
docker inspect test-nginx

# 查看容器进程
docker top test-nginx

# 进入容器
docker exec -it test-nginx /bin/sh

# 在容器内执行命令
ls /usr/share/nginx/html
exit

# 停止并删除
docker stop test-nginx
docker rm test-nginx
```

#### 练习3: 使用自动化脚本

```bash
# 运行基础练习
./docker-practice.sh 1

# 按照提示完成练习
```

### 知识检查点

**必须理解**:
- [ ] 镜像和容器的区别
- [ ] 容器的状态转换 (created, running, paused, stopped)
- [ ] 基本命令: run, ps, stop, rm, logs

**能够做到**:
- [ ] 拉取和运行任意镜像
- [ ] 查看和管理容器状态
- [ ] 进入容器排查问题

### 常见问题

**Q: 容器停止后数据会丢失吗?**
A: 容器的可写层数据会保留,但删除容器后会丢失。需要持久化的数据要使用 Volume。

**Q: 如何查看容器占用的资源?**
A: 使用 `docker stats` 命令实时查看。

**Q: 端口已被占用怎么办?**
A: 使用 `lsof -i :8080` 查看占用进程,或映射到其他端口。

---

## 🎯 Day 3-4: Dockerfile 编写

### 学习目标
- 理解 Dockerfile 指令
- 掌握多阶段构建
- 学会优化镜像大小

### 理论知识 (40分钟)

#### Dockerfile 基本指令

```dockerfile
# 基础镜像
FROM openjdk:11-jre-slim

# 维护者信息
LABEL maintainer="your-email@example.com"

# 设置工作目录
WORKDIR /app

# 复制文件
COPY app.jar .

# 添加文件(支持 URL 和自动解压)
ADD https://example.com/file.tar.gz /tmp/

# 运行命令(构建时执行)
RUN apt-get update && apt-get install -y curl

# 设置环境变量
ENV APP_HOME=/app

# 声明端口
EXPOSE 8080

# 设置卷
VOLUME ["/data"]

# 容器启动命令
CMD ["java", "-jar", "app.jar"]

# 或使用 ENTRYPOINT
ENTRYPOINT ["java"]
CMD ["-jar", "app.jar"]
```

#### CMD vs ENTRYPOINT

```dockerfile
# CMD: 可被覆盖
CMD ["echo", "Hello"]
# docker run myimage echo "Bye"  → 输出 "Bye"

# ENTRYPOINT: 不可覆盖,参数可追加
ENTRYPOINT ["echo"]
CMD ["Hello"]
# docker run myimage "Bye"  → 输出 "Bye"
```

#### 多阶段构建

```dockerfile
# 阶段1: 构建
FROM maven:3.8-openjdk-11 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# 阶段2: 运行
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
```

**优势**:
- 最终镜像只包含运行时需要的文件
- 镜像大小从 800MB 减少到 200MB
- 提高安全性和部署速度

### 实践练习 (90分钟)

#### 练习1: 分析本项目 Dockerfile

```bash
# 查看 Dockerfile
cat Dockerfile

# 构建镜像
docker build -t learn-docker:v1 .

# 查看镜像大小
docker images learn-docker

# 查看镜像层
docker history learn-docker:v1
```

**分析任务**:
1. 为什么使用两个 FROM?
2. 为什么先复制 pom.xml 再复制源码?
3. HEALTHCHECK 的作用是什么?

#### 练习2: 修改应用并重新构建

```bash
# 1. 修改欢迎消息
# 编辑 src/main/java/com/example/demo/DemoApplication.java
# 将 "Hello Docker World!" 改为 "Hello [你的名字]!"

# 2. 重新构建
docker build -t learn-docker:v2 .

# 3. 观察构建过程
# 注意哪些步骤使用了缓存

# 4. 运行新版本
docker run -d -p 8080:8080 --name app-v2 learn-docker:v2

# 5. 测试
curl http://localhost:8080

# 6. 清理
docker stop app-v2 && docker rm app-v2
```

#### 练习3: 优化 Dockerfile

创建 `Dockerfile.optimized`:

```dockerfile
# 多阶段构建 + 优化技巧

# 阶段1: 依赖下载
FROM maven:3.8.4-openjdk-11-slim AS dependencies
WORKDIR /build
COPY pom.xml settings.xml ./
RUN mvn dependency:go-offline -s settings.xml

# 阶段2: 编译
FROM maven:3.8.4-openjdk-11-slim AS builder
WORKDIR /build
COPY --from=dependencies /root/.m2 /root/.m2
COPY pom.xml settings.xml ./
COPY src ./src
RUN mvn package -DskipTests -s settings.xml

# 阶段3: 运行
FROM openjdk:11-jre-slim
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# 构建优化版本
docker build -f Dockerfile.optimized -t learn-docker:optimized .

# 比较镜像大小
docker images | grep learn-docker
```

#### 练习4: 使用自动化脚本

```bash
# 运行 Dockerfile 练习
./docker-practice.sh 2
```

### 知识检查点

**必须理解**:
- [ ] Dockerfile 常用指令的作用
- [ ] 多阶段构建的优势
- [ ] 镜像分层和缓存机制
- [ ] CMD 和 ENTRYPOINT 的区别

**能够做到**:
- [ ] 编写基本的 Dockerfile
- [ ] 使用多阶段构建优化镜像
- [ ] 理解如何利用缓存加速构建

### 镜像优化清单

**减小镜像大小**:
- [ ] 使用精简基础镜像 (alpine, slim)
- [ ] 多阶段构建
- [ ] 合并 RUN 命令
- [ ] 清理临时文件

**加速构建**:
- [ ] 优化 COPY 顺序
- [ ] 利用层缓存
- [ ] 预下载依赖

---

## 🎯 Day 5-6: Docker Compose 编排

### 学习目标
- 理解多容器编排的必要性
- 掌握 docker-compose.yml 配置
- 学会管理多环境部署

### 理论知识 (40分钟)

#### 为什么需要 Docker Compose?

**场景**: Web 应用 + 数据库 + 缓存

**不使用 Compose**:
```bash
# 创建网络
docker network create myapp-network

# 启动数据库
docker run -d --name postgres \
  --network myapp-network \
  -e POSTGRES_PASSWORD=secret \
  postgres:13

# 启动 Redis
docker run -d --name redis \
  --network myapp-network \
  redis:alpine

# 启动应用
docker run -d --name app \
  --network myapp-network \
  -p 8080:8080 \
  -e DB_HOST=postgres \
  -e REDIS_HOST=redis \
  myapp:latest
```

**使用 Compose**:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgres
      - redis
  postgres:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: secret
  redis:
    image: redis:alpine
```

```bash
# 一条命令启动所有服务
docker-compose up -d
```

#### docker-compose.yml 结构

```yaml
version: '3.8'  # Compose 文件版本

services:       # 定义服务
  app:
    build:      # 构建配置
      context: .
      dockerfile: Dockerfile
    image: myapp:latest
    container_name: myapp
    ports:      # 端口映射
      - "8080:8080"
    environment: # 环境变量
      - DB_HOST=postgres
    env_file:   # 环境变量文件
      - .env
    depends_on: # 依赖关系
      - postgres
    volumes:    # 数据卷
      - ./data:/app/data
    networks:   # 网络配置
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:       # 网络定义
  backend:
    driver: bridge

volumes:        # 卷定义
  db-data:
```

#### 多文件配置覆盖

**基础配置** (docker-compose.yml):
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
```

**开发环境覆盖** (docker-compose.dev.yml):
```yaml
version: '3.8'
services:
  app:
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - DEBUG=true
    volumes:
      - ./src:/app/src  # 热重载
```

**生产环境覆盖** (docker-compose.prod.yml):
```yaml
version: '3.8'
services:
  app:
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
```

**使用**:
```bash
# 开发环境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 实践练习 (90分钟)

#### 练习1: 基础编排

```bash
# 查看本项目的 docker-compose.yml
cat docker-compose.yml

# 启动服务
docker-compose up

# 在另一个终端查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

#### 练习2: 多环境部署

```bash
# 1. 开发环境 (H2 内存数据库)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 访问 H2 控制台
# http://localhost:8080/h2-console
# JDBC URL: jdbc:h2:mem:testdb
# Username: sa, Password: (留空)

# 测试 API
curl http://localhost:8080/api/users

# 停止
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# 2. 生产环境 (PostgreSQL)
docker-compose -f docker-compose.yml -f docker-compose.db.yml up --build -d

# 等待服务启动
docker-compose ps

# 测试 API
./test-api.sh

# 查看数据库数据
docker-compose exec postgres psql -U demo_user -d demo_db -c "SELECT * FROM users;"

# 停止
docker-compose -f docker-compose.yml -f docker-compose.db.yml down
```

#### 练习3: 服务扩展

```bash
# 启动服务
docker-compose up -d

# 扩展应用实例(需要修改端口映射)
docker-compose up -d --scale app=3

# 查看所有实例
docker-compose ps
```

#### 练习4: 使用自动化脚本

```bash
# 运行 Compose 练习
./docker-practice.sh 3

# 运行多环境练习
./docker-practice.sh 4
```

### 知识检查点

**必须理解**:
- [ ] Docker Compose 的作用
- [ ] services, networks, volumes 的概念
- [ ] 配置文件覆盖机制
- [ ] depends_on 的作用和局限

**能够做到**:
- [ ] 编写基本的 docker-compose.yml
- [ ] 配置多环境部署
- [ ] 管理多服务应用

### 常见配置模式

**Web + 数据库**:
```yaml
services:
  web:
    build: .
    ports:
      - "80:80"
    depends_on:
      - db
  db:
    image: postgres:13
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

**前后端分离**:
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: postgres:13
```

---

## 🎯 Day 7-8: 数据持久化和网络

### 学习目标
- 理解数据卷的作用
- 掌握容器网络模式
- 学会配置容器间通信

### 理论知识 (40分钟)

#### 数据持久化方案

**1. 数据卷 (Volume)** - 推荐
```bash
# 创建卷
docker volume create my-data

# 使用卷
docker run -v my-data:/app/data myapp

# 优势:
# - Docker 管理,跨平台兼容
# - 性能更好
# - 易于备份和迁移
```

**2. 绑定挂载 (Bind Mount)**
```bash
# 挂载本地目录
docker run -v /host/path:/container/path myapp

# 优势:
# - 可以直接访问和修改
# - 适合开发环境
```

**3. tmpfs 挂载**
```bash
# 内存临时文件系统
docker run --tmpfs /tmp myapp

# 用途:
# - 临时数据,不需要持久化
# - 敏感数据,容器停止即删除
```

#### Docker 网络模式

**1. bridge (默认)**
```bash
# 容器有独立 IP,通过虚拟网桥通信
docker network create my-network
docker run --network my-network myapp
```

**2. host**
```bash
# 容器使用主机网络,无隔离
docker run --network host myapp
```

**3. none**
```bash
# 无网络,完全隔离
docker run --network none myapp
```

#### 容器间通信

**通过服务名**:
```yaml
services:
  app:
    # 可以通过 postgres:5432 访问数据库
    environment:
      - DB_HOST=postgres
  postgres:
    image: postgres:13
```

**自定义网络**:
```yaml
services:
  frontend:
    networks:
      - frontend-net
  backend:
    networks:
      - frontend-net
      - backend-net
  db:
    networks:
      - backend-net

networks:
  frontend-net:
  backend-net:
```

### 实践练习 (90分钟)

#### 练习1: 数据持久化

```bash
# 1. 启动带数据库的服务
docker-compose -f docker-compose.db.yml up -d

# 2. 创建数据
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@example.com"}'

# 3. 查看数据
curl http://localhost:8080/api/users

# 4. 停止服务
docker-compose -f docker-compose.db.yml down

# 5. 重新启动(不删除卷)
docker-compose -f docker-compose.db.yml up -d

# 6. 验证数据仍然存在
curl http://localhost:8080/api/users

# 7. 查看卷
docker volume ls | grep learn_docker

# 8. 查看卷内容
docker run --rm -v learn_docker_postgres-data:/data alpine ls -la /data

# 9. 完全清理(包括卷)
docker-compose -f docker-compose.db.yml down -v
```

#### 练习2: 网络配置

```bash
# 1. 查看默认网络
docker network ls

# 2. 启动服务
docker-compose -f docker-compose.db.yml up -d

# 3. 查看网络详情
docker network inspect learn_docker_default

# 4. 测试容器间通信
docker-compose exec app ping postgres

# 5. 进入数据库容器
docker-compose exec postgres psql -U demo_user -d demo_db

# 6. 查看数据库内容
SELECT * FROM users;
\q
```

#### 练习3: 使用自动化脚本

```bash
# 运行网络和存储练习
./docker-practice.sh 7
```

### 知识检查点

**必须理解**:
- [ ] Volume vs Bind Mount 的区别
- [ ] Docker 网络模式
- [ ] 容器间如何通信
- [ ] 数据持久化的最佳实践

**能够做到**:
- [ ] 配置数据持久化
- [ ] 创建和管理网络
- [ ] 排查网络连接问题

---

## 🎯 Day 9-10: 生产环境实践

### 学习目标
- 掌握健康检查配置
- 理解资源限制
- 学会日志管理
- 了解安全最佳实践

### 理论知识 (40分钟)

#### 健康检查

**Dockerfile 中配置**:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1
```

**docker-compose.yml 中配置**:
```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

**健康状态**:
- starting: 启动期内
- healthy: 健康
- unhealthy: 不健康

#### 资源限制

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.50'    # 最多使用 50% CPU
          memory: 512M    # 最多使用 512MB 内存
        reservations:
          cpus: '0.25'    # 预留 25% CPU
          memory: 256M    # 预留 256MB 内存
```

**为什么需要资源限制**:
- 防止单个容器占用过多资源
- 提高资源利用率
- 可预测的性能表现

#### 日志管理

**查看日志**:
```bash
# 实时查看日志
docker logs -f <container>

# 查看最近100行
docker logs --tail 100 <container>

# 查看时间范围内的日志
docker logs --since 2023-01-01 --until 2023-01-02 <container>
```

**日志驱动**:
```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### 重启策略

```yaml
services:
  app:
    restart: unless-stopped

# 选项:
# no: 不自动重启
# always: 总是重启
# on-failure: 仅在失败时重启
# unless-stopped: 除非手动停止,否则重启
```

### 实践练习 (90分钟)

#### 练习1: 健康检查

```bash
# 1. 启动服务
docker-compose up -d

# 2. 查看健康状态
docker ps

# 3. 查看详细健康检查信息
docker inspect app | grep -A 10 Health

# 4. 模拟服务故障
docker-compose exec app killall java

# 5. 观察容器重启
docker-compose ps

# 6. 查看事件
docker events --filter 'container=app' --since 5m
```

#### 练习2: 资源限制测试

```bash
# 1. 启动带资源限制的服务
docker-compose -f docker-compose.prod.yml up -d

# 2. 监控资源使用
docker stats

# 3. 压力测试
curl "http://localhost:8080/load?seconds=10"

# 4. 观察资源使用变化

# 5. 停止服务
docker-compose -f docker-compose.prod.yml down
```

#### 练习3: 日志管理

```bash
# 1. 启动服务
docker-compose up -d

# 2. 生成日志
for i in {1..10}; do
  curl http://localhost:8080/api/users
done

# 3. 查看日志
docker-compose logs app

# 4. 实时跟踪日志
docker-compose logs -f --tail 20 app

# 5. 导出日志
docker-compose logs app > app-logs.txt
```

#### 练习4: 生产部署检查清单

创建 `deployment-checklist.md`:

```markdown
# 生产部署检查清单

## 镜像
- [ ] 使用特定版本标签,不用 latest
- [ ] 镜像大小已优化
- [ ] 使用多阶段构建
- [ ] 基础镜像来自可信源

## 安全
- [ ] 不以 root 用户运行
- [ ] 没有硬编码密钥
- [ ] 使用环境变量或密钥管理
- [ ] 只暴露必要的端口

## 资源
- [ ] 配置了内存限制
- [ ] 配置了 CPU 限制
- [ ] 配置了健康检查
- [ ] 配置了重启策略

## 数据
- [ ] 重要数据使用 Volume
- [ ] 配置了备份策略
- [ ] 数据库连接使用连接池

## 监控
- [ ] 配置了日志收集
- [ ] 日志有轮转策略
- [ ] 有监控和告警

## 网络
- [ ] 使用自定义网络
- [ ] 只暴露必要的服务
- [ ] 配置了防火墙规则
```

#### 练习5: 使用自动化脚本

```bash
# 运行高级容器管理练习
./docker-practice.sh 5

# 运行镜像管理优化练习
./docker-practice.sh 6
```

### 知识检查点

**必须理解**:
- [ ] 健康检查的重要性
- [ ] 资源限制的作用
- [ ] 日志管理策略
- [ ] 重启策略的选择

**能够做到**:
- [ ] 配置生产级的 Docker Compose
- [ ] 监控和调试容器
- [ ] 实施基本的安全措施

### 生产部署最佳实践

**镜像管理**:
- 使用语义化版本标签
- 定期更新基础镜像
- 扫描镜像漏洞

**安全加固**:
```dockerfile
# 使用非 root 用户
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

# 只读文件系统
docker run --read-only myapp

# 移除不必要的工具
RUN apt-get purge -y --auto-remove
```

**监控和日志**:
- 集中式日志收集 (ELK, Loki)
- 指标监控 (Prometheus, Grafana)
- 分布式追踪 (Jaeger)

---

## 🎓 学习总结和下一步

### 10天学习回顾

**Day 1-2: 基础**
- ✅ 理解容器和镜像
- ✅ 掌握基本命令
- ✅ 管理容器生命周期

**Day 3-4: Dockerfile**
- ✅ 编写 Dockerfile
- ✅ 多阶段构建
- ✅ 镜像优化

**Day 5-6: Compose**
- ✅ 多容器编排
- ✅ 多环境配置
- ✅ 服务管理

**Day 7-8: 数据和网络**
- ✅ 数据持久化
- ✅ 网络配置
- ✅ 容器通信

**Day 9-10: 生产实践**
- ✅ 健康检查
- ✅ 资源限制
- ✅ 日志管理

### 能力自检

**基础能力**:
- [ ] 能够容器化任何应用
- [ ] 能够编写优化的 Dockerfile
- [ ] 能够使用 Compose 管理多服务

**进阶能力**:
- [ ] 能够配置生产环境
- [ ] 能够排查容器问题
- [ ] 能够优化性能和安全

### 实战项目建议

**项目1: 博客系统**
- 前端: Nginx + 静态文件
- 后端: Node.js/Python API
- 数据库: PostgreSQL
- 缓存: Redis

**项目2: 微服务架构**
- API Gateway
- 多个微服务
- 服务发现
- 配置中心

**项目3: CI/CD 流程**
- 自动构建镜像
- 运行测试
- 推送到仓库
- 自动部署

### 下一步学习

**Kubernetes**:
- 大规模容器编排
- 自动扩缩容
- 服务发现和负载均衡
- 滚动更新和回滚

**CI/CD**:
- Jenkins/GitLab CI
- 自动化测试
- 持续交付

**监控和可观测性**:
- Prometheus + Grafana
- ELK Stack
- 分布式追踪

### 持续学习资源

**官方文档**:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)

**在线学习**:
- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker Tutorials](https://docker-curriculum.com/)

**社区资源**:
- [Docker Forums](https://forums.docker.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/docker)

---

**恭喜完成 Docker 10天学习计划!** 🎉

记住,Docker 是工具,关键是理解容器化思想。继续实践,遇到问题多思考,你已经掌握了容器化的核心技能!
