<script setup lang="ts">
import { CreateProductButton } from '@/features/product-create'
import { ProductList } from "@/entities/product"
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Продукты</h1>
        <p class="text-body-1 text-medium-emphasis mt-1">
          Управляйте базой данных продуктов
        </p>
      </div>
      <CreateProductButton />
    </div>

    <ProductList />
  </v-container>
</template>
