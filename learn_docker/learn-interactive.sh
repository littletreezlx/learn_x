#!/bin/bash

# Docker 交互式学习脚本
# 提供友好的学习界面和进度追踪

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 学习进度文件
PROGRESS_FILE=".learning-progress.json"

# 初始化进度文件
init_progress() {
    if [ ! -f "$PROGRESS_FILE" ]; then
        cat > "$PROGRESS_FILE" <<EOF
{
  "current_day": 0,
  "completed_lessons": [],
  "started_at": "$(date +%Y-%m-%d)",
  "total_practice_time": 0
}
EOF
    fi
}

# 显示标题
show_banner() {
    clear
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║         🐳 Docker 交互式学习系统 v1.0                    ║"
    echo "║                                                            ║"
    echo "║         10天掌握 Docker 容器化技术                        ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
}

# 显示学习进度
show_progress() {
    local current_day=$(jq -r '.current_day' "$PROGRESS_FILE")
    local completed=$(jq -r '.completed_lessons | length' "$PROGRESS_FILE")
    local total=10
    local progress=$((completed * 100 / total))

    echo -e "${BLUE}📊 学习进度${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "当前阶段: ${GREEN}Day $current_day${NC}"
    echo -e "完成课程: ${GREEN}$completed/$total${NC}"

    # 进度条
    local bar_width=50
    local filled=$((progress * bar_width / 100))
    local empty=$((bar_width - filled))

    echo -n "进度: ["
    printf "%${filled}s" | tr ' ' '█'
    printf "%${empty}s" | tr ' ' '░'
    echo "] ${progress}%"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

# 主菜单
show_main_menu() {
    echo -e "${PURPLE}📚 请选择学习内容:${NC}"
    echo ""
    echo "  1) Day 1-2: Docker 基础概念"
    echo "  2) Day 3-4: Dockerfile 编写"
    echo "  3) Day 5-6: Docker Compose 编排"
    echo "  4) Day 7-8: 数据持久化和网络"
    echo "  5) Day 9-10: 生产环境实践"
    echo ""
    echo "  6) 📖 查看学习路径"
    echo "  7) 💡 最佳实践指南"
    echo "  8) 🎯 练习和示例"
    echo "  9) 🔧 故障排查指南"
    echo "  0) ❌ 退出"
    echo ""
    echo -n "请输入选项 (0-9): "
}

# Day 1-2: Docker 基础
day_1_2_menu() {
    clear
    show_banner
    echo -e "${GREEN}Day 1-2: Docker 基础概念${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🎯 学习目标:"
    echo "  • 理解容器和镜像的概念"
    echo "  • 掌握 Docker 基本命令"
    echo "  • 能够运行和管理容器"
    echo ""
    echo "📝 选择学习内容:"
    echo ""
    echo "  1) 📖 理论学习 - 什么是容器?"
    echo "  2) 💻 实践练习 - 运行第一个容器"
    echo "  3) 🧪 实验任务 - 容器生命周期管理"
    echo "  4) 🎓 知识检查 - 测试你的理解"
    echo "  0) ⬅️  返回主菜单"
    echo ""
    echo -n "请输入选项: "

    read choice
    case $choice in
        1) show_theory_containers ;;
        2) practice_first_container ;;
        3) practice_lifecycle ;;
        4) knowledge_check_day1 ;;
        0) return ;;
        *) echo -e "${RED}无效选项${NC}" && sleep 1 && day_1_2_menu ;;
    esac
}

# 显示容器理论
show_theory_containers() {
    clear
    echo -e "${CYAN}📖 理论学习: 什么是容器?${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${YELLOW}容器 vs 虚拟机:${NC}"
    echo ""
    echo "虚拟机架构:"
    echo "  ┌─────────────┐"
    echo "  │   App A     │"
    echo "  ├─────────────┤"
    echo "  │  Guest OS   │"
    echo "  ├─────────────┤"
    echo "  │  Hypervisor │"
    echo "  ├─────────────┤"
    echo "  │   Host OS   │"
    echo "  └─────────────┘"
    echo ""
    echo "容器架构:"
    echo "  ┌─────────────┐"
    echo "  │   App A     │"
    echo "  ├─────────────┤"
    echo "  │   Docker    │"
    echo "  ├─────────────┤"
    echo "  │   Host OS   │"
    echo "  └─────────────┘"
    echo ""
    echo -e "${GREEN}容器的优势:${NC}"
    echo "  ✓ 启动速度快 (秒级)"
    echo "  ✓ 资源占用少"
    echo "  ✓ 易于移植"
    echo "  ✓ 环境一致性"
    echo ""

    read -p "按回车继续..."

    echo -e "${YELLOW}镜像和容器的关系:${NC}"
    echo ""
    echo "  镜像 (Image)     →    容器 (Container)"
    echo "  ┌─────────┐          ┌─────────┐"
    echo "  │  只读   │  run     │  可写   │"
    echo "  │  模板   │  ─────>  │  实例   │"
    echo "  │  类     │          │  对象   │"
    echo "  └─────────┘          └─────────┘"
    echo ""
    echo "  一个镜像可以创建多个容器"
    echo ""

    read -p "按回车返回..."
    day_1_2_menu
}

