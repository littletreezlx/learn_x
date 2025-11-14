# Docker Compose 最佳实践

这份指南总结了使用 Docker Compose 编排多容器应用的最佳实践。

---

## 1. 使用版本 3+ 的语法

### ❌ 不推荐

```yaml
version: '2'
```

### ✅ 推荐

```yaml
version: '3.8'
```

**原因**:
- 版本 3+ 支持更多特性
- 与 Docker Swarm 兼容
- 更好的资源管理

---

## 2. 明确服务依赖关系

### ❌ 不推荐

```yaml
services:
  app:
    image: myapp
  db:
    image: postgres
```

**问题**:
- 应用可能在数据库启动前就开始运行
- 连接失败

### ✅ 推荐

```yaml
services:
  app:
    image: myapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**优势**:
- 确保依赖服务健康后再启动
- 避免连接错误

---

## 3. 使用环境变量文件

### ❌ 不推荐

```yaml
services:
  app:
    environment:
      - DB_HOST=localhost
      - DB_PORT=5432
      - DB_USER=admin
      - DB_PASSWORD=secret123
      - API_KEY=abc123xyz
```

**问题**:
- 敏感信息暴露在配置文件中
- 难以管理不同环境

### ✅ 推荐

创建 `.env` 文件:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=secret123
API_KEY=abc123xyz
```

docker-compose.yml:
```yaml
services:
  app:
    env_file:
      - .env
```

添加到 `.gitignore`:
```
.env
```

**优势**:
- 敏感信息不提交到仓库
- 易于管理多环境配置

---

## 4. 配置资源限制

### ❌ 不推荐

```yaml
services:
  app:
    image: myapp
```

**问题**:
- 单个服务可能占用所有资源
- 影响其他服务

### ✅ 推荐

```yaml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

**优势**:
- 防止资源耗尽
- 性能可预测

---

## 5. 使用命名卷

### ❌ 不推荐

```yaml
services:
  db:
    image: postgres
    volumes:
      - /var/lib/postgresql/data
```

**问题**:
- 匿名卷难以管理
- 难以备份和恢复

### ✅ 推荐

```yaml
services:
  db:
    image: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
    driver: local
```

**优势**:
- 易于识别和管理
- 便于备份

---

## 6. 自定义网络

### ❌ 不推荐

使用默认网络,所有服务互通

```yaml
services:
  frontend:
    image: frontend
  backend:
    image: backend
  db:
    image: postgres
```

**问题**:
- 安全性差
- 前端可直接访问数据库

### ✅ 推荐

```yaml
services:
  frontend:
    image: frontend
    networks:
      - frontend-net

  backend:
    image: backend
    networks:
      - frontend-net
      - backend-net

  db:
    image: postgres
    networks:
      - backend-net

networks:
  frontend-net:
  backend-net:
```

**优势**:
- 网络隔离,提高安全性
- 前端无法直接访问数据库

---

## 7. 配置健康检查

### ❌ 不推荐

```yaml
services:
  app:
    image: myapp
```

**问题**:
- 无法检测服务是否真正可用
- 依赖外部监控

### ✅ 推荐

```yaml
services:
  app:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

**优势**:
- 自动检测服务健康
- 配合 depends_on 确保启动顺序

---

## 8. 使用重启策略

### ❌ 不推荐

```yaml
services:
  app:
    image: myapp
```

**问题**:
- 服务崩溃后不会自动重启

### ✅ 推荐

```yaml
services:
  app:
    image: myapp
    restart: unless-stopped

  db:
    image: postgres
    restart: always
```

**重启策略**:
- `no`: 不重启 (默认)
- `always`: 总是重启
- `on-failure`: 仅失败时重启
- `unless-stopped`: 除非手动停止

---

## 9. 多环境配置

### ❌ 不推荐

为每个环境复制整个 docker-compose.yml

### ✅ 推荐

**基础配置** (docker-compose.yml):
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
  db:
    image: postgres:13
```

**开发环境** (docker-compose.dev.yml):
```yaml
version: '3.8'
services:
  app:
    environment:
      - DEBUG=true
    volumes:
      - ./src:/app/src
```

**生产环境** (docker-compose.prod.yml):
```yaml
version: '3.8'
services:
  app:
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
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

**优势**:
- DRY 原则
- 易于维护
- 环境一致性

---

## 10. 日志配置

### ❌ 不推荐

```yaml
services:
  app:
    image: myapp
```

**问题**:
- 日志无限增长
- 磁盘空间耗尽

### ✅ 推荐

```yaml
services:
  app:
    image: myapp
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**优势**:
- 日志自动轮转
- 控制磁盘使用

---

## 完整示例

结合所有最佳实践:

```yaml
version: '3.8'

services:
  # 前端服务
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    image: myapp-frontend:${VERSION:-latest}
    container_name: frontend
    ports:
      - "${FRONTEND_PORT:-3000}:80"
    networks:
      - frontend-net
    depends_on:
      backend:
        condition: service_healthy
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 后端服务
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: myapp-backend:${VERSION:-latest}
    container_name: backend
    ports:
      - "${BACKEND_PORT:-8080}:8080"
    env_file:
      - .env
    networks:
      - frontend-net
      - backend-net
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # PostgreSQL 数据库
  postgres:
    image: postgres:13-alpine
    container_name: postgres
    environment:
      - POSTGRES_DB=${DB_NAME:-myapp}
      - POSTGRES_USER=${DB_USER:-admin}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d:ro
    networks:
      - backend-net
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "3"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-admin}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis 缓存
  redis:
    image: redis:alpine
    container_name: redis
    networks:
      - backend-net
    restart: always
    deploy:
      resources:
        limits:
          memory: 128M
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge

volumes:
  postgres-data:
    driver: local
```

---

## 检查清单

- [ ] 使用版本 3.8+
- [ ] 配置服务依赖 (depends_on)
- [ ] 使用环境变量文件 (.env)
- [ ] 配置资源限制
- [ ] 使用命名卷
- [ ] 配置自定义网络
- [ ] 配置健康检查
- [ ] 设置重启策略
- [ ] 配置日志轮转
- [ ] 使用特定镜像版本
- [ ] 分离多环境配置
- [ ] 敏感信息不提交

---

## 常用命令

```bash
# 检查配置有效性
docker-compose config

# 验证并查看合并后的配置
docker-compose -f docker-compose.yml -f docker-compose.prod.yml config

# 后台启动
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f app

# 执行命令
docker-compose exec app sh

# 重启服务
docker-compose restart app

# 停止并删除
docker-compose down

# 停止并删除卷
docker-compose down -v

# 扩展服务实例
docker-compose up -d --scale backend=3
```

---

## 故障排查

**服务无法启动**:
```bash
# 查看详细日志
docker-compose logs app

# 检查配置
docker-compose config

# 重新构建
docker-compose up --build
```

**网络问题**:
```bash
# 测试服务间连接
docker-compose exec app ping db

# 查看网络
docker network inspect myapp_backend-net
```

**数据持久化问题**:
```bash
# 查看卷
docker volume ls

# 检查卷内容
docker run --rm -v myapp_postgres-data:/data alpine ls -la /data
```

---

记住: **良好的 Compose 配置是可维护性的基石!**
