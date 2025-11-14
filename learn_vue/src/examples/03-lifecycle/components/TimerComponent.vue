<template>
  <div class="timer">
    <h4>定时器组件</h4>
    <p class="time">{{ elapsedTime }} 秒</p>
    <p class="status">定时器正在运行...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const elapsedTime = ref(0)
let timer = null

onMounted(() => {
  console.log('定时器组件挂载，启动定时器')
  timer = setInterval(() => {
    elapsedTime.value++
  }, 1000)
})

onUnmounted(() => {
  console.log('定时器组件卸载，清理定时器')
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
.timer {
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
  border: 2px solid #42b983;
}

.timer h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.time {
  font-size: 36px;
  font-weight: bold;
  color: #42b983;
  margin: 15px 0;
}

.status {
  color: #666;
  font-size: 14px;
  font-style: italic;
}
</style>
