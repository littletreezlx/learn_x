<template>
  <div class="product-card">
    <h4>{{ product.name }}</h4>
    <p class="price">¥{{ product.price }}</p>
    <p class="stock">库存: {{ product.stock }}</p>
    <div :class="['stock-status', stockStatus]">
      {{ stockStatusText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // 可以添加自定义验证
    validator: (value) => {
      return value.name && typeof value.price === 'number'
    }
  }
})

// 计算库存状态
const stockStatus = computed(() => {
  if (props.product.stock === 0) return 'out-of-stock'
  if (props.product.stock < 5) return 'low-stock'
  return 'in-stock'
})

const stockStatusText = computed(() => {
  if (props.product.stock === 0) return '缺货'
  if (props.product.stock < 5) return '库存不足'
  return '库存充足'
})
</script>

<style scoped>
.product-card {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 18px;
}

.price {
  color: #e74c3c;
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.stock {
  color: #666;
  margin: 8px 0;
}

.stock-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
}

.in-stock {
  background: #d4edda;
  color: #155724;
}

.low-stock {
  background: #fff3cd;
  color: #856404;
}

.out-of-stock {
  background: #f8d7da;
  color: #721c24;
}
</style>
