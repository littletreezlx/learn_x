<template>
  <div class="example-container">
    <h2>Composition API：组合式函数（Composables）</h2>

    <!-- useCounter 示例 -->
    <div class="section">
      <h3>useCounter - 可复用的计数器逻辑</h3>
      <div class="counter-display">
        <p>计数: {{ count }}</p>
        <div class="button-group">
          <button @click="increment">+</button>
          <button @click="decrement">-</button>
          <button @click="reset">重置</button>
        </div>
      </div>
      <p class="tip">
        💡 将通用逻辑提取为组合式函数,可在多个组件中复用
      </p>
    </div>

    <!-- useMouse 示例 -->
    <div class="section">
      <h3>useMouse - 鼠标位置追踪</h3>
      <div class="mouse-tracker">
        <p>鼠标位置: X = {{ x }}, Y = {{ y }}</p>
        <div class="pointer" :style="{ left: x + 'px', top: y + 'px' }"></div>
      </div>
      <p class="tip">
        💡 组合式函数可以包含响应式状态和生命周期钩子
      </p>
    </div>

    <!-- useFetch 示例 -->
    <div class="section">
      <h3>useFetch - 数据获取封装</h3>
      <button @click="refetch">重新获取数据</button>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">错误: {{ error }}</div>
      <div v-else-if="data" class="data-display">
        <h4>用户信息:</h4>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
      <p class="tip">
        💡 封装异步逻辑,自动处理加载状态和错误
      </p>
    </div>

    <!-- useLocalStorage 示例 -->
    <div class="section">
      <h3>useLocalStorage - 本地存储同步</h3>
      <input v-model="name" placeholder="输入你的名字">
      <p>保存的名字: {{ name }}</p>
      <button @click="name = ''">清空</button>
      <p class="tip">
        💡 响应式数据自动与 localStorage 同步
      </p>
    </div>

    <!-- 组合多个 Composables -->
    <div class="section">
      <h3>组合多个 Composables</h3>
      <div class="combined-demo">
        <p>鼠标点击次数: {{ clickCount }}</p>
        <p>最后点击位置: ({{ lastClickX }}, {{ lastClickY }})</p>
        <button @click="handleClick">点击我</button>
      </div>
      <p class="tip">
        💡 可以在一个组件中组合使用多个 composables
      </p>
    </div>

    <!-- Composables 最佳实践 -->
    <div class="summary">
      <h3>Composables 最佳实践</h3>
      <ul>
        <li><strong>命名规范</strong>: 使用 use 前缀,如 useCounter, useMouse</li>
        <li><strong>返回值</strong>: 返回 ref 对象,保持响应性</li>
        <li><strong>参数设计</strong>: 接受 ref 或普通值作为参数</li>
        <li><strong>副作用清理</strong>: 使用 onUnmounted 清理副作用</li>
        <li><strong>可组合性</strong>: composables 可以相互调用</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useCounter from './composables/useCounter'
import useMouse from './composables/useMouse'
import useFetch from './composables/useFetch'
import useLocalStorage from './composables/useLocalStorage'

// 使用 useCounter
const { count, increment, decrement, reset } = useCounter(0)

// 使用 useMouse
const { x, y } = useMouse()

// 使用 useFetch
const { data, loading, error, refetch } = useFetch('/api/user')

// 使用 useLocalStorage
const name = useLocalStorage('username', '')

// 组合多个 composables
const clickCount = ref(0)
const lastClickX = ref(0)
const lastClickY = ref(0)

const handleClick = () => {
  clickCount.value++
  lastClickX.value = x.value
  lastClickY.value = y.value
}
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

.counter-display {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.counter-display p {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #35a372;
}

.mouse-tracker {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  height: 200px;
}

.pointer {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #e74c3c;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.1s;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}

.error {
  padding: 20px;
  background: #fee;
  color: #c33;
  border-radius: 4px;
}

.data-display {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.data-display pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}

.combined-demo {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.combined-demo p {
  margin: 10px 0;
  font-size: 16px;
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
