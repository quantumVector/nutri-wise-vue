<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../model/store'
import ProductCard from './ProductCard.vue'

const productStore = useProductStore()

const handleDeleteProduct = async (id: string) => {
  const success = await productStore.removeProduct(id)
  if (!success && productStore.error) {
    // Можно показать уведомление об ошибке
    console.error('Failed to delete product')
  }
}

onMounted(() => {
  productStore.initialize()
})
</script>

<template>
  <div>
    <!-- Загрузка -->
    <div v-if="productStore.loading && productStore.products.length === 0" class="text-center py-8">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
        class="mb-4"
      />
      <div class="text-h6 text-medium-emphasis">
        Загрузка продуктов...
      </div>
    </div>

    <!-- Ошибка -->
    <v-alert
      v-else-if="productStore.error"
      type="error"
      variant="tonal"
      class="mb-4"
      closable
      @click:close="productStore.clearError"
    >
      {{ productStore.error }}
    </v-alert>

    <!-- Пустое состояние -->
    <div v-else-if="productStore.products.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1" class="mb-4">
        mdi-package-variant-closed
      </v-icon>
      <div class="text-h6 text-medium-emphasis">
        Продукты не найдены
      </div>
      <div class="text-body-2 text-medium-emphasis">
        Добавьте первый продукт, чтобы начать
      </div>
    </div>

    <!-- Список продуктов -->
    <div v-else>
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h5">Список продуктов</h2>
        <v-chip color="primary" variant="outlined">
          Всего: {{ productStore.productsCount }}
        </v-chip>
      </div>

      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        :loading="productStore.loading"
        @delete="handleDeleteProduct"
      />
    </div>
  </div>
</template>