# 实践: 运行第一个容器
practice_first_container() {
    clear
    echo -e "${CYAN}💻 实践练习: 运行第一个容器${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    echo -e "${YELLOW}步骤 1: 拉取 nginx 镜像${NC}"
    echo "$ docker pull nginx:alpine"
    echo ""
    read -p "执行这个命令? (y/n): " confirm

    if [ "$confirm" == "y" ]; then
        docker pull nginx:alpine
        echo -e "${GREEN}✓ 镜像拉取成功!${NC}"
    fi

    echo ""
    echo -e "${YELLOW}步骤 2: 查看镜像${NC}"
    echo "$ docker images"
    echo ""
    docker images | grep nginx || true

    echo ""
    echo -e "${YELLOW}步骤 3: 运行容器${NC}"
    echo "$ docker run -d -p 8080:80 --name my-nginx nginx:alpine"
    echo ""
    read -p "执行这个命令? (y/n): " confirm

    if [ "$confirm" == "y" ]; then
        docker run -d -p 8080:80 --name my-nginx nginx:alpine 2>/dev/null || \
            echo -e "${YELLOW}容器已存在或端口被占用${NC}"
        echo -e "${GREEN}✓ 容器启动成功!${NC}"
        echo ""
        echo "访问: http://localhost:8080"
    fi

    echo ""
    echo -e "${YELLOW}步骤 4: 查看运行中的容器${NC}"
    echo "$ docker ps"
    echo ""
    docker ps | grep nginx || echo "没有运行中的 nginx 容器"

    echo ""
    echo -e "${YELLOW}步骤 5: 查看容器日志${NC}"
    echo "$ docker logs my-nginx"
    echo ""
    read -p "查看日志? (y/n): " confirm
    if [ "$confirm" == "y" ]; then
        docker logs my-nginx 2>/dev/null | tail -10 || echo "容器不存在"
    fi

    echo ""
    echo -e "${GREEN}🎉 恭喜! 你已经成功运行了第一个容器!${NC}"
    echo ""
    read -p "清理容器? (y/n): " confirm
    if [ "$confirm" == "y" ]; then
        docker stop my-nginx 2>/dev/null || true
        docker rm my-nginx 2>/dev/null || true
        echo -e "${GREEN}✓ 容器已清理${NC}"
    fi

    # 更新进度
    update_progress "day1-first-container"

    echo ""
    read -p "按回车返回..."
    day_1_2_menu
}

