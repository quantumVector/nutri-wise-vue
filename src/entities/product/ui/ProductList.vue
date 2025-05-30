<script setup lang="ts">
import { useProductStore } from '../model/store'
import ProductCard from './ProductCard.vue'

const productStore = useProductStore()

const handleDeleteProduct = (id: string) => {
  productStore.removeProduct(id)
}
</script>

<template>
  <div>
    <div v-if="productStore.products.length === 0" class="text-center py-8">
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
        @delete="handleDeleteProduct"
      />
    </div>
  </div>
</template>
