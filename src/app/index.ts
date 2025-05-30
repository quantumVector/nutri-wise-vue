import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

import { router } from './providers'

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

export const app = createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
