# Dockerfile 最佳实践

这份指南总结了编写高效、安全、可维护的 Dockerfile 的最佳实践。

---

## 1. 使用精简的基础镜像

### ❌ 不推荐

```dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y openjdk-11-jre
```

**问题**:
- 镜像体积大 (约 500MB)
- 包含不必要的工具
- 使用 `latest` 标签不可预测

### ✅ 推荐

```dockerfile
FROM openjdk:11-jre-slim
```

**优势**:
- 镜像更小 (约 200MB)
- 只包含必需组件
- 使用特定版本标签

---

## 2. 多阶段构建

### ❌ 不推荐

```dockerfile
FROM maven:3.8-openjdk-11
WORKDIR /app
COPY . .
RUN mvn package
CMD ["java", "-jar", "target/app.jar"]
```

**问题**:
- 最终镜像包含构建工具
- 镜像体积过大 (约 800MB)

### ✅ 推荐

```dockerfile
# 构建阶段
FROM maven:3.8-openjdk-11-slim AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# 运行阶段
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
```

**优势**:
- 最终镜像只包含运行时
- 镜像体积减少 75% (约 200MB)
- 更安全,攻击面更小

---

## 3. 优化层缓存

### ❌ 不推荐

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
```

**问题**:
- 代码变更会导致依赖重新安装
- 构建时间长

### ✅ 推荐

```dockerfile
FROM node:16-alpine
WORKDIR /app

# 先复制依赖文件
COPY package*.json ./
RUN npm ci

# 再复制源码
COPY . .
RUN npm run build
```

**优势**:
- 依赖层可缓存
- 只有代码变更时才重新构建
- 构建速度提升 5-10 倍

---

## 4. 合并 RUN 命令

### ❌ 不推荐

```dockerfile
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y wget
RUN rm -rf /var/lib/apt/lists/*
```

**问题**:
- 每个 RUN 创建一层
- 镜像层数多
- 中间层包含临时文件

### ✅ 推荐

```dockerfile
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        wget && \
    rm -rf /var/lib/apt/lists/*
```

**优势**:
- 减少镜像层数
- 自动清理临时文件
- 镜像更小

---

## 5. 使用 .dockerignore

### ❌ 不推荐

直接 `COPY . .` 复制所有文件

**问题**:
- 复制不必要的文件 (node_modules, .git)
- 构建上下文大
- 构建速度慢

### ✅ 推荐

创建 `.dockerignore`:

```
node_modules
npm-debug.log
.git
.gitignore
.DS_Store
*.md
.env
.vscode
.idea
coverage
dist
build
```

**优势**:
- 减少构建上下文大小
- 加快构建速度
- 避免敏感文件进入镜像

---

## 6. 不要以 root 用户运行

### ❌ 不推荐

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
CMD ["node", "server.js"]
```

**问题**:
- 以 root 运行,安全风险高
- 容器逃逸影响更大

### ✅ 推荐

```dockerfile
FROM node:16-alpine

# 创建非特权用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app
COPY --chown=nodejs:nodejs . .

# 切换到非特权用户
USER nodejs

CMD ["node", "server.js"]
```

**优势**:
- 提高安全性
- 遵循最小权限原则

---

## 7. 使用特定版本标签

### ❌ 不推荐

```dockerfile
FROM node:latest
FROM python
FROM nginx
```

**问题**:
- 不可预测,可能破坏构建
- 难以复现问题
- 不利于审计

### ✅ 推荐

```dockerfile
FROM node:16.14.2-alpine3.15
FROM python:3.9.12-slim-bullseye
FROM nginx:1.21.6-alpine
```

**优势**:
- 可重现构建
- 便于版本管理
- 避免意外更新

---

## 8. 使用健康检查

### ❌ 不推荐

```dockerfile
FROM node:16-alpine
COPY . /app
WORKDIR /app
CMD ["node", "server.js"]
```

**问题**:
- 无法检测应用是否正常
- 依赖外部监控

### ✅ 推荐

```dockerfile
FROM node:16-alpine
COPY . /app
WORKDIR /app

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD node healthcheck.js || exit 1

CMD ["node", "server.js"]
```

**优势**:
- 自动健康检查
- 及时发现问题
- 配合编排工具自动重启

---

## 9. 使用 ENTRYPOINT + CMD 组合

### ❌ 不推荐 (不够灵活)

```dockerfile
CMD ["java", "-jar", "-Xmx512m", "app.jar"]
```

**问题**:
- 修改参数需要覆盖整个命令

### ✅ 推荐

```dockerfile
ENTRYPOINT ["java", "-jar"]
CMD ["app.jar"]
```

**使用**:
```bash
# 使用默认参数
docker run myapp

# 自定义参数
docker run myapp -Xmx1g app.jar
```

**优势**:
- 灵活性更高
- 易于扩展

---

## 10. 元数据标签

### ❌ 不推荐

```dockerfile
FROM node:16-alpine
```

**问题**:
- 缺少维护信息
- 难以追溯来源

### ✅ 推荐

```dockerfile
FROM node:16-alpine

LABEL maintainer="your-email@example.com" \
      version="1.0.0" \
      description="My awesome app" \
      org.opencontainers.image.source="https://github.com/user/repo"
```

**优势**:
- 便于维护
- 便于追溯
- 符合 OCI 标准

---

## 完整示例

结合所有最佳实践:

```dockerfile
# 构建阶段
FROM node:16.14.2-alpine3.15 AS builder

# 元数据
LABEL maintainer="your-email@example.com" \
      version="1.0.0"

# 创建用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /build

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && \
    npm cache clean --force

# 复制源码
COPY --chown=nodejs:nodejs . .

# 构建应用
RUN npm run build

# ============= 运行阶段 =============
FROM node:16.14.2-alpine3.15

# 安装运行时依赖
RUN apk add --no-cache \
        curl \
        tini && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# 从构建阶段复制产物
COPY --from=builder --chown=nodejs:nodejs /build/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /build/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./

# 切换用户
USER nodejs

# 声明端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# 使用 tini 作为 init 进程
ENTRYPOINT ["/sbin/tini", "--"]

# 启动命令
CMD ["node", "dist/server.js"]
```

---

## 检查清单

使用这个清单检查你的 Dockerfile:

- [ ] 使用精简的基础镜像
- [ ] 使用特定版本标签
- [ ] 使用多阶段构建
- [ ] 优化层缓存顺序
- [ ] 合并 RUN 命令
- [ ] 创建 .dockerignore 文件
- [ ] 不以 root 用户运行
- [ ] 配置健康检查
- [ ] 清理临时文件
- [ ] 添加元数据标签
- [ ] 使用 ENTRYPOINT + CMD
- [ ] 只安装必需的依赖

---

## 工具推荐

**镜像扫描**:
```bash
# 使用 Docker Scan
docker scan myimage:latest

# 使用 Trivy
trivy image myimage:latest
```

**Lint 工具**:
```bash
# Hadolint
docker run --rm -i hadolint/hadolint < Dockerfile
```

**镜像分析**:
```bash
# Dive - 分析镜像层
dive myimage:latest
```

---

记住: **小而专注的镜像是最好的镜像!**
