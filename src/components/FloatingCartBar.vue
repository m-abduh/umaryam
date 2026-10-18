<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { useCartStore } from '@/stores/cart'
import { formatRupiah } from '@/lib/format'

const cart = useCartStore()
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="cart.count > 0 && !cart.isOpen"
        class="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-brand-700 p-2.5 pl-4 text-white shadow-2xl"
        :initial="{ opacity: 0, y: 80 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 80 }"
        :transition="{ type: 'spring', stiffness: 320, damping: 30 }"
      >
        <div class="flex items-center gap-3">
          <span class="relative grid h-9 w-9 place-items-center rounded-xl bg-white/15">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M6 6h15l-1.5 9h-12zM6 6 5 3H2m4 3 1.5 12h11M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <motion.span
              :key="cart.count"
              class="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-brand-900 ring-2 ring-brand-700"
              :initial="{ scale: 0 }"
              :animate="{ scale: 1 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 20 }"
            >
              {{ cart.count }}
            </motion.span>
          </span>
          <div class="leading-tight">
            <p class="text-[11px] text-brand-100">{{ cart.count }} unit di keranjang</p>
            <p class="text-sm font-extrabold">{{ formatRupiah(cart.subtotal) }}</p>
          </div>
        </div>

        <motion.button
          type="button"
          class="shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
          :while-press="{ scale: 0.95 }"
          @click="cart.open()"
        >
          Lihat Keranjang
        </motion.button>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>
