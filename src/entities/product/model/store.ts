import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Product, CreateProductData } from './types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
    {
      id: '1',
      name: 'Куриная грудка',
      calories: 165,
      nutrients: {
        proteins: 31,
        fats: 3.6,
        carbohydrates: 0,
        fiber: 0
      },
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Рис белый',
      calories: 130,
      nutrients: {
        proteins: 2.7,
        fats: 0.3,
        carbohydrates: 28,
        fiber: 0.4
      },
      createdAt: new Date()
    }
  ])

  const productsCount = computed(() => products.value.length)

  const addProduct = (productData: CreateProductData) => {
    const newProduct: Product = {
      ...productData,
      id: uuidv4(),
      createdAt: new Date()
    }
    products.value.push(newProduct)
  }

  const removeProduct = (id: string) => {
    const index = products.value.findIndex(product => product.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }

  const getProductById = (id: string) => {
    return products.value.find(product => product.id === id)
  }

  return {
    products,
    productsCount,
    addProduct,
    removeProduct,
    getProductById
  }
})
