<script setup lang="ts">
import type { DailyMeals } from '../model/types'

type Props = {
  dailyMeals: DailyMeals
}

defineProps<Props>()

const formatNutrient = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(1)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>

<template>
  <v-card elevation="3" class="mb-6" color="primary" variant="tonal">
    <v-card-title class="d-flex align-center">
      <v-icon class="me-2">mdi-calendar-today</v-icon>
      <div>
        <div class="text-h6">{{ formatDate(dailyMeals.date) }}</div>
        <div class="text-subtitle-2 text-medium-emphasis">
          Итоги дня
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <!-- Общие калории -->
      <div class="text-center mb-4">
        <div class="text-h4 font-weight-bold text-primary">
          {{ dailyMeals.totalCalories }}
        </div>
        <div class="text-body-2 text-medium-emphasis">
          ккал всего
        </div>
      </div>

      <v-divider class="mb-4" />

      <!-- Нутриенты -->
      <v-row>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-primary mb-1">
              {{ formatNutrient(dailyMeals.totalNutrients.proteins) }}г
            </div>
            <div class="text-caption text-medium-emphasis">
              Белки
            </div>
            <v-progress-linear
              :model-value="Math.min((dailyMeals.totalNutrients.proteins / 150) * 100, 100)"
              color="primary"
              height="4"
              rounded
              class="mt-1"
            />
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-success mb-1">
              {{ formatNutrient(dailyMeals.totalNutrients.fats) }}г
            </div>
            <div class="text-caption text-medium-emphasis">
              Жиры
            </div>
            <v-progress-linear
              :model-value="Math.min((dailyMeals.totalNutrients.fats / 80) * 100, 100)"
              color="success"
              height="4"
              rounded
              class="mt-1"
            />
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-warning mb-1">
              {{ formatNutrient(dailyMeals.totalNutrients.carbohydrates) }}г
            </div>
            <div class="text-caption text-medium-emphasis">
              Углеводы
            </div>
            <v-progress-linear
              :model-value="Math.min((dailyMeals.totalNutrients.carbohydrates / 300) * 100, 100)"
              color="warning"
              height="4"
              rounded
              class="mt-1"
            />
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h6 text-info mb-1">
              {{ formatNutrient(dailyMeals.totalNutrients.fiber) }}г
            </div>
            <div class="text-caption text-medium-emphasis">
              Клетчатка
            </div>
            <v-progress-linear
              :model-value="Math.min((dailyMeals.totalNutrients.fiber / 25) * 100, 100)"
              color="info"
              height="4"
              rounded
              class="mt-1"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Распределение по приемам пищи -->
      <v-divider class="my-4" />

      <div class="text-subtitle-2 mb-3 text-center">
        Распределение калорий
      </div>

      <v-row dense>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <v-icon size="small" class="mb-1" color="orange">mdi-coffee</v-icon>
            <div class="text-body-2 font-weight-medium">
              {{ dailyMeals.breakfast.totalCalories }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Завтрак
            </div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <v-icon size="small" class="mb-1" color="green">mdi-food</v-icon>
            <div class="text-body-2 font-weight-medium">
              {{ dailyMeals.lunch.totalCalories }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Обед
            </div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <v-icon size="small" class="mb-1" color="purple">mdi-silverware-fork-knife</v-icon>
            <div class="text-body-2 font-weight-medium">
              {{ dailyMeals.dinner.totalCalories }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Ужин
            </div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="text-center">
            <v-icon size="small" class="mb-1" color="blue">mdi-cookie</v-icon>
            <div class="text-body-2 font-weight-medium">
              {{ dailyMeals.snack.totalCalories }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Перекус
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
