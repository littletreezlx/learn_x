# 03 - 编写简单的 Dockerfile

**目标**: 学会编写 Dockerfile，创建自定义镜像

---

## 1. Dockerfile 基本结构

Dockerfile 是一个文本文件，包含构建 Docker 镜像所需的指令。

### 最简单的 Dockerfile

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

### 基本指令说明

- `FROM`: 指定基础镜像
- `COPY`: 复制文件到镜像中
- `RUN`: 在镜像中执行命令
- `CMD`: 容器启动时执行的默认命令
- `EXPOSE`: 声明容器监听的端口
- `WORKDIR`: 设置工作目录

---

## 2. 创建第一个自定义镜像

### 准备应用文件

```bash
# 创建项目目录
mkdir my-web-app
cd my-web-app

# 创建 HTML 文件
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My Docker App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .info { background: #f0f8ff; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Hello from Docker!</h1>
        <div class="info">
            <p><strong>应用信息:</strong></p>
            <p>当前时间: <span id="time"></span></p>
            <p>运行环境: Docker Container</p>
            <p>基础镜像: nginx:alpine</p>
        </div>
    </div>
    <script>
        document.getElementById('time').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

# 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine

# 复制自定义 HTML 文件
COPY index.html /usr/share/nginx/html/index.html

# 暴露端口
EXPOSE 80
EOF
```

### 构建镜像

```bash
# 构建镜像
docker build -t my-web-app .

# 查看构建的镜像
docker images my-web-app

# 运行容器
docker run -d -p 8080:80 --name my-web my-web-app

# 访问应用
curl http://localhost:8080
# 或在浏览器打开 http://localhost:8080
```

---

## 3. 更复杂的 Dockerfile

### Node.js 应用示例

```bash
# 创建 Node.js 应用目录
mkdir my-node-app
cd my-node-app

# 创建 package.json
cat > package.json << 'EOF'
{
  "name": "my-docker-app",
  "version": "1.0.0",
  "description": "Simple Node.js app for Docker",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
EOF

# 创建 app.js
cat > app.js << 'EOF'
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js in Docker!',
    timestamp: new Date().toISOString(),
    container_info: {
      platform: process.platform,
      node_version: process.version,
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
EOF

# 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 并安装依赖（利用层缓存）
COPY package*.json ./
RUN npm install

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动应用
CMD ["npm", "start"]
EOF
```

### 构建和运行 Node.js 应用

```bash
# 构建镜像
docker build -t my-node-app .

# 运行容器
docker run -d -p 3000:3000 --name my-node my-node-app

# 测试应用
curl http://localhost:3000
curl http://localhost:3000/health
```

---

## 4. Dockerfile 最佳实践

### 优化镜像大小

```dockerfile
# 不好的做法
FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y wget
RUN apt-get clean

# 好的做法（合并 RUN 指令）
FROM ubuntu:20.04
RUN apt-get update && \
    apt-get install -y curl wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 利用层缓存

```dockerfile
FROM node:18-alpine

# 先复制依赖文件，利用缓存
COPY package*.json ./
RUN npm install

# 后复制代码，代码变更不会影响依赖安装
COPY . .
```

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/app.js"]
```

---

## 5. 常用指令详解

### COPY vs ADD

```dockerfile
# COPY - 简单的文件复制
COPY local-file.txt /container/path/

# ADD - 额外功能（解压、远程 URL）
ADD archive.tar.gz /extract/path/        # 自动解压
ADD http://example.com/file.txt /path/  # 下载文件
```

### WORKDIR

```dockerfile
# 不好的做法
RUN cd /app && npm install
RUN cd /app && npm run build

# 好的做法
WORKDIR /app
RUN npm install
RUN npm run build
```

### ENV

```dockerfile
# 设置环境变量
ENV NODE_ENV=production
ENV API_URL=https://api.example.com
ENV PORT=3000

# 或者多个变量
ENV NODE_ENV=production \
    API_URL=https://api.example.com \
    PORT=3000
```

---

## 6. 实验任务

### 任务 1: 创建静态网站镜像

1. 创建一个包含多个页面的静态网站
2. 编写 Dockerfile 使用 nginx 作为基础镜像
3. 构建并运行容器
4. 测试所有页面都能正常访问

### 任务 2: 优化镜像大小

1. 创建一个包含大量文件的 Node.js 应用
2. 使用 `.dockerignore` 文件排除不必要的文件
3. 使用多阶段构建减小最终镜像大小
4. 比较优化前后的镜像大小

### 任务 3: 环境变量配置

1. 创建一个通过环境变量配置的应用
2. 在 Dockerfile 中设置默认环境变量
3. 运行容器时覆盖环境变量
4. 验证配置是否生效

---

## 7. 故障排除

### 构建失败常见问题

```bash
# 查看详细构建过程
docker build --progress=plain -t my-app .

# 无缓存构建
docker build --no-cache -t my-app .

# 查看构建历史
docker history my-app
```

### 常见错误

1. **文件路径错误**
   ```dockerfile
   # 错误：相对路径不正确
   COPY ../config.js /app/

   # 正确：确保文件在构建上下文中
   COPY config.js /app/
   ```

2. **权限问题**
   ```dockerfile
   # 设置文件权限
   COPY --chmod=755 script.sh /app/
   ```

3. **端口冲突**
   ```bash
   # 使用不同端口
   docker run -p 8081:3000 my-node-app
   ```

---

## 8. 下一步

完成这个示例后，你应该掌握：
- ✅ Dockerfile 的基本语法和指令
- ✅ 如何构建自定义镜像
- ✅ 镜像优化的基本技巧
- ✅ 多阶段构建的概念

接下来学习 [04_docker_compose.md](04_docker_compose.md)