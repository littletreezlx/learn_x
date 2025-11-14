<template>
  <div class="color-picker">
    <button
      v-for="color in colors"
      :key="color"
      :style="{ background: color }"
      @click="selectColor(color)"
      class="color-button"
    />
  </div>
</template>

<script setup>
// 带验证的事件定义
const emit = defineEmits({
  'color-change': (color) => {
    // 验证颜色格式是否正确
    if (typeof color !== 'string') {
      console.warn('颜色值必须是字符串')
      return false
    }
    if (!color.startsWith('#')) {
      console.warn('颜色值必须以 # 开头')
      return false
    }
    return true
  }
})

const colors = [
  '#42b983',
  '#3498db',
  '#e74c3c',
  '#f39c12',
  '#9b59b6',
  '#1abc9c'
]

const selectColor = (color) => {
  emit('color-change', color)
}
</script>

<style scoped>
.color-picker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-button {
  width: 50px;
  height: 50px;
  border: 3px solid white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.color-button:hover {
  transform: scale(1.1);
}
</style>
