import { whatsapp } from '@/config'
import { formatRupiah } from '@/lib/format'
import type { CartItem } from '@/stores/cart'

export interface CustomerInfo {
  name: string
  note: string
}

export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerInfo,
  subtotal: number,
): string {
  const lines: string[] = [whatsapp.greeting, '']

  const name = customer.name.trim()
  const note = customer.note.trim()
  if (name) lines.push(`Nama: ${name}`)
  if (note) lines.push(`Catatan: ${note}`)
  if (name || note) lines.push('')

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} x${item.qty} = ${formatRupiah(item.lineTotal)}`)
  })

  lines.push('', `Total: ${formatRupiah(subtotal)}`)

  return lines.join('\n')
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}
