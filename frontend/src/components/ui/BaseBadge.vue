<template>
  <span :class="badgeClasses">
    <span v-if="dot" :class="dotClasses" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false,
  rounded: false,
})

const baseClasses = 'inline-flex items-center font-medium'

const variantClasses = {
  default: 'bg-surface-elevated text-text-secondary border border-border',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

const dotVariantClasses = {
  default: 'bg-text-muted',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  primary: 'bg-primary-500',
}

const badgeClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.rounded ? 'rounded-full' : 'rounded-md',
])

const dotClasses = computed(() => [
  'w-1.5 h-1.5 rounded-full',
  dotVariantClasses[props.variant],
])
</script>
