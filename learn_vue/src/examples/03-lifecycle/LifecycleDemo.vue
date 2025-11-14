<template>
  <div class="example-container">
    <h2>生命周期钩子</h2>

    <!-- 生命周期日志 -->
    <div class="section">
      <h3>生命周期执行顺序</h3>
      <div class="lifecycle-log">
        <div v-for="(log, index) in lifecycleLogs" :key="index" class="log-item">
          <span class="timestamp">{{ log.time }}</span>
          <span :class="['hook-name', log.hook]">{{ log.hook }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>
      <p class="tip">
        💡 观察生命周期钩子的执行顺序和时机
      </p>
    </div>

    <!-- onMounted 示例 -->
    <div class="section">
      <h3>onMounted：数据获取</h3>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="userData" class="user-data">
        <p><strong>用户ID:</strong> {{ userData.id }}</p>
        <p><strong>名称:</strong> {{ userData.name }}</p>
        <p><strong>邮箱:</strong> {{ userData.email }}</p>
      </div>
      <button @click="refetchData">重新获取</button>
      <p class="tip">
        💡 onMounted 适合执行 DOM 操作、数据获取、第三方库初始化
      </p>
    </div>

    <!-- onUpdated 示例 -->
    <div class="section">
      <h3>onUpdated：响应数据变化</h3>
      <input v-model="updateText" placeholder="输入文本观察更新">
      <p>更新次数: {{ updateCount }}</p>
      <p class="tip">
        💡 onUpdated 在组件 DOM 更新后调用，但要避免在其中修改状态（可能导致无限循环）
      </p>
    </div>

    <!-- onUnmounted 示例 -->
    <div class="section">
      <h3>onUnmounted：清理副作用</h3>
      <button @click="showTimer = !showTimer">
        {{ showTimer ? '隐藏' : '显示' }} 定时器组件
      </button>
      <TimerComponent v-if="showTimer" />
      <p class="tip">
        💡 onUnmounted 用于清理定时器、取消订阅、移除事件监听等
      </p>
    </div>

    <!-- 完整生命周期图示 -->
    <div class="summary">
      <h3>Vue 3 生命周期钩子</h3>
      <div class="lifecycle-chart">
        <div class="phase">
          <h4>创建阶段</h4>
          <div class="hook">setup() - 组件创建前</div>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <h4>挂载阶段</h4>
          <div class="hook">onBeforeMount - 挂载前</div>
          <div class="arrow">↓</div>
          <div class="hook highlight">onMounted - 挂载完成 ⭐</div>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <h4>更新阶段</h4>
          <div class="hook">onBeforeUpdate - 更新前</div>
          <div class="arrow">↓</div>
          <div class="hook">onUpdated - 更新完成</div>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <h4>卸载阶段</h4>
          <div class="hook">onBeforeUnmount - 卸载前</div>
          <div class="arrow">↓</div>
          <div class="hook highlight">onUnmounted - 卸载完成 ⭐</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import TimerComponent from './components/TimerComponent.vue'

// 生命周期日志
const lifecycleLogs = ref([])

const addLog = (hook, message) => {
  lifecycleLogs.value.push({
    time: new Date().toLocaleTimeString(),
    hook,
    message
  })
}

// 生命周期钩子
onBeforeMount(() => {
  addLog('onBeforeMount', '组件即将挂载到 DOM')
})

onMounted(() => {
  addLog('onMounted', '组件已挂载，可以访问 DOM 和执行异步操作')
  fetchUserData()
})

onBeforeUpdate(() => {
  addLog('onBeforeUpdate', '组件即将因为响应式数据变化而更新')
})

onUpdated(() => {
  addLog('onUpdated', 'DOM 已更新完成')
})

onBeforeUnmount(() => {
  addLog('onBeforeUnmount', '组件即将卸载')
})

onUnmounted(() => {
  console.log('组件已卸载，清理工作完成')
})

// onMounted 数据获取示例
const loading = ref(false)
const userData = ref(null)

const fetchUserData = async () => {
  loading.value = true
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  userData.value = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  }
  loading.value = false
}

const refetchData = () => {
  userData.value = null
  fetchUserData()
}

// onUpdated 示例
const updateText = ref('')
const updateCount = ref(0)

onUpdated(() => {
  updateCount.value++
})

// onUnmounted 示例
const showTimer = ref(true)
</script>

<style scoped>
.example-container {
  max-width: 900px;
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

.lifecycle-log {
  max-height: 300px;
  overflow-y: auto;
  background: white;
  padding: 15px;
  border-radius: 4px;
}

.log-item {
  display: flex;
  gap: 10px;
  padding: 8px;
  margin: 5px 0;
  background: #f8f9fa;
  border-left: 3px solid #2196f3;
  border-radius: 3px;
  font-size: 13px;
  align-items: center;
}

.timestamp {
  color: #666;
  font-size: 12px;
}

.hook-name {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.hook-name.onBeforeMount { background: #e3f2fd; color: #1976d2; }
.hook-name.onMounted { background: #c8e6c9; color: #388e3c; }
.hook-name.onBeforeUpdate { background: #fff3e0; color: #f57c00; }
.hook-name.onUpdated { background: #ffe0b2; color: #e65100; }
.hook-name.onBeforeUnmount { background: #fce4ec; color: #c2185b; }

.message {
  color: #333;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

button:hover {
  background: #35a372;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}

.user-data {
  padding: 15px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
}

.user-data p {
  margin: 8px 0;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
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

.lifecycle-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.phase {
  background: white;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.phase h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  text-align: center;
}

.hook {
  background: #f8f9fa;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  text-align: center;
  border-left: 3px solid #42b983;
}

.hook.highlight {
  background: #c8e6c9;
  font-weight: bold;
  border-left-color: #2e7d32;
}

.arrow {
  font-size: 24px;
  color: #42b983;
  font-weight: bold;
}
</style>
