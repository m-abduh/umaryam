import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { productById, type Product } from '@/data/products'

export interface CartLine {
  id: string
  qty: number
}

export interface CartItem extends Product {
  qty: number
  lineTotal: number
}

const STORAGE_KEY = 'umaryam:cart:v1'

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (line): line is CartLine =>
          Boolean(line) && typeof line.id === 'string' && productById.has(line.id),
      )
      .map((line) => ({
        id: line.id,
        qty: Math.max(1, Math.floor(Number(line.qty) || 1)),
      }))
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>(loadLines())
  const isOpen = ref(false)

  const items = computed<CartItem[]>(() =>
    lines.value.flatMap((line) => {
      const product = productById.get(line.id)
      if (!product) return []
      return [{ ...product, qty: line.qty, lineTotal: product.price * line.qty }]
    }),
  )

  const count = computed(() => lines.value.reduce((total, line) => total + line.qty, 0))
  const subtotal = computed(() => items.value.reduce((total, item) => total + item.lineTotal, 0))
  const isEmpty = computed(() => lines.value.length === 0)

  function setQty(id: string, qty: number) {
    const line = lines.value.find((entry) => entry.id === id)
    if (!line) return
    line.qty = Math.max(1, Math.floor(qty) || 1)
  }

  function increment(id: string) {
    const line = lines.value.find((entry) => entry.id === id)
    if (line) line.qty += 1
  }

  function decrement(id: string) {
    const line = lines.value.find((entry) => entry.id === id)
    if (!line) return
    if (line.qty <= 1) {
      remove(id)
      return
    }
    line.qty -= 1
  }

  function add(id: string, qty = 1) {
    const line = lines.value.find((entry) => entry.id === id)
    if (line) {
      line.qty += Math.max(1, Math.floor(qty) || 1)
      return
    }
    lines.value.push({ id, qty: Math.max(1, Math.floor(qty) || 1) })
  }

  function remove(id: string) {
    lines.value = lines.value.filter((line) => line.id !== id)
  }

  function clear() {
    lines.value = []
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  watch(
    lines,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        /* ignore storage errors */
      }
    },
    { deep: true },
  )

  return {
    lines,
    isOpen,
    items,
    count,
    subtotal,
    isEmpty,
    setQty,
    increment,
    decrement,
    add,
    remove,
    clear,
    open,
    close,
    toggle,
  }
})
