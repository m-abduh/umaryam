<script setup lang="ts">
import { brand, contact, navLinks } from '@/config'

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <footer class="border-t border-slate-100 bg-white pb-28 pt-14 sm:pb-16">
    <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2.5">
            <span class="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none">
                <ellipse cx="12" cy="13" rx="6" ry="8" fill="currentColor" opacity="0.95" />
                <circle cx="12" cy="13" r="2.4" fill="#16a34a" />
              </svg>
            </span>
            <span class="text-lg font-extrabold tracking-tight text-slate-900">{{ brand.name }}</span>
          </div>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            {{ brand.name }} adalah spesialis ayam kampung yang menyediakan telur, DOC, dan ayam
            kampung dengan informasi yang jelas serta pemesanan praktis melalui WhatsApp.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">Navigasi</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in navLinks" :key="link.href">
              <button
                type="button"
                class="text-sm text-slate-500 transition-colors hover:text-brand-700"
                @click="goTo(link.href)"
              >
                {{ link.label }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="text-sm text-slate-500 transition-colors hover:text-brand-700"
                @click="goTo('#cara-pesan')"
              >
                Cara Pemesanan
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">Kontak</h3>
          <ul class="mt-4 space-y-2.5 text-sm text-slate-500">
            <li>{{ contact.address }}</li>
            <li>{{ contact.hours }}</li>
            <li>{{ contact.email }}</li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ new Date().getFullYear() }} {{ brand.name }}. Seluruh hak cipta dilindungi.</p>
        <p>Harga dan ketersediaan dikonfirmasi saat checkout via WhatsApp.</p>
      </div>
    </div>
  </footer>
</template>
