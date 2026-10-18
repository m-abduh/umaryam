<script setup lang="ts">
import { motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    delay?: number
    y?: number
    once?: boolean
  }>(),
  {
    delay: 0,
    y: 28,
    once: true,
  },
)
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: props.y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: props.once, amount: 0.2 }"
    :transition="{ duration: 0.55, delay: props.delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion.div>
</template>
