# 04 - Docker Compose 基础

**目标**: 学会使用 Docker Compose 管理多容器应用

---

## 1. Docker Compose 简介

Docker Compose 是一个工具，用于定义和运行多容器 Docker 应用。通过 YAML 文件来配置应用的服务，然后用一个命令创建和启动所有服务。

### 为什么需要 Docker Compose？

- **多服务协调**: Web 应用通常需要多个服务（前端、后端、数据库）
- **环境管理**: 统一管理开发、测试、生产环境
- **网络配置**: 自动处理服务间的网络通信
- **简化操作**: 一条命令启动/停止所有服务

---

## 2. 基本用法

### 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
```

### 基本 Compose 命令

```bash
# 启动所有服务（后台运行）
docker-compose up -d

# 启动并查看日志
docker-compose up

# 停止所有服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs web
docker-compose logs -f  # 实时日志

# 重启特定服务
docker-compose restart web
```

---

## 3. 完整的多服务应用示例

### 项目结构

```
my-project/
├── docker-compose.yml
├── web/
│   ├── Dockerfile
│   └── index.html
└── api/
    ├── Dockerfile
    ├── app.js
    └── package.json
```

### 创建 Web 服务

```bash
# 创建项目结构
mkdir my-project && cd my-project
mkdir web api

# 创建 Web 服务的 HTML
cat > web/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Multi-Service App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .status { color: #28a745; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Multi-Service Application</h1>
        <div class="card">
            <h2>Frontend Service</h2>
            <p class="status">✅ Running</p>
            <p>Base URL: <code>/api</code></p>
        </div>
        <div class="card">
            <h2>API Service</h2>
            <p id="api-status">Checking...</p>
        </div>
        <div class="card">
            <h2>Redis Cache</h2>
            <p id="redis-status">Checking...</p>
        </div>
    </div>
    <script>
        // 检查 API 服务
        fetch('/api/health')
            .then(r => r.json())
            .then(data => {
                document.getElementById('api-status').innerHTML =
                    `<span class="status">✅ ${data.status}</span>`;
            })
            .catch(() => {
                document.getElementById('api-status').innerHTML =
                    '<span style="color: red;">❌ Not Available</span>';
            });

        // 检查 Redis（通过 API 代理）
        fetch('/api/redis-check')
            .then(r => r.json())
            .then(data => {
                document.getElementById('redis-status').innerHTML =
                    `<span class="status">✅ ${data.status}</span>`;
            })
            .catch(() => {
                document.getElementById('redis-status').innerHTML =
                    '<span style="color: red;">❌ Not Available</span>';
            });
    </script>
</body>
</html>
EOF

# 创建 Web 服务的 Dockerfile
cat > web/Dockerfile << 'EOF'
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EOF
```

### 创建 API 服务

```bash
# 创建 API 的 package.json
cat > api/package.json << 'EOF'
{
  "name": "multi-service-api",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.0",
    "redis": "^4.0.0"
  }
}
EOF

# 创建 API 的 app.js
cat > api/app.js << 'EOF'
const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Redis 连接
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

redisClient.on('error', (err) => {
  console.log('Redis Error:', err);
});

// 访问计数器中间件
app.use(async (req, res, next) => {
  try {
    await redisClient.connect();
    const visits = await redisClient.incr('visits');
    req.visits = visits;
    next();
  } catch (err) {
    console.error('Redis middleware error:', err);
    next();
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    visits: req.visits || 0
  });
});

// Redis 检查
app.get('/redis-check', async (req, res) => {
  try {
    await redisClient.ping();
    res.json({
      status: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'Disconnected',
      error: err.message
    });
  }
});

