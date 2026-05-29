'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { Product, Order } from '@/lib/db';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const loadOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    const sorted = data.sort((a: Order, b: Order) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(sorted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Format file tidak valid. Hanya PNG, JPG, dan WEBP yang diperbolehkan.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload gambar. Coba lagi.');
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image,
      category: formData.category,
    };

    if (editingProduct) {
      // Update
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    } else {
      // Create
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    }

    setFormData({ name: '', description: '', price: '', stock: '', image: '', category: '' });
    setEditingProduct(null);
    setShowProductForm(false);
    setImagePreview('');
    loadProducts();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      category: product.category,
    });
    setImagePreview(product.image);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    loadOrders();
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Produk ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pesanan ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowProductForm(!showProductForm);
                  setEditingProduct(null);
                  setFormData({ name: '', description: '', price: '', stock: '', image: '', category: '' });
                  setImagePreview('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {showProductForm ? 'Tutup Form' : '+ Tambah Produk'}
              </button>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <div className="bg-white rounded-lg p-6 shadow mb-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h2>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nama Produk</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Deskripsi</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Harga (Rp)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Stok</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Kategori</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Contoh: Elektronik, Fashion, dll"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Gambar Produk</label>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageUpload}
                      className="w-full border rounded-lg px-4 py-2"
                      disabled={uploading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: PNG, JPG, WEBP. Maksimal 5MB.
                    </p>
                    {uploading && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                    {(imagePreview || formData.image) && (
                      <div className="mt-3">
                        <img
                          src={imagePreview || formData.image}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {editingProduct ? 'Update Produk' : 'Simpan Produk'}
                    </button>
                    {editingProduct && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(null);
                          setFormData({ name: '', description: '', price: '', stock: '', image: '', category: '' });
                          setShowProductForm(false);
                          setImagePreview('');
                        }}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Produk</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Kategori</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Harga</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Stok</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4">
                        <span className={product.stock === 0 ? 'text-red-600 font-semibold' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  Belum ada produk. Klik "Tambah Produk" untuk mulai.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center text-gray-500">
                Belum ada pesanan
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Order ID</p>
                      <p className="font-mono font-bold">#{order.id}</p>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Pembeli</p>
                      <p className="font-semibold">{order.customerName}</p>
                      <p className="text-sm">{order.customerPhone}</p>
                      <p className="text-sm text-gray-600">{order.customerAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pembayaran</p>
                      <p className="font-semibold">{order.paymentMethod}</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm font-semibold mb-2">Item:</p>
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-700">
                        • {item.productName} x{item.quantity} = {formatPrice(item.price * item.quantity)}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
