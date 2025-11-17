# 06 - Docker 网络

**目标**: 理解 Docker 网络模型，掌握容器间通信配置

---

## 1. Docker 网络基础

### 默认网络

```bash
# 查看所有网络
docker network ls

# 默认网络类型
# bridge - 默认的桥接网络
# host - 主机网络
# none - 无网络
```

### 网络类型对比

| 网络类型 | 特点 | 适用场景 |
|---------|------|---------|
| **bridge** | 隔离的虚拟网络，容器间通过名称通信 | 单机多容器 |
| **host** | 共享主机网络，性能最好 | 需要高性能网络 |
| **overlay** | 跨多主机的网络 | Docker Swarm/K8s |
| **macvlan** | 容器直接连接物理网络 | 需要容器有独立IP |
| **none** | 禁用网络 | 完全隔离的容器 |

---

## 2. 桥接网络

### 默认 bridge 网络

```bash
# 查看默认 bridge 网络
docker network inspect bridge

# 运行两个容器（使用默认网络）
docker run -d --name web1 nginx:alpine
docker run -d --name web2 nginx:alpine

# 容器间无法通过名称通信（只能通过 IP）
docker exec -it web1 ping web2  # 失败！
```

### 自定义 bridge 网络

```bash
# 创建自定义网络
docker network create my-app-network

# 查看网络详情
docker network inspect my-app-network

# 在网络中启动容器
docker run -d --name web1 --network my-app-network nginx:alpine
docker run -d --name web2 --network my-app-network nginx:alpine

# 现在可以通过名称通信
docker exec -it web1 ping web2  # 成功！
docker exec -it web1 curl http://web2
```

### 网络选项

```bash
# 创建带选项的网络
docker network create \
  --driver bridge \
  --subnet=192.168.100.0/24 \
  --gateway=192.168.100.1 \
  --ip-range=192.168.100.128/25 \
  my-custom-network

# 指定容器 IP
docker run -d \
  --name web \
  --network my-custom-network \
  --ip 192.168.100.10 \
  nginx:alpine
```

---

## 3. 多网络容器

### 连接多个网络

```bash
# 创建两个网络
docker network create frontend
docker network create backend

# 启动数据库容器（只连接后端网络）
docker run -d \
  --name database \
  --network backend \
  postgres:13

# 启动应用容器（连接两个网络）
docker run -d \
  --name app \
  --network backend \
  --network frontend \
  my-app

# 启动 Web 服务器（只连接前端网络）
docker run -d \
  --name web \
  --network frontend \
  nginx:alpine

# 测试连通性
docker exec -it app ping database    # 成功（后端网络）
docker exec -it app ping web         # 成功（前端网络）
docker exec -it web ping database    # 失败（不在同一网络）
```

### 动态连接网络

```bash
# 将已有容器连接到网络
docker network connect my-app-network web1

# 断开网络连接
docker network disconnect my-app-network web1

# 查看容器的网络连接
docker inspect web1 | grep NetworkMode -A 10
```

---

## 4. Docker Compose 中的网络

### 默认网络行为

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"

  api:
    image: my-api
    depends_on:
      - db

  db:
    image: postgres:13
```

- Compose 自动创建默认网络
- 所有服务都在同一网络中
- 服务间可以通过服务名通信

### 自定义网络

```yaml
version: '3.8'

networks:
  frontend:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.20.0.0/16
  backend:
    driver: bridge
    internal: true  # 内部网络，不能访问外网

services:
  web:
    image: nginx:alpine
    networks:
      - frontend
    ports:
      - "80:80"

  api:
    image: my-api
    networks:
      - frontend
      - backend
    depends_on:
      - db

  db:
    image: postgres:13
    networks:
      - backend
    environment:
      POSTGRES_DB: myapp

  worker:
    image: my-worker
    networks:
      - backend
    depends_on:
      - db
```

### 网络别名

```yaml
version: '3.8'

services:
  app:
    image: my-app
    networks:
      app_net:
        aliases:
          - api.example.com
          - backend
    depends_on:
      - cache

  cache:
    image: redis:alpine
    networks:
      app_net:
        aliases:
          - cache.example.com
          - redis

networks:
  app_net:
    driver: bridge
```

---

## 5. 网络安全

### 内部网络

```yaml
version: '3.8'

networks:
  public:
    driver: bridge
  private:
    driver: bridge
    internal: true  # 禁止访问外网

services:
  web:
    image: nginx:alpine
    networks:
      - public
    ports:
      - "80:80"

  api:
    image: my-api
    networks:
      - public
      - private

  db:
    image: postgres:13
    networks:
      - private
    # 无法从外部直接访问
```

### 网络隔离

```bash
# 创建隔离的网络
docker network create --internal isolated-network

# 在隔离网络中的容器无法访问外网
docker run -d \
  --network isolated-network \
  --name isolated-container \
  alpine sleep infinity

# 测试网络连接
docker exec -it isolated-container ping google.com  # 失败
```

### 端口安全

```yaml
version: '3.8'

services:
  database:
    image: postgres:13
    # 不暴露端口，只允许内部访问
    environment:
      POSTGRES_DB: myapp

  admin:
    image: pgadmin
    ports:
      - "5050:80"  # 暴露管理界面
    depends_on:
      - database
