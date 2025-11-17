# 05 - 数据卷和数据持久化

**目标**: 理解 Docker 的数据管理，学会使用数据卷持久化数据

---

## 1. 数据持久化的必要性

### 为什么需要数据持久化？

- **容器是临时的**: 容器删除后，内部数据会丢失
- **数据需要长期保存**: 数据库、用户上传文件、日志等
- **数据共享**: 多个容器之间需要共享数据
- **备份和恢复**: 需要定期备份重要数据

### 数据丢失示例

```bash
# 运行一个数据库容器
docker run -d --name temp-db postgres:13

# 进入容器创建数据
docker exec -it temp-db psql -U postgres
CREATE DATABASE testdb;
\c testdb
CREATE TABLE users (id SERIAL, name VARCHAR(100));
INSERT INTO users (name) VALUES ('Alice'), ('Bob');
\q

# 删除容器（数据丢失！）
docker rm -f temp-db

# 重新创建容器（数据已丢失）
docker run -d --name temp-db postgres:13
docker exec -it temp-db psql -U postgres -c "\l"
# testdb 不存在了！
```

---

## 2. 数据卷 (Volumes)

### 数据卷的特点

- **独立于容器**: 数据卷生命周期独立于容器
- **性能优化**: 专门为数据存储设计，性能更好
- **备份方便**: 可以轻松备份和迁移
- **跨平台**: 支持多种存储驱动

### 基本使用

```bash
# 创建数据卷
docker volume create my-data

# 查看数据卷
docker volume ls

# 查看数据卷详细信息
docker volume inspect my-data

# 使用数据卷启动容器
docker run -d --name db \
  -v my-data:/var/lib/postgresql/data \
  postgres:13

# 即使容器删除，数据卷仍然存在
docker rm -f db
docker volume ls  # my-data 还在
```

### 数据卷管理

```bash
# 创建命名数据卷
docker volume create pgdata

# 查看数据卷详情
docker volume inspect pgdata

# 删除数据卷（需要先删除使用它的容器）
docker volume rm pgdata

# 清理未使用的数据卷
docker volume prune
```

### 实际示例：PostgreSQL 数据持久化

```bash
# 1. 创建数据卷
docker volume create postgres_data

# 2. 启动 PostgreSQL 容器
docker run -d \
  --name postgres-db \
  -e POSTGRES_DB=myapp \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypass \
  -v postgres_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:13

# 3. 创建测试数据
docker exec -it postgres-db psql -U myuser -d myapp -c "
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
  );
  INSERT INTO products (name, price) VALUES
    ('Laptop', 999.99),
    ('Mouse', 29.99),
    ('Keyboard', 79.99);
"

# 4. 验证数据
docker exec -it postgres-db psql -U myuser -d myapp -c "SELECT * FROM products;"

# 5. 停止并删除容器
docker stop postgres-db
docker rm postgres-db

# 6. 用新的容器使用相同的数据卷
docker run -d \
  --name postgres-db-new \
  -e POSTGRES_DB=myapp \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypass \
  -v postgres_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:13

# 7. 数据仍然存在！
docker exec -it postgres-db-new psql -U myuser -d myapp -c "SELECT * FROM products;"
```

---

## 3. 绑定挂载 (Bind Mounts)

### 绑定挂载的特点

- **主机路径**: 直接映射主机上的文件或目录
- **实时同步**: 主机和容器之间的文件实时同步
- **开发便利**: 适合开发时的代码同步
- **权限问题**: 需要注意文件权限

### 基本使用

```bash
# 当前目录映射到容器
docker run -d --name web \
  -v "$(pwd)/html":/usr/share/nginx/html:ro \
  -p 8080:80 \
  nginx:alpine

# :ro 表示只读（read-only）
# :rw 表示读写（read-write，默认）
```

### 开发环境示例

```bash
# 创建 Web 项目
mkdir my-web-project && cd my-web-project

# 创建 HTML 文件
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Development Mode</title>
</head>
<body>
    <h1>🚀 Development Mode</h1>
    <p>File: <span id="file"></span></p>
    <p>Last updated: <span id="updated"></span></p>
    <script>
        document.getElementById('file').textContent = location.pathname;
        document.getElementById('updated').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

# 启动 Nginx 容器（绑定挂载）
docker run -d --name dev-web \
  -v "$(pwd)":/usr/share/nginx/html \
  -p 8080:80 \
  nginx:alpine

# 修改文件，实时生效
echo '<h2 style="color: red;">Updated at '$(date)'</h2>' >> index.html

# 刷新浏览器 http://localhost:8080 看到更新
```

### 权限处理

```bash
# 查看当前用户 ID
id -u

# 使用相同用户 ID 运行容器
docker run -d --name web \
  -v "$(pwd)":/usr/share/nginx/html \
  -p 8080:80 \
  --user $(id -u):$(id -g) \
  nginx:alpine

# 或者在 Dockerfile 中设置用户
cat > Dockerfile << 'EOF'
FROM nginx:alpine
# 注意：alpine 镜像可能没有该用户，需要先创建
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser
USER appuser
EOF
```

