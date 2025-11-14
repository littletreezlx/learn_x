# Docker 故障排查指南

这份指南帮助你快速诊断和解决 Docker 使用中的常见问题。

---

## 🔍 问题诊断流程

遇到问题时,按照这个流程系统地排查:

```
1. 查看错误信息 → 2. 检查日志 → 3. 验证配置 → 4. 检查资源 → 5. 查看文档
```

---

## 🐛 常见问题分类

### 1. 镜像相关问题

#### 问题: 无法拉取镜像

**症状**:
```bash
$ docker pull nginx
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled
```

**可能原因**:
- 网络连接问题
- Docker Hub 访问受限
- 代理配置问题

**解决方案**:

```bash
# 方案1: 检查网络连接
ping registry-1.docker.io

# 方案2: 配置镜像加速器
# 编辑 /etc/docker/daemon.json (Linux)
# 或 Docker Desktop 设置 (macOS/Windows)
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com"
  ]
}

# 重启 Docker
sudo systemctl restart docker  # Linux
# 或通过 Docker Desktop 重启

# 方案3: 使用国内镜像源
docker pull registry.cn-hangzhou.aliyuncs.com/library/nginx
```

#### 问题: 镜像构建失败

**症状**:
```bash
$ docker build -t myapp .
ERROR [2/5] COPY package.json ./
failed to compute cache key: "/package.json" not found
```

**可能原因**:
- 文件路径错误
- .dockerignore 配置问题
- 构建上下文不正确

**解决方案**:

```bash
# 方案1: 检查文件是否存在
ls -la package.json

# 方案2: 检查 .dockerignore
cat .dockerignore

# 方案3: 指定构建上下文
docker build -t myapp -f Dockerfile .

# 方案4: 使用 --no-cache 重新构建
docker build --no-cache -t myapp .

# 方案5: 查看构建上下文
docker build -t myapp . 2>&1 | head -20
```

#### 问题: 镜像体积过大

**症状**:
```bash
$ docker images myapp
REPOSITORY   TAG       SIZE
myapp        latest    1.2GB
```

**解决方案**:

```bash
# 方案1: 查看镜像层
docker history myapp

# 方案2: 使用多阶段构建
# 参考: best-practices/dockerfile-best-practices.md

# 方案3: 使用精简基础镜像
FROM node:16-alpine  # 而非 node:16

# 方案4: 合并 RUN 命令
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# 方案5: 清理缓存和临时文件
RUN npm install && npm cache clean --force
```

---

### 2. 容器运行问题

#### 问题: 容器启动后立即退出

**症状**:
```bash
$ docker run myapp
$ docker ps
# 没有显示容器
```

**诊断步骤**:

```bash
# 1. 查看所有容器 (包括已停止的)
docker ps -a

# 2. 查看容器日志
docker logs <container_id>

# 3. 查看容器退出码
docker inspect <container_id> | grep ExitCode
```

**常见原因和解决方案**:

**原因1: 应用崩溃**
```bash
# 查看详细日志
docker logs --tail 100 <container_id>

# 进入容器调试 (如果容器还在)
docker exec -it <container_id> sh

# 使用交互模式运行
docker run -it myapp sh
```

**原因2: CMD/ENTRYPOINT 配置错误**
```dockerfile
# 错误示例
CMD java -jar app.jar

# 正确示例
CMD ["java", "-jar", "app.jar"]
```

**原因3: 缺少前台进程**
```dockerfile
# 错误: 后台运行
CMD nginx

# 正确: 前台运行
CMD ["nginx", "-g", "daemon off;"]
```

#### 问题: 端口无法访问

**症状**:
```bash
$ curl http://localhost:8080
curl: (7) Failed to connect to localhost port 8080: Connection refused
```

**诊断步骤**:

```bash
# 1. 确认容器正在运行
docker ps | grep myapp

# 2. 检查端口映射
docker port <container_id>

# 3. 检查容器内服务是否启动
docker exec <container_id> netstat -tlnp

# 4. 检查宿主机端口是否被占用
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# 5. 查看容器日志
docker logs <container_id>
```

**解决方案**:

```bash
# 方案1: 使用正确的端口映射
docker run -p 8080:80 myapp  # 宿主机:容器

# 方案2: 使用主机网络模式 (仅 Linux)
docker run --network host myapp

# 方案3: 检查防火墙
sudo ufw status  # Ubuntu
sudo firewall-cmd --list-ports  # CentOS

# 方案4: 绑定到 0.0.0.0 而非 localhost
# 应用配置中使用 0.0.0.0:8080 而非 localhost:8080
```

#### 问题: 容器内存不足

**症状**:
```bash
$ docker logs <container_id>
java.lang.OutOfMemoryError: Java heap space
```

**解决方案**:

