import Link from 'next/link';
import { Product, calculateDiscountedPrice } from '@/lib/storage';

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

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 bg-gray-200">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
              🔥 -{product.discount}%
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-xl">Stok Habis</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    {formatPrice(discountedPrice)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              Stok: {product.stock}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
