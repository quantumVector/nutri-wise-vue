import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import App from './App.vue'

import { router } from './providers'

const pinia = createPinia()
const vuetify = createVuetify()

export const app = createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
