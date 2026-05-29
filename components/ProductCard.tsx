import Link from 'next/link';
import { Product, calculateDiscountedPrice } from '@/lib/storage';
import { ShoppingCartIcon, EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount ? calculateDiscountedPrice(product.price, product.discount) : product.price;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <SparklesIcon className="w-16 h-16 mb-2" />
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-1 animate-pulse">
              🔥 HEMAT {product.discount}%
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full font-semibold text-xs shadow-md">
            {product.category || 'Produk'}
          </div>
        </div>
        
        {/* Stock Status */}
        {product.stock === 0 ? (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
            <div className="text-center">
              <span className="text-white font-bold text-2xl block mb-2">Stok Habis</span>
              <span className="text-gray-300 text-sm">Segera Tersedia Kembali</span>
            </div>
          </div>
        ) : isLowStock && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2">
              ⚠️ Stok Terbatas! Hanya {product.stock} tersisa
            </div>
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Link
            href={`/products/${product.id}`}
            className="bg-white text-blue-600 p-3 rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition transform hover:scale-110"
            title="Lihat Detail"
          >
            <EyeIcon className="w-6 h-6" />
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition transform hover:scale-110"
            title="Tambah ke Keranjang"
          >
            <ShoppingCartIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price Section */}
        <div className="flex justify-between items-end pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-400 line-through mb-1">
                  {formatPrice(product.price)}
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Stock Badge */}
          {product.stock > 0 && (
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isLowStock 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isLowStock ? `⚠️ ${product.stock} pcs` : `✓ ${product.stock} pcs`}
            </div>
          )}
        </div>
        
        {/* View Button */}
        <Link href={`/products/${product.id}`}>
          <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
            <EyeIcon className="w-5 h-5" />
            Lihat Detail
          </button>
        </Link>
      </div>
    </div>
  );
}
