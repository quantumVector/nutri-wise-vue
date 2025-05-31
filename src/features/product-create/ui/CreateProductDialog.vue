<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { type CreateProductData, useProductStore } from '@/entities/product'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const productStore = useProductStore()

const formData = reactive<CreateProductData>({
  name: '',
  calories: 0,
  nutrients: {
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    fiber: 0
  }
})

const form = ref()
const isValid = ref(false)

const rules = {
  name: [
    (v: string) => !!v || 'Название обязательно',
    (v: string) => v.length >= 2 || 'Минимум 2 символа'
  ],
  calories: [
    (v: number) => v >= 0 || 'Калории не могут быть отрицательными',
    (v: number) => v <= 1000 || 'Слишком много калорий'
  ],
  nutrients: [
    (v: number) => v >= 0 || 'Значение не может быть отрицательным',
    (v: number) => v <= 100 || 'Слишком большое значение'
  ]
}

const resetForm = () => {
  formData.name = ''
  formData.calories = 0
  formData.nutrients.proteins = 0
  formData.nutrients.fats = 0
  formData.nutrients.carbohydrates = 0
  formData.nutrients.fiber = 0
  form.value?.resetValidation()
}

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    const success = await productStore.addProduct({ ...formData })
    if (success) {
      emit('update:modelValue', false)
      resetForm()
    }
  }
}

const handleCancel = () => {
  emit('update:modelValue', false)
  resetForm()
}

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="me-2">mdi-plus</v-icon>
        Создать продукт
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.name"
                  label="Название продукта"
                  :rules="rules.name"
                  prepend-inner-icon="mdi-food"
                  variant="outlined"
                  required
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="formData.calories"
                  label="Калории (на 100г)"
                  :rules="rules.calories"
                  prepend-inner-icon="mdi-fire"
                  variant="outlined"
                  suffix="ккал"
                  type="number"
                  min="0"
                  max="1000"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="formData.nutrients.fiber"
                  label="Клетчатка"
                  :rules="rules.nutrients"
                  prepend-inner-icon="mdi-grass"
                  variant="outlined"
                  suffix="г"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </v-col>

              <v-col cols="12">
                <v-divider class="my-2" />
                <div class="text-subtitle-1 mb-2">Нутриенты (на 100г)</div>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="formData.nutrients.proteins"
                  label="Белки"
                  :rules="rules.nutrients"
                  prepend-inner-icon="mdi-dumbbell"
                  variant="outlined"
                  suffix="г"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="formData.nutrients.fats"
                  label="Жиры"
                  :rules="rules.nutrients"
                  prepend-inner-icon="mdi-water"
                  variant="outlined"
                  suffix="г"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="formData.nutrients.carbohydrates"
                  label="Углеводы"
                  :rules="rules.nutrients"
                  prepend-inner-icon="mdi-grain"
                  variant="outlined"
                  suffix="г"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="handleCancel"
          :disabled="productStore.loading"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!isValid || productStore.loading"
          :loading="productStore.loading"
          @click="handleSubmit"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