# 实践: 容器生命周期
practice_lifecycle() {
    clear
    echo -e "${CYAN}🧪 实验任务: 容器生命周期管理${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    echo -e "${YELLOW}容器状态转换:${NC}"
    echo ""
    echo "  created → running → paused → stopped → removed"
    echo ""

    echo "让我们通过实践来理解每个状态..."
    echo ""
    read -p "按回车开始..."

    # 创建容器
    echo ""
    echo -e "${YELLOW}1. 创建容器 (created)${NC}"
    echo "$ docker create --name lifecycle-demo nginx:alpine"
    docker create --name lifecycle-demo nginx:alpine 2>/dev/null || \
        (docker rm lifecycle-demo 2>/dev/null && docker create --name lifecycle-demo nginx:alpine)
    echo -e "${GREEN}✓ 容器已创建${NC}"
    docker ps -a | grep lifecycle-demo

    read -p "按回车继续..."

    # 启动容器
    echo ""
    echo -e "${YELLOW}2. 启动容器 (running)${NC}"
    echo "$ docker start lifecycle-demo"
    docker start lifecycle-demo
    echo -e "${GREEN}✓ 容器已启动${NC}"
    docker ps | grep lifecycle-demo

    read -p "按回车继续..."

    # 暂停容器
    echo ""
    echo -e "${YELLOW}3. 暂停容器 (paused)${NC}"
    echo "$ docker pause lifecycle-demo"
    docker pause lifecycle-demo
    echo -e "${GREEN}✓ 容器已暂停${NC}"
    docker ps | grep lifecycle-demo

    read -p "按回车继续..."

    # 恢复容器
    echo ""
    echo -e "${YELLOW}4. 恢复容器 (running)${NC}"
    echo "$ docker unpause lifecycle-demo"
    docker unpause lifecycle-demo
    echo -e "${GREEN}✓ 容器已恢复${NC}"

    read -p "按回车继续..."

    # 停止容器
    echo ""
    echo -e "${YELLOW}5. 停止容器 (stopped)${NC}"
    echo "$ docker stop lifecycle-demo"
    docker stop lifecycle-demo
    echo -e "${GREEN}✓ 容器已停止${NC}"
    docker ps -a | grep lifecycle-demo

    read -p "按回车继续..."

    # 删除容器
    echo ""
    echo -e "${YELLOW}6. 删除容器 (removed)${NC}"
    echo "$ docker rm lifecycle-demo"
    docker rm lifecycle-demo
    echo -e "${GREEN}✓ 容器已删除${NC}"
    docker ps -a | grep lifecycle-demo || echo "(容器已不存在)"

    echo ""
    echo -e "${GREEN}🎓 实验完成! 你已经掌握了容器的完整生命周期!${NC}"

    # 更新进度
    update_progress "day1-lifecycle"

    echo ""
    read -p "按回车返回..."
    day_1_2_menu
}

# 知识检查
knowledge_check_day1() {
    clear
    echo -e "${CYAN}🎓 知识检查: Day 1-2${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    local score=0
    local total=5

    # 问题 1
    echo "问题 1: 镜像和容器的关系是?"
    echo "  a) 镜像是容器的运行实例"
    echo "  b) 容器是镜像的运行实例"
    echo "  c) 它们是同一个东西"
    read -p "你的答案: " answer
    if [ "$answer" == "b" ]; then
        echo -e "${GREEN}✓ 正确!${NC}"
        score=$((score + 1))
    else
        echo -e "${RED}✗ 错误。正确答案是 b${NC}"
    fi
    echo ""

    # 问题 2
    echo "问题 2: docker run -d 中的 -d 表示?"
    echo "  a) debug 模式"
    echo "  b) 后台运行"
    echo "  c) 删除容器"
    read -p "你的答案: " answer
    if [ "$answer" == "b" ]; then
        echo -e "${GREEN}✓ 正确!${NC}"
        score=$((score + 1))
    else
        echo -e "${RED}✗ 错误。正确答案是 b (detached 后台模式)${NC}"
    fi
    echo ""

    # 问题 3
    echo "问题 3: 停止容器后数据会丢失吗?"
    echo "  a) 会,所有数据都会丢失"
    echo "  b) 不会,容器的可写层会保留"
    echo "  c) 只有删除容器才会丢失"
    read -p "你的答案: " answer
    if [ "$answer" == "c" ]; then
        echo -e "${GREEN}✓ 正确!${NC}"
        score=$((score + 1))
    else
        echo -e "${RED}✗ 错误。正确答案是 c${NC}"
    fi
    echo ""

    # 问题 4
    echo "问题 4: 查看运行中容器的命令是?"
    echo "  a) docker list"
    echo "  b) docker ps"
    echo "  c) docker show"
    read -p "你的答案: " answer
    if [ "$answer" == "b" ]; then
        echo -e "${GREEN}✓ 正确!${NC}"
        score=$((score + 1))
    else
        echo -e "${RED}✗ 错误。正确答案是 b${NC}"
    fi
    echo ""

    # 问题 5
    echo "问题 5: 容器相比虚拟机的优势是?"
    echo "  a) 更安全"
    echo "  b) 启动更快,资源占用更少"
    echo "  c) 完全隔离"
    read -p "你的答案: " answer
    if [ "$answer" == "b" ]; then
        echo -e "${GREEN}✓ 正确!${NC}"
        score=$((score + 1))
    else
        echo -e "${RED}✗ 错误。正确答案是 b${NC}"
    fi
    echo ""

    # 显示结果
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "得分: ${GREEN}$score/$total${NC}"

    if [ $score -eq $total ]; then
        echo -e "${GREEN}🎉 完美! 你已经完全掌握了 Day 1-2 的内容!${NC}"
        update_progress "day1-quiz-perfect"
    elif [ $score -ge 3 ]; then
        echo -e "${YELLOW}👍 不错! 建议再复习一下错误的部分。${NC}"
        update_progress "day1-quiz-pass"
    else
        echo -e "${RED}📚 需要加强! 建议重新学习理论部分。${NC}"
    fi

    echo ""
    read -p "按回车返回..."
    day_1_2_menu
}

