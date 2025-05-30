export const routes = [
  {
    path: '/',
    component: () => import('@/app/pages/home/'),
  },
  {
    path: '/meals',
    component: () => import('@/app/pages/meals/'),
  },
  {
    path: '/products',
    component: () => import('@/app/pages/products/'),
  },
  {
    path: '/profile',
    component: () => import('@/app/pages/profile/'),
  },
]
