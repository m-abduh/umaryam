<script setup lang="ts">
import { MotionConfig } from 'motion-v'
import TheNavbar from '@/components/TheNavbar.vue'
import TheHero from '@/components/TheHero.vue'
import ProductSection from '@/components/ProductSection.vue'
import AdvantagesSection from '@/components/AdvantagesSection.vue'
import HowToOrderSection from '@/components/HowToOrderSection.vue'
import TheFooter from '@/components/TheFooter.vue'
import CartModal from '@/components/CartModal.vue'
import FloatingCartBar from '@/components/FloatingCartBar.vue'
import { categories } from '@/data/products'
</script>

<template>
  <MotionConfig reduced-motion="user">
    <TheNavbar />

    <main>
      <TheHero />

      <ProductSection
        v-for="(category, index) in categories"
        :id="category.id"
        :key="category.id"
        :title="category.title"
        :tagline="category.tagline"
        :description="category.description"
        :tone="index % 2 === 1 ? 'muted' : 'plain'"
      />

      <AdvantagesSection />
      <HowToOrderSection />
    </main>

    <TheFooter />

    <FloatingCartBar />
    <CartModal />
  </MotionConfig>
</template>
