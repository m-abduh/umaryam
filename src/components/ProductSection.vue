<script setup lang="ts">
import { computed } from 'vue'
import Reveal from '@/components/Reveal.vue'
import ProductCard from '@/components/ProductCard.vue'
import { productsByCategory, type CategoryId } from '@/data/products'

const props = withDefaults(
  defineProps<{
    id: CategoryId
    title: string
    tagline: string
    description: string
    tone?: 'plain' | 'muted'
  }>(),
  { tone: 'plain' },
)

const items = computed(() => productsByCategory(props.id))
</script>

<template>
  <section
    :id="props.id"
    class="py-16 sm:py-20 lg:py-24"
    :class="props.tone === 'muted' ? 'bg-slate-50' : 'bg-white'"
  >
    <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div class="max-w-2xl">
          <span
            class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-100"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {{ props.tagline }}
          </span>
          <h2 class="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {{ props.title }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            {{ props.description }}
          </p>
        </div>
      </Reveal>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Reveal
          v-for="(product, index) in items"
          :key="product.id"
          :delay="index * 0.06"
          class="h-full"
        >
          <ProductCard :product="product" />
        </Reveal>
      </div>
    </div>
  </section>
</template>
