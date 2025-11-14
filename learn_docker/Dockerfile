# ============= 第一阶段：构建应用 =============
FROM maven:3.8.4-openjdk-11-slim AS builder

# 设置 Maven 镜像源为阿里云镜像
COPY settings.xml /usr/share/maven/conf/settings.xml

# 设置工作目录
WORKDIR /app

# 分层复制：先复制 pom.xml
COPY pom.xml .

# 下载项目依赖
RUN mvn dependency:go-offline

# 复制源代码
COPY src ./src

# 构建应用
RUN mvn package -DskipTests

# ============= 第二阶段：运行应用 =============
FROM openjdk:11-jre-slim

# 安装 curl 用于健康检查
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 从构建阶段复制构建产物（jar 文件）
COPY --from=builder /app/target/*.jar app.jar

# 声明端口
EXPOSE 8080

# 健康检查配置
# 每30秒检查一次，超时3秒，失败3次认为不健康
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# 启动命令
ENTRYPOINT ["java", "-jar", "app.jar"] 