import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Meal, MealType, DailyMeals, CreateMealItemData, MealItem } from './types'
import { useProductStore } from '@/entities/product'
import { v4 as uuidv4 } from 'uuid'

export const useMealStore = defineStore('meal', () => {
  const meals = ref<Map<string, DailyMeals>>(new Map())
  const selectedDate = ref<Date>(new Date())
  const loading = ref(false)
  const error = ref<string | null>(null)

  const productStore = useProductStore()

  // Utility функции
  const getDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }

  const createEmptyMeal = (type: MealType, date: Date): Meal => ({
    id: uuidv4(),
    type,
    date,
    items: [],
    totalCalories: 0,
    totalNutrients: {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      fiber: 0
    }
  })

  const createEmptyDailyMeals = (date: Date): DailyMeals => ({
    date,
    breakfast: createEmptyMeal('breakfast', date),
    lunch: createEmptyMeal('lunch', date),
    dinner: createEmptyMeal('dinner', date),
    snack: createEmptyMeal('snack', date),
    totalCalories: 0,
    totalNutrients: {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      fiber: 0
    }
  })

  const calculateMealTotals = (meal: Meal): void => {
    meal.totalCalories = meal.items.reduce((sum, item) => sum + item.calories, 0)
    meal.totalNutrients = meal.items.reduce(
      (totals, item) => ({
        proteins: totals.proteins + item.nutrients.proteins,
        fats: totals.fats + item.nutrients.fats,
        carbohydrates: totals.carbohydrates + item.nutrients.carbohydrates,
        fiber: totals.fiber + (item.nutrients.fiber || 0)
      }),
      { proteins: 0, fats: 0, carbohydrates: 0, fiber: 0 }
    )
  }

  const calculateDayTotals = (dailyMeals: DailyMeals): void => {
    const allMeals = [dailyMeals.breakfast, dailyMeals.lunch, dailyMeals.dinner, dailyMeals.snack]

    dailyMeals.totalCalories = allMeals.reduce((sum, meal) => sum + meal.totalCalories, 0)
    dailyMeals.totalNutrients = allMeals.reduce(
      (totals, meal) => ({
        proteins: totals.proteins + meal.totalNutrients.proteins,
        fats: totals.fats + meal.totalNutrients.fats,
        carbohydrates: totals.carbohydrates + meal.totalNutrients.carbohydrates,
        fiber: totals.fiber + meal.totalNutrients.fiber
      }),
      { proteins: 0, fats: 0, carbohydrates: 0, fiber: 0 }
    )
  }

  // Getters
  const currentDayMeals = computed((): DailyMeals => {
    const dateKey = getDateKey(selectedDate.value)
    return meals.value.get(dateKey) || createEmptyDailyMeals(selectedDate.value)
  })

  // Actions
  const setSelectedDate = (date: Date): void => {
    selectedDate.value = new Date(date)
  }

  const addMealItem = async (mealType: MealType, itemData: CreateMealItemData): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      // Получаем продукт
      const product = await productStore.getProductById(itemData.productId)
      if (!product) {
        error.value = 'Продукт не найден'
        return false
      }

      // Рассчитываем значения для указанного количества
      const ratio = itemData.amount / 100 // product data is per 100g
      const calories = Math.round(product.calories * ratio)
      const nutrients = {
        proteins: Math.round(product.nutrients.proteins * ratio * 10) / 10,
        fats: Math.round(product.nutrients.fats * ratio * 10) / 10,
        carbohydrates: Math.round(product.nutrients.carbohydrates * ratio * 10) / 10,
        fiber: product.nutrients.fiber ? Math.round(product.nutrients.fiber * ratio * 10) / 10 : 0
      }

      const mealItem: MealItem = {
        id: uuidv4(),
        productId: product.id,
        productName: product.name,
        amount: itemData.amount,
        calories,
        nutrients
      }

      // Получаем или создаем дневные приемы пищи
      const dateKey = getDateKey(selectedDate.value)
      let dailyMeals = meals.value.get(dateKey)

      if (!dailyMeals) {
        dailyMeals = createEmptyDailyMeals(selectedDate.value)
        meals.value.set(dateKey, dailyMeals)
      }

      // Добавляем элемент в соответствующий прием пищи
      dailyMeals[mealType].items.push(mealItem)

      // Пересчитываем итоги
      calculateMealTotals(dailyMeals[mealType])
      calculateDayTotals(dailyMeals)

      return true
    } catch (err) {
      error.value = 'Ошибка при добавлении продукта в прием пищи'
      console.error('Error adding meal item:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const removeMealItem = (mealType: MealType, itemId: string): boolean => {
    const dateKey = getDateKey(selectedDate.value)
    const dailyMeals = meals.value.get(dateKey)

    if (!dailyMeals) return false

    const meal = dailyMeals[mealType]
    const itemIndex = meal.items.findIndex(item => item.id === itemId)

    if (itemIndex === -1) return false

    meal.items.splice(itemIndex, 1)

    // Пересчитываем итоги
    calculateMealTotals(meal)
    calculateDayTotals(dailyMeals)

    return true
  }

  const updateMealItemAmount = async (
    mealType: MealType,
    itemId: string,
    newAmount: number
  ): Promise<boolean> => {
    const dateKey = getDateKey(selectedDate.value)
    const dailyMeals = meals.value.get(dateKey)

    if (!dailyMeals) return false

    const meal = dailyMeals[mealType]
    const item = meal.items.find(item => item.id === itemId)

    if (!item) return false

    // Получаем оригинальный продукт для пересчета
    const product = await productStore.getProductById(item.productId)
    if (!product) return false

    // Пересчитываем значения
    const ratio = newAmount / 100
    item.amount = newAmount
    item.calories = Math.round(product.calories * ratio)
    item.nutrients = {
      proteins: Math.round(product.nutrients.proteins * ratio * 10) / 10,
      fats: Math.round(product.nutrients.fats * ratio * 10) / 10,
      carbohydrates: Math.round(product.nutrients.carbohydrates * ratio * 10) / 10,
      fiber: product.nutrients.fiber ? Math.round(product.nutrients.fiber * ratio * 10) / 10 : 0
    }

    // Пересчитываем итоги
    calculateMealTotals(meal)
    calculateDayTotals(dailyMeals)

    return true
  }

  const clearError = (): void => {
    error.value = null
  }

  const getMealsByDateRange = (startDate: Date, endDate: Date): DailyMeals[] => {
    const result: DailyMeals[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      const dateKey = getDateKey(current)
      const dailyMeals = meals.value.get(dateKey) || createEmptyDailyMeals(new Date(current))
      result.push(dailyMeals)
      current.setDate(current.getDate() + 1)
    }

    return result
  }

  return {
    // State
    meals,
    selectedDate,
    loading,
    error,

    // Getters
    currentDayMeals,

    // Actions
    setSelectedDate,
    addMealItem,
    removeMealItem,
    updateMealItemAmount,
    clearError,
    getMealsByDateRange
  }
})
