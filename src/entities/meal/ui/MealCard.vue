<script setup lang="ts">
import { ref } from 'vue'
import type { Meal, MealItem } from '../model/types'
import { MEAL_TYPE_LABELS } from '../model/types'

type Props = {
  meal: Meal
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  addItem: []
  removeItem: [itemId: string]
  updateItem: [itemId: string, amount: number]
}>()

const editingItem = ref<string | null>(null)
const editAmount = ref<number>(0)

const startEdit = (item: MealItem) => {
  editingItem.value = item.id
  editAmount.value = item.amount
}

const cancelEdit = () => {
  editingItem.value = null
  editAmount.value = 0
}

const saveEdit = (itemId: string) => {
  if (editAmount.value > 0) {
    emit('updateItem', itemId, editAmount.value)
  }
  editingItem.value = null
  editAmount.value = 0
}

const handleRemoveItem = (itemId: string) => {
  emit('removeItem', itemId)
}

const formatNutrient = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(1)
}
</script>

<template>
  <v-card elevation="2" class="mb-4">
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon class="me-2" color="primary">
          {{
            meal.type === 'breakfast' ? 'mdi-coffee' :
              meal.type === 'lunch' ? 'mdi-food' :
                meal.type === 'dinner' ? 'mdi-silverware-fork-knife' :
                  'mdi-cookie'
          }}
        </v-icon>
        <span>{{ MEAL_TYPE_LABELS[meal.type] }}</span>
      </div>
      <div class="d-flex align-center gap-2">
        <v-chip color="primary" variant="outlined" size="small">
          {{ meal.totalCalories }} ккал
        </v-chip>
        <v-btn
          color="primary"
          variant="text"
          size="small"
          icon="mdi-plus"
          @click="emit('addItem')"
          :disabled="loading"
        />
      </div>
    </v-card-title>

    <v-card-text v-if="meal.items.length > 0">
      <!-- Список продуктов -->
      <div class="mb-4">
        <v-list density="compact">
          <v-list-item
            v-for="item in meal.items"
            :key="item.id"
            class="px-0"
          >
            <template v-slot:prepend>
              <v-icon size="small" color="grey">mdi-food-variant</v-icon>
            </template>

            <v-list-item-title>
              <div class="d-flex justify-space-between align-center">
                <span class="font-weight-medium">{{ item.productName }}</span>
                <div class="d-flex align-center gap-2">
                  <!-- Редактирование количества -->
                  <div v-if="editingItem === item.id" class="d-flex align-center gap-1">
                    <v-text-field
                      v-model.number="editAmount"
                      density="compact"
                      variant="outlined"
                      hide-details
                      suffix="г"
                      type="number"
                      min="1"
                      max="2000"
                      style="width: 80px;"
                      @keyup.enter="saveEdit(item.id)"
                      @keyup.escape="cancelEdit"
                    />
                    <v-btn
                      icon="mdi-check"
                      size="x-small"
                      color="success"
                      variant="text"
                      @click="saveEdit(item.id)"
                    />
                    <v-btn
                      icon="mdi-close"
                      size="x-small"
                      color="error"
                      variant="text"
                      @click="cancelEdit"
                    />
                  </div>
                  <!-- Обычное отображение -->
                  <div v-else class="d-flex align-center gap-1">
                    <v-chip
                      size="small"
                      variant="outlined"
                      @click="startEdit(item)"
                      class="cursor-pointer"
                    >
                      {{ item.amount }}г
                    </v-chip>
                    <v-chip size="small" color="primary" variant="tonal">
                      {{ item.calories }} ккал
                    </v-chip>
                    <v-btn
                      icon="mdi-delete"
                      size="x-small"
                      color="error"
                      variant="text"
                      @click="handleRemoveItem(item.id)"
                    />
                  </div>
                </div>
              </div>
            </v-list-item-title>

            <v-list-item-subtitle>
              <div class="d-flex gap-3 mt-1">
                <span class="text-caption">
                  Б: {{ formatNutrient(item.nutrients.proteins) }}г
                </span>
                <span class="text-caption">
                  Ж: {{ formatNutrient(item.nutrients.fats) }}г
                </span>
                <span class="text-caption">
                  У: {{ formatNutrient(item.nutrients.carbohydrates) }}г
                </span>
                <span v-if="item.nutrients.fiber" class="text-caption">
                  Кл: {{ formatNutrient(item.nutrients.fiber) }}г
                </span>
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>

      <!-- Итоги по приему пищи -->
      <v-divider class="mb-3" />
      <div class="d-flex justify-space-around">
        <div class="text-center">
          <div class="text-body-2 font-weight-medium text-primary">
            {{ formatNutrient(meal.totalNutrients.proteins) }}г
          </div>
          <div class="text-caption text-medium-emphasis">Белки</div>
        </div>
        <div class="text-center">
          <div class="text-body-2 font-weight-medium text-success">
            {{ formatNutrient(meal.totalNutrients.fats) }}г
          </div>
          <div class="text-caption text-medium-emphasis">Жиры</div>
        </div>
        <div class="text-center">
          <div class="text-body-2 font-weight-medium text-warning">
            {{ formatNutrient(meal.totalNutrients.carbohydrates) }}г
          </div>
          <div class="text-caption text-medium-emphasis">Углеводы</div>
        </div>
        <div class="text-center">
          <div class="text-body-2 font-weight-medium text-info">
            {{ formatNutrient(meal.totalNutrients.fiber) }}г
          </div>
          <div class="text-caption text-medium-emphasis">Клетчатка</div>
        </div>
      </div>
    </v-card-text>

    <!-- Пустое состояние -->
    <v-card-text v-else class="text-center py-8">
      <v-icon size="48" color="grey-lighten-2" class="mb-2">
        mdi-plus-circle-outline
      </v-icon>
      <div class="text-body-2 text-medium-emphasis mb-2">
        Продукты не добавлены
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        prepend-icon="mdi-plus"
        @click="emit('addItem')"
      >
        Добавить продукт
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}
</style>
