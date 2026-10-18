<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    label?: string
  }>(),
  {
    min: 1,
    label: 'Jumlah',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const display = computed(() => props.modelValue)

function commit(value: number) {
  const next = Math.floor(Number(value)) || props.min
  emit('update:modelValue', Math.max(props.min, next))
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value.replace(/[^0-9]/g, '')
  target.value = raw
  if (raw === '') return
  commit(Number(raw))
}

function onBlur(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  const value = Math.max(props.min, Math.floor(Number(target.value)) || props.min)
  target.value = String(value)
  commit(value)
}
</script>

<template>
  <div
    class="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm"
    role="group"
    :aria-label="props.label"
  >
    <motion.button
      type="button"
      class="grid h-9 w-9 place-items-center rounded-full text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-40 sm:h-8 sm:w-8"
      :disabled="display <= props.min"
      :while-press="{ scale: 0.86 }"
      :aria-label="`Kurangi ${props.label}`"
      @click="commit(display - 1)"
    >
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4">
        <path d="M5 12h14" stroke-linecap="round" />
      </svg>
    </motion.button>

    <input
      class="w-12 border-0 bg-transparent text-center text-sm font-semibold text-slate-800 outline-none"
      type="text"
      inputmode="numeric"
      :value="display"
      :aria-label="props.label"
      @input="onInput"
      @blur="onBlur"
    />

    <motion.button
      type="button"
      class="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 sm:h-8 sm:w-8"
      :while-press="{ scale: 0.86 }"
      :aria-label="`Tambah ${props.label}`"
      @click="commit(display + 1)"
    >
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4">
        <path d="M12 5v14M5 12h14" stroke-linecap="round" />
      </svg>
    </motion.button>
  </div>
</template>
