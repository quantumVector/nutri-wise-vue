import type { Product } from '@/entities/product'

export const mockProducts: Product[] = [
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
    createdAt: new Date('2024-01-15T10:30:00Z')
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
    createdAt: new Date('2024-01-16T14:20:00Z')
  },
  {
    id: '3',
    name: 'Брокколи',
    calories: 34,
    nutrients: {
      proteins: 2.8,
      fats: 0.4,
      carbohydrates: 7,
      fiber: 2.6
    },
    createdAt: new Date('2024-01-17T09:15:00Z')
  },
  {
    id: '4',
    name: 'Авокадо',
    calories: 160,
    nutrients: {
      proteins: 2,
      fats: 15,
      carbohydrates: 9,
      fiber: 7
    },
    createdAt: new Date('2024-01-18T16:45:00Z')
  },
  {
    id: '5',
    name: 'Овсянка',
    calories: 389,
    nutrients: {
      proteins: 16.9,
      fats: 6.9,
      carbohydrates: 66.3,
      fiber: 10.6
    },
    createdAt: new Date('2024-01-19T08:00:00Z')
  }
]
