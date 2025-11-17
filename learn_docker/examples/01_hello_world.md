# 01 - Hello World 容器

**目标**: 运行你的第一个 Docker 容器，理解基本概念

---

## 1. 运行 Hello World

```bash
docker run hello-world
```

**发生了什么？**
1. Docker 在本地查找 `hello-world` 镜像
2. 如果没找到，从 Docker Hub 下载
3. 创建容器并运行
4. 容器输出欢迎消息后停止

## 2. 关键概念理解

### 镜像 (Image)
- 只读的模板，包含运行应用所需的一切
- 类似：面向对象编程中的"类"
- 例子：`hello-world`, `nginx`, `ubuntu:20.04`

### 容器 (Container)
- 镜像的运行实例
- 类似：面向对象编程中的"对象"
- 可以启动、停止、删除

### 仓库 (Registry)
- 存储镜像的地方
- 最常用：Docker Hub (https://hub.docker.com/)

## 3. 基本命令练习

```bash
# 查看本地镜像
docker images

# 查看所有容器（包括停止的）
docker ps -a

# 查看运行中的容器
docker ps
```

## 4. 实验任务

1. **运行不同版本的 hello-world**
   ```bash
   docker run hello-world
   docker run hello-world:latest
   docker run hello-world:linux
   ```

2. **观察输出差异**
   - 注意第二次运行时没有下载过程（镜像已缓存）

3. **查看镜像详细信息**
   ```bash
   docker inspect hello-world
   ```
   - 观察 Layers、Architecture、Created 等信息

## 5. 思考问题

- 为什么第二次运行 `docker run hello-world` 速度快很多？
- `hello-world` 容器为什么运行完就停止了？
- 如果我想让容器一直运行，应该怎么做？

## 6. 下一步

完成这个示例后，你应该理解：
- ✅ 什么是镜像和容器
- ✅ 如何运行基本容器
- ✅ Docker 的基本工作流程

接下来学习 [02_basic_commands.md](02_basic_commands.md)