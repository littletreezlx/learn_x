<template>
  <div :class="['badge', `badge-${status}`]">
    <span class="icon">{{ icon }}</span>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    // 限制只能传入特定值
    validator: (value) => {
      return ['success', 'warning', 'error', 'info'].includes(value)
    }
  },
  message: {
    type: String,
    default: ''
  }
})

const icon = computed(() => {
  const icons = {
    success: '✓',
    warning: '!',
    error: '✗',
    info: 'i'
  }
  return icons[props.status] || ''
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 4px;
  margin: 5px;
  font-size: 14px;
}

.icon {
  font-weight: bold;
  font-size: 16px;
}

.badge-success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.badge-warning {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.badge-error {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.badge-info {
  background: #d1ecf1;
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}
</style>
