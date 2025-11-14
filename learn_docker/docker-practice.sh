#!/bin/bash

# Docker 学习练习脚本
# 该脚本提供了一系列 Docker 学习练习，帮助初学者掌握 Docker 基础知识

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "\n${BLUE}===============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===============================================${NC}\n"
}

# 检查 Docker 是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker 服务未运行，请启动 Docker"
        exit 1
    fi
    
    print_success "Docker 环境检查通过"
}

# 练习1：基础镜像操作
exercise_1_basic_images() {
    print_header "练习1: 基础镜像操作"
    
    print_info "1.1 拉取官方镜像"
    docker pull hello-world
    docker pull alpine:latest
    
    print_info "1.2 查看本地镜像"
    docker images
    
    print_info "1.3 运行第一个容器"
    docker run hello-world
    
    print_info "1.4 运行交互式容器"
    print_warning "将启动交互式Alpine容器，输入 'exit' 退出"
    docker run -it alpine:latest /bin/sh
    
    print_success "练习1完成！"
}

# 练习2：构建和运行本项目
exercise_2_build_app() {
    print_header "练习2: 构建和运行项目应用"
    
    print_info "2.1 构建项目镜像"
    docker build -t learn-docker .
    
    print_info "2.2 查看构建的镜像"
    docker images learn-docker
    
    print_info "2.3 运行应用容器"
    print_warning "应用将在后台运行，端口 8080"
    docker run -d --name demo-app -p 8080:8080 learn-docker
    
    print_info "2.4 等待应用启动..."
    sleep 10
    
    print_info "2.5 测试应用接口"
    if command -v curl &> /dev/null; then
        curl http://localhost:8080
        echo ""
        curl http://localhost:8080/health
        echo ""
        curl http://localhost:8080/info
        echo ""
    else
        print_warning "curl 未安装，请手动访问 http://localhost:8080"
    fi
    
    print_info "2.6 查看容器日志"
    docker logs demo-app
    
    print_info "2.7 查看运行中的容器"
    docker ps
    
    print_info "2.8 停止并删除容器"
    docker stop demo-app
    docker rm demo-app
    
    print_success "练习2完成！"
}

# 练习3：Docker Compose 操作
exercise_3_compose() {
    print_header "练习3: Docker Compose 操作"
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose 未安装"
        return 1
    fi
    
    print_info "3.1 使用 Docker Compose 启动应用"
    docker-compose up -d --build
    
    print_info "3.2 查看服务状态"
    docker-compose ps
    
    print_info "3.3 查看服务日志"
    docker-compose logs app
    
    print_info "3.4 测试应用"
    sleep 10
    if command -v curl &> /dev/null; then
        curl http://localhost:8080
        echo ""
        curl http://localhost:8080/health
        echo ""
    fi
    
    print_info "3.5 停止服务"
    docker-compose down
    
    print_success "练习3完成！"
}

# 练习4：多环境配置
exercise_4_multi_env() {
    print_header "练习4: 多环境配置"
    
    print_info "4.1 启动开发环境"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    
    print_info "4.2 测试开发环境"
    sleep 10
    if command -v curl &> /dev/null; then
        curl http://localhost:8080/info
        echo ""
    fi
    
    print_info "4.3 停止开发环境"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
    
    print_info "4.4 启动生产环境配置"
    print_warning "生产环境配置需要调整端口映射，这里仅演示配置加载"
    # docker-compose -f docker-compose.yml -f docker-compose.prod.yml config
    
    print_success "练习4完成！"
}

# 练习5：容器管理高级操作
exercise_5_advanced() {
    print_header "练习5: 容器管理高级操作"
    
    print_info "5.1 启动应用容器"
    docker run -d --name advanced-demo -p 8080:8080 learn-docker
    sleep 10
    
    print_info "5.2 进入容器执行命令"
    print_warning "执行容器内命令: ps aux"
    docker exec advanced-demo ps aux
    
    print_info "5.3 复制文件到容器"
    echo "Test file content" > test.txt
    docker cp test.txt advanced-demo:/tmp/
    
    print_info "5.4 从容器复制文件"
    docker cp advanced-demo:/tmp/test.txt ./test-from-container.txt
    
    print_info "5.5 查看容器资源使用"
    docker stats advanced-demo --no-stream
    
    print_info "5.6 查看容器详细信息"
    docker inspect advanced-demo | head -20
    
    print_info "5.7 清理资源"
    docker stop advanced-demo
    docker rm advanced-demo
    rm -f test.txt test-from-container.txt
    
    print_success "练习5完成！"
}

