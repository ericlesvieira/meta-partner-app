<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-border">
      <slot name="header" />
    </div>
    <div :class="['px-6 py-4', bodyClass]">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-border bg-surface-elevated/50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered'
  hoverable?: boolean
  clickable?: boolean
  bodyClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  clickable: false,
  bodyClass: '',
})

const baseClasses = 'rounded-xl overflow-hidden transition-all duration-normal'

const variantClasses = {
  default: 'bg-surface border border-border',
  elevated: 'bg-surface shadow-lg',
  glass: 'glass',
  bordered: 'bg-surface border-2 border-border',
}

const interactiveClasses = computed(() => {
  if (props.clickable) {
    return 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md'
  }
  if (props.hoverable) {
    return 'hover:shadow-md hover:border-border-hover'
  }
  return ''
})

const cardClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  interactiveClasses.value,
])
</script>
