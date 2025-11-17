# Docker 30分钟快速上手

> **面向开发者** - 快速掌握 Docker 容器化基础

---

## 1. 环境检查（5分钟）

### 确认 Docker 已安装

```bash
# 检查 Docker 版本
docker --version
# 应该显示类似: Docker version 20.10.8, build 3967b7d

# 检查 Docker 是否运行
docker ps
# 应该显示容器列表，或者空的表格
```

如果遇到问题，请先安装 [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 2. 第一个容器（5分钟）

### 运行 Hello World

```bash
docker run hello-world
```

**发生了什么？**
1. Docker 在本地查找 `hello-world` 镜像
2. 没找到，从 Docker Hub 下载
3. 创建容器并运行
4. 输出欢迎消息后停止

### 运行一个 Web 服务器

```bash
# 启动 nginx 容器
docker run -d -p 8080:80 --name my-web nginx

# 参数解释:
# -d: 后台运行
# -p 8080:80: 将主机的 8080 端口映射到容器的 80 端口
# --name my-web: 给容器命名
```

现在访问 http://localhost:8080，你应该能看到 Nginx 欢迎页面！

---

## 3. 基本命令（10分钟）

### 查看容器

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器详细信息
docker inspect my-web
```

### 管理容器

```bash
# 查看容器日志
docker logs my-web

# 停止容器
docker stop my-web

# 启动已停止的容器
docker start my-web

# 删除容器
docker rm my-web
```

### 查看镜像

```bash
# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx
```

---

## 4. 构建镜像（10分钟）

### 创建简单应用

```bash
# 创建项目目录
mkdir my-docker-app
cd my-docker-app

# 创建简单的 HTML 文件
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My Docker App</title>
</head>
<body>
    <h1>Hello from Docker!</h1>
    <p>当前时间: <span id="time"></span></p>
    <script>
        document.getElementById('time').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF
```

### 编写 Dockerfile

```bash
# 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine

# 复制我们的 HTML 文件到 nginx 的默认位置
COPY index.html /usr/share/nginx/html/index.html

# 暴露端口（实际上 nginx:alpine 已经暴露了 80 端口）
EXPOSE 80

# 启动 nginx（实际上 nginx:alpine 已经有这个默认命令）
CMD ["nginx", "-g", "daemon off;"]
EOF
```

### 构建和运行

```bash
# 构建镜像
docker build -t my-docker-app .

# 注意最后的 "." 表示当前目录

# 运行容器
docker run -d -p 8080:80 --name my-app my-docker-app

# 访问 http://localhost:8080
# 你应该看到自定义的页面，包含当前时间
```

---

## 5. Docker Compose（5分钟）

### 理解 Docker Compose

Docker Compose 让你用一个 YAML 文件定义多容器应用。

### 创建 docker-compose.yml

```bash
# 在 my-docker-app 目录下创建
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
EOF
```

### 使用 Compose

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs web

# 停止所有服务
docker-compose down

# 完全清理（包括网络和卷）
docker-compose down --volumes
```

---

## 6. 常用技巧（额外时间）

### 进入运行中的容器

```bash
# 进入容器的 shell 环境
docker exec -it my-web sh

# 在容器内执行命令
# - ls /usr/share/nginx/html
# - cat /etc/nginx/nginx.conf
# - exit 退出
```

### 实时查看日志

```bash
# 实时跟踪日志
docker logs -f my-web

# 查看最后 50 行日志
docker logs --tail 50 my-web
```

### 清理 Docker 资源

```bash
# 清理停止的容器
docker container prune

# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源
docker system prune -a
```

---

## 🎯 30分钟后你应该掌握

- ✅ 能够运行和管理基本容器
- ✅ 理解镜像和容器的关系
- ✅ 能够编写简单的 Dockerfile
- ✅ 掌握 Docker Compose 基础
- ✅ 知道基本的故障排查方法

---

## 🚀 下一步学习

1. **深入学习 Dockerfile** - 多阶段构建、缓存优化
2. **数据持久化** - Volume 和 Bind Mount
3. **网络配置** - 自定义网络和服务发现
4. **生产实践** - 镜像仓库、监控、安全

---

## 💡 重要概念

### 镜像 vs 容器
- **镜像**: 只读的模板，类似面向对象编程中的"类"
- **容器**: 镜像的运行实例，类似"对象"

### 端口映射
- `docker run -p 主机端口:容器端口`
- 让主机可以访问容器内的服务

### 后台运行
- `-d` 参数让容器在后台运行
- 使用 `docker logs` 查看输出

---

## ❓ 常见问题

**Q: 端口被占用怎么办？**
```bash
# 使用不同端口
docker run -p 8081:80 nginx

# 或者停止占用端口的容器
docker ps  # 查找容器
docker stop <container_name_or_id>
```

**Q: 构建失败怎么办？**
```bash
# 查看详细错误信息
docker build --progress=plain -t my-app .

# 清理缓存重新构建
docker build --no-cache -t my-app .
```

**Q: 如何调试容器？**
```bash
# 查看容器详细信息
docker inspect <container_name>

# 进入容器调试
docker exec -it <container_name> sh
```

---

**记住**：Docker 的学习曲线是先陡峭后平缓。掌握基础后，你会发现容器化大大简化了开发、测试和部署流程！
