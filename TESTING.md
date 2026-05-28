# ✅ Testing Checklist

Checklist untuk testing aplikasi My Terazo sebelum production.

## 🏠 Homepage

- [ ] Halaman load dengan benar
- [ ] Hero section tampil dengan info toko
- [ ] Grid produk tampil (4 produk sample)
- [ ] Product card menampilkan: gambar, nama, harga, stok
- [ ] Klik product card redirect ke detail produk
- [ ] Navbar tampil dengan semua link
- [ ] Footer tampil dengan info toko
- [ ] Responsive di mobile, tablet, desktop

## 📦 Product Detail

- [ ] Halaman load dengan product ID yang benar
- [ ] Gambar produk tampil (atau placeholder jika kosong)
- [ ] Nama, deskripsi, harga, kategori, stok tampil
- [ ] Quantity selector berfungsi (+/-)
- [ ] Tidak bisa pilih quantity > stok
- [ ] Button "Tambah ke Keranjang" berfungsi
- [ ] Alert muncul saat produk ditambahkan
- [ ] Redirect ke halaman cart setelah tambah
- [ ] Jika stok 0, tampil "Stok Habis" dan button disabled

## 🛒 Shopping Cart

- [ ] Keranjang kosong tampil message yang sesuai
- [ ] Item di keranjang tampil dengan benar
- [ ] Gambar, nama, harga, quantity tampil
- [ ] Update quantity (+/-) berfungsi
- [ ] Hapus item berfungsi
- [ ] Subtotal per item dihitung benar
- [ ] Total keseluruhan dihitung benar
- [ ] Button "Lanjut ke Checkout" berfungsi
- [ ] Data persist di localStorage
- [ ] Refresh page, cart tetap ada

## 💳 Checkout

- [ ] Redirect ke cart jika keranjang kosong
- [ ] Form data pembeli tampil
- [ ] Validasi: nama, telepon, alamat required
- [ ] Radio button metode pembayaran berfungsi
- [ ] Info transfer bank tampil jika pilih "Transfer"
- [ ] Catatan (optional) bisa diisi
- [ ] Ringkasan pesanan tampil di sidebar
- [ ] Total harga benar
- [ ] Submit form create order
- [ ] Alert sukses muncul
- [ ] Redirect ke detail order
- [ ] Cart dikosongkan setelah checkout

## 📋 Order Detail

- [ ] Halaman load dengan order ID yang benar
- [ ] Order ID, tanggal, status tampil
- [ ] Info pembeli lengkap tampil
- [ ] List item pesanan tampil
- [ ] Total harga benar
- [ ] Metode pembayaran tampil
- [ ] Info transfer tampil jika status pending + transfer
- [ ] Catatan tampil jika ada
- [ ] Status badge warna sesuai status

## 📜 Order List

- [ ] List semua order tampil
- [ ] Sorted by newest first
- [ ] Order card tampil: ID, tanggal, status, total
- [ ] Klik order redirect ke detail
- [ ] Empty state jika belum ada order

## 👨‍💼 Admin Dashboard

### Products Tab
- [ ] List produk tampil dalam table
- [ ] Gambar, nama, kategori, harga, stok tampil
- [ ] Button "Tambah Produk" berfungsi
- [ ] Form tambah produk tampil
- [ ] Semua field required tervalidasi
- [ ] Submit form create produk baru
- [ ] Produk baru muncul di list
- [ ] Button "Edit" berfungsi
- [ ] Form edit pre-filled dengan data produk
- [ ] Update produk berfungsi
- [ ] Button "Hapus" berfungsi
- [ ] Confirm dialog muncul sebelum hapus
- [ ] Produk terhapus dari list

### Orders Tab
- [ ] List order tampil
- [ ] Info lengkap order tampil
- [ ] Dropdown status berfungsi
- [ ] Update status berfungsi
- [ ] Status berubah di list

## 🎨 UI/UX

- [ ] Semua button hover effect berfungsi
- [ ] Loading state tampil saat fetch data
- [ ] Error state tampil jika fetch gagal
- [ ] Form validation error message jelas
- [ ] Success message/alert jelas
- [ ] Warna konsisten (blue-600 primary)
- [ ] Font readable
- [ ] Spacing konsisten
- [ ] Shadow dan border radius konsisten

## 📱 Responsive Design

