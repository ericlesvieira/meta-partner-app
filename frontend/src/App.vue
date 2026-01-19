<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

// Initialize theme on app start
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>
