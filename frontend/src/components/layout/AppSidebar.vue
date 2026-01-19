<template>
  <aside :class="sidebarClasses">
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 px-4 border-b border-border">
      <router-link to="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="ericlestatistica" class="h-10 w-10 rounded-full object-cover" />
        <span v-if="!collapsed" class="font-bold text-lg text-text-primary whitespace-nowrap">
          Meta SP Manager
        </span>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <div v-for="group in navigationGroups" :key="group.label" class="mb-6">
        <p v-if="!collapsed && group.label" class="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
          {{ group.label }}
        </p>
        <router-link
          v-for="item in group.items"
          :key="item.name"
          :to="{ name: item.name }"
          :class="navItemClasses(item.name)"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Collapse Toggle (desktop) -->
    <div class="hidden lg:flex items-center justify-center p-3 border-t border-border">
      <button
        type="button"
        class="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
        @click="$emit('toggle-collapse')"
      >
        <svg :class="['w-5 h-5 transition-transform', collapsed && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

defineEmits<{
  'toggle-collapse': []
}>()

const route = useRoute()

// Icons as render functions
const HomeIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])

const DashboardIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })
])

const WabaIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })
])

const TemplatesIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const AnalyticsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const SettingsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])

const PrivacyIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const TermsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })
])

const DataDeletionIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
])

const navigationGroups = [
  {
    label: '',
    items: [
      { name: 'Home', label: 'Home', icon: HomeIcon },
      { name: 'Dashboard', label: 'Dashboard', icon: DashboardIcon },
    ],
  },
  {
    label: 'Gerenciamento',
    items: [
      { name: 'WabaManagement', label: 'WABA', icon: WabaIcon },
      { name: 'Templates', label: 'Templates', icon: TemplatesIcon },
      { name: 'Analytics', label: 'Analytics', icon: AnalyticsIcon },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { name: 'Settings', label: 'Configuracoes', icon: SettingsIcon },
    ],
  },
  {
    label: 'Legal',
    items: [
      { name: 'PrivacyPolicy', label: 'Privacidade', icon: PrivacyIcon },
      { name: 'TermsOfService', label: 'Termos', icon: TermsIcon },
      { name: 'DataDeletion', label: 'Exclusao de Dados', icon: DataDeletionIcon },
    ],
  },
]

const sidebarClasses = computed(() => [
  'fixed inset-y-0 left-0 z-40 flex flex-col bg-surface border-r border-border transition-all duration-slow',
  props.collapsed ? 'w-20' : 'w-[280px]',
])

function navItemClasses(routeName: string) {
  const isActive = route.name === routeName
  return [
    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-fast',
    props.collapsed ? 'justify-center' : '',
    isActive
      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
  ]
}
</script>
