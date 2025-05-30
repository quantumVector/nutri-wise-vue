<script setup lang="ts">
import { reactive } from 'vue'

const items = reactive([
  {
    title: 'Home',
    to: '/',
    icon: 'home'
  },
  {
    title: 'Profile',
    to: '/profile',
    icon: 'account'
  },
  {
    title: 'Meals',
    to: '/meals',
    icon: 'food'
  },
  {
    title: 'Products',
    to: '/products',
    icon: 'package-variant-closed'
  }
])
</script>

<template>
  <v-list>
    <v-list-item
      v-for="({ icon, title, to }, index) in items"
      :key="index"
      :to="to"
      :title="title"
      :prepend-icon="'mdi-' + icon"
      link
    ></v-list-item>
  </v-list>
</template>
