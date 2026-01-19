<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-normal"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-fast"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="pointer-events-auto"
        >
          <div class="flex items-start gap-3">
            <div :class="iconClasses(toast.type)">
              <component :is="getIcon(toast.type)" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p v-if="toast.title" class="font-medium text-text-primary">{{ toast.title }}</p>
              <p class="text-sm text-text-secondary">{{ toast.message }}</p>
            </div>
            <button
              type="button"
              class="flex-shrink-0 p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
              @click="removeToast(toast.id)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: number
  type: ToastType
  title?: string
  message: string
  duration: number
}

const toasts = ref<Toast[]>([])
let idCounter = 0

function toastClasses(type: ToastType) {
  const base = 'w-80 p-4 rounded-xl shadow-lg border'
  const variants = {
    success: 'bg-surface border-green-200 dark:border-green-800',
    error: 'bg-surface border-red-200 dark:border-red-800',
    warning: 'bg-surface border-yellow-200 dark:border-yellow-800',
    info: 'bg-surface border-blue-200 dark:border-blue-800',
  }
  return [base, variants[type]]
}

function iconClasses(type: ToastType) {
  const variants = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  }
  return variants[type]
}

function getIcon(type: ToastType) {
  const icons = {
    success: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', 'clip-rule': 'evenodd' })
    ]),
    error: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z', 'clip-rule': 'evenodd' })
    ]),
    warning: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
    ]),
    info: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z', 'clip-rule': 'evenodd' })
    ]),
  }
  return icons[type]
}

function addToast(options: Omit<Toast, 'id'>) {
  const id = ++idCounter
  const toast: Toast = { ...options, id }
  toasts.value.push(toast)

  if (options.duration > 0) {
    setTimeout(() => removeToast(id), options.duration)
  }

  return id
}

function removeToast(id: number) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Toast API
function success(message: string, title?: string, duration = 4000) {
  return addToast({ type: 'success', message, title, duration })
}

function error(message: string, title?: string, duration = 5000) {
  return addToast({ type: 'error', message, title, duration })
}

function warning(message: string, title?: string, duration = 4000) {
  return addToast({ type: 'warning', message, title, duration })
}

function info(message: string, title?: string, duration = 4000) {
  return addToast({ type: 'info', message, title, duration })
}

defineExpose({
  success,
  error,
  warning,
  info,
  remove: removeToast,
})
</script>
