<template>
  <div class="min-h-screen bg-surface">
    <!-- Mobile sidebar overlay -->
    <Transition
      enter-active-class="transition-opacity duration-normal"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-normal"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile sidebar -->
    <Transition
      enter-active-class="transition-transform duration-slow"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-slow"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-y-0 left-0 z-50 lg:hidden">
        <AppSidebar @toggle-collapse="isMobileMenuOpen = false" />
      </div>
    </Transition>

    <!-- Desktop sidebar -->
    <div class="hidden lg:block">
      <AppSidebar :collapsed="isSidebarCollapsed" @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed" />
    </div>

    <!-- Main content -->
    <div :class="['transition-all duration-slow', mainContentClasses]">
      <AppHeader @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen" />

      <main class="p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useTheme } from '../../composables/useTheme'

// Initialize theme on app load
useTheme()

const isMobileMenuOpen = ref(false)
const isSidebarCollapsed = ref(false)

const mainContentClasses = computed(() => [
  'min-h-screen',
  isSidebarCollapsed.value ? 'lg:ml-20' : 'lg:ml-[280px]',
])

// Close mobile menu on route change
onMounted(() => {
  // Could add router afterEach hook here if needed
})
</script>
