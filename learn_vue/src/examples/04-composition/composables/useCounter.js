import { ref } from 'vue'

/**
 * 可复用的计数器逻辑
 * @param {number} initialValue - 初始值
 * @returns {object} 计数器状态和方法
 */
export default function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const reset = () => {
    count.value = initialValue
  }

  // 返回响应式状态和方法
  return {
    count,
    increment,
    decrement,
    reset
  }
}
