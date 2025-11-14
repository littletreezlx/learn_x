<template>
  <input
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="custom-input"
  >
</template>

<script setup>
// v-model 的本质：接收 modelValue prop 和发射 update:modelValue 事件
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.custom-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #42b983;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.custom-input:focus {
  border-color: #35a372;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}
</style>
