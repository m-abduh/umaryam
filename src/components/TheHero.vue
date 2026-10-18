<script setup lang="ts">
import { motion } from 'motion-v'
import { brand, whatsapp } from '@/config'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const waLink = buildWhatsAppLink(
  `Halo ${brand.name}, saya ingin bertanya tentang telur, DOC, dan ayam kampung.`,
)

function scrollToCatalog() {
  document.querySelector('#telur')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const highlights = [
  { label: 'Telur kampung', emoji: '🥚' },
  { label: 'DOC kampung', emoji: '🐣' },
  { label: 'Ayam kampung', emoji: '🐓' },
]
</script>

<template>
  <section id="beranda" class="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 lg:pb-24">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div class="absolute -right-16 top-40 h-80 w-80 rounded-full bg-brand-50 blur-3xl" />
    </div>

    <div class="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
      <motion.div :variants="container" initial="hidden" animate="show" class="max-w-xl">
        <motion.span
          :variants="item"
          class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {{ brand.tagline }}
        </motion.span>

        <motion.h1
          :variants="item"
          class="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          {{ brand.headline }}
        </motion.h1>

        <motion.p :variants="item" class="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
          {{ brand.description }}
        </motion.p>

        <motion.div :variants="item" class="mt-8 flex flex-col gap-3 sm:flex-row">
          <motion.button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-brand-700"
            :while-press="{ scale: 0.97 }"
            :while-hover="{ scale: 1.02 }"
            @click="scrollToCatalog"
          >
            Lihat Produk
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </motion.button>

          <motion.a
            :href="waLink"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            :while-press="{ scale: 0.97 }"
            :while-hover="{ scale: 1.02 }"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
              <path
                d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.02c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.27-4.4c0-4.57 3.72-8.28 8.29-8.28 2.21 0 4.29.86 5.85 2.43a8.22 8.22 0 0 1 2.43 5.86c0 4.57-3.72 8.28-8.29 8.28Zm4.55-6.2c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29Z"
              />
            </svg>
            Pesan via WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        class="relative"
        :initial="{ opacity: 0, scale: 0.94, y: 30 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }"
      >
        <div
          class="relative mx-auto flex h-72 w-full max-w-md items-center justify-center rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/70 shadow-[var(--shadow-soft)] sm:h-80 lg:h-96"
        >
          <motion.span
            class="text-7xl sm:text-8xl"
            :animate="{ y: [0, -12, 0] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
          >
            🥚
          </motion.span>
          <motion.span
            class="absolute -left-2 bottom-10 text-6xl sm:text-7xl"
            :animate="{ y: [0, -10, 0] }"
            :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }"
          >
            🐣
          </motion.span>
          <motion.span
            class="absolute -right-1 top-12 text-6xl sm:text-7xl"
            :animate="{ y: [0, -14, 0] }"
            :transition="{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }"
          >
            🐓
          </motion.span>

          <div class="absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-lg backdrop-blur">
            <div class="grid grid-cols-3 gap-1 text-center">
              <div v-for="badge in highlights" :key="badge.label" class="px-1">
                <div class="text-lg">{{ badge.emoji }}</div>
                <div class="mt-0.5 text-[10px] font-semibold leading-tight text-slate-500">
                  {{ badge.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>
