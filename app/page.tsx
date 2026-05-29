'use client';

import { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/storage';

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

        {/* Search & Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Cari Produk
            </label>
            <input
              type="text"
              placeholder="Cari nama atau deskripsi produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Pills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📂 Kategori
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? '🏠 Semua' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters & Reset */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="flex items-center gap-3 flex-wrap mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600 font-semibold">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  🔍 "{searchQuery}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  📂 {selectedCategory}
                </span>
              )}
              <button
                onClick={handleReset}
                className="text-sm text-red-600 hover:text-red-700 font-semibold ml-auto"
              >
                ✕ Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Katalog Produk
              {filteredProducts.length > 0 && (
                <span className="text-gray-500 text-lg ml-2">
                  ({filteredProducts.length} produk)
                </span>
              )}
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                Belum ada produk tersedia
              </p>
              <p className="text-gray-400">
                Silakan tambahkan produk melalui halaman Admin
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                🔍 Tidak ada produk yang cocok dengan pencarian
              </p>
              <p className="text-gray-400 mb-4">
                Coba kata kunci lain atau reset filter
              </p>
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
      </main>

      <Footer />
    </div>
  );
}
