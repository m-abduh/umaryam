<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { brand, navLinks } from '@/config'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function goTo(href: string) {
  menuOpen.value = false
  const target = document.querySelector(href)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="scrolled ? 'bg-white/85 shadow-sm backdrop-blur-md' : 'bg-transparent'"
  >
    <nav class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
      <a
        href="#beranda"
        class="flex items-center gap-2.5"
        @click.prevent="goTo('#beranda')"
      >
        <span
          class="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-[var(--shadow-soft)]"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none">
            <ellipse cx="12" cy="13" rx="6" ry="8" fill="currentColor" opacity="0.95" />
            <circle cx="12" cy="13" r="2.4" fill="#16a34a" />
          </svg>
        </span>
        <span class="flex flex-col leading-none">
          <span class="text-lg font-extrabold tracking-tight text-slate-900">{{ brand.name }}</span>
          <span class="hidden text-[11px] font-medium text-slate-400 lg:block">{{ brand.tagline }}</span>
        </span>
      </a>

      <div class="hidden items-center gap-1 md:flex">
        <button
          v-for="link in navLinks"
          :key="link.href"
          type="button"
          class="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
          @click="goTo(link.href)"
        >
          {{ link.label }}
        </button>
      </div>

      <div class="flex items-center gap-2">
        <motion.button
          type="button"
          class="relative grid h-11 w-11 place-items-center rounded-2xl bg-brand-600 text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-brand-700"
          :while-press="{ scale: 0.92 }"
          aria-label="Buka keranjang"
          @click="cart.open()"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M6 6h15l-1.5 9h-12zM6 6 5 3H2m4 3 1.5 12h11M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <AnimatePresence>
            <motion.span
              v-if="cart.count > 0"
              :key="cart.count"
              class="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white ring-2 ring-white"
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :exit="{ scale: 0, opacity: 0 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 22 }"
            >
              {{ cart.count }}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 md:hidden"
          :while-press="{ scale: 0.92 }"
          aria-label="Menu navigasi"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
            <path v-else d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </motion.button>
      </div>
    </nav>

    <AnimatePresence>
      <motion.div
        v-if="menuOpen"
        class="mx-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-[var(--shadow-soft)] md:hidden"
        :initial="{ opacity: 0, height: 0, y: -8 }"
        :animate="{ opacity: 1, height: 'auto', y: 0 }"
        :exit="{ opacity: 0, height: 0, y: -8 }"
        :transition="{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }"
      >
        <button
          v-for="link in navLinks"
          :key="link.href"
          type="button"
          class="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
          @click="goTo(link.href)"
        >
          {{ link.label }}
        </button>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
