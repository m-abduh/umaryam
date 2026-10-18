<script setup lang="ts">
import Reveal from '@/components/Reveal.vue'

const advantages = [
  {
    title: 'Fokus ayam kampung',
    description: 'Semua produk adalah ayam kampung asli: telur, DOC, hingga siap potong.',
    icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  },
  {
    title: 'Informasi produk jelas',
    description: 'Harga, satuan, dan deskripsi ditampilkan terbuka tanpa perlu bertanya dulu.',
    icon: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  },
  {
    title: 'Pemesanan lebih praktis',
    description: 'Atur jumlah di keranjang, pesanan tersusun otomatis tanpa mencatat manual.',
    icon: 'M13 2 4 14h7l-1 8 9-12h-7z',
  },
  {
    title: 'Komunikasi via WhatsApp',
    description: 'Lanjutkan konfirmasi langsung ke WhatsApp dengan ringkasan pesanan lengkap.',
    icon: 'M21 11.5a8.38 8.38 0 0 1-12.5 7.3L3 21l2.2-5.5A8.38 8.38 0 1 1 21 11.5Z',
  },
]
</script>

<template>
  <section id="keunggulan" class="bg-white py-16 sm:py-20 lg:py-24">
    <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div class="mx-auto max-w-2xl text-center">
          <span
            class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-100"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Kenapa Umaryam
          </span>
          <h2 class="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Spesialis ayam kampung, dari telur hingga siap potong
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Kami fokus pada ayam kampung dan merapikan proses belanja agar Anda cukup memilih produk
            dan jumlah.
          </p>
        </div>
      </Reveal>

      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal
          v-for="(advantage, index) in advantages"
          :key="advantage.title"
          :delay="index * 0.08"
          class="h-full"
        >
          <div
            class="flex h-full flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-[var(--shadow-soft)]"
          >
            <span class="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8">
                <path :d="advantage.icon" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <h3 class="text-base font-bold text-slate-900">{{ advantage.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-500">{{ advantage.description }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
