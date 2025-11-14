# 后端 Dockerfile 示例 (Node.js)

FROM node:16-alpine

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD node healthcheck.js || exit 1

# 启动应用
CMD ["node", "server.js"]
