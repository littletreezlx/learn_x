-- Docker Demo 项目数据库初始化脚本
-- 该脚本会在 PostgreSQL 容器首次启动时执行

-- 创建用户表（如果 JPA 自动创建失败）
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入示例数据
INSERT INTO users (username, email, created_at, updated_at) VALUES 
('admin', 'admin@dockerdemo.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user1', 'user1@dockerdemo.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user2', 'user2@dockerdemo.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('testuser', 'test@dockerdemo.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('demo', 'demo@dockerdemo.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (username) DO NOTHING;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- 输出确认消息
DO $$
BEGIN
    RAISE NOTICE 'Docker Demo 数据库初始化完成！';
    RAISE NOTICE '已创建用户表并插入示例数据';
END $$;