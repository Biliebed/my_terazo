import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            My Terazo
          </Link>
          <div className="flex gap-6">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
