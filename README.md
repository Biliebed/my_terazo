# My Terazo - Web App Toko Online

Web aplikasi e-commerce untuk **My Terazo** yang berlokasi di Jl. Dakota (Sebrang Dakota Society), Rembiga, Mataram, NTB.

## 🚀 Fitur

### Customer Features
- ✅ **Katalog Produk** - Browse produk dengan gambar, harga, dan stok
- ✅ **Detail Produk** - Lihat informasi lengkap produk
- ✅ **Keranjang Belanja** - Tambah, edit, hapus item di keranjang
- ✅ **Checkout** - Form pemesanan dengan data pembeli
- ✅ **Metode Pembayaran** - Transfer Bank, COD, atau Tunai
- ✅ **Tracking Pesanan** - Lihat status dan detail pesanan

### Admin Features
- ✅ **Manajemen Produk** - CRUD (Create, Read, Update, Delete) produk
- ✅ **Manajemen Pesanan** - Lihat dan update status pesanan
- ✅ **Dashboard** - Overview produk dan pesanan

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: JSON files (simple file-based storage)
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone repository
git clone <your-repo-url>
cd my_terazo

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🌐 Deployment ke Vercel

### Cara 1: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### Cara 2: Via GitHub + Vercel Dashboard

1. Push code ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Klik "New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis detect Next.js dan deploy

### Environment Variables (Optional)

Jika nanti ingin upgrade ke database proper (PostgreSQL, MongoDB, dll), tambahkan environment variables di Vercel Dashboard:

```
DATABASE_URL=your_database_url
```

## 📁 Struktur Project

```
my_terazo/
├── app/
│   ├── api/              # API routes
│   │   ├── products/     # Product endpoints
│   │   └── orders/       # Order endpoints
│   ├── admin/            # Admin dashboard
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout page
│   ├── orders/           # Order list & detail
│   ├── products/         # Product detail
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── lib/
│   └── db.ts            # Database functions
├── data/                # JSON database files
│   ├── products.json
│   └── orders.json
└── public/              # Static assets
```

## 🎨 Customization

### Menambah Produk

1. Buka halaman `/admin`
2. Klik "Tambah Produk"
3. Isi form dan simpan

Atau edit langsung file `data/products.json`:

```json
{
  "id": "unique-id",
  "name": "Nama Produk",
  "description": "Deskripsi produk",
  "price": 100000,
  "stock": 50,
  "image": "https://example.com/image.jpg",
  "category": "Kategori",
  "createdAt": "2026-05-28T10:00:00.000Z"
}
```

### Mengubah Informasi Toko

Edit file berikut:
- `app/page.tsx` - Hero section
- `components/Navbar.tsx` - Navigation
- `app/layout.tsx` - Metadata (title, description)

## 🔄 Upgrade Database

Saat ini menggunakan JSON files untuk simplicity. Untuk production dengan traffic tinggi, upgrade ke:

### Option 1: Vercel Postgres

```bash
npm install @vercel/postgres
```

### Option 2: Prisma + PostgreSQL

```bash
npm install prisma @prisma/client
npx prisma init
```

### Option 3: MongoDB

```bash
npm install mongodb
```

## 📱 Responsive Design

Aplikasi sudah responsive dan mobile-friendly:
- Mobile: 1 kolom
- Tablet: 2 kolom
- Desktop: 3-4 kolom

## 🔐 Security Notes

**PENTING untuk Production:**

1. **Admin Authentication** - Tambahkan login untuk halaman `/admin`
2. **API Protection** - Tambahkan middleware untuk protect API routes
3. **Input Validation** - Validasi semua input dari user
4. **Rate Limiting** - Batasi request ke API
5. **HTTPS** - Vercel otomatis provide HTTPS

Contoh tambah auth sederhana:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check authentication
    const auth = request.cookies.get('admin_token');
    if (!auth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}
```

## 📞 Support

Untuk pertanyaan atau bantuan:
- **Lokasi**: Jl. Dakota (Sebrang Dakota Society), Rembiga, Mataram, NTB
- **Email**: contact@myterazo.com (ganti dengan email Anda)
- **WhatsApp**: +62xxx (ganti dengan nomor Anda)

## 📄 License

MIT License - Bebas digunakan dan dimodifikasi

---

**Built with ❤️ for My Terazo**
