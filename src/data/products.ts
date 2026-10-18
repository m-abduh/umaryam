export type CategoryId = 'telur' | 'doc' | 'ayam'

export interface Product {
  id: string
  name: string
  category: CategoryId
  description: string
  price: number
  unit: string
  emoji: string
  gradient: string
  note?: string
}

export interface Category {
  id: CategoryId
  title: string
  tagline: string
  description: string
}

export const categories: Category[] = [
  {
    id: 'telur',
    title: 'Telur Ayam Kampung',
    tagline: 'Dari ayam kampung asli',
    description:
      'Telur ayam kampung segar dengan cita rasa lebih gurih, tersedia per butir, per kilogram, maupun per tray.',
  },
  {
    id: 'doc',
    title: 'DOC Ayam Kampung',
    tagline: 'Anak ayam kampung umur sehari',
    description:
      'Day-Old Chick ayam kampung pilihan untuk kebutuhan peternakan, tersedia satuan maupun paket.',
  },
  {
    id: 'ayam',
    title: 'Ayam Kampung',
    tagline: 'Ayam kampung pilihan',
    description:
      'Ayam kampung untuk kebutuhan rumah tangga maupun usaha, dengan satuan per ekor atau per kilogram.',
  },
]

export const products: Product[] = [
  {
    id: 'telur-kampung-butir',
    name: 'Telur Ayam Kampung',
    category: 'telur',
    description: 'Telur ayam kampung segar, dijual per butir untuk kebutuhan harian.',
    price: 3500,
    unit: 'butir',
    emoji: '🥚',
    gradient: 'linear-gradient(135deg, #fef3c7, #fff7ed)',
  },
  {
    id: 'telur-kampung-kg',
    name: 'Telur Ayam Kampung Kiloan',
    category: 'telur',
    description: 'Telur ayam kampung dalam satuan kilogram, lebih hemat untuk kebutuhan besar.',
    price: 65000,
    unit: 'kg',
    emoji: '🍳',
    gradient: 'linear-gradient(135deg, #fef9c3, #fef3c7)',
  },
  {
    id: 'telur-kampung-tray',
    name: 'Telur Ayam Kampung Tray (30 butir)',
    category: 'telur',
    description: 'Telur ayam kampung kemasan tray berisi 30 butir, praktis untuk stok.',
    price: 95000,
    unit: 'tray',
    emoji: '🥚',
    gradient: 'linear-gradient(135deg, #ecfccb, #ecfdf5)',
  },
  {
    id: 'doc-kampung',
    name: 'DOC Ayam Kampung',
    category: 'doc',
    description: 'Day-Old Chick ayam kampung sehat untuk pemeliharaan skala rumahan maupun usaha.',
    price: 8500,
    unit: 'ekor',
    emoji: '🐥',
    gradient: 'linear-gradient(135deg, #fef9c3, #ecfccb)',
  },
  {
    id: 'doc-kampung-jumbo',
    name: 'DOC Ayam Kampung Jumbo',
    category: 'doc',
    description: 'DOC ayam kampung ukuran lebih besar untuk pertumbuhan awal yang lebih kuat.',
    price: 12000,
    unit: 'ekor',
    emoji: '🐤',
    gradient: 'linear-gradient(135deg, #fef3c7, #fefce8)',
  },
  {
    id: 'doc-kampung-paket',
    name: 'DOC Ayam Kampung Paket 100 ekor',
    category: 'doc',
    description: 'Paket DOC ayam kampung 100 ekor untuk kebutuhan peternakan dalam jumlah besar.',
    price: 800000,
    unit: 'paket',
    emoji: '🐣',
    gradient: 'linear-gradient(135deg, #d1fae5, #f0fdfa)',
  },
  {
    id: 'ayam-kampung',
    name: 'Ayam Kampung',
    category: 'ayam',
    description: 'Ayam kampung sehat dan utuh untuk kebutuhan rumah tangga maupun usaha.',
    price: 55000,
    unit: 'ekor',
    emoji: '🐔',
    gradient: 'linear-gradient(135deg, #ffedd5, #fff1f2)',
  },
  {
    id: 'ayam-kampung-jumbo',
    name: 'Ayam Kampung Jumbo',
    category: 'ayam',
    description: 'Ayam kampung ukuran besar dengan bobot lebih untuk kebutuhan lebih banyak.',
    price: 80000,
    unit: 'ekor',
    emoji: '🐓',
    gradient: 'linear-gradient(135deg, #ffe4e6, #fff7ed)',
  },
  {
    id: 'ayam-kampung-kiloan',
    name: 'Ayam Kampung Kiloan',
    category: 'ayam',
    description: 'Ayam kampung utuh dengan pembelian berdasarkan berat aktual.',
    price: 62000,
    unit: 'kg',
    emoji: '🐔',
    gradient: 'linear-gradient(135deg, #fee2e2, #fff7ed)',
    note: 'Harga akhir menyesuaikan berat aktual dan dikonfirmasi oleh penjual.',
  },
]

export const productById = new Map(products.map((product) => [product.id, product]))

export function productsByCategory(category: CategoryId): Product[] {
  return products.filter((product) => product.category === category)
}
