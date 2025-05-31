import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CreateProductData } from './types'
import { productsApi } from '@/shared/api'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const productsCount = computed(() => products.value.length)

  // Загрузить все продукты
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await productsApi.getProducts()
      products.value = data
    } catch (err) {
      error.value = 'Ошибка при загрузке продуктов'
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  // Добавить новый продукт
  const addProduct = async (productData: CreateProductData): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const newProduct = await productsApi.createProduct(productData)
      products.value.push(newProduct)
      return true
    } catch (err) {
      error.value = 'Ошибка при создании продукта'
      console.error('Error creating product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Удалить продукт
  const removeProduct = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const success = await productsApi.deleteProduct(id)
      if (success) {
        const index = products.value.findIndex(product => product.id === id)
        if (index !== -1) {
          products.value.splice(index, 1)
        }
      }
      return success
    } catch (err) {
      error.value = 'Ошибка при удалении продукта'
      console.error('Error deleting product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Обновить продукт
  const updateProduct = async (id: string, productData: Partial<CreateProductData>): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const updatedProduct = await productsApi.updateProduct(id, productData)
      if (updatedProduct) {
        const index = products.value.findIndex(product => product.id === id)
        if (index !== -1) {
          products.value[index] = updatedProduct
        }
        return true
      }
      return false
    } catch (err) {
      error.value = 'Ошибка при обновлении продукта'
      console.error('Error updating product:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Получить продукт по ID
  const getProductById = async (id: string): Promise<Product | null> => {
    // Сначала ищем в локальном состоянии
    const localProduct = products.value.find(product => product.id === id)
    if (localProduct) {
      return localProduct
    }

    // Если не найден, запрашиваем с сервера
    loading.value = true
    error.value = null

    try {
      const product = await productsApi.getProductById(id)
      return product
    } catch (err) {
      error.value = 'Ошибка при загрузке продукта'
      console.error('Error fetching product:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Очистить ошибки
  const clearError = () => {
    error.value = null
  }

  // Инициализация (загрузка продуктов при создании store)
  const initialize = async () => {
    if (products.value.length === 0) {
      await fetchProducts()
    }
  }

  return {
    // State
    products,
    loading,
    error,

    // Getters
    productsCount,

    // Actions
    fetchProducts,
    addProduct,
    removeProduct,
    updateProduct,
    getProductById,
    clearError,
    initialize
  }
})
