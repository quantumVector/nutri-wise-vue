export type Product = {
  id: string
  name: string
  calories: number
  nutrients: {
    proteins: number
    fats: number
    carbohydrates: number
    fiber?: number
  }
  createdAt: Date
}

export type CreateProductData = {
  name: string
  calories: number
  nutrients: {
    proteins: number
    fats: number
    carbohydrates: number
    fiber?: number
  }
}
