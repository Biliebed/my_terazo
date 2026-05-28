# 🚀 Quick Start - Deploy ke Vercel

## Persiapan

1. **Buat akun Vercel** (gratis)
   - Kunjungi: https://vercel.com/signup
   - Sign up dengan GitHub (recommended)

2. **Install Vercel CLI** (optional, tapi recommended)
   ```bash
   npm i -g vercel
   ```

## Cara 1: Deploy via GitHub (Paling Mudah)

### Step 1: Push ke GitHub

```bash
# Inisialisasi git (jika belum)
cd ~/my_terazo
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - My Terazo web app"

# Buat repository di GitHub, lalu:
git remote add origin https://github.com/username/my_terazo.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy di Vercel

1. Login ke https://vercel.com
2. Klik **"New Project"**
3. **Import** repository GitHub Anda (my_terazo)
4. Vercel akan auto-detect Next.js
5. Klik **"Deploy"**
6. Tunggu 1-2 menit ✅

**Done!** Aplikasi Anda live di: `https://my-terazo.vercel.app`

## Cara 2: Deploy via CLI (Lebih Cepat)

```bash
# Masuk ke folder project
cd ~/my_terazo

# Login ke Vercel
vercel login

# Deploy (development)
vercel

# Deploy ke production
vercel --prod
```

Ikuti prompt:
- Set up and deploy? **Y**
- Which scope? Pilih account Anda
- Link to existing project? **N**
- What's your project's name? **my_terazo**
- In which directory is your code located? **./** (enter)
- Want to override settings? **N**

**Done!** URL akan muncul di terminal.

## Setelah Deploy

### Update Aplikasi

Setiap kali ada perubahan:

**Via GitHub:**
```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push
```
Vercel otomatis re-deploy!

**Via CLI:**
```bash
vercel --prod
```

### Custom Domain (Optional)

1. Buka project di Vercel Dashboard
2. Settings → Domains
3. Tambahkan domain Anda (misal: myterazo.com)
4. Ikuti instruksi DNS

### Environment Variables

Jika nanti butuh database atau API keys:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Tambahkan variable (misal: `DATABASE_URL`)
3. Re-deploy

## Troubleshooting

### Build Error

```bash
# Test build lokal dulu
npm run build

# Jika error, fix dulu sebelum deploy
```

### Data Hilang Setelah Deploy

JSON files di `/data` akan reset setiap deploy. Untuk production:

**Solusi 1: Vercel Postgres (Recommended)**
```bash
npm install @vercel/postgres
```

**Solusi 2: External Database**
- MongoDB Atlas (free tier)
- Supabase (free tier)
- PlanetScale (free tier)

### Port Already in Use (Local)

```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm run dev
```

## Monitoring

Setelah deploy, monitor di Vercel Dashboard:
- **Analytics** - Visitor stats
- **Logs** - Error logs
- **Deployments** - History

## Next Steps

1. ✅ Deploy aplikasi
2. 🔐 Tambahkan authentication untuk `/admin`
3. 💾 Upgrade ke proper database
4. 📧 Setup email notifications untuk order baru
5. 💳 Integrasi payment gateway (Midtrans, Xendit)
6. 📱 Setup WhatsApp Business API untuk notifikasi

## Support

Butuh bantuan? Check:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: (link repo Anda)

---

**Happy Deploying! 🎉**