```bash
# 方案1: 增加内存限制
docker run -m 512m myapp

# 方案2: 查看容器资源使用
docker stats <container_id>

# 方案3: 调整应用配置
docker run -e JAVA_OPTS="-Xmx256m" myapp

# 方案4: 使用 docker-compose 配置
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
```

---

### 3. Docker Compose 问题

#### 问题: 服务无法连接

**症状**:
```bash
$ docker-compose logs backend
backend    | Error: connect ECONNREFUSED postgres:5432
```

**诊断步骤**:

```bash
# 1. 检查服务是否都在运行
docker-compose ps

# 2. 检查网络
docker network ls
docker network inspect <network_name>

# 3. 测试容器间连接
docker-compose exec backend ping postgres

# 4. 检查依赖配置
cat docker-compose.yml | grep depends_on -A 5
```

**解决方案**:

```bash
# 方案1: 配置 depends_on 和健康检查
services:
  backend:
    depends_on:
      postgres:
        condition: service_healthy
  postgres:
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s

# 方案2: 使用服务名而非 localhost
# 错误
DB_HOST=localhost

# 正确
DB_HOST=postgres

# 方案3: 确保服务在同一网络
docker-compose exec backend sh
# 在容器内
nslookup postgres
```

#### 问题: 配置文件语法错误

**症状**:
```bash
$ docker-compose up
ERROR: yaml.scanner.ScannerError: while scanning for the next token
```

**解决方案**:

```bash
# 方案1: 验证 YAML 语法
docker-compose config

# 方案2: 检查缩进 (使用空格,不用 Tab)
# 使用 YAML lint 工具
yamllint docker-compose.yml

# 方案3: 查看合并后的配置
docker-compose -f docker-compose.yml -f docker-compose.prod.yml config
```

#### 问题: 数据卷权限问题

**症状**:
```bash
$ docker-compose logs app
app    | Error: EACCES: permission denied, open '/data/file.txt'
```

**解决方案**:

```bash
# 方案1: 检查文件权限
docker-compose exec app ls -la /data

# 方案2: 在 Dockerfile 中设置权限
RUN chown -R appuser:appuser /data

# 方案3: 使用命名卷而非绑定挂载
volumes:
  app-data:  # 命名卷
services:
  app:
    volumes:
      - app-data:/data  # 而非 ./data:/data

# 方案4: 修改宿主机目录权限
chmod -R 777 ./data  # 开发环境临时方案
```

---

### 4. 网络问题

#### 问题: 容器无法访问外网

**症状**:
```bash
$ docker exec <container_id> ping google.com
ping: unknown host google.com
```

**解决方案**:

```bash
# 方案1: 检查 DNS 配置
docker run --rm alpine cat /etc/resolv.conf

# 方案2: 配置 DNS
# 编辑 /etc/docker/daemon.json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}

# 重启 Docker
sudo systemctl restart docker

# 方案3: 临时指定 DNS
docker run --dns 8.8.8.8 myapp

# 方案4: 使用主机网络
docker run --network host myapp
```

#### 问题: 容器间无法通信

**症状**:
```bash
$ docker exec app1 ping app2
ping: bad address 'app2'
```

**解决方案**:

```bash
# 方案1: 创建自定义网络
docker network create mynet
docker run --network mynet --name app1 myapp1
docker run --network mynet --name app2 myapp2

# 方案2: 连接到同一网络
docker network connect mynet app1

# 方案3: 使用 link (已废弃,不推荐)
docker run --link app1:app1 app2

# 方案4: 使用 Docker Compose (自动创建网络)
services:
  app1:
  app2:
# 自动在同一网络
```

---

### 5. 性能问题

#### 问题: 构建速度慢

**症状**:
```bash
$ docker build -t myapp .
# 构建时间超过 10 分钟
```

**解决方案**:

```bash
# 方案1: 利用层缓存
# 先复制依赖文件
COPY package.json .
RUN npm install
# 再复制源码
COPY . .

# 方案2: 使用 .dockerignore
echo "node_modules" >> .dockerignore
echo ".git" >> .dockerignore

# 方案3: 使用 BuildKit
export DOCKER_BUILDKIT=1
docker build -t myapp .

# 方案4: 并行构建多阶段
# BuildKit 自动优化

# 方案5: 使用镜像缓存
docker build --cache-from myapp:latest -t myapp:new .
```

#### 问题: 容器运行慢

**症状**:
容器响应时间长,性能差

**诊断步骤**:

```bash
# 1. 查看资源使用
docker stats <container_id>

# 2. 检查资源限制
docker inspect <container_id> | grep -A 10 Memory

# 3. 查看容器进程
docker top <container_id>

# 4. 进入容器查看
docker exec -it <container_id> sh
top
```

**解决方案**:

```bash
# 方案1: 调整资源限制
docker run --cpus=2 --memory=1g myapp

# 方案2: 使用性能分析工具
docker stats --no-stream

# 方案3: 优化应用配置
# 增加工作进程、连接池等

# 方案4: 使用 SSD 存储
# 数据卷使用 SSD

# 方案5: 减少日志输出
services:
  app:
    logging:
      driver: none  # 仅开发环境
```

---

### 6. 数据持久化问题

#### 问题: 数据丢失

**症状**:
容器重启或重建后数据消失

**解决方案**:

```bash
# 方案1: 使用命名卷
docker volume create mydata
docker run -v mydata:/app/data myapp

# 方案2: 使用绑定挂载
docker run -v /host/path:/container/path myapp

# 方案3: 使用 Docker Compose
services:
  app:
    volumes:
      - app-data:/app/data

volumes:
  app-data:

# 方案4: 备份数据卷
docker run --rm -v mydata:/data -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz /data
```

#### 问题: 数据卷满了

**症状**:
```bash
$ docker exec <container_id> df -h
/dev/sda1       50G   50G     0 100% /
```

**解决方案**:

```bash
# 方案1: 清理未使用的卷
docker volume prune

# 方案2: 查看卷使用情况
docker system df

# 方案3: 清理所有未使用资源
docker system prune -a --volumes

# 方案4: 扩展卷大小 (依赖存储驱动)
# 需要重建容器

# 方案5: 定期清理日志
find /var/lib/docker/containers -name "*.log" -delete
```

---

## 🛠️ 调试技巧

### 1. 查看详细信息

```bash
# 查看容器详细配置
docker inspect <container_id>

# 查看特定配置
docker inspect -f '{{.State.Running}}' <container_id>
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id>

# 查看镜像详细信息
docker image inspect myapp

# 查看网络详细信息
docker network inspect mynetwork

# 查看卷详细信息
docker volume inspect myvolume
```

### 2. 进入容器调试

```bash
# 进入运行中的容器
docker exec -it <container_id> sh

# 以 root 用户进入
docker exec -it -u root <container_id> sh

# 运行临时容器调试
docker run --rm -it myapp sh

# 使用调试镜像
docker run --rm -it --network container:<container_id> nicolaka/netshoot
```

### 3. 查看日志

```bash
# 实时查看日志
docker logs -f <container_id>

# 查看最近 N 行
docker logs --tail 100 <container_id>

# 查看时间范围
docker logs --since 2023-01-01T00:00:00 <container_id>

# Compose 服务日志
docker-compose logs -f app

# 查看所有服务日志
docker-compose logs
```

### 4. 网络调试

```bash
# 测试连接
docker exec <container_id> ping google.com

# 检查端口
docker exec <container_id> netstat -tlnp

# DNS 查询
docker exec <container_id> nslookup postgres

# 使用 curl 测试
docker exec <container_id> curl http://api:8080/health
```

### 5. 性能分析

```bash
# 实时查看资源使用
docker stats

# 查看容器进程
docker top <container_id>

# 导出资源使用数据
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

---

## 📚 有用的命令速查

```bash
# ===== 清理命令 =====
docker system prune              # 清理未使用的资源
docker system prune -a           # 清理所有未使用的镜像
docker system prune --volumes    # 包括卷
docker image prune               # 清理悬空镜像
docker container prune           # 清理停止的容器
docker volume prune              # 清理未使用的卷
docker network prune             # 清理未使用的网络

# ===== 信息查看 =====
docker system df                 # 查看磁盘使用
docker version                   # 查看版本信息
docker info                      # 查看系统信息
docker events                    # 查看实时事件

# ===== 导出导入 =====
docker save myapp > myapp.tar    # 导出镜像
docker load < myapp.tar          # 导入镜像
docker export <container> > c.tar # 导出容器
docker import c.tar myapp        # 导入为镜像

# ===== 复制文件 =====
docker cp file.txt <container>:/path/   # 复制到容器
docker cp <container>:/path/file.txt .  # 从容器复制
```

---

## 🔗 获取帮助

**官方资源**:
- [Docker 文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Forums](https://forums.docker.com/)

**社区资源**:
- [Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
- [Docker Subreddit](https://www.reddit.com/r/docker/)

**本地帮助**:
```bash
docker --help
docker run --help
docker-compose --help
```

---

## 💡 预防性最佳实践

1. **定期清理**: 每周运行 `docker system prune`
2. **监控资源**: 使用 `docker stats` 监控容器
3. **备份数据**: 定期备份重要数据卷
4. **版本管理**: 使用具体版本标签,不用 `latest`
5. **日志管理**: 配置日志轮转策略
6. **安全扫描**: 定期扫描镜像漏洞
7. **文档记录**: 记录配置变更和问题解决方案

---

**记住**: 大多数问题都可以通过查看日志和仔细阅读错误信息来解决!
