#!/bin/bash

# API 测试脚本
# 用于测试 Docker Demo 应用的各个 API 端点

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

BASE_URL="http://localhost:8080"

echo -e "${BLUE}Docker Demo API 测试脚本${NC}\n"

# 测试基础端点
echo -e "${YELLOW}1. 测试基础端点${NC}"
echo "GET $BASE_URL/"
curl -s "$BASE_URL/" | echo
echo -e "\n"

echo "GET $BASE_URL/health"
curl -s "$BASE_URL/health" | jq '.' 2>/dev/null || curl -s "$BASE_URL/health"
echo -e "\n"

echo "GET $BASE_URL/info"
curl -s "$BASE_URL/info" | jq '.' 2>/dev/null || curl -s "$BASE_URL/info"
echo -e "\n"

# 测试功能端点
echo -e "${YELLOW}2. 测试功能端点${NC}"
echo "GET $BASE_URL/hello/Docker"
curl -s "$BASE_URL/hello/Docker" | jq '.' 2>/dev/null || curl -s "$BASE_URL/hello/Docker"
echo -e "\n"

echo "GET $BASE_URL/echo?message=Hello"
curl -s "$BASE_URL/echo?message=Hello" | jq '.' 2>/dev/null || curl -s "$BASE_URL/echo?message=Hello"
echo -e "\n"

echo "GET $BASE_URL/memory"
curl -s "$BASE_URL/memory" | jq '.' 2>/dev/null || curl -s "$BASE_URL/memory"
echo -e "\n"

# 测试用户 API（如果数据库可用）
echo -e "${YELLOW}3. 测试用户 API${NC}"
echo "GET $BASE_URL/api/users"
curl -s "$BASE_URL/api/users" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/users"
echo -e "\n"

echo "POST $BASE_URL/api/users (创建测试用户)"
curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"testapi","email":"testapi@example.com"}' | \
  jq '.' 2>/dev/null || curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"testapi","email":"testapi@example.com"}'
echo -e "\n"

echo "GET $BASE_URL/api/users/stats"
curl -s "$BASE_URL/api/users/stats" | jq '.' 2>/dev/null || curl -s "$BASE_URL/api/users/stats"
echo -e "\n"

echo -e "${GREEN}API 测试完成！${NC}"