# 练习6：镜像管理和优化
exercise_6_image_management() {
    print_header "练习6: 镜像管理和优化"
    
    print_info "6.1 查看镜像分层历史"
    docker history learn-docker
    
    print_info "6.2 分析镜像大小"
    docker images learn-docker
    
    print_info "6.3 导出镜像"
    docker save -o learn-docker.tar learn-docker
    print_info "镜像已导出到 learn-docker.tar"
    
    print_info "6.4 查看导出文件大小"
    ls -lh learn-docker.tar
    
    print_info "6.5 删除镜像（模拟）"
    print_warning "删除镜像: docker rmi learn-docker (此处仅显示命令)"
    
    print_info "6.6 重新导入镜像（模拟）"
    print_warning "导入镜像: docker load -i learn-docker.tar (此处仅显示命令)"
    
    print_info "6.7 清理导出文件"
    rm -f learn-docker.tar
    
    print_success "练习6完成！"
}

# 练习7：网络和存储
exercise_7_network_storage() {
    print_header "练习7: 网络和存储"
    
    print_info "7.1 创建自定义网络"
    docker network create demo-network
    
    print_info "7.2 查看网络列表"
    docker network ls
    
    print_info "7.3 创建数据卷"
    docker volume create demo-volume
    
    print_info "7.4 查看卷列表"
    docker volume ls
    
    print_info "7.5 使用网络和卷启动容器"
    docker run -d --name networked-app \
        --network demo-network \
        -v demo-volume:/app/data \
        -p 8080:8080 \
        learn-docker
    
    sleep 10
    
    print_info "7.6 查看容器网络信息"
    docker inspect networked-app | grep -A 20 NetworkSettings
    
    print_info "7.7 清理资源"
    docker stop networked-app
    docker rm networked-app
    docker network rm demo-network
    docker volume rm demo-volume
    
    print_success "练习7完成！"
}

# 清理函数
cleanup() {
    print_header "清理 Docker 资源"
    
    print_info "停止所有运行中的容器"
    docker stop $(docker ps -q) 2>/dev/null || true
    
    print_info "删除所有容器"
    docker rm $(docker ps -aq) 2>/dev/null || true
    
    print_info "清理未使用的镜像"
    docker image prune -f
    
    print_info "清理未使用的卷"
    docker volume prune -f
    
    print_info "清理未使用的网络"
    docker network prune -f
    
    print_success "清理完成！"
}

# 显示帮助信息
show_help() {
    echo "Docker 学习练习脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  1, basic        练习1: 基础镜像操作"
    echo "  2, build        练习2: 构建和运行项目应用"
    echo "  3, compose      练习3: Docker Compose 操作"
    echo "  4, env          练习4: 多环境配置"
    echo "  5, advanced     练习5: 容器管理高级操作"
    echo "  6, image        练习6: 镜像管理和优化"
    echo "  7, network      练习7: 网络和存储"
    echo "  all             运行所有练习"
    echo "  cleanup         清理 Docker 资源"
    echo "  help, -h        显示此帮助信息"
    echo ""
}

# 主函数
main() {
    case "${1:-help}" in
        1|basic)
            check_docker
            exercise_1_basic_images
            ;;
        2|build)
            check_docker
            exercise_2_build_app
            ;;
        3|compose)
            check_docker
            exercise_3_compose
            ;;
        4|env)
            check_docker
            exercise_4_multi_env
            ;;
        5|advanced)
            check_docker
            exercise_5_advanced
            ;;
        6|image)
            check_docker
            exercise_6_image_management
            ;;
        7|network)
            check_docker
            exercise_7_network_storage
            ;;
        all)
            check_docker
            exercise_1_basic_images
            exercise_2_build_app
            exercise_3_compose
            exercise_4_multi_env
            exercise_5_advanced
            exercise_6_image_management
            exercise_7_network_storage
            print_success "所有练习完成！"
            ;;
        cleanup)
            cleanup
            ;;
        help|-h|*)
            show_help
            ;;
    esac
}

# 运行主函数
main "$@"