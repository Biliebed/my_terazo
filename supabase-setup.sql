-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  discount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL,
  payment_proof TEXT,
  notes TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true) WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, stock, category, image, discount) VALUES
('Terrazzo Lantai Premium - Motif Klasik', 'Terrazzo lantai berkualitas tinggi dengan motif klasik. Tahan lama, mudah dibersihkan, dan cocok untuk ruang tamu, kamar tidur, atau area komersial. Ukuran 60x60 cm.', 250000, 50, 'Lantai', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80', 0),
('Terrazzo Dinding Modern - Abu-abu', 'Panel terrazzo untuk dinding dengan warna abu-abu modern. Memberikan kesan elegan dan minimalis. Cocok untuk dinding kamar mandi, dapur, atau ruang tamu. Ukuran 30x60 cm.', 180000, 75, 'Dinding', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 10),
('Meja Terrazzo Bulat - Diameter 80cm', 'Meja terrazzo bulat dengan finishing glossy. Cocok untuk meja makan, meja kopi, atau meja teras. Kuat dan tahan cuaca. Diameter 80cm, tinggi 75cm.', 1500000, 15, 'Meja', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', 0),
('Terrazzo Lantai Putih - Motif Minimalis', 'Terrazzo lantai warna putih dengan motif minimalis. Memberikan kesan bersih dan luas pada ruangan. Ideal untuk rumah modern. Ukuran 60x60 cm.', 280000, 40, 'Lantai', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 15),
('Terrazzo Custom - Desain Sesuai Keinginan', 'Layanan custom terrazzo sesuai desain dan kebutuhan Anda. Pilih warna, motif, dan ukuran sendiri. Konsultasi gratis dengan tim desainer kami. Harga per meter persegi.', 350000, 100, 'Custom', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80', 0),
('Terrazzo Dinding Hijau - Natural Look', 'Panel terrazzo dinding dengan warna hijau natural. Memberikan suasana segar dan alami. Cocok untuk area outdoor atau indoor. Ukuran 30x60 cm.', 200000, 60, 'Dinding', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', 0),
('Meja Terrazzo Persegi - 100x100cm', 'Meja terrazzo persegi untuk 4-6 orang. Cocok untuk meja makan keluarga atau meja meeting. Kuat dan tahan lama. Ukuran 100x100cm, tinggi 75cm.', 2000000, 10, 'Meja', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', 5),
('Terrazzo Lantai Hitam - Motif Bintik Putih', 'Terrazzo lantai hitam dengan bintik putih yang elegan. Memberikan kesan mewah dan modern. Cocok untuk area komersial atau rumah mewah. Ukuran 60x60 cm.', 300000, 35, 'Lantai', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', 0);