// API 端点
app.get('/api/stats', async (req, res) => {
  try {
    const info = await redisClient.info();
    res.json({
      visits: req.visits,
      redis_info: info.split('\r\n').slice(0, 5),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});
EOF

# 创建 API 的 Dockerfile
cat > api/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
EOF
```

### 创建 docker-compose.yml

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "8080:80"
    depends_on:
      - api
    restart: unless-stopped

  api:
    build: ./api
    ports:
      - "3000:3000"
    depends_on:
      - redis
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
EOF
```

### 启动应用

```bash
# 构建并启动所有服务
docker-compose up --build

# 在另一个终端查看状态
docker-compose ps

# 查看日志
docker-compose logs

# 访问应用
curl http://localhost:8080
curl http://localhost:3000/health
```

---

## 4. Compose 配置详解

### 服务配置选项

```yaml
version: '3.8'

services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile.prod
    image: my-app:1.0
    container_name: my-app-container
    ports:
      - "8080:80"
      - "8443:443"
    expose:
      - "3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    env_file:
      - .env
    volumes:
      - ./data:/app/data
      - node_modules:/app/node_modules
    networks:
      - app-network
    depends_on:
      - db
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    command: npm start
    working_dir: /app
    user: "1000:1000"
    privileged: false
    read_only: true
    tmpfs:
      - /tmp
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### 网络配置

```yaml
version: '3.8'

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

services:
  web:
    networks:
      - frontend

  api:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend
```

### 卷配置

```yaml
version: '3.8'

volumes:
  postgres_data:
    driver: local
  shared_logs:
    driver: local

services:
  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
      - /var/log/postgresql

  app:
    volumes:
      - ./app:/app:ro
      - shared_logs:/var/log/app
```

---

## 5. 环境管理

### 多环境配置

**docker-compose.yml (基础配置)**:
```yaml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - PORT=${PORT:-3000}
    ports:
      - "${PORT:-3000}:3000"
```

**docker-compose.prod.yml (生产环境覆盖)**:
```yaml
version: '3.8'

services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=80
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
```

**使用不同环境**:
```bash
# 开发环境
docker-compose up

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# 测试环境
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

---

## 6. 实用命令

### 服务管理

```bash
# 启动特定服务
docker-compose up -d web api

# 停止并删除所有资源
docker-compose down --volumes --remove-orphans

# 重新构建并启动
docker-compose up --build

# 强制重新创建容器
docker-compose up --force-recreate

# 扩展服务（多个实例）
docker-compose up -d --scale web=3
```

### 调试和监控

```bash
# 查看服务配置
docker-compose config

# 查看服务日志
docker-compose logs -f web

# 进入服务容器
docker-compose exec web sh

# 实时查看资源使用
docker-compose exec web top

# 查看服务之间的网络连接
docker-compose exec web ping api
```

### 数据管理

```bash
# 备份数据卷
docker run --rm -v my-project_redis_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/redis-backup.tar.gz -C /data .

# 恢复数据卷
docker run --rm -v my-project_redis_data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/redis-backup.tar.gz -C /data
```

---

## 7. 实验任务

### 任务 1: 创建完整的多服务应用

创建一个包含以下服务的应用：
1. Nginx 前端服务
2. Node.js API 服务
3. Redis 缓存服务
4. PostgreSQL 数据库服务

### 任务 2: 环境配置

1. 创建开发、测试、生产三个环境的配置文件
2. 使用环境变量管理不同的配置
3. 测试不同环境下的启动情况

### 任务 3: 健康检查和监控

1. 为所有服务配置健康检查
2. 设置资源限制
3. 使用 `docker-compose exec` 监控服务状态

---

## 8. 最佳实践

### 文件组织

```
project/
├── docker-compose.yml
├── docker-compose.prod.yml
├── docker-compose.test.yml
├── .env
├── .dockerignore
├── services/
│   ├── web/
│   ├── api/
│   └── db/
└── scripts/
    ├── deploy.sh
    └── backup.sh
```

### 安全配置

```yaml
services:
  app:
    user: "1000:1000"          # 非root用户
    read_only: true            # 只读文件系统
    tmpfs:                     # 临时目录
      - /tmp
      - /var/run
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

---

## 9. 下一步

完成这个示例后，你应该掌握：
- ✅ Docker Compose 的基本用法
- ✅ 多服务应用的编排
- ✅ 环境管理和配置
- ✅ 网络和数据卷的使用

接下来学习 [05_volumes_and_data.md](05_volumes_and_data.md)