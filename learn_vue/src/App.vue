<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="nav-logo">Vue 3 学习项目</h1>
        <div class="nav-links">
          <a
            v-for="item in navItems"
            :key="item.id"
            :class="['nav-link', { active: currentView === item.id }]"
            @click="currentView = item.id"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 首页 -->
      <div v-if="currentView === 'home'" class="home">
        <h1>🎉 欢迎来到 Vue 3 学习项目</h1>
        <p class="intro">这是一个系统化的 Vue 3 学习项目，包含从基础到进阶的完整示例</p>

        <div class="learning-path">
          <div class="path-section">
            <h2>📚 学习示例</h2>
            <div class="cards">
              <div
                v-for="example in examples"
                :key="example.id"
                class="card"
                @click="currentView = example.id"
              >
                <h3>{{ example.title }}</h3>
                <p>{{ example.description }}</p>
                <div class="topics">
                  <span v-for="topic in example.topics" :key="topic" class="topic-tag">
                    {{ topic }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="path-section">
            <h2>🚀 实战项目</h2>
            <div class="cards">
              <div class="card project-card" @click="currentView = 'todo'">
                <h3>📝 Todo List</h3>
                <p>完整的任务管理应用，集成所有核心知识点</p>
                <div class="topics">
                  <span class="topic-tag">CRUD</span>
                  <span class="topic-tag">LocalStorage</span>
                  <span class="topic-tag">动画</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="quick-tips">
          <h3>💡 快速提示</h3>
          <ul>
            <li>从"响应式系统"开始，理解 Vue 的核心概念</li>
            <li>每个示例都包含详细的代码注释和说明</li>
            <li>尝试修改代码，观察效果变化</li>
            <li>完成学习后，挑战 Todo List 项目</li>
          </ul>
        </div>
      </div>

      <!-- 响应式系统 -->
      <component
        v-else-if="currentView === 'reactivity'"
        :is="currentComponent"
      />

      <!-- 组件通信 -->
      <component
        v-else-if="currentView === 'components'"
        :is="currentComponent"
      />

      <!-- 生命周期 -->
      <LifecycleDemo v-else-if="currentView === 'lifecycle'" />

      <!-- Composition API -->
      <ComposablesDemo v-else-if="currentView === 'composition'" />

      <!-- Todo 项目 -->
      <TodoApp v-else-if="currentView === 'todo'" />

      <!-- 404 -->
      <div v-else class="not-found">
        <h2>页面未找到</h2>
        <button @click="currentView = 'home'">返回首页</button>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Vue 3 学习项目 | 使用 Composition API 和 script setup</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式系统示例
import RefVsReactive from './examples/01-reactivity/RefVsReactive.vue'
import ComputedDemo from './examples/01-reactivity/ComputedDemo.vue'
import WatchDemo from './examples/01-reactivity/WatchDemo.vue'

// 组件通信示例
import PropsDemo from './examples/02-components/PropsDemo.vue'
import EmitsDemo from './examples/02-components/EmitsDemo.vue'

// 生命周期
import LifecycleDemo from './examples/03-lifecycle/LifecycleDemo.vue'

// Composition API
import ComposablesDemo from './examples/04-composition/ComposablesDemo.vue'

// 实战项目
import TodoApp from './projects/todo-app/TodoApp.vue'

// 当前视图
const currentView = ref('home')

// 当前子视图（用于有多个示例的类别）
const currentSubView = ref({
  reactivity: 'ref',
  components: 'props'
})

// 导航项
const navItems = [
  { id: 'home', label: '首页' },
  { id: 'reactivity', label: '响应式系统' },
  { id: 'components', label: '组件通信' },
  { id: 'lifecycle', label: '生命周期' },
  { id: 'composition', label: 'Composition API' },
  { id: 'todo', label: 'Todo 项目' }
]

// 示例数据
const examples = [
  {
    id: 'reactivity',
    title: '响应式系统',
    description: '理解 Vue 3 响应式系统的核心概念',
    topics: ['ref', 'reactive', 'computed', 'watch']
  },
  {
    id: 'components',
    title: '组件通信',
    description: '掌握父子组件之间的数据传递',
    topics: ['props', 'emits', 'v-model']
  },
  {
    id: 'lifecycle',
    title: '生命周期',
    description: '了解组件生命周期钩子的使用',
    topics: ['onMounted', 'onUpdated', 'onUnmounted']
  },
  {
    id: 'composition',
    title: 'Composition API',
    description: '学习创建可复用的组合式函数',
    topics: ['composables', '逻辑复用', '最佳实践']
  }
]

// 动态组件
const currentComponent = computed(() => {
  if (currentView.value === 'reactivity') {
    const views = {
      ref: RefVsReactive,
      computed: ComputedDemo,
      watch: WatchDemo
    }
    return views[currentSubView.value.reactivity] || RefVsReactive
  }

  if (currentView.value === 'components') {
    const views = {
      props: PropsDemo,
      emits: EmitsDemo
    }
    return views[currentSubView.value.components] || PropsDemo
  }

  return null
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏 */
.navbar {
  background: #42b983;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 5px;
}

.nav-link {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
}

.nav-link.active {
  background: rgba(255,255,255,0.2);
}

/* 主内容 */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
}

/* 首页 */
.home {
  text-align: center;
}

.home h1 {
  font-size: 42px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.intro {
  font-size: 18px;
  color: #666;
  margin-bottom: 50px;
}

.learning-path {
  text-align: left;
  margin-top: 40px;
}

.path-section {
  margin-bottom: 40px;
}

.path-section h2 {
  color: #42b983;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
  border-left: 4px solid #42b983;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-tag {
  background: #e7f3ff;
  color: #2196f3;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.project-card {
  border-left-color: #e74c3c;
}

.quick-tips {
  background: #fff3cd;
  padding: 25px;
  border-radius: 8px;
  margin-top: 50px;
  text-align: left;
  border-left: 4px solid #ffc107;
}

.quick-tips h3 {
  color: #856404;
  margin-bottom: 15px;
}

.quick-tips ul {
  list-style: none;
  padding-left: 0;
}

.quick-tips li {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
  color: #856404;
}

.quick-tips li::before {
  content: "→";
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* 404 */
.not-found {
  text-align: center;
  padding: 100px 20px;
}

.not-found button {
  margin-top: 20px;
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

/* 页脚 */
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

.footer p {
  font-size: 14px;
}
</style>
