<script setup lang="ts">
import type { Product } from '../model/types'

type Props = {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const handleDelete = () => {
  emit('delete', props.product.id)
}
</script>

<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>{{ product.name }}</span>
      <v-chip
        color="primary"
        variant="outlined"
        size="small"
      >
        {{ product.calories }} ккал
      </v-chip>
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-primary">{{ product.nutrients.proteins }}</div>
            <div class="text-caption text-medium-emphasis">Белки</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-success">{{ product.nutrients.fats }}</div>
            <div class="text-caption text-medium-emphasis">Жиры</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-warning">{{ product.nutrients.carbohydrates }}</div>
            <div class="text-caption text-medium-emphasis">Углеводы</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3" v-if="product.nutrients.fiber">
          <div class="text-center">
            <div class="text-h6 text-info">{{ product.nutrients.fiber }}</div>
            <div class="text-caption text-medium-emphasis">Клетчатка</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="error"
        variant="text"
        size="small"
        prepend-icon="mdi-delete"
        @click="handleDelete"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
