'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            My Terazo
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Produk
            </Link>
            <Link href="/cart" className="hover:text-blue-200 transition">
              Keranjang
            </Link>
            <Link href="/orders" className="hover:text-blue-200 transition">
              Pesanan Saya
            </Link>
            <Link href="/admin" className="hover:text-blue-200 transition">
              Admin
            </Link>
            {isAdminPage && <NotificationBell />}
          </div>
        </div>
      </div>
    </nav>
  );
}