# 更新学习进度
update_progress() {
    local lesson=$1
    jq --arg lesson "$lesson" \
       '.completed_lessons += [$lesson] | .completed_lessons |= unique' \
       "$PROGRESS_FILE" > "${PROGRESS_FILE}.tmp" && \
       mv "${PROGRESS_FILE}.tmp" "$PROGRESS_FILE"
}

# 查看学习路径
view_learning_path() {
    clear
    echo -e "${CYAN}📖 Docker 学习路径${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    if [ -f "LEARNING_PATH.md" ]; then
        less LEARNING_PATH.md
    else
        echo -e "${RED}学习路径文档不存在${NC}"
    fi

    read -p "按回车返回..."
}

# 查看最佳实践
view_best_practices() {
    clear
    echo -e "${CYAN}💡 Docker 最佳实践${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "选择查看:"
    echo "  1) Dockerfile 最佳实践"
    echo "  2) Docker Compose 最佳实践"
    echo "  0) 返回"
    echo ""
    read -p "请输入选项: " choice

    case $choice in
        1)
            if [ -f "best-practices/dockerfile-best-practices.md" ]; then
                less best-practices/dockerfile-best-practices.md
            fi
            ;;
        2)
            if [ -f "best-practices/docker-compose-best-practices.md" ]; then
                less best-practices/docker-compose-best-practices.md
            fi
            ;;
    esac

    read -p "按回车返回..."
}

# 练习和示例
view_examples() {
    clear
    echo -e "${CYAN}🎯 练习和示例${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  1) 简单 Web 应用示例"
    echo "  2) 多服务应用示例"
    echo "  3) 自动化练习脚本"
    echo "  0) 返回"
    echo ""
    read -p "请输入选项: " choice

    case $choice in
        1)
            cd examples/simple-web-app 2>/dev/null && less README.md
            cd ../..
            ;;
        2)
            cd examples/multi-service-app 2>/dev/null && less README.md
            cd ../..
            ;;
        3)
            ./docker-practice.sh help
            ;;
    esac

    read -p "按回车返回..."
}

# 主程序
main() {
    init_progress

    while true; do
        show_banner
        show_progress
        show_main_menu
        read choice

        case $choice in
            1) day_1_2_menu ;;
            2) echo -e "${YELLOW}Day 3-4 内容开发中...${NC}" && sleep 2 ;;
            3) echo -e "${YELLOW}Day 5-6 内容开发中...${NC}" && sleep 2 ;;
            4) echo -e "${YELLOW}Day 7-8 内容开发中...${NC}" && sleep 2 ;;
            5) echo -e "${YELLOW}Day 9-10 内容开发中...${NC}" && sleep 2 ;;
            6) view_learning_path ;;
            7) view_best_practices ;;
            8) view_examples ;;
            9)
                if [ -f "TROUBLESHOOTING.md" ]; then
                    less TROUBLESHOOTING.md
                else
                    echo -e "${RED}故障排查文档不存在${NC}"
                    sleep 2
                fi
                ;;
            0)
                echo -e "${GREEN}感谢使用! 继续加油学习! 🚀${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}无效选项,请重新选择${NC}"
                sleep 1
                ;;
        esac
    done
}

# 检查依赖
check_dependencies() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}错误: Docker 未安装${NC}"
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        echo -e "${YELLOW}警告: jq 未安装,进度追踪功能将不可用${NC}"
        echo "安装: brew install jq (macOS) 或 apt-get install jq (Ubuntu)"
        sleep 3
    fi
}

# 运行
check_dependencies
main
