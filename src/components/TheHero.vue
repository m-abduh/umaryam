<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion-v'
import { brand } from '@/config'
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

const visualRef = ref<HTMLElement | null>(null)
const pointerX = useMotionValue(0)
const pointerY = useMotionValue(0)
const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
  stiffness: 90,
  damping: 20,
})
const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), {
  stiffness: 90,
  damping: 20,
})

let reduceMotion = false
let rect: DOMRect | null = null

function onPointerEnter() {
  rect = visualRef.value?.getBoundingClientRect() ?? null
}

function onPointerMove(event: PointerEvent) {
  if (reduceMotion || event.pointerType !== 'mouse') return
  const el = visualRef.value
  if (!el) return
  if (!rect) rect = el.getBoundingClientRect()
  pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
  pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
}

function resetTilt() {
  pointerX.set(0)
  pointerY.set(0)
  rect = null
}

const orbitRadius = 138
const orbit = [
  { emoji: '🥚', label: 'Telur kampung', angle: -90 },
  { emoji: '🐣', label: 'DOC kampung', angle: 30 },
  { emoji: '🐓', label: 'Ayam kampung', angle: 150 },
]

const centerItems = ['🥚', '🐣', '🐓']
const centerIndex = ref(0)
let centerTimer: number | undefined

function orbitStyle(angle: number) {
  const rad = (angle * Math.PI) / 180
  return {
    left: `calc(50% + ${Math.cos(rad) * orbitRadius}px)`,
    top: `calc(50% + ${Math.sin(rad) * orbitRadius}px)`,
    transform: 'translate(-50%, -50%)',
  }
}

const particles = Array.from({ length: 6 }).map((_, index) => ({
  id: index,
  left: `${14 + index * 13}%`,
  top: `${18 + (index % 3) * 24}%`,
  size: 4 + (index % 3) * 3,
  duration: 3 + (index % 3),
  delay: index * 0.4,
}))

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  centerTimer = window.setInterval(() => {
    centerIndex.value = (centerIndex.value + 1) % centerItems.length
  }, 3000)
})

onUnmounted(() => {
  resetTilt()
  window.clearInterval(centerTimer)
})
</script>

<template>
  <section id="beranda" class="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 lg:pb-24">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl will-change-transform"
        :animate="{ y: [0, 26, 0] }"
        :transition="{ duration: 14, repeat: Infinity, ease: 'easeInOut' }"
      />
      <motion.div
        class="absolute -right-16 top-40 h-80 w-80 rounded-full bg-brand-50 blur-3xl will-change-transform"
        :animate="{ y: [0, -30, 0] }"
        :transition="{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
      />
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

      <div
        ref="visualRef"
        class="relative [perspective:1100px]"
        @pointerenter="onPointerEnter"
        @pointermove="onPointerMove"
        @pointerleave="resetTilt"
      >
        <div
          class="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-brand-200/40 blur-2xl"
        />
        <motion.div
          class="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/40 blur-3xl will-change-[opacity]"
          :animate="{ opacity: [0.45, 0.85, 0.45] }"
          :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut' }"
        />

        <motion.div
          class="relative"
          :initial="{ opacity: 0, scale: 0.94, y: 30 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }"
          :style="{ rotateX, rotateY, transformPerspective: 1100 }"
        >
          <div
            class="relative mx-auto flex h-80 w-full max-w-md items-center justify-center rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/70 shadow-[var(--shadow-soft)] sm:h-96 lg:h-[26rem]"
          >
            <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
              <motion.div
                class="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-70 will-change-transform"
                style="background: conic-gradient(from 0deg, transparent 0deg, rgba(34, 197, 94, 0.22) 90deg, transparent 180deg, rgba(74, 222, 128, 0.2) 270deg, transparent 360deg)"
                :animate="{ rotate: 360 }"
                :transition="{ duration: 24, repeat: Infinity, ease: 'linear' }"
              />
            </div>

            <div class="pointer-events-none absolute inset-0">
              <div
                class="absolute left-1/2 top-1/2 h-[276px] w-[276px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-200/70"
              />
              <motion.div
                class="absolute inset-0 will-change-transform"
                :animate="{ rotate: 360 }"
                :transition="{ duration: 30, repeat: Infinity, ease: 'linear' }"
              >
                <span
                  v-for="node in orbit"
                  :key="node.emoji"
                  class="absolute"
                  :style="orbitStyle(node.angle)"
                >
                  <motion.span
                    class="flex items-center gap-1.5 whitespace-nowrap rounded-2xl border border-brand-100 bg-white py-1.5 pl-2 pr-2.5 text-[11px] font-semibold text-slate-700 shadow-md"
                    :animate="{ rotate: -360 }"
                    :transition="{ duration: 30, repeat: Infinity, ease: 'linear' }"
                  >
                    <span class="text-base">{{ node.emoji }}</span>
                    {{ node.label }}
                  </motion.span>
                </span>
              </motion.div>
            </div>

            <motion.span
              v-for="particle in particles"
              :key="particle.id"
              class="pointer-events-none absolute rounded-full bg-brand-400"
              :style="{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }"
              :animate="{ y: [0, -16, 0], opacity: [0.2, 0.9, 0.2] }"
              :transition="{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay,
              }"
            />

            <motion.div
              class="relative z-10 grid place-items-center"
              :animate="{ y: [0, -10, 0] }"
              :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
            >
              <AnimatePresence>
                <motion.span
                  :key="centerIndex"
                  class="col-start-1 row-start-1 text-[5rem] leading-none drop-shadow-sm sm:text-[7rem]"
                  :initial="{ opacity: 0, y: 22 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :exit="{ opacity: 0, y: -22 }"
                  :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
                >
                  {{ centerItems[centerIndex] }}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            class="absolute -right-3 -top-3 rounded-2xl border border-brand-100 bg-white px-3 py-2 text-center shadow-lg"
            :initial="{ opacity: 0, scale: 0.7 }"
            :animate="{ opacity: 1, scale: 1, y: [0, -8, 0] }"
            :transition="{
              opacity: { duration: 0.5, delay: 0.8 },
              scale: { duration: 0.5, delay: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
            }"
          >
            <p class="text-[10px] font-semibold text-slate-400">Kualitas</p>
            <p class="text-sm font-extrabold text-brand-700">100% Kampung</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
</template>
