# 简单的 Web 应用示例
# 演示: 基础的 Dockerfile 编写

FROM nginx:alpine

# 复制自定义网页
COPY index.html /usr/share/nginx/html/

# 复制自定义配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
