<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts'
import { NavMenu } from '@/widgets/navigation'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
  <v-app>
    <component :is="layout">
      <template v-slot:navigation>
        <NavMenu />
      </template>
      <RouterView />
    </component>
  </v-app>
</template>
