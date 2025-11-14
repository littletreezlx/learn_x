# 简单 Web 应用示例

这是一个最基础的 Docker 应用示例,用于学习 Docker 的基本概念。

## 目标

- 理解 Dockerfile 的基本结构
- 学会构建和运行容器
- 掌握端口映射

## 文件说明

- `Dockerfile` - 镜像构建配置
- `index.html` - 网页内容
- `nginx.conf` - Nginx 配置

## 快速开始

```bash
# 进入示例目录
cd examples/simple-web-app

# 构建镜像
docker build -t my-web-app .

# 运行容器
docker run -d -p 8080:80 --name web-app my-web-app

# 访问应用
open http://localhost:8080

# 查看日志
docker logs web-app

# 停止并删除
docker stop web-app
docker rm web-app
```

## 实验任务

1. **修改内容**: 编辑 `index.html`,添加你的名字,重新构建并运行
2. **更改端口**: 将容器运行在 3000 端口
3. **查看镜像**: 使用 `docker images` 查看镜像信息
4. **检查大小**: 使用 `docker history my-web-app` 查看镜像层

## 学习要点

**Dockerfile 指令**:
- `FROM` - 指定基础镜像
- `COPY` - 复制文件到镜像
- `EXPOSE` - 声明端口
- `CMD` - 容器启动命令

**Docker 命令**:
- `docker build` - 构建镜像
- `docker run` - 运行容器
- `docker ps` - 查看容器
- `docker logs` - 查看日志
