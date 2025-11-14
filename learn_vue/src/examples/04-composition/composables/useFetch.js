import { ref } from 'vue'

/**
 * 封装数据获取逻辑
 * @param {string} url - API 地址（保留参数用于文档说明）
 * @returns {object} 数据、加载状态、错误和重新获取方法
 */
export default function useFetch(url) { // eslint-disable-line no-unused-vars
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 模拟返回数据
      data.value = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        role: '管理员',
        joinDate: '2024-01-15'
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // 初始加载
  fetchData()

  // 重新获取数据
  const refetch = () => {
    data.value = null
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}
