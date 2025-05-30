<template>
  <v-layout class="rounded rounded-md" ref="app">
    <slot name="navigation" />
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
