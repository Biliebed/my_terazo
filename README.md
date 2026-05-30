# My Terazo - E-commerce Terrazzo Products

Toko online untuk produk terrazzo berkualitas.

## Features
- 🛒 Shopping cart
- 💳 Checkout system
- 👤 User authentication (admin & user roles)
- 📦 Order management
- 🗄️ Database integration (Turso)

## Tech Stack
- Next.js 15
- Prisma + Turso (libsql)
- NextAuth.js
- TailwindCSS

## Demo Accounts
- Admin: admin@myterazo.com / admin123
- User: user@myterazo.com / user123

## Environment Variables
Required in Vercel:
- `DATABASE_URL` - Turso database URL
- `TURSO_AUTH_TOKEN` - Turso auth token
- `AUTH_SECRET` - NextAuth secret key
