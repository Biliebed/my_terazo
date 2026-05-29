import { createClient } from '@libsql/client'
import 'dotenv/config'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function main() {
  console.log('🚀 Creating tables...')

  // Create Product table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS Product (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      discount INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create Order table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Order" (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      customerAddress TEXT NOT NULL,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      paymentMethod TEXT NOT NULL,
      paymentProof TEXT,
      notes TEXT,
      isRead INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('✅ Tables created!')

  console.log('🌱 Seeding sample products...')

  const sampleProducts = [
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Lantai Premium - Motif Klasik',
      description: 'Terrazzo lantai berkualitas tinggi dengan motif klasik. Tahan lama, mudah dibersihkan, dan cocok untuk ruang tamu, kamar tidur, atau area komersial. Ukuran 60x60 cm.',
      price: 250000,
      stock: 50,
      category: 'Lantai',
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
      discount: 0,
    },
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Dinding Modern - Abu-abu',
      description: 'Panel terrazzo untuk dinding dengan warna abu-abu modern. Memberikan kesan elegan dan minimalis. Cocok untuk dinding kamar mandi, dapur, atau ruang tamu. Ukuran 30x60 cm.',
      price: 180000,
      stock: 75,
      category: 'Dinding',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      discount: 10,
    },
    {
      id: crypto.randomUUID(),
      name: 'Meja Terrazzo Bulat - Diameter 80cm',
      description: 'Meja terrazzo bulat dengan finishing glossy. Cocok untuk meja makan, meja kopi, atau meja teras. Kuat dan tahan cuaca. Diameter 80cm, tinggi 75cm.',
      price: 1500000,
      stock: 15,
      category: 'Meja',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      discount: 0,
    },
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Lantai Putih - Motif Minimalis',
      description: 'Terrazzo lantai warna putih dengan motif minimalis. Memberikan kesan bersih dan luas pada ruangan. Ideal untuk rumah modern. Ukuran 60x60 cm.',
      price: 280000,
      stock: 40,
      category: 'Lantai',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      discount: 15,
    },
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Custom - Desain Sesuai Keinginan',
      description: 'Layanan custom terrazzo sesuai desain dan kebutuhan Anda. Pilih warna, motif, dan ukuran sendiri. Konsultasi gratis dengan tim desainer kami. Harga per meter persegi.',
      price: 350000,
      stock: 100,
      category: 'Custom',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
      discount: 0,
    },
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Dinding Hijau - Natural Look',
      description: 'Panel terrazzo dinding dengan warna hijau natural. Memberikan suasana segar dan alami. Cocok untuk area outdoor atau indoor. Ukuran 30x60 cm.',
      price: 200000,
      stock: 60,
      category: 'Dinding',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      discount: 0,
    },
    {
      id: crypto.randomUUID(),
      name: 'Meja Terrazzo Persegi - 100x100cm',
      description: 'Meja terrazzo persegi untuk 4-6 orang. Cocok untuk meja makan keluarga atau meja meeting. Kuat dan tahan lama. Ukuran 100x100cm, tinggi 75cm.',
      price: 2000000,
      stock: 10,
      category: 'Meja',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      discount: 5,
    },
    {
      id: crypto.randomUUID(),
      name: 'Terrazzo Lantai Hitam - Motif Bintik Putih',
      description: 'Terrazzo lantai hitam dengan bintik putih yang elegan. Memberikan kesan mewah dan modern. Cocok untuk area komersial atau rumah mewah. Ukuran 60x60 cm.',
      price: 300000,
      stock: 35,
      category: 'Lantai',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      discount: 0,
    },
  ]

  for (const product of sampleProducts) {
    await client.execute({
      sql: `INSERT INTO Product (id, name, description, price, stock, category, image, discount, createdAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      args: [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.category,
        product.image,
        product.discount,
      ],
    })
  }

  console.log('✅ Seeded 8 sample products!')
  console.log('🎉 Database setup complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(() => {
    client.close()
  })
