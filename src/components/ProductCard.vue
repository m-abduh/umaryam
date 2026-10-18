<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import QuantityControl from '@/components/QuantityControl.vue'
import { useCartStore } from '@/stores/cart'
import { formatRupiah } from '@/lib/format'
import type { Product } from '@/data/products'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const qty = ref(1)
const justAdded = ref(false)
let resetTimer: number | undefined

function addToCart() {
  cart.add(props.product.id, qty.value)
  qty.value = 1
  justAdded.value = true
  window.clearTimeout(resetTimer)
  resetTimer = window.setTimeout(() => {
    justAdded.value = false
  }, 1500)
}
</script>

<template>
  <motion.article
    class="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm ring-1 ring-transparent transition-shadow hover:shadow-[var(--shadow-soft)] hover:ring-brand-100"
    :while-hover="{ y: -6 }"
    :transition="{ type: 'spring', stiffness: 260, damping: 24 }"
  >
    <div
      class="relative flex h-40 items-center justify-center overflow-hidden sm:h-44"
      :style="{ backgroundImage: props.product.gradient }"
    >
      <motion.span
        class="text-6xl drop-shadow-sm sm:text-7xl"
        :initial="{ scale: 0.85, opacity: 0 }"
        :while-in-view="{ scale: 1, opacity: 1 }"
        :in-view-options="{ once: true, amount: 0.4 }"
        :transition="{ type: 'spring', stiffness: 200, damping: 18 }"
      >
        {{ props.product.emoji }}
      </motion.span>
      <span
        class="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur"
      >
        {{ props.product.unit }}
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div>
        <h3 class="text-base font-bold text-slate-900 sm:text-lg">{{ props.product.name }}</h3>
        <p class="mt-1 text-sm leading-relaxed text-slate-500">
          {{ props.product.description }}
        </p>
      </div>

      <p v-if="props.product.note" class="text-xs leading-relaxed text-amber-700/90">
        {{ props.product.note }}
      </p>

      <div class="mt-auto space-y-3">
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-extrabold text-brand-700 sm:text-2xl">
            {{ formatRupiah(props.product.price) }}
          </span>
          <span class="text-sm font-medium text-slate-400">/ {{ props.product.unit }}</span>
        </div>

        <div class="flex items-center justify-between gap-2">
          <QuantityControl v-model="qty" :label="props.product.name" />
          <span class="text-xs font-medium text-slate-400">Subtotal</span>
        </div>

        <motion.button
          type="button"
          class="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
          :class="justAdded ? 'bg-brand-700' : 'bg-brand-600 hover:bg-brand-700'"
          :while-press="{ scale: 0.97 }"
          :while-hover="{ scale: 1.01 }"
          @click="addToCart"
        >
          <motion.span
            :key="justAdded ? 'added' : 'add'"
            :initial="{ y: 14, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 0.22, ease: 'easeOut' }"
            class="inline-flex items-center gap-2"
          >
            <svg
              v-if="!justAdded"
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M6 6h15l-1.5 9h-12zM6 6 5 3H2m4 3 1.5 12h11M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
            >
              <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ justAdded ? 'Ditambahkan' : 'Tambah ke Keranjang' }}
          </motion.span>
        </motion.button>
      </div>
    </div>
  </motion.article>
</template>
