import type { Product, CreateProductData } from '@/entities/product'
import { apiClient, USE_MOCKS, mockDelay } from './config'
import { mockProducts } from './mocks/products'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

// Локальное хранилище для моков (имитация базы данных)
const mockProductsStorage = [...mockProducts]

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    if (USE_MOCKS) {
      await mockDelay()
      return [...mockProductsStorage]
    }

    const response = await apiClient.get<Product[]>('/products')
    return response.data
  },

  async getProductById(id: string): Promise<Product | null> {
    if (USE_MOCKS) {
      await mockDelay()
      const product = mockProductsStorage.find(p => p.id === id)
      return product || null
    }

    try {
      const response = await apiClient.get<Product>(`/products/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    if (USE_MOCKS) {
      await mockDelay()
      const newProduct: Product = {
        ...productData,
        id: uuidv4(),
        createdAt: new Date()
      }
      mockProductsStorage.push(newProduct)
      return newProduct
    }

    const response = await apiClient.post<Product>('/products', productData)
    return response.data
  },

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<Product | null> {
    if (USE_MOCKS) {
      await mockDelay()
      const index = mockProductsStorage.findIndex(p => p.id === id)
      if (index === -1) {
        return null
      }

      const updatedProduct = {
        ...mockProductsStorage[index],
        ...productData
      }
      mockProductsStorage[index] = updatedProduct
      return updatedProduct
    }

    try {
      const response = await apiClient.put<Product>(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (USE_MOCKS) {
      await mockDelay()
      const index = mockProductsStorage.findIndex(p => p.id === id)
      if (index === -1) {
        return false
      }

      mockProductsStorage.splice(index, 1)
      return true
    }

    try {
      await apiClient.delete(`/products/${id}`)
      return true
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false
      }
      throw error
    }
  }
}
