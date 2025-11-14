# 多服务应用示例

这是一个完整的前后端分离应用示例,展示如何使用 Docker Compose 编排多个服务。

## 架构

```
┌─────────────┐
│   前端      │  (React/Vue)
│  Nginx:3000 │
└──────┬──────┘
       │
┌──────▼──────┐
│   后端      │  (Node.js/Python)
│  API:8080   │
└──────┬──────┘
       │
       ├──────────┐
       │          │
┌──────▼──────┐  │
│ PostgreSQL  │  │
│   数据库    │  │
└─────────────┘  │
                 │
         ┌───────▼──────┐
         │    Redis     │
         │     缓存     │
         └──────────────┘
```

## 服务说明

- **frontend**: 前端应用 (Nginx)
- **backend**: 后端 API 服务
- **postgres**: PostgreSQL 数据库
- **redis**: Redis 缓存

## 快速开始

```bash
# 进入示例目录
cd examples/multi-service-app

# 启动所有服务
docker-compose up --build

# 后台运行
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

## 访问服务

- 前端: http://localhost:3000
- 后端 API: http://localhost:8080
- 数据库: localhost:5432

## 实验任务

1. **服务通信**: 观察前端如何调用后端 API
2. **数据持久化**: 重启服务后数据是否保留
3. **健康检查**: 查看服务健康状态
4. **日志分析**: 分析各服务的日志输出

## 学习要点

**Docker Compose 配置**:
- 多服务定义
- 服务依赖关系 (depends_on)
- 网络配置
- 数据卷管理
- 环境变量配置

**最佳实践**:
- 前端使用多阶段构建
- 后端仅安装生产依赖
- 数据库初始化脚本
- 健康检查配置
- 资源限制

## 常用命令

```bash
# 查看特定服务日志
docker-compose logs backend

# 进入服务容器
docker-compose exec backend sh

# 查看数据库数据
docker-compose exec postgres psql -U admin -d myapp

# 重启特定服务
docker-compose restart backend

# 查看网络
docker network ls

# 查看卷
docker volume ls
```

## 调试技巧

**数据库连接测试**:
```bash
docker-compose exec backend sh
# 在容器内
ping postgres
nc -zv postgres 5432
```

**查看数据库内容**:
```bash
docker-compose exec postgres psql -U admin -d myapp -c "SELECT * FROM users;"
```

**Redis 测试**:
```bash
docker-compose exec redis redis-cli
# 在 Redis CLI 中
PING
SET test "hello"
GET test
```
