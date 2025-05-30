<!-- src/features/product-create/ui/CreateProductButton.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import CreateProductDialog from './CreateProductDialog.vue'

const showDialog = ref(false)

const openDialog = () => {
  showDialog.value = true
}
</script>

<template>
  <div>
    <v-btn
      color="primary"
      variant="elevated"
      prepend-icon="mdi-plus"
      size="large"
      @click="openDialog"
    >
      Создать продукт
    </v-btn>

    <CreateProductDialog
      v-model="showDialog"
    />
  </div>
</template>
