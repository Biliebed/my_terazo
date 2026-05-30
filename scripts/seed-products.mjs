import 'dotenv/config'

const products = [
  {
    name: 'Pot Bunga Modern',
    price: 10000,
    category: 'Pot Bunga',
    description: 'Pot bunga dengan desain modern',
    stock: 50,
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e0e0e0" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23666"%3EPot Bunga Modern%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'Pot Bunga Modern Putih',
    price: 2000,
    category: 'Pot Bunga',
    description: 'Pot bunga modern warna putih',
    stock: 100,
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ffffff" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23333"%3EPot Bunga Putih%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'Pot Bunga Klasik',
    price: 25000,
    category: 'Pot Bunga',
    description: 'Pot bunga dengan desain klasik',
    stock: 30,
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23d4a574" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EPot Bunga Klasik%3C/text%3E%3C/svg%3E'
  },
  {
    name: 'Pot Bunga Klasik Cream',
    price: 50000,
    category: 'Pot Bunga',
    description: 'Pot bunga klasik warna cream',
    stock: 20,
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f5f5dc" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23666"%3EPot Bunga Cream%3C/text%3E%3C/svg%3E'
  }
]

async function seed() {
  console.log('🌱 Seeding database via API...')
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  for (const product of products) {
    try {
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      })
      
      if (response.ok) {
        const created = await response.json()
        console.log(`✅ Created: ${created.name} - Rp ${created.price.toLocaleString('id-ID')}`)
      } else {
        const error = await response.text()
        console.error(`❌ Failed to create ${product.name}:`, error)
      }
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error.message)
    }
  }
  
  console.log('🎉 Seeding completed!')
}

seed()
