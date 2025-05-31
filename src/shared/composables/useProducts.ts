import { ref, computed } from 'vue'
import { useProductStore } from '@/entities/product'

export const useProducts = () => {
  const store = useProductStore()

  // Локальные состояния для UI
  const searchQuery = ref('')
  const sortBy = ref<'name' | 'calories' | 'createdAt'>('createdAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Фильтрованные и отсортированные продукты
  const filteredProducts = computed(() => {
    let products = [...store.products]

    // Фильтрация по поисковому запросу
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      products = products.filter(product =>
        product.name.toLowerCase().includes(query)
      )
    }

    // Сортировка
    products.sort((a, b) => {
      let comparison = 0

      switch (sortBy.value) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'calories':
          comparison = a.calories - b.calories
          break
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }

      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return products
  })

  // Статистика
  const totalCalories = computed(() =>
    store.products.reduce((sum, product) => sum + product.calories, 0)
  )

  const averageCalories = computed(() =>
    store.products.length > 0 ? Math.round(totalCalories.value / store.products.length) : 0
  )

  const nutritionSummary = computed(() => {
    const total = store.products.reduce(
      (acc, product) => ({
        proteins: acc.proteins + product.nutrients.proteins,
        fats: acc.fats + product.nutrients.fats,
        carbohydrates: acc.carbohydrates + product.nutrients.carbohydrates,
        fiber: acc.fiber + (product.nutrients.fiber || 0)
      }),
      { proteins: 0, fats: 0, carbohydrates: 0, fiber: 0 }
    )

    const count = store.products.length
    return count > 0 ? {
      proteins: Math.round(total.proteins / count * 10) / 10,
      fats: Math.round(total.fats / count * 10) / 10,
      carbohydrates: Math.round(total.carbohydrates / count * 10) / 10,
      fiber: Math.round(total.fiber / count * 10) / 10
    } : { proteins: 0, fats: 0, carbohydrates: 0, fiber: 0 }
  })

  // Методы для управления UI
  const setSortBy = (field: typeof sortBy.value) => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = field
      sortOrder.value = 'asc'
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  return {
    // Store данные
    products: store.products,
    loading: store.loading,
    error: store.error,
    productsCount: store.productsCount,

    // Фильтрация и сортировка
    filteredProducts,
    searchQuery,
    sortBy,
    sortOrder,
    setSortBy,
    clearSearch,

    // Статистика
    totalCalories,
    averageCalories,
    nutritionSummary,

    // Store методы
    initialize: store.initialize,
    addProduct: store.addProduct,
    removeProduct: store.removeProduct,
    updateProduct: store.updateProduct,
    getProductById: store.getProductById,
    clearError: store.clearError,
    fetchProducts: store.fetchProducts
  }
}
