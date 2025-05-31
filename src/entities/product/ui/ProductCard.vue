<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../model/types'

type Props = {
  product: Product
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  delete: [id: string]
}>()

const isDeleting = ref(false)

const handleDelete = async () => {
  isDeleting.value = true
  try {
    emit('delete', props.product.id)
  } finally {
    // Задержка чтобы показать состояние загрузки
    setTimeout(() => {
      isDeleting.value = false
    }, 1000)
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
</script>

<template>
  <v-card
    class="mb-4"
    elevation="2"
    :loading="isDeleting"
  >
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

      <v-divider class="my-3" />

      <div class="text-caption text-medium-emphasis">
        Создан: {{ formatDate(product.createdAt) }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="error"
        variant="text"
        size="small"
        prepend-icon="mdi-delete"
        :loading="isDeleting"
        :disabled="isDeleting || loading"
        @click="handleDelete"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
