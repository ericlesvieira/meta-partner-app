<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-text-primary mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
        <slot name="prefix" />
      </div>
      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div v-if="$slots.suffix || clearable" class="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
        <button
          v-if="clearable && modelValue"
          type="button"
          class="text-text-muted hover:text-text-secondary transition-colors"
          @click="$emit('update:modelValue', '')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="error" class="mt-1.5 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1.5 text-sm text-text-muted">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  autocomplete?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  disabled: false,
  required: false,
  clearable: false,
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement>()
const inputId = useId()

const hasPrefix = computed(() => !!props.modelValue)

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
}

const inputClasses = computed(() => [
  'w-full rounded-lg border bg-surface text-text-primary placeholder:text-text-muted transition-all duration-normal',
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  'disabled:bg-surface-elevated disabled:text-text-muted disabled:cursor-not-allowed',
  sizeClasses[props.size],
  props.error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-border hover:border-border-hover',
  hasPrefix.value ? 'pl-10' : '',
])

function focus() {
  inputRef.value?.focus()
}

defineExpose({ focus, inputRef })
</script>
