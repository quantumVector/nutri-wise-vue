import axios from 'axios'

// Флаг для переключения между моками и реальным API
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Базовый URL для API (когда моки будут отключены)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Настройка Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем интерцепторы для обработки ответов и ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Симуляция задержки сети для моков
export const mockDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))
