// Client-side storage using localStorage
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  discount?: number; // Discount percentage (0-100)
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  paymentMethod: 'transfer' | 'cod' | 'cash';
  paymentProof?: string;
  notes?: string;
  isRead?: boolean; // For admin notification
  createdAt: string;
  updatedAt: string;
}

// Storage keys
const PRODUCTS_KEY = 'myterazo_products';
const ORDERS_KEY = 'myterazo_orders';
const INITIALIZED_KEY = 'myterazo_initialized';

// Sample products for initial load
const SAMPLE_PRODUCTS: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: 'Terrazzo Lantai Premium - Motif Klasik',
    description: 'Terrazzo lantai berkualitas tinggi dengan motif klasik. Tahan lama, mudah dibersihkan, dan cocok untuk ruang tamu, kamar tidur, atau area komersial. Ukuran 60x60 cm.',
    price: 250000,
    stock: 50,
    category: 'Lantai',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
    discount: 0,
  },
  {
    name: 'Terrazzo Dinding Modern - Abu-abu',
    description: 'Panel terrazzo untuk dinding dengan warna abu-abu modern. Memberikan kesan elegan dan minimalis. Cocok untuk dinding kamar mandi, dapur, atau ruang tamu. Ukuran 30x60 cm.',
    price: 180000,
    stock: 75,
    category: 'Dinding',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    discount: 10,
  },
  {
    name: 'Meja Terrazzo Bulat - Diameter 80cm',
    description: 'Meja terrazzo bulat dengan finishing glossy. Cocok untuk meja makan, meja kopi, atau meja teras. Kuat dan tahan cuaca. Diameter 80cm, tinggi 75cm.',
    price: 1500000,
    stock: 15,
    category: 'Meja',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    discount: 0,
  },
  {
    name: 'Terrazzo Lantai Putih - Motif Minimalis',
    description: 'Terrazzo lantai warna putih dengan motif minimalis. Memberikan kesan bersih dan luas pada ruangan. Ideal untuk rumah modern. Ukuran 60x60 cm.',
    price: 280000,
    stock: 40,
    category: 'Lantai',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    discount: 15,
  },
  {
    name: 'Terrazzo Custom - Desain Sesuai Keinginan',
    description: 'Layanan custom terrazzo sesuai desain dan kebutuhan Anda. Pilih warna, motif, dan ukuran sendiri. Konsultasi gratis dengan tim desainer kami. Harga per meter persegi.',
    price: 350000,
    stock: 100,
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    discount: 0,
  },
  {
    name: 'Terrazzo Dinding Hijau - Natural Look',
    description: 'Panel terrazzo dinding dengan warna hijau natural. Memberikan suasana segar dan alami. Cocok untuk area outdoor atau indoor. Ukuran 30x60 cm.',
    price: 200000,
    stock: 60,
    category: 'Dinding',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    discount: 0,
  },
  {
    name: 'Meja Terrazzo Persegi - 100x100cm',
    description: 'Meja terrazzo persegi untuk 4-6 orang. Cocok untuk meja makan keluarga atau meja meeting. Kuat dan tahan lama. Ukuran 100x100cm, tinggi 75cm.',
    price: 2000000,
    stock: 10,
    category: 'Meja',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    discount: 5,
  },
  {
    name: 'Terrazzo Lantai Hitam - Motif Bintik Putih',
    description: 'Terrazzo lantai hitam dengan bintik putih yang elegan. Memberikan kesan mewah dan modern. Cocok untuk area komersial atau rumah mewah. Ukuran 60x60 cm.',
    price: 300000,
    stock: 35,
    category: 'Lantai',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    discount: 0,
  },
];

// Helper functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Initialize sample products on first load
function initializeSampleProducts(): void {
  if (typeof window === 'undefined') return;
  
  const isInitialized = localStorage.getItem(INITIALIZED_KEY);
  if (isInitialized) return;
  
  const products: Product[] = SAMPLE_PRODUCTS.map((product, index) => ({
    ...product,
    id: (Date.now() + index).toString(),
    createdAt: new Date().toISOString(),
  }));
  
  saveToStorage(PRODUCTS_KEY, products);
  localStorage.setItem(INITIALIZED_KEY, 'true');
}

// Products
export function getProducts(): Product[] {
  // Initialize sample products if first time
  initializeSampleProducts();
  return getFromStorage<Product[]>(PRODUCTS_KEY, []);
}

export function getProduct(id: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveToStorage(PRODUCTS_KEY, products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  saveToStorage(PRODUCTS_KEY, products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  
  saveToStorage(PRODUCTS_KEY, filtered);
  return true;
}

// Orders
export function getOrders(): Order[] {
  return getFromStorage<Order[]>(ORDERS_KEY, []);
}

export function getOrder(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find(o => o.id === id);
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveToStorage(ORDERS_KEY, orders);
  return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  
  orders[index] = { 
    ...orders[index], 
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveToStorage(ORDERS_KEY, orders);
  return orders[index];
}

// Helper functions for discount
export function calculateDiscountedPrice(price: number, discount?: number): number {
  if (!discount || discount <= 0) return price;
  return Math.round(price * (1 - discount / 100));
}

export function getUnreadOrdersCount(): number {
  const orders = getOrders();
  return orders.filter(o => !o.isRead && o.status === 'pending').length;
}

export function markOrderAsRead(id: string): void {
  updateOrder(id, { isRead: true });
}

export function markAllOrdersAsRead(): void {
  const orders = getOrders();
  orders.forEach(order => {
    if (!order.isRead) {
      updateOrder(order.id, { isRead: true });
    }
  });
}