---

## 4. Docker Compose 中的数据管理

### Compose 卷配置

```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypass
    volumes:
      # 使用命名卷
      - postgres_data:/var/lib/postgresql/data
      # 使用绑定挂载（初始化脚本）
      - ./init:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"

  app:
    build: .
    volumes:
      # 应用代码（开发时）
      - .:/app
      # 依赖包（不覆盖）
      - /app/node_modules
      # 上传文件目录
      - uploads:/app/uploads
    ports:
      - "3000:3000"
    depends_on:
      - db

  nginx:
    image: nginx:alpine
    volumes:
      # 静态文件
      - ./public:/usr/share/nginx/html
      # 配置文件
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80"
    depends_on:
      - app

volumes:
  postgres_data:
    driver: local
  uploads:
    driver: local
```

### 初始化脚本

```bash
# 创建初始化脚本目录
mkdir -p init

# 创建数据库初始化脚本
cat > init/01-init.sql << 'EOF'
-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- 插入示例数据
INSERT INTO users (username, email) VALUES
    ('admin', 'admin@example.com'),
    ('user1', 'user1@example.com');
EOF
```

---

## 5. 备份和恢复

### 数据卷备份

```bash
# 备份 PostgreSQL 数据卷
docker run --rm \
  -v postgres_data:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/postgres-backup-$(date +%Y%m%d).tar.gz -C /data .

# 备份 MongoDB 数据卷
docker run --rm \
  -v mongodb_data:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/mongodb-backup-$(date +%Y%m%d).tar.gz -C /data .

# 创建备份脚本
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 备份数据卷
docker run --rm \
  -v postgres_data:/data \
  -v "$(pwd)/$BACKUP_DIR":/backup \
  alpine \
  tar czf /backup/postgres_$DATE.tar.gz -C /data .

echo "Backup created: $BACKUP_DIR/postgres_$DATE.tar.gz"
EOF

chmod +x backup.sh
```

### 数据恢复

```bash
# 恢复 PostgreSQL 数据
docker run --rm \
  -v postgres_data:/data \
  -v $(pwd):/backup \
  alpine \
  tar xzf /backup/postgres-backup-20231201.tar.gz -C /data

# 创建恢复脚本
cat > restore.sh << 'EOF'
#!/bin/bash
BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

# 停止数据库容器
docker-compose stop db

# 清空现有数据
docker run --rm -v postgres_data:/data alpine sh -c "rm -rf /data/*"

# 恢复数据
docker run --rm \
  -v postgres_data:/data \
  -v "$(pwd)":/backup \
  alpine \
  tar xzf /backup/$BACKUP_FILE -C /data

# 启动数据库容器
docker-compose start db

echo "Data restored from $BACKUP_FILE"
EOF

chmod +x restore.sh
```

---

## 6. 数据卷驱动

### 本地驱动（默认）

```yaml
version: '3.8'

volumes:
  data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /host/path
```

### NFS 驱动

```yaml
version: '3.8'

volumes:
  nfs_data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=nfs-server-ip,rw
      device: ":/path/to/nfs/share"
```

### 云存储驱动

```yaml
version: '3.8'

volumes:
  s3_data:
    driver: rexray/s3fs
    driver_opts:
      accesskey: YOUR_ACCESS_KEY
      secretkey: YOUR_SECRET_KEY
      bucket: your-bucket-name
      region: us-east-1
```

---

## 7. 实验任务

### 任务 1: 数据库持久化

1. 创建 PostgreSQL 容器并使用数据卷
2. 创建测试数据
3. 停止并删除容器
4. 用新容器恢复数据
5. 验证数据完整性

### 任务 2: 开发环境设置

1. 创建 Web 应用项目
2. 使用绑定挂载同步代码
3. 实时修改代码并查看效果
4. 处理文件权限问题

### 任务 3: 备份恢复

1. 创建包含数据库的 Compose 应用
2. 编写自动备份脚本
3. 测试数据恢复流程
4. 验证恢复后的数据一致性

---

## 8. 最佳实践

### 命名规范

```bash
# 好的命名
docker volume create myapp_postgres_data
docker volume create myapp_uploads
docker volume create myapp_logs

# 避免的命名
docker volume create data
docker volume create test
```

### 权限管理

```yaml
# 在 docker-compose.yml 中设置用户
services:
  app:
    user: "1000:1000"  # 使用非 root 用户
    volumes:
      - ./data:/app/data
```

### 性能优化

```yaml
# 使用 tmpfs 提高性能
services:
  app:
    tmpfs:
      - /tmp
      - /var/cache

# 对于大量小文件，使用优化选项
services:
  app:
    volumes:
      - ./uploads:/app/uploads:delegated  # macOS 性能优化
```

---

## 9. 下一步

完成这个示例后，你应该掌握：
- ✅ 数据卷和绑定挂载的区别
- ✅ 数据持久化的实现方法
- ✅ 备份和恢复的流程
- ✅ 开发环境的最佳实践

接下来学习 [06_networking.md](06_networking.md)