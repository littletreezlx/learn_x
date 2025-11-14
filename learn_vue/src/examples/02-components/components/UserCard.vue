<template>
  <div class="user-card">
    <div class="user-avatar">{{ username.charAt(0).toUpperCase() }}</div>
    <div class="user-info">
      <h4>{{ username }}</h4>
      <p>年龄: {{ age }}</p>
      <p>角色: {{ role }}</p>
      <span :class="['status', isActive ? 'active' : 'inactive']">
        {{ isActive ? '在线' : '离线' }}
      </span>
    </div>
  </div>
</template>

<script setup>
// 定义 Props
defineProps({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: '普通用户'
  }
})
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-avatar {
  width: 60px;
  height: 60px;
  background: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.user-info h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.user-info p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  margin-top: 8px;
}

.status.active {
  background: #d4edda;
  color: #155724;
}

.status.inactive {
  background: #f8d7da;
  color: #721c24;
}
</style>
