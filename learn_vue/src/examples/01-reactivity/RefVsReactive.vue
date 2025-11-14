<template>
  <div class="example-container">
    <h2>响应式系统：ref vs reactive</h2>

    <!-- ref 示例 -->
    <div class="section">
      <h3>ref 示例（基本类型）</h3>
      <p>计数器: {{ count }}</p>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <p class="tip">💡 ref 适用于基本类型（number, string, boolean）</p>
    </div>

    <!-- reactive 示例 -->
    <div class="section">
      <h3>reactive 示例（对象类型）</h3>
      <p>用户名: {{ user.name }}</p>
      <p>年龄: {{ user.age }}</p>
      <button @click="updateUser">更新用户</button>
      <p class="tip">💡 reactive 适用于对象和数组</p>
    </div>

    <!-- ref 包装对象 -->
    <div class="section">
      <h3>ref 也可以包装对象</h3>
      <p>商品: {{ product.name }}</p>
      <p>价格: ¥{{ product.price }}</p>
      <button @click="updateProduct">更新商品</button>
      <p class="tip">💡 ref 可以包装任何类型，访问时需要 .value</p>
    </div>

    <!-- 对比总结 -->
    <div class="summary">
      <h3>核心区别</h3>
      <ul>
        <li><strong>ref</strong>: 返回响应式引用对象，访问/修改需要 .value（模板中自动解包）</li>
        <li><strong>reactive</strong>: 返回对象的响应式代理，直接访问属性</li>
        <li><strong>选择建议</strong>: 基本类型用 ref，对象/数组可以用 reactive 或 ref</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// ref：适合基本类型
const count = ref(0)

const increment = () => {
  count.value++ // 注意：需要 .value
}

const decrement = () => {
  count.value--
}

// reactive：适合对象类型
const user = reactive({
  name: 'Alice',
  age: 25
})

const updateUser = () => {
  user.name = 'Bob' // 直接修改属性
  user.age = 30
}

// ref 也可以包装对象
const product = ref({
  name: 'iPhone',
  price: 6999
})

const updateProduct = () => {
  // 修改对象属性时需要通过 .value
  product.value.name = 'MacBook'
  product.value.price = 12999
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
  margin-right: 10px;
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

.summary {
  background: #e7f3ff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.summary ul {
  list-style: none;
  padding-left: 0;
}

.summary li {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
}

.summary li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #2196f3;
  font-weight: bold;
}
</style>
