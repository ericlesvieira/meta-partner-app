<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-normal"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-normal"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeOnBackdrop && close()"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-normal"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-fast"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="modelValue"
            ref="modalRef"
            :class="modalClasses"
            role="dialog"
            aria-modal="true"
            @keydown.esc="closeOnEsc && close()"
          >
            <!-- Header -->
            <div v-if="title || $slots.header" class="flex items-center justify-between px-6 py-4 border-b border-border">
              <slot name="header">
                <h2 class="text-lg font-semibold text-text-primary">{{ title }}</h2>
              </slot>
              <button
                v-if="showClose"
                type="button"
                class="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-surface-elevated/50">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  showClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
  closeOnEsc: true,
  showClose: true,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalRef = ref<HTMLElement>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

const modalClasses = computed(() => [
  'relative w-full bg-surface rounded-xl shadow-xl',
  sizeClasses[props.size],
])

function close() {
  emit('update:modelValue', false)
  emit('close')
}

// Lock body scroll when modal is open
watch(() => props.modelValue, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    // Focus trap
    setTimeout(() => modalRef.value?.focus(), 0)
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

defineExpose({ close })
</script>
