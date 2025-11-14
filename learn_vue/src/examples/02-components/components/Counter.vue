<template>
  <div class="counter">
    <button @click="handleIncrement">+1</button>
    <button @click="handleIncrementBy5">+5</button>
    <button @click="handleDecrement">-1</button>
    <button @click="handleDecrementBy5">-5</button>
  </div>
</template>

<script setup>
// 定义要发射的事件
const emit = defineEmits(['increment', 'decrement'])

const handleIncrement = () => {
  emit('increment', 1) // 发射事件并传递参数
}

const handleIncrementBy5 = () => {
  emit('increment', 5)
}

const handleDecrement = () => {
  emit('decrement', 1)
}

const handleDecrementBy5 = () => {
  emit('decrement', 5)
}
</script>

<style scoped>
.counter {
  display: flex;
  gap: 10px;
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
</style>
