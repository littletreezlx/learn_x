# Vue 3 快速开始

> **30分钟上手 Vue 3 Composition API**

---

## ⚡ 快速体验

如果你有 **React 基础**，这个快速开始会让你很快上手 Vue 3！

### 第一步：环境准备（5分钟）

```bash
# 确保你有 Node.js 14+
node --version

# 进入项目目录
cd learn_vue

# 安装依赖
yarn install

# 启动开发服务器
yarn serve
```

打开浏览器访问 http://localhost:8080

---

### 第二步：理解核心概念（10分钟）

打开 `src/examples/01-reactivity/RefVsReactive.vue`，你会看到：

**Vue 3**:
```vue
<script setup>
import { ref, reactive } from 'vue'

// 基础类型用 ref
const count = ref(0)

// 对象用 reactive
const user = reactive({ name: '张三', age: 25 })

// 访问 ref 需要加 .value（在模板中不需要）
const increment = () => {
  count.value++
  user.age++
}
</script>

<template>
  <div>
    <!-- 模板中直接使用，不需要 .value -->
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}, {{ user.age }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

**对比 React**:
```jsx
function Component() {
  // 类似 ref
  const [count, setCount] = useState(0)

  // 类似 reactive
  const [user, setUser] = useState({ name: '张三', age: 25 })

  const increment = () => {
    setCount(count + 1)
    setUser(prev => ({ ...prev, age: prev.age + 1 }))
  }
}
```

**关键差异**：
- Vue 的 `ref` 需要用 `.value` 访问（模板中除外）
- Vue 的 `reactive` 是深度响应的，直接修改属性即可
- Vue 使用 `@click` 而不是 `onClick`

---

### 第三步：组件通信（10分钟）

打开 `src/examples/02-components/PropsDemo.vue`：

**子组件定义 Props**：
```vue
<!-- components/ProductCard.vue -->
<script setup>
// 定义接收的 props
const props = defineProps({
  title: String,
  price: Number,
  inStock: {
    type: Boolean,
    default: true
  }
})

// 定义可以发射的事件
const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', {
    title: props.title,
    price: props.price
  })
}
</script>

<template>
  <div class="product-card">
    <h3>{{ title }}</h3>
    <p>价格: ¥{{ price }}</p>
    <p v-if="inStock">有库存</p>
    <p v-else>缺货</p>
    <button @click="addToCart" :disabled="!inStock">
      加入购物车
    </button>
  </div>
</template>
```

**父组件使用**：
```vue
<script setup>
import ProductCard from './components/ProductCard.vue'

const handleAddToCart = (product) => {
  console.log('添加到购物车:', product)
}
</script>

<template>
  <ProductCard
    title="Vue 3 入门"
    :price="99"
    :in-stock="true"
    @add-to-cart="handleAddToCart"
  />
</template>
```

**对比 React**：
```jsx
// React 子组件
function ProductCard({ title, price, inStock, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>价格: ¥{price}</p>
      <button onClick={() => onAddToCart({ title, price })}>
        加入购物车
      </button>
    </div>
  )
}
```

---

### 第四步：响应式计算（5分钟）

打开 `src/examples/01-reactivity/ComputedDemo.vue`：

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Vue 3 书', price: 99, quantity: 1 },
  { name: 'React 书', price: 89, quantity: 2 }
])

// 计算属性 - 自动缓存
const total = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

const totalItems = computed(() => {
  return items.value.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<template>
  <div>
    <h2>购物车</h2>
    <div v-for="item in items" :key="item.name">
      {{ item.name }} x {{ item.quantity }} = ¥{{ item.price * item.quantity }}
    </div>
    <hr>
    <p>商品总数: {{ totalItems }}</p>
    <p>总价: ¥{{ total }}</p>
  </div>
</template>
```

**对比 React useMemo**：
```jsx
const items = useState([
  { name: 'Vue 3 书', price: 99, quantity: 1 },
  { name: 'React 书', price: 89, quantity: 2 }
])

const total = useMemo(() => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}, [items])
```

---

## 🎯 下一步

完成快速开始后，你可以：

1. **继续基础学习**：查看 `CORE_CHECKLIST.md` 按顺序学习
2. **查看更多示例**：浏览 `src/examples/` 目录
3. **开始实战项目**：尝试修改 `src/projects/todo-app/TodoApp.vue`

## 🛠️ 开发工具

### 必装扩展
- **Vue DevTools**: 浏览器扩展，调试 Vue 应用必备
- **Volar**: VS Code 中的 Vue 3 官方扩展

### 调试技巧

1. **查看组件状态**：
   - 打开浏览器开发者工具
   - 切换到 Vue DevTools 标签
   - 查看组件的响应式数据

2. **控制台调试**：
```vue
<script setup>
const debugData = ref({ key: 'value' })

// 在浏览器控制台可以直接访问
// Vue DevTools 会显示 component实例，可以通过以下方式查看
console.log(debugData.value)
</script>
```

3. **模板调试**：
```vue
<template>
  <!-- 查看数据结构 -->
  <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
</template>
```

---

## ❓ 常见问题

**Q: 什么时候用 `ref` vs `reactive`？**
- 基础类型（string, number, boolean）用 `ref`
- 对象、数组用 `reactive` 或 `ref`（推荐用 `reactive`）

**Q: 为什么模板中不需要 `.value`？**
- Vue 会自动解包，所以在模板中 `{{ count }}` 而不是 `{{ count.value }}`

**Q: `@click` 是什么？**
- `@` 是 `v-on:` 的简写，所以 `@click="handler"` 等同于 `v-on:click="handler"`

**Q: 如何传递动态属性？**
- 使用 `v-bind:` 或简写 `:`
```vue
<img :src="imageUrl" :alt="imageAlt">
```

---

## 🔗 有用的链接

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue DevTools 安装](https://devtools.vuejs.org/guide/installation.html)
- [VS Code Volar 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

**提示**：这个快速开始只是为了让你快速上手概念。要真正掌握 Vue 3，建议按照 `CORE_CHECKLIST.md` 的顺序系统学习！