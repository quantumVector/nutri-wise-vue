export const routes = [
  {
    path: '/',
    component: () => import('@/pages/home/'),
  },
  {
    path: '/meals',
    component: () => import('@/pages/meals/'),
  },
  {
    path: '/products',
    component: () => import('@/pages/products/'),
  },
  {
    path: '/profile',
    component: () => import('@/pages/profile/'),
  },
]
