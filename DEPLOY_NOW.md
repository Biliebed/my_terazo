# 🚀 Panduan Deploy My Terazo - Step by Step

Git repository sudah siap! Sekarang tinggal push ke GitHub dan deploy ke Vercel.

## ✅ Status Saat Ini

- ✅ Git repository initialized
- ✅ All files committed
- ✅ Branch: main
- ✅ Ready to push

## 📋 Langkah-Langkah Deploy

### Step 1: Buat Repository di GitHub

1. Buka browser, kunjungi: **https://github.com/new**
2. Login ke GitHub (atau sign up jika belum punya akun)
3. Isi form:
   - **Repository name:** `my_terazo` (atau nama lain yang kamu mau)
   - **Description:** "Web app toko online My Terazo"
   - **Visibility:** Public atau Private (terserah)
   - **JANGAN centang** "Initialize this repository with a README"
4. Klik **"Create repository"**

### Step 2: Copy URL Repository

Setelah repository dibuat, GitHub akan tampilkan URL seperti:
```
https://github.com/username/my_terazo.git
```

**Copy URL ini!** Kamu akan butuh di step berikutnya.

### Step 3: Push Code ke GitHub

Jalankan command berikut di terminal (ganti `YOUR_GITHUB_URL` dengan URL yang kamu copy):

```bash
cd ~/my_terazo

# Add remote repository
git remote add origin YOUR_GITHUB_URL

# Push ke GitHub
git push -u origin main
```

**Contoh:**
```bash
git remote add origin https://github.com/biliebed/my_terazo.git
git push -u origin main
```

Jika diminta username dan password:
- **Username:** username GitHub kamu
- **Password:** Gunakan **Personal Access Token** (bukan password biasa)

#### Cara Buat Personal Access Token (jika belum punya):
1. Buka: https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Beri nama: "My Terazo Deploy"
4. Centang scope: **repo** (full control)
5. Klik **"Generate token"**
6. **COPY TOKEN** dan simpan (tidak akan muncul lagi!)
7. Gunakan token ini sebagai password saat push

### Step 4: Deploy ke Vercel

#### Option A: Via Vercel Dashboard (Paling Mudah)

1. Buka: **https://vercel.com/signup**
2. Klik **"Continue with GitHub"** (recommended)
3. Authorize Vercel untuk akses GitHub
4. Setelah login, klik **"Add New..."** → **"Project"**
5. Cari repository **"my_terazo"** di list
6. Klik **"Import"**
7. Vercel akan auto-detect Next.js settings:
   - Framework Preset: **Next.js** ✅
   - Root Directory: **./** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
8. Klik **"Deploy"**
9. Tunggu 1-2 menit... ⏳
10. **DONE!** 🎉

Vercel akan kasih URL seperti:
```
https://my-terazo.vercel.app
```

#### Option B: Via Vercel CLI (Alternative)

Jika kamu prefer CLI:

```bash
# Login ke Vercel
vercel login

# Deploy
cd ~/my_terazo
vercel --prod
```

Ikuti prompt dan pilih:
- Set up and deploy? **Y**
- Which scope? Pilih account kamu
- Link to existing project? **N**
- What's your project's name? **my_terazo**
- In which directory is your code located? **./**
- Want to override settings? **N**

## 🎉 Setelah Deploy Berhasil

### Test Aplikasi

Buka URL yang diberikan Vercel, test:
- ✅ Homepage load
- ✅ Klik produk → detail produk
- ✅ Tambah ke cart
- ✅ Checkout
- ✅ Buat order
- ✅ Admin dashboard (`/admin`)

### Custom Domain (Optional)

Jika punya domain sendiri (misal: myterazo.com):

1. Di Vercel Dashboard → Project → **Settings** → **Domains**
2. Tambahkan domain kamu
3. Ikuti instruksi DNS yang diberikan
4. Tunggu propagasi (5-60 menit)

### Update Aplikasi Nanti

Setiap kali ada perubahan:

```bash
cd ~/my_terazo

# Edit files...

# Commit changes
git add .
git commit -m "Update: deskripsi perubahan"

# Push ke GitHub
git push

# Vercel otomatis re-deploy! 🚀
```

## 🆘 Troubleshooting

### Error: Authentication Failed (saat push)

**Solusi:** Gunakan Personal Access Token, bukan password biasa.

### Error: Repository not found

**Solusi:** Pastikan URL repository benar dan kamu punya akses.

### Build Error di Vercel

**Solusi:** 
1. Check build logs di Vercel Dashboard
2. Test build lokal: `npm run build`
3. Fix error, commit, push lagi

### Data Produk Hilang Setelah Deploy

**Normal!** JSON files di `/data` akan reset setiap deploy.

**Solusi Permanent:**
- Upgrade ke database (Vercel Postgres, MongoDB, dll)
- Lihat panduan di `ROADMAP.md`

### Port 3000 Already in Use (local)

```bash
lsof -ti:3000 | xargs kill -9
```

## 📞 Butuh Bantuan?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com

## 🎯 Quick Reference

```bash
# Check git status
git status

# Check remote
git remote -v

# View commit history
git log --oneline

# Check Vercel deployments
vercel ls

# View deployment logs
vercel logs
```

---

## ✅ Checklist

- [ ] Repository dibuat di GitHub
- [ ] URL repository di-copy
- [ ] Code di-push ke GitHub
- [ ] Vercel account dibuat
- [ ] Project di-import ke Vercel
- [ ] Deploy berhasil
- [ ] URL aplikasi bisa diakses
- [ ] Semua fitur berfungsi
- [ ] Admin dashboard bisa diakses

**Selamat! Aplikasi My Terazo sudah live! 🎉**

---

**Next Steps:**
1. Share URL ke customer
2. Tambah produk via `/admin`
3. Test order flow
4. Setup custom domain (optional)
5. Tambah fitur sesuai `ROADMAP.md`
