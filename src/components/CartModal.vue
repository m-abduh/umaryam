<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import QuantityControl from '@/components/QuantityControl.vue'
import { useCartStore } from '@/stores/cart'
import { formatRupiah } from '@/lib/format'
import { buildOrderMessage, buildWhatsAppLink } from '@/lib/whatsapp'

const cart = useCartStore()

const customer = ref({ name: '', note: '' })
const error = ref('')

const checkoutLink = computed(() =>
  buildWhatsAppLink(buildOrderMessage(cart.items, customer.value, cart.subtotal)),
)

function close() {
  cart.close()
}

function setQty(id: string, qty: number) {
  cart.setQty(id, qty)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab') return

  const panel = document.querySelector<HTMLElement>('[role="dialog"]')
  if (!panel) return

  const focusable = panel.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

function checkout() {
  if (!customer.value.name.trim()) {
    error.value = 'Mohon isi nama pemesan sebelum checkout.'
    return
  }
  error.value = ''
  window.open(checkoutLink.value, '_blank', 'noopener')
}

function emptyAction() {
  close()
  nextTick(() => {
    document.querySelector('#telur')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

watch(
  () => cart.isOpen,
  (open) => {
    if (open) {
      error.value = ''
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
      nextTick(() => {
        document.querySelector<HTMLElement>('[role="dialog"]')?.focus()
      })
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <div v-if="cart.isOpen" class="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
        <motion.div
          class="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.25 }"
          @click="close"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Keranjang belanja"
          tabindex="-1"
          class="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:max-h-[88vh] sm:max-w-lg sm:rounded-3xl"
          :initial="{ opacity: 0, y: 60, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: 48, scale: 0.98 }"
          :transition="{ type: 'spring', stiffness: 320, damping: 30 }"
        >
          <header class="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div class="flex items-center gap-2.5">
              <span class="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M6 6h15l-1.5 9h-12zM6 6 5 3H2m4 3 1.5 12h11M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h2 class="text-base font-bold text-slate-900">Keranjang</h2>
                <p class="text-xs text-slate-400">{{ cart.count }} unit produk</p>
              </div>
            </div>
            <motion.button
              type="button"
              class="grid h-9 w-9 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              :while-press="{ scale: 0.9 }"
              aria-label="Tutup keranjang"
              @click="close"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
              </svg>
            </motion.button>
          </header>

          <div v-if="cart.isEmpty" class="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <span class="grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-4xl">🧺</span>
            <div>
              <h3 class="text-base font-bold text-slate-900">Keranjang masih kosong</h3>
              <p class="mt-1 text-sm text-slate-500">
                Pilih produk telur, DOC, atau ayam kampung untuk mulai memesan.
              </p>
            </div>
            <motion.button
              type="button"
              class="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              :while-press="{ scale: 0.97 }"
              @click="emptyAction"
            >
              Lihat Produk
            </motion.button>
          </div>

          <template v-else>
            <div class="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              <AnimatePresence>
                <motion.div
                  v-for="item in cart.items"
                  :key="item.id"
                  layout
                  class="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3"
                  :initial="{ opacity: 0, x: 24 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }"
                  :transition="{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }"
                >
                  <div
                    class="grid h-16 w-16 shrink-0 place-items-center rounded-xl text-3xl"
                    :style="{ backgroundImage: item.gradient }"
                  >
                    {{ item.emoji }}
                  </div>
                  <div class="flex min-w-0 flex-1 flex-col gap-2">
                    <div class="flex items-start justify-between gap-2">
                      <div class="min-w-0">
                        <h3 class="truncate text-sm font-bold text-slate-900">{{ item.name }}</h3>
                        <p class="text-xs text-slate-400">
                          {{ formatRupiah(item.price) }} / {{ item.unit }}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="shrink-0 rounded-full p-1.5 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        aria-label="Hapus produk"
                        @click="cart.remove(item.id)"
                      >
                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2">
                          <path
                            d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="flex items-center justify-between gap-2">
                      <QuantityControl
                        :model-value="item.qty"
                        :label="item.name"
                        @update:model-value="(value) => setQty(item.id, value)"
                      />
                      <span class="text-sm font-bold text-brand-700">
                        {{ formatRupiah(item.lineTotal) }}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div class="space-y-3 rounded-2xl bg-slate-50 p-4">
                <h3 class="text-sm font-bold text-slate-900">Informasi Pemesan</h3>
                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-500" for="cart-name">
                    Nama <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="cart-name"
                    v-model="customer.name"
                    type="text"
                    placeholder="Nama pemesan"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-xs font-medium text-slate-500" for="cart-note">
                    Catatan (opsional)
                  </label>
                  <textarea
                    id="cart-note"
                    v-model="customer.note"
                    rows="2"
                    placeholder="Contoh: minta diantar sore hari"
                    class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
            </div>

            <footer class="border-t border-slate-100 px-5 py-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">Subtotal</span>
                <span class="font-semibold text-slate-700">{{ formatRupiah(cart.subtotal) }}</span>
              </div>
              <div class="mt-1 flex items-center justify-between">
                <span class="text-sm text-slate-500">Total</span>
                <span class="text-lg font-extrabold text-brand-700">
                  {{ formatRupiah(cart.subtotal) }}
                </span>
              </div>
              <p v-if="error" class="mt-2 text-xs font-medium text-rose-500">{{ error }}</p>
              <motion.button
                type="button"
                class="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-brand-700"
                :while-press="{ scale: 0.98 }"
                @click="checkout"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                  <path
                    d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Z"
                  />
                </svg>
                Checkout via WhatsApp
              </motion.button>
              <button
                type="button"
                class="mt-2 w-full rounded-2xl py-2 text-xs font-medium text-slate-400 transition-colors hover:text-rose-500"
                @click="cart.clear()"
              >
                Kosongkan keranjang
              </button>
            </footer>
          </template>
        </motion.div>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
