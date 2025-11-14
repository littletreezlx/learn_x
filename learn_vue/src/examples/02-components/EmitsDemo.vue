<template>
  <div class="example-container">
    <h2>组件通信：Emits（子 → 父）</h2>

    <!-- 基础事件发射 -->
    <div class="section">
      <h3>基础用法：子组件触发父组件事件</h3>
      <p>计数器值: {{ counter }}</p>
      <Counter @increment="handleIncrement" @decrement="handleDecrement" />
      <p class="tip">
        💡 子组件使用 $emit 触发事件,父组件使用 @ 监听
      </p>
    </div>

    <!-- 传递参数 -->
    <div class="section">
      <h3>传递事件参数</h3>
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id" class="message">
          {{ msg.text }} - {{ msg.timestamp }}
        </div>
      </div>
      <MessageInput @send="handleSendMessage" />
      <p class="tip">
        💡 emit 可以传递多个参数给父组件
      </p>
    </div>

    <!-- 事件验证 -->
    <div class="section">
      <h3>事件验证</h3>
      <ColorPicker @color-change="handleColorChange" />
      <div class="color-preview" :style="{ background: selectedColor }">
        当前颜色: {{ selectedColor }}
      </div>
      <p class="tip">
        💡 可以对 emit 的参数进行验证，提高代码健壮性
      </p>
    </div>

    <!-- v-model 双向绑定 -->
    <div class="section">
      <h3>v-model 双向绑定（基于 emit）</h3>
      <p>输入的文本: {{ text }}</p>
      <CustomInput v-model="text" placeholder="输入一些文本..." />
      <p class="tip">
        💡 v-model 实际上是 :value 和 @input 的语法糖
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Counter from './components/Counter.vue'
import MessageInput from './components/MessageInput.vue'
import ColorPicker from './components/ColorPicker.vue'
import CustomInput from './components/CustomInput.vue'

// 计数器
const counter = ref(0)

const handleIncrement = (amount) => {
  counter.value += amount
}

const handleDecrement = (amount) => {
  counter.value -= amount
}

// 消息列表
const messages = ref([])
let messageId = 0

const handleSendMessage = (text) => {
  messages.value.push({
    id: messageId++,
    text,
    timestamp: new Date().toLocaleTimeString()
  })
}

// 颜色选择
const selectedColor = ref('#42b983')

const handleColorChange = (color) => {
  selectedColor.value = color
  console.log('颜色已更改:', color)
}

// v-model
const text = ref('')
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

.messages {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 4px;
}

.message {
  padding: 10px;
  margin: 5px 0;
  background: #e3f2fd;
  border-left: 3px solid #2196f3;
  border-radius: 4px;
  font-size: 14px;
}

.color-preview {
  width: 100%;
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  margin-top: 15px;
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
