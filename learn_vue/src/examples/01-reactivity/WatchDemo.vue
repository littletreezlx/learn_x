<template>
  <div class="example-container">
    <h2>侦听器：watch & watchEffect</h2>

    <!-- watch 基础用法 -->
    <div class="section">
      <h3>watch：侦听单个数据源</h3>
      <input v-model="username" placeholder="输入用户名">
      <p v-if="usernameValidation.message" :class="usernameValidation.class">
        {{ usernameValidation.message }}
      </p>
      <p class="tip">
        💡 watch 可以访问新值和旧值，适合需要执行异步操作或较复杂逻辑的场景
      </p>
    </div>

    <!-- watch 多个数据源 -->
    <div class="section">
      <h3>watch：侦听多个数据源</h3>
      <div class="form-group">
        <label>邮箱: <input v-model="email"></label>
        <label>密码: <input v-model="password" type="password"></label>
      </div>
      <button @click="submitForm" :disabled="!formValid">提交</button>
      <p v-if="formMessage" class="info">{{ formMessage }}</p>
      <p class="tip">
        💡 watch 可以同时侦听多个数据源，使用数组形式
      </p>
    </div>

    <!-- watch 深度侦听 -->
    <div class="section">
      <h3>watch：深度侦听对象</h3>
      <div class="user-editor">
        <input v-model="userProfile.name" placeholder="姓名">
        <input v-model="userProfile.email" placeholder="邮箱">
        <input v-model.number="userProfile.age" type="number" placeholder="年龄">
      </div>
      <div class="changes-log">
        <h4>修改历史:</h4>
        <div v-for="(change, index) in changeHistory" :key="index" class="change-item">
          {{ change }}
        </div>
      </div>
      <p class="tip">
        💡 使用 { deep: true } 可以侦听对象内部属性的变化
      </p>
    </div>

    <!-- watchEffect -->
    <div class="section">
      <h3>watchEffect：自动追踪依赖</h3>
      <div class="filter-demo">
        <input v-model="minPrice" type="number" placeholder="最低价格">
        <input v-model="maxPrice" type="number" placeholder="最高价格">
        <p class="highlight">符合条件的商品数: {{ filteredCount }}</p>
      </div>
      <p class="tip">
        💡 watchEffect 会自动追踪函数中使用的响应式数据，无需显式指定依赖
      </p>
    </div>

    <!-- watch vs watchEffect 对比 -->
    <div class="summary">
      <h3>watch vs watchEffect</h3>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>watch</th>
            <th>watchEffect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>依赖追踪</td>
            <td>需要显式指定</td>
            <td>自动追踪</td>
          </tr>
          <tr>
            <td>访问旧值</td>
            <td>可以</td>
            <td>不可以</td>
          </tr>
          <tr>
            <td>执行时机</td>
            <td>默认懒执行</td>
            <td>立即执行</td>
          </tr>
          <tr>
            <td>使用场景</td>
            <td>需要新旧值对比、异步操作</td>
            <td>副作用、自动同步</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from 'vue'

// watch 基础用法：侦听单个数据源
const username = ref('')
const usernameValidation = reactive({
  message: '',
  class: ''
})

watch(username, (newVal, oldVal) => {
  console.log(`用户名从 "${oldVal}" 变为 "${newVal}"`)

  if (newVal.length === 0) {
    usernameValidation.message = ''
    usernameValidation.class = ''
  } else if (newVal.length < 3) {
    usernameValidation.message = '❌ 用户名至少需要3个字符'
    usernameValidation.class = 'error'
  } else if (newVal.length > 20) {
    usernameValidation.message = '❌ 用户名不能超过20个字符'
    usernameValidation.class = 'error'
  } else {
    usernameValidation.message = '✓ 用户名格式正确'
    usernameValidation.class = 'success'
  }
})

// watch 多个数据源
const email = ref('')
const password = ref('')
const formValid = ref(false)
const formMessage = ref('')

watch([email, password], ([newEmail, newPassword]) => {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
  const passwordValid = newPassword.length >= 6

  formValid.value = emailValid && passwordValid

  if (!emailValid && newEmail.length > 0) {
    formMessage.value = '邮箱格式不正确'
  } else if (!passwordValid && newPassword.length > 0) {
    formMessage.value = '密码至少需要6个字符'
  } else if (formValid.value) {
    formMessage.value = '表单验证通过 ✓'
  } else {
    formMessage.value = ''
  }
})

const submitForm = () => {
  alert(`提交表单: ${email.value}`)
}

// watch 深度侦听
const userProfile = reactive({
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
})

const changeHistory = ref([])

watch(
  userProfile,
  () => {
    const timestamp = new Date().toLocaleTimeString()
    changeHistory.value.unshift(
      `${timestamp} - 用户资料已更新`
    )

    // 限制历史记录数量
    if (changeHistory.value.length > 5) {
      changeHistory.value.pop()
    }
  },
  { deep: true } // 深度侦听
)

// watchEffect 示例
const minPrice = ref(0)
const maxPrice = ref(1000)
const filteredCount = ref(0)

const products = ref([
  { id: 1, name: '商品A', price: 100 },
  { id: 2, name: '商品B', price: 200 },
  { id: 3, name: '商品C', price: 500 },
  { id: 4, name: '商品D', price: 800 }
])

// watchEffect 会自动追踪 minPrice 和 maxPrice
watchEffect(() => {
  filteredCount.value = products.value.filter(p =>
    p.price >= minPrice.value && p.price <= maxPrice.value
  ).length

  console.log(`价格区间 ${minPrice.value}-${maxPrice.value}，找到 ${filteredCount.value} 个商品`)
})
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

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #35a372;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
}

.success {
  color: #27ae60;
  margin-top: 10px;
}

.info {
  color: #3498db;
  margin-top: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.changes-log {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
}

.change-item {
  padding: 8px;
  margin: 5px 0;
  background: #e8f5e9;
  border-left: 3px solid #4caf50;
  font-size: 13px;
}

.filter-demo {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-demo input {
  flex: 1;
}

.highlight {
  color: #e74c3c;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #2196f3;
  color: white;
  font-weight: bold;
}

tr:hover {
  background: #f5f5f5;
}
</style>