### Mobile (< 768px)
- [ ] Navbar responsive (hamburger menu optional)
- [ ] Product grid 1 kolom
- [ ] Cart layout stack vertical
- [ ] Checkout form full width
- [ ] Admin table scrollable horizontal
- [ ] Text size readable
- [ ] Button size tap-friendly (min 44px)

### Tablet (768px - 1024px)
- [ ] Product grid 2 kolom
- [ ] Cart layout 2 kolom
- [ ] Checkout layout 2 kolom

### Desktop (> 1024px)
- [ ] Product grid 3-4 kolom
- [ ] Layout optimal
- [ ] Max width container (container mx-auto)

## 🔧 Functionality

### LocalStorage
- [ ] Cart data persist
- [ ] Cart sync across tabs (optional)
- [ ] Clear cart after checkout

### API Routes
- [ ] GET /api/products - return all products
- [ ] GET /api/products/[id] - return single product
- [ ] POST /api/products - create product
- [ ] PUT /api/products/[id] - update product
- [ ] DELETE /api/products/[id] - delete product
- [ ] GET /api/orders - return all orders
- [ ] GET /api/orders/[id] - return single order
- [ ] POST /api/orders - create order
- [ ] PUT /api/orders/[id] - update order

### Data Persistence
- [ ] Products saved to data/products.json
- [ ] Orders saved to data/orders.json
- [ ] Data persist after server restart
- [ ] No data corruption

## 🚀 Build & Deploy

### Local Build
```bash
npm run build
```
- [ ] Build success tanpa error
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All pages generated

### Local Production
```bash
npm start
```
- [ ] App berjalan di production mode
- [ ] Semua fitur berfungsi
- [ ] Performance baik

### Vercel Deploy
- [ ] Deploy success
- [ ] App accessible via URL
- [ ] Semua halaman load
- [ ] API routes berfungsi
- [ ] No console errors
- [ ] Images load
- [ ] Fonts load

## 🐛 Edge Cases

- [ ] Product dengan stok 0 tidak bisa dibeli
- [ ] Quantity tidak bisa negatif
- [ ] Quantity tidak bisa > stok
- [ ] Form tidak submit jika ada field kosong
- [ ] Invalid product ID → 404 atau error message
- [ ] Invalid order ID → 404 atau error message
- [ ] Empty cart → tidak bisa checkout
- [ ] Duplicate product di cart → quantity bertambah
- [ ] Delete last item di cart → empty state

## 🔒 Security (Basic)

- [ ] No sensitive data di console.log
- [ ] No API keys exposed
- [ ] Input sanitization (basic)
- [ ] No SQL injection risk (pakai JSON)
- [ ] HTTPS di production (Vercel auto)

## ⚡ Performance

- [ ] First load < 3 detik
- [ ] Navigation smooth
- [ ] No layout shift
- [ ] Images optimized
- [ ] No memory leaks
- [ ] Lighthouse score > 80

## 📊 Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🎯 User Flow Testing

### Flow 1: Browse → Buy
1. [ ] User buka homepage
2. [ ] User klik produk
3. [ ] User tambah ke cart
4. [ ] User checkout
5. [ ] User isi form
6. [ ] User submit order
7. [ ] User lihat order detail

### Flow 2: Admin Add Product
1. [ ] Admin buka /admin
2. [ ] Admin klik "Tambah Produk"
3. [ ] Admin isi form
4. [ ] Admin submit
5. [ ] Produk muncul di list
6. [ ] Produk muncul di homepage

### Flow 3: Admin Manage Order
1. [ ] Admin buka /admin
2. [ ] Admin switch ke tab Orders
3. [ ] Admin lihat order baru
4. [ ] Admin update status
5. [ ] Status berubah

## 📝 Final Checklist Before Launch

- [ ] All tests passed
- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Sample data seeded
- [ ] Admin credentials set (jika ada auth)
- [ ] Payment info updated (bank account)
- [ ] Contact info updated
- [ ] Social media links added (optional)
- [ ] Analytics setup (optional)
- [ ] Error tracking setup (optional)
- [ ] Backup strategy planned
- [ ] Domain configured (optional)
- [ ] SSL certificate active (Vercel auto)

---

## 🧪 How to Test

### Manual Testing
1. Buka setiap halaman
2. Test setiap fitur
3. Check di berbagai device/browser
4. Note semua bug

### Automated Testing (Future)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### Load Testing (Future)
```bash
npm install --save-dev artillery
```

---

**Tip:** Print checklist ini dan centang satu per satu sebelum launch! ✅
