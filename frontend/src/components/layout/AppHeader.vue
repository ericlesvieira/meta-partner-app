<template>
  <header class="sticky top-0 z-30 h-16 bg-surface/80 backdrop-blur-md border-b border-border">
    <div class="flex items-center justify-between h-full px-4 lg:px-6">
      <!-- Mobile menu button -->
      <button
        type="button"
        class="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
        @click="$emit('toggle-mobile-menu')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Page title / Breadcrumb -->
      <div class="flex-1 min-w-0 lg:ml-0 ml-4">
        <h1 class="text-lg font-semibold text-text-primary truncate">
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center gap-2">
        <!-- Theme toggle -->
        <button
          type="button"
          class="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
          :title="isDark ? 'Modo claro' : 'Modo escuro'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- User menu placeholder -->
        <div class="flex items-center gap-2 pl-2 border-l border-border">
          <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <span class="text-sm font-medium text-primary-700 dark:text-primary-400">U</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../../composables/useTheme'

defineEmits<{
  'toggle-mobile-menu': []
}>()

const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const pageTitles: Record<string, string> = {
  Home: 'Inicio',
  Dashboard: 'Dashboard',
  WabaManagement: 'Gerenciamento WABA',
  Templates: 'Templates de Mensagens',
  Analytics: 'Analytics',
  Settings: 'Configuracoes',
  PrivacyPolicy: 'Politica de Privacidade',
  TermsOfService: 'Termos de Servico',
  DataDeletion: 'Exclusao de Dados',
}

const pageTitle = computed(() => {
  return pageTitles[route.name as string] || 'Meta SP Manager'
})
</script>
