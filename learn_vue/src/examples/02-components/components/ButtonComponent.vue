<template>
  <button :class="['btn', `btn-${type}`]" :disabled="loading">
    <span v-if="loading" class="spinner">⟳</span>
    {{ loading ? '加载中...' : text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '按钮' // 默认值
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'primary', 'danger'].includes(value)
    }
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  margin: 5px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-default {
  background: #f5f5f5;
  color: #333;
}

.btn-default:hover:not(:disabled) {
  background: #e0e0e0;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #35a372;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c0392b;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-right: 5px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
