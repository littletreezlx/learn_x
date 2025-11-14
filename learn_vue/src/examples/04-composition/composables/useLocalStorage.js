import { ref, watch } from 'vue'

/**
 * 响应式 localStorage
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {Ref} 响应式引用
 */
export default function useLocalStorage(key, defaultValue) {
  // 从 localStorage 读取初始值
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  }

  const storedValue = ref(readValue())

  // 监听值的变化，自动同步到 localStorage
  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return storedValue
}
