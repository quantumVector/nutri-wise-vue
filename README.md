# API Layer

Этот слой отвечает за взаимодействие с сервером и управление данными.

## Структура

```
src/shared/api/
├── config.ts          # Конфигурация API и Axios
├── types.ts           # Общие типы для API
├── products.ts        # API методы для продуктов
├── mocks/            
│   ├── index.ts       # Экспорт всех моков
│   └── products.ts    # Тестовые данные продуктов
└── index.ts          # Главный экспорт
```

## Использование

### Переключение между моками и реальным API

В файле `.env` установите переменную:

```bash
# Использовать моки
VITE_USE_MOCKS=true

# Использовать реальный API
VITE_USE_MOCKS=false
```

### Пример использования в store

```typescript
import { productsApi } from '@/shared/api'

// Получить все продукты
const products = await productsApi.getProducts()

// Создать продукт
const newProduct = await productsApi.createProduct(productData)

// Удалить продукт
const success = await productsApi.deleteProduct(id)
```

## Моки

Когда `VITE_USE_MOCKS=true`, все API запросы будут возвращать статические данные из папки `mocks/`.

Моки включают:
- Имитацию задержки сети (500ms по умолчанию)
- Локальное хранилище состояния
- Реалистичные данные для разработки

## Реальный API

Когда `VITE_USE_MOCKS=false`, запросы будут отправляться на сервер по адресу из `VITE_API_BASE_URL`.

Ожидаемые эндпоинты:
- `GET /api/products` - получить все продукты
- `POST /api/products` - создать продукт
- `GET /api/products/:id` - получить продукт по ID
- `PUT /api/products/:id` - обновить продукт
- `DELETE /api/products/:id` - удалить продукт
