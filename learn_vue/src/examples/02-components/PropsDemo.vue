<template>
  <div class="example-container">
    <h2>组件通信：Props（父 → 子）</h2>

    <!-- 基础 Props 传递 -->
    <div class="section">
      <h3>基础用法：传递数据给子组件</h3>
      <UserCard
        username="Alice"
        :age="25"
        :is-active="true"
        role="管理员"
      />
      <p class="tip">
        💡 使用 v-bind 或 : 传递动态数据，不使用则传递静态字符串
      </p>
    </div>

    <!-- 对象 Props -->
    <div class="section">
      <h3>传递对象和数组</h3>
      <ProductCard :product="currentProduct" />
      <button @click="changeProduct">切换商品</button>
      <p class="tip">
        💡 传递对象时，子组件可以访问对象的所有属性
      </p>
    </div>

    <!-- Props 验证 -->
    <div class="section">
      <h3>Props 类型验证</h3>
      <StatusBadge status="success" message="操作成功" />
      <StatusBadge status="warning" message="请注意" />
      <StatusBadge status="error" message="发生错误" />
      <p class="tip">
        💡 定义 Props 类型可以在开发时捕获错误，提高代码健壮性
      </p>
    </div>

    <!-- Props 默认值 -->
    <div class="section">
      <h3>默认值和必需项</h3>
      <ButtonComponent />
      <ButtonComponent text="保存" type="primary" />
      <ButtonComponent text="删除" type="danger" :loading="true" />
      <p class="tip">
        💡 可以为 Props 设置默认值和是否必需
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'
import ProductCard from './components/ProductCard.vue'
import StatusBadge from './components/StatusBadge.vue'
import ButtonComponent from './components/ButtonComponent.vue'

const products = [
  { id: 1, name: 'MacBook Pro', price: 12999, stock: 5 },
  { id: 2, name: 'iPhone 15', price: 6999, stock: 10 }
]

const currentProduct = ref(products[0])

const changeProduct = () => {
  const currentIndex = products.findIndex(p => p.id === currentProduct.value.id)
  const nextIndex = (currentIndex + 1) % products.length
  currentProduct.value = products[nextIndex]
}
</script>

<script>
export default {
  name: 'PropsDemo'
}
</script>

<style scoped>
.example-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Avenir', sans-serif;
}

.section {
  background: #f5f5f5;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

h3 {
  color: #42b983;
  margin-bottom: 15px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 5px 0 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #35a372;
}

.tip {
  margin-top: 15px;
  padding: 10px;
  background: #fff3cd;
  border-left: 3px solid #ffc107;
  font-size: 14px;
  color: #856404;
}
</style>
