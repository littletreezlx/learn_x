<template>
  <div class="example-container">
    <h2>计算属性：computed</h2>

    <!-- 购物车示例 -->
    <div class="section">
      <h3>购物车价格计算</h3>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>单价: ¥{{ item.price }}</span>
        <input
          type="number"
          v-model.number="item.quantity"
          min="0"
          style="width: 60px; margin: 0 10px;"
        >
        <span>小计: ¥{{ item.price * item.quantity }}</span>
      </div>

      <div class="total">
        <p><strong>商品总价:</strong> ¥{{ totalPrice }}</p>
        <p><strong>优惠折扣:</strong> {{ discount }}%</p>
        <p class="highlight"><strong>最终价格:</strong> ¥{{ finalPrice }}</p>
      </div>

      <p class="tip">
        💡 computed 会自动追踪依赖，当 cart 或 discount 变化时自动重新计算
      </p>
    </div>

    <!-- 搜索过滤示例 -->
    <div class="section">
      <h3>列表搜索过滤</h3>
      <input
        v-model="searchQuery"
        placeholder="搜索用户名..."
        class="search-input"
      >

      <div class="user-list">
        <div v-for="user in filteredUsers" :key="user.id" class="user-card">
          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </div>
      </div>

      <p class="info">
        显示 {{ filteredUsers.length }} / {{ users.length }} 个用户
      </p>

      <p class="tip">
        💡 computed vs methods: computed 有缓存，只在依赖变化时重新计算
      </p>
    </div>

    <!-- 可写计算属性 -->
    <div class="section">
      <h3>可写计算属性（高级用法）</h3>
      <p>姓: <input v-model="firstName"></p>
      <p>名: <input v-model="lastName"></p>
      <p class="highlight">全名: <input v-model="fullName"></p>

      <p class="tip">
        💡 计算属性可以定义 getter 和 setter，实现双向绑定
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 购物车数据
const cart = ref([
  { id: 1, name: 'Vue 3 书籍', price: 89, quantity: 1 },
  { id: 2, name: 'TypeScript 教程', price: 79, quantity: 2 },
  { id: 3, name: '编程键盘', price: 299, quantity: 1 }
])

const discount = ref(10) // 10% 折扣

// 计算总价
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

// 计算最终价格（应用折扣）
const finalPrice = computed(() => {
  return (totalPrice.value * (100 - discount.value) / 100).toFixed(2)
})

// 搜索过滤示例
const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 4, name: 'David', email: 'david@example.com' },
  { id: 5, name: 'Eva', email: 'eva@example.com' }
])

const searchQuery = ref('')

// 过滤用户列表
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return users.value

  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

// 可写计算属性
const firstName = ref('Zhang')
const lastName = ref('San')

const fullName = computed({
  // getter
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  // setter
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0] || ''
    lastName.value = names[1] || ''
  }
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

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  margin: 10px 0;
  border-radius: 4px;
}

.total {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 4px;
}

.highlight {
  color: #e74c3c;
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

.user-list {
  max-height: 300px;
  overflow-y: auto;
}

.user-card {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  margin: 8px 0;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}

.info {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.tip {
  margin-top: 15px;
  padding: 10px;
  background: #fff3cd;
  border-left: 3px solid #ffc107;
  font-size: 14px;
  color: #856404;
}

input[type="text"], input[type="number"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
