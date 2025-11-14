import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 追踪鼠标位置
 * @returns {object} 鼠标 x, y 坐标
 */
export default function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  // 组件卸载时清理事件监听
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
