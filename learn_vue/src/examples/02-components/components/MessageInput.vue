<template>
  <div class="message-input">
    <input
      v-model="inputText"
      @keyup.enter="sendMessage"
      placeholder="输入消息..."
      class="input"
    >
    <button @click="sendMessage" :disabled="!inputText.trim()">发送</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send'])

const inputText = ref('')

const sendMessage = () => {
  if (inputText.value.trim()) {
    emit('send', inputText.value)
    inputText.value = '' // 清空输入框
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  gap: 10px;
}

.input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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

button:hover:not(:disabled) {
  background: #35a372;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