```

---

## 6. 高级网络配置

### DNS 配置

```yaml
version: '3.8'

services:
  app:
    image: my-app
    networks:
      app_net:
        dns:
          - 8.8.8.8
          - 8.8.4.4
        dns_search:
          - example.com
    extra_hosts:
      - "somehost:162.242.195.82"
      - "otherhost:50.31.209.229"
```

### 链接（Links）- 已废弃但了解有益

```yaml
# 旧版写法（不推荐）
version: '2.4'  # 需要使用 2.x 版本
services:
  web:
    image: nginx
    links:
      - db:database
    depends_on:
      - db

# 新版写法（推荐）
version: '3.8'
services:
  web:
    image: nginx
    depends_on:
      - db
  db:
    image: postgres
```

---

## 7. 实际应用示例

### 微服务架构

```yaml
version: '3.8'

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
  database:
    driver: bridge
    internal: true

services:
  nginx:
    image: nginx:alpine
    networks:
      - frontend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro

  frontend-app:
    image: my-frontend
    networks:
      - frontend

  api-gateway:
    image: my-gateway
    networks:
      - frontend
      - backend
    depends_on:
      - user-service
      - product-service

  user-service:
    image: my-user-service
    networks:
      - backend
      - database
    depends_on:
      - user-db

  product-service:
    image: my-product-service
    networks:
      - backend
      - database
    depends_on:
      - product-db

  user-db:
    image: postgres:13
    networks:
      - database
    environment:
      POSTGRES_DB: users
    volumes:
      - user_data:/var/lib/postgresql/data

  product-db:
    image: postgres:13
    networks:
      - database
    environment:
      POSTGRES_DB: products
    volumes:
      - product_data:/var/lib/postgresql/data

volumes:
  user_data:
  product_data:
```

### 开发环境配置

```yaml
version: '3.8'

networks:
  dev-network:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 192.168.100.0/24

services:
  app:
    build: .
    networks:
      - dev-network
    environment:
      - DB_HOST=database
      - REDIS_HOST=redis
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules

  database:
    image: postgres:13
    networks:
      - dev-network
    environment:
      POSTGRES_DB: devdb
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
    ports:
      - "5432:5432"  # 开发时暴露端口方便调试
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    networks:
      - dev-network
    ports:
      - "6379:6379"  # 开发时暴露端口方便调试

  adminer:
    image: adminer
    networks:
      - dev-network
    ports:
      - "8080:8080"
    depends_on:
      - database

volumes:
  postgres_dev_data:
```

---

## 8. 网络调试和故障排除

### 网络诊断命令

```bash
# 查看容器网络配置
docker inspect container_name | grep NetworkMode -A 20

# 查看容器 IP 地址
docker inspect container_name | grep IPAddress

# 测试容器间连通性
docker exec -it container1 ping container2
docker exec -it container1 curl http://container2:port

# 查看网络中的容器
docker network inspect network_name | grep Containers

# 进入容器的网络命名空间
docker run -it --rm --net container:container_name nicolaka/netshoot
```

### 常见网络问题

#### 1. 容器无法通信

```bash
# 检查是否在同一网络
docker inspect container1 | grep Networks
docker inspect container2 | grep Networks

# 检查防火墙规则
iptables -L DOCKER-USER

# 重启网络服务
docker network prune
```

#### 2. DNS 解析问题

```bash
# 检查容器 DNS 配置
docker exec -it container_name cat /etc/resolv.conf

# 手动设置 DNS
docker run -d --dns=8.8.8.8 nginx

# 测试 DNS 解析
docker exec -it container_name nslookup google.com
```

#### 3. 端口映射问题

```bash
# 检查端口占用
netstat -tulpn | grep 8080
lsof -i :8080

# 查看端口映射
docker port container_name
```

---

## 9. 实验任务

### 任务 1: 多网络通信

1. 创建前端、后端、数据库三个网络
2. 部署多层应用架构
3. 测试不同层之间的访问权限
4. 验证网络隔离效果

### 任务 2: 网络安全配置

1. 创建内部和外部网络
2. 配置数据库只能在内部访问
3. 设置 API 网关进行网络路由
4. 测试安全配置的有效性

### 任务 3: 故障排查

1. 故意创建网络配置错误
2. 使用诊断工具排查问题
3. 记录常见的网络问题
4. 编写故障排除指南

---

## 10. 性能优化

### 网络性能调优

```bash
# 创建高性能网络
docker network create \
  --driver bridge \
  --opt com.docker.network.bridge.name=br0 \
  --opt com.docker.network.driver.mtu=1500 \
  --opt com.docker.network.bridge.enable_icc=true \
  --opt com.docker.network.bridge.enable_ip_masquerade=true \
  high-performance-net
```

### 容器网络限制

```yaml
version: '3.8'

services:
  app:
    image: my-app
    networks:
      - app_net
    deploy:
      resources:
        limits:
          # 限制网络带宽
          # 注意：需要特定的 cgroups 支持
```

---

## 11. 下一步

完成这个示例后，你应该掌握：
- ✅ Docker 网络的类型和特点
- ✅ 自定义网络的创建和管理
- ✅ 容器间通信的配置
- ✅ 网络安全和隔离策略
- ✅ 网络故障的排查方法

接下来学习 [07_production_best_practices.md](07_production_best_practices.md)