'use client';

import { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/storage';
import { MagnifyingGlassIcon, FunnelIcon, SparklesIcon, TruckIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with Floating Shapes */}
      <div className="fixed inset-0 -z-10 gradient-bg">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      {/* Mesh Gradient Overlay */}
      <div className="fixed inset-0 -z-10 mesh-bg opacity-50"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Enhanced */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl shadow-2xl mb-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10 p-12 md:p-16">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon className="w-8 h-8 text-yellow-300" />
              <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wider">
                Premium Quality
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              My Terazo
            </h1>
            <p className="text-2xl md:text-3xl mb-3 text-blue-100 font-light">
              Produk Terrazzo Berkualitas Tinggi
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl">
              Solusi sempurna untuk lantai, dinding, dan furniture dengan desain elegan dan tahan lama
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://wa.me/6289633406706"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                Konsultasi Gratis
              </a>
              <a
                href="#products"
                className="bg-blue-500 bg-opacity-30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-40 transition border-2 border-white border-opacity-30 flex items-center gap-2"
              >
                Lihat Katalog
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white border-opacity-20">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <TruckIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Gratis Ongkir</p>
                  <p className="text-sm text-blue-200">Area Mataram</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Garansi Kualitas</p>
                  <p className="text-sm text-blue-200">100% Original</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">Konsultasi 24/7</p>
                  <p className="text-sm text-blue-200">Via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section - Enhanced */}
        <div id="products" className="glass rounded-2xl shadow-2xl p-8 mb-8 border border-white border-opacity-50 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <FunnelIcon className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Cari & Filter Produk</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <MagnifyingGlassIcon className="w-5 h-5 inline mr-2" />
              Cari Produk
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ketik nama atau deskripsi produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
              />
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Category Pills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📂 Kategori Produk
            </label>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? '🏠 Semua Produk' : `✨ ${cat}`}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters & Reset */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="flex items-center gap-3 flex-wrap mt-6 pt-6 border-t border-gray-200">
              <span className="text-sm text-gray-600 font-semibold">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  🔍 "{searchQuery}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  📂 {selectedCategory}
                </span>
              )}
              <button
                onClick={handleReset}
                className="text-sm text-red-600 hover:text-red-700 font-semibold ml-auto hover:underline"
              >
                ✕ Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Products Grid - Enhanced */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Katalog Produk
              {filteredProducts.length > 0 && (
                <span className="text-gray-500 text-xl ml-3 font-normal">
                  ({filteredProducts.length} produk)
                </span>
              )}
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-xl mb-4 font-semibold">
                Belum ada produk tersedia
              </p>
              <p className="text-gray-400 mb-6">
                Silakan tambahkan produk melalui halaman Admin
              </p>
              <a
                href="/admin"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Ke Halaman Admin
              </a>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-xl mb-4 font-semibold">
                🔍 Tidak ada produk yang cocok
              </p>
              <p className="text-gray-400 mb-6">
                Coba kata kunci lain atau reset filter
              </p>
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Butuh Bantuan Memilih Produk?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Tim kami siap membantu Anda menemukan produk terrazzo yang sempurna untuk kebutuhan Anda
            </p>
            <a
              href="https://wa.me/6289633406706?text=Halo%20My%20Terazo,%20saya%20butuh%20bantuan%20memilih%20produk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-xl hover:bg-purple-50 transition font-bold text-lg shadow-xl transform hover:scale-105"
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
              Chat dengan Kami Sekarang
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
