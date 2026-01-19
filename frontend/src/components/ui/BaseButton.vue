<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="animate-spin mr-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm hover:shadow-md',
  secondary: 'bg-surface-elevated text-text-primary hover:bg-surface-hover border border-border focus-visible:ring-primary-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm hover:shadow-md',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover focus-visible:ring-primary-500',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:ring-primary-500',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

const buttonClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth ? 'w-full' : '',
])
</script>
