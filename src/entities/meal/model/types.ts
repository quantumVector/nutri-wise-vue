export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export type MealItem = {
  id: string
  productId: string
  productName: string
  amount: number // в граммах
  calories: number
  nutrients: {
    proteins: number
    fats: number
    carbohydrates: number
    fiber?: number
  }
}

export type Meal = {
  id: string
  type: MealType
  date: Date
  items: MealItem[]
  totalCalories: number
  totalNutrients: {
    proteins: number
    fats: number
    carbohydrates: number
    fiber: number
  }
}

export type CreateMealItemData = {
  productId: string
  amount: number
}

export type DailyMeals = {
  date: Date
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snack: Meal
  totalCalories: number
  totalNutrients: {
    proteins: number
    fats: number
    carbohydrates: number
    fiber: number
  }
}

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус'
}
