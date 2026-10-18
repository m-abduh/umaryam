<script setup lang="ts">
import Reveal from '@/components/Reveal.vue'

const steps = [
  {
    title: 'Pilih produk',
    description: 'Temukan telur, DOC, atau ayam kampung yang Anda butuhkan.',
    emoji: '🔍',
  },
  {
    title: 'Masukkan ke keranjang',
    description: 'Atur jumlah tiap produk, lalu periksa ringkasan pesanan Anda.',
    emoji: '🧺',
  },
  {
    title: 'Checkout via WhatsApp',
    description: 'Kirim ringkasan pesanan untuk dikonfirmasi langsung oleh penjual.',
    emoji: '💬',
  },
]
</script>

<template>
  <section id="cara-pesan" class="bg-slate-50 py-16 sm:py-20 lg:py-24">
    <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div class="mx-auto max-w-2xl text-center">
          <span
            class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-100"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Cara Pemesanan
          </span>
          <h2 class="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Tiga langkah, pesanan siap dikirim
          </h2>
        </div>
      </Reveal>

      <div class="relative mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <Reveal
          v-for="(step, index) in steps"
          :key="step.title"
          :delay="index * 0.1"
          class="h-full"
        >
          <div
            class="relative flex h-full flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <span
              class="absolute right-5 top-5 text-3xl font-extrabold text-brand-100 sm:text-4xl"
            >
              0{{ index + 1 }}
            </span>
            <span class="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl">
              {{ step.emoji }}
            </span>
            <h3 class="mt-1 text-base font-bold text-slate-900 sm:text-lg">{{ step.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-500">{{ step.description }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
