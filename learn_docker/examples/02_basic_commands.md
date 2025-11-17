# 02 - 基本 Docker 命令

**目标**: 掌握 Docker 最常用的命令，能够管理容器和镜像

---

## 1. 容器生命周期管理

### 运行容器

```bash
# 启动一个 nginx 容器（前台运行）
docker run nginx

# 启动容器并命名（后台运行）
docker run -d --name my-web nginx

# 启动容器并映射端口
docker run -d -p 8080:80 --name my-nginx nginx
```

**参数说明**:
- `-d`: 后台运行（detached）
- `-p 8080:80`: 端口映射 主机端口:容器端口
- `--name my-nginx`: 给容器命名

### 查看容器状态

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器详细信息
docker inspect my-nginx
```

### 停止和启动容器

```bash
# 停止容器
docker stop my-nginx

# 启动已停止的容器
docker start my-nginx

# 重启容器
docker restart my-nginx
```

### 删除容器

```bash
# 删除容器（必须先停止）
docker rm my-nginx

# 强制删除运行中的容器
docker rm -f my-nginx

# 清理所有停止的容器
docker container prune
```

## 2. 镜像管理

### 查看镜像

```bash
# 查看本地所有镜像
docker images

# 查看镜像详细信息
docker inspect nginx
```

### 拉取镜像

```bash
# 拉取最新版本的 nginx
docker pull nginx

# 拉取指定版本的 nginx
docker pull nginx:1.21-alpine

# 拉取多个版本的镜像
docker pull ubuntu:20.04
docker pull ubuntu:22.04
```

### 删除镜像

```bash
# 删除镜像（没有容器使用时）
docker rmi nginx

# 强制删除镜像（即使有容器在使用）
docker rmi -f nginx

# 清理所有未使用的镜像
docker image prune
```

## 3. 日志和交互

### 查看日志

```bash
# 查看容器日志
docker logs my-nginx

# 实时跟踪日志
docker logs -f my-nginx

# 查看最后 50 行日志
docker logs --tail 50 my-nginx

# 查看带时间戳的日志
docker logs -t my-nginx
```

### 进入容器

```bash
# 进入容器的 shell 环境
docker exec -it my-nginx sh

# 在容器内执行命令
docker exec my-nginx ls /usr/share/nginx/html

# 以 root 用户进入容器
docker exec -it --user root my-nginx bash
```

**参数说明**:
- `-i`: 交互式模式
- `-t`: 分配终端
- `sh`: 使用 shell（alpine 镜像通常用 sh，其他镜像可用 bash）

## 4. 端口和 volumes

### 端口映射

```bash
# 映射单个端口
docker run -d -p 8080:80 nginx

# 映射多个端口
docker run -d \
  -p 8080:80 \
  -p 8443:443 \
  nginx

# 映射到随机端口
docker run -d -p 80 nginx

# 映射到所有接口的 8080 端口
docker run -d -p 0.0.0.0:8080:80 nginx
```

### 数据卷（简单介绍）

```bash
# 创建一个数据卷
docker volume create my-data

# 使用数据卷
docker run -d -v my-data:/data nginx

# 使用主机目录（绑定挂载）
docker run -d -v "$(pwd)":/usr/share/nginx/html:ro nginx
```

## 5. 实用技巧

### 资源清理

```bash
# 清理停止的容器
docker container prune

# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源（网络、卷等）
docker system prune -a
```

### 批量操作

```bash
# 停止所有容器
docker stop $(docker ps -q)

# 删除所有容器
docker rm $(docker ps -aq)

# 删除所有镜像
docker rmi $(docker images -q)
```

### 实时监控

```bash
# 查看容器资源使用情况
docker stats

# 查看容器大小
docker ps --size

# 查看 Docker 系统信息
docker system df
```

## 6. 实验任务

### 任务 1: 完整的容器生命周期

```bash
# 1. 拉取镜像
docker pull nginx:alpine

# 2. 运行容器
docker run -d --name test-nginx -p 8080:80 nginx:alpine

# 3. 访问应用
curl http://localhost:8080

# 4. 查看日志
docker logs test-nginx

# 5. 进入容器
docker exec -it test-nginx sh

# 6. 在容器内执行命令
ls /usr/share/nginx/html
exit

# 7. 停止容器
docker stop test-nginx

# 8. 删除容器
docker rm test-nginx
```

### 任务 2: 端口冲突解决

```bash
# 尝试在同一端口运行两个容器
docker run -d --name web1 -p 8080:80 nginx
docker run -d --name web2 -p 8080:80 nginx  # 这会失败

# 使用不同端口解决冲突
docker run -d --name web2 -p 8081:80 nginx
```

### 任务 3: 镜像管理

```bash
# 拉取不同版本的镜像
docker pull nginx:1.21
docker pull nginx:1.22
docker pull nginx:alpine

# 查看所有镜像
docker images

# 删除特定版本
docker rmi nginx:1.21
```

## 7. 常见问题

### Q: 端口被占用怎么办？
```bash
# 查看端口占用
lsof -i :8080

# 或者使用不同端口
docker run -p 8081:80 nginx
```

### Q: 容器启动失败？
```bash
# 查看错误日志
docker logs <container_name>

# 查看容器状态
docker ps -a
```

### Q: 如何查看容器内部文件？
```bash
# 查看容器内的文件列表
docker exec <container_name> ls /path/to/directory

# 复制文件到主机
docker cp <container_name>:/path/to/file ./local-file
```

## 8. 思考问题

- 为什么容器默认以 root 用户运行？
- 端口映射和安全有什么关系？
- 什么时候应该删除镜像，什么时候应该保留？

## 9. 下一步

完成这个示例后，你应该掌握：
- ✅ 容器的基本生命周期管理
- ✅ 镜像的拉取和管理
- ✅ 日志查看和调试方法
- ✅ 端口映射的概念和使用

接下来学习 [03_simple_dockerfile.md](03_simple_dockerfile.md)