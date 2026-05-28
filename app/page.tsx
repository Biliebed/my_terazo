import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/db';

export default function Home() {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">My Terazo</h1>
          <p className="text-xl mb-1">Produk Berkualitas untuk Anda</p>
          <p className="text-blue-100">
            Jl. Dakota (Sebrang Dakota Society), Rembiga, Mataram, NTB
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Katalog Produk</h2>
          {products.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                Belum ada produk tersedia
              </p>
              <p className="text-gray-400">
                Silakan tambahkan produk melalui halaman Admin
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 My Terazo. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Jl. Dakota (Sebrang Dakota Society), Rembiga, Mataram, NTB
          </p>
        </div>
      </footer>
    </div>
  );
}
