<template>
  <div class="todo-app">
    <header class="app-header">
      <h1>📝 Todo List</h1>
      <p class="subtitle">一个完整的 Vue 3 实战项目</p>
    </header>

    <!-- 添加任务 -->
    <div class="add-todo">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="添加新任务..."
        class="todo-input"
      >
      <button @click="addTodo" class="btn-add">添加</button>
    </div>

    <!-- 过滤器 -->
    <div class="filters">
      <button
        v-for="filterOption in filters"
        :key="filterOption.value"
        :class="['filter-btn', { active: filter === filterOption.value }]"
        @click="filter = filterOption.value"
      >
        {{ filterOption.label }}
      </button>
    </div>

    <!-- 统计信息 -->
    <div class="stats">
      <span>总计: {{ totalCount }}</span>
      <span>已完成: {{ completedCount }}</span>
      <span>未完成: {{ activeCount }}</span>
    </div>

    <!-- 任务列表 -->
    <TransitionGroup name="list" tag="ul" class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="['todo-item', { completed: todo.completed }]"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          class="todo-checkbox"
        >
        <span
          v-if="!todo.editing"
          class="todo-text"
          @dblclick="startEdit(todo)"
        >
          {{ todo.text }}
        </span>
        <input
          v-else
          v-model="todo.text"
          @blur="finishEdit(todo)"
          @keyup.enter="finishEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
          class="todo-edit-input"
          ref="editInput"
        >
        <div class="todo-actions">
          <button @click="deleteTodo(todo.id)" class="btn-delete">删除</button>
        </div>
      </li>
    </TransitionGroup>

    <!-- 空状态 -->
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <p>{{ emptyMessage }}</p>
    </div>

    <!-- 批量操作 -->
    <div v-if="todos.length > 0" class="bulk-actions">
      <button @click="toggleAll" class="btn-secondary">
        {{ allCompleted ? '全部取消完成' : '全部标记完成' }}
      </button>
      <button @click="clearCompleted" class="btn-secondary">
        清除已完成
      </button>
    </div>

    <!-- 技术要点说明 -->
    <div class="tech-notes">
      <h3>💡 本项目使用的技术</h3>
      <ul>
        <li>✅ Composition API (setup script)</li>
        <li>✅ 响应式系统 (ref, computed)</li>
        <li>✅ 本地存储 (localStorage)</li>
        <li>✅ 列表渲染和条件渲染</li>
        <li>✅ 事件处理和表单绑定</li>
        <li>✅ CSS 过渡动画 (TransitionGroup)</li>
        <li>✅ 组件通信 (props & emits)</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// 任务数据
const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')
const editInput = ref(null)

// 过滤选项
const filters = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'active' },
  { label: '已完成', value: 'completed' }
]

// 从 localStorage 加载数据
const loadTodos = () => {
  try {
    const saved = localStorage.getItem('vue-todos')
    if (saved) {
      todos.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('加载任务失败:', error)
  }
}

// 保存到 localStorage
const saveTodos = () => {
  try {
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  } catch (error) {
    console.error('保存任务失败:', error)
  }
}

// 监听 todos 变化，自动保存
watch(todos, saveTodos, { deep: true })

// 添加任务
const addTodo = () => {
  const text = newTodoText.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
    editing: false,
    originalText: ''
  })

  newTodoText.value = ''
}

// 删除任务
const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

// 开始编辑
const startEdit = (todo) => {
  todo.originalText = todo.text
  todo.editing = true
  nextTick(() => {
    // 聚焦到编辑输入框
    if (editInput.value && editInput.value[0]) {
      editInput.value[0].focus()
    }
  })
}

// 完成编辑
const finishEdit = (todo) => {
  const text = todo.text.trim()
  if (!text) {
    deleteTodo(todo.id)
  } else {
    todo.editing = false
  }
}

// 取消编辑
const cancelEdit = (todo) => {
  todo.text = todo.originalText
  todo.editing = false
}

// 全部标记完成/取消
const toggleAll = () => {
  const newState = !allCompleted.value
  todos.value.forEach(todo => {
    todo.completed = newState
  })
}

// 清除已完成
const clearCompleted = () => {
  todos.value = todos.value.filter(todo => !todo.completed)
}

// 计算属性
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const totalCount = computed(() => todos.value.length)
const activeCount = computed(() => todos.value.filter(t => !t.completed).length)
const completedCount = computed(() => todos.value.filter(t => t.completed).length)
const allCompleted = computed(() => totalCount.value > 0 && activeCount.value === 0)

const emptyMessage = computed(() => {
  if (totalCount.value === 0) {
    return '还没有任务，快来添加一个吧！'
  }
  if (filter.value === 'active') {
    return '没有未完成的任务'
  }
  if (filter.value === 'completed') {
    return '还没有完成的任务'
  }
  return '没有任务'
})

// 初始加载
loadTodos()
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  font-family: 'Avenir', sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.subtitle {
  color: #666;
  font-size: 14px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.todo-input:focus {
  border-color: #42b983;
}

.btn-add {
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.btn-add:hover {
  background: #35a372;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-btn {
  flex: 1;
  padding: 10px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #42b983;
}

.filter-btn.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: white;
  border: 2px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  border-color: #42b983;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #2c3e50;
  cursor: pointer;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-edit-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #42b983;
  border-radius: 4px;
  font-size: 16px;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.btn-delete {
  padding: 6px 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete:hover {
  background: #c0392b;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-style: italic;
}

.bulk-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-secondary {
  flex: 1;
  padding: 10px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
}

.btn-secondary:hover {
  border-color: #42b983;
  color: #42b983;
}

.tech-notes {
  margin-top: 40px;
  padding: 20px;
  background: #e7f3ff;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.tech-notes h3 {
  margin-top: 0;
  color: #2c3e50;
}

.tech-notes ul {
  list-style: none;
  padding-left: 0;
}

.tech-notes li {
  margin: 8px 0;
  font-size: 14px;
  color: #555;
}

/* 列表过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
