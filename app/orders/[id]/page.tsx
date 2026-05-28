'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Order } from '@/lib/db';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    
    fetch(`/api/orders/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
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

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Menunggu Pembayaran',
      paid: 'Sudah Dibayar',
      processing: 'Diproses',
      shipped: 'Dikirim',
      completed: 'Selesai',
      cancelled: 'Dibatalkan',
    };
    return texts[status] || status;
  };

  const getPaymentMethodText = (method: string) => {
    const texts: Record<string, string> = {
      transfer: 'Transfer Bank',
      cod: 'COD (Cash on Delivery)',
      cash: 'Tunai',
    };
    return texts[method] || method;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500">Pesanan tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Detail Pesanan</h1>

          {/* Order Status */}
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="font-mono font-bold text-lg">#{order.id}</p>
              </div>
              <span className={`px-4 py-2 rounded-full font-semibold ${getStatusBadge(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Tanggal Pesanan</p>
                <p className="font-semibold">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-600">Terakhir Diupdate</p>
                <p className="font-semibold">{formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Informasi Pembeli</h2>
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm">Nama</p>
                <p className="font-semibold">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Telepon</p>
                <p className="font-semibold">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Alamat</p>
                <p className="font-semibold">{order.customerAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Item Pesanan</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Informasi Pembayaran</h2>
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm">Metode Pembayaran</p>
                <p className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</p>
              </div>
              
              {order.paymentMethod === 'transfer' && order.status === 'pending' && (
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">Informasi Transfer:</p>
                  <p className="text-sm">Bank: BCA</p>
                  <p className="text-sm">No. Rekening: 1234567890</p>
                  <p className="text-sm">Atas Nama: My Terazo</p>
                  <p className="text-sm mt-2 text-gray-600">
                    Silakan upload bukti transfer melalui admin atau hubungi kami
                  </p>
                </div>
              )}
              
              {order.notes && (
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">Catatan</p>
                  <p className="font-semibold">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
