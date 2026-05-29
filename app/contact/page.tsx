'use client';

import Navbar from '@/components/Navbar';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      {/* Terrazzo Texture Background */}
      <div className="fixed inset-0 -z-10 terrazzo-texture"></div>
      <div className="fixed inset-0 -z-10 terrazzo-overlay"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Hubungi Kami</h1>
          <p className="text-xl text-blue-100">
            Kami siap membantu Anda dengan produk terrazzo berkualitas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass-terrazzo rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              
              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Dakota (Sebrang Dakota Society)<br />
                    Rembiga, Mataram<br />
                    Nusa Tenggara Barat (NTB)
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <PhoneIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <a 
                    href="https://wa.me/6289633406706"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    +62 896-3340-6706
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Klik untuk chat langsung
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <EnvelopeIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a 
                    href="mailto:info@myterazo.com"
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    info@myterazo.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Untuk pertanyaan & pemesanan
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ClockIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Senin - Jumat: 08:00 - 17:00 WITA</p>
                    <p>Sabtu: 08:00 - 14:00 WITA</p>
                    <p className="text-red-600 font-semibold">Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-terrazzo rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Hubungi Kami Sekarang</h2>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6289633406706?text=Halo%20My%20Terazo,%20saya%20ingin%20bertanya%20tentang%20produk%20terrazzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Chat via WhatsApp
                </a>
                
                <a
                  href="mailto:info@myterazo.com?subject=Pertanyaan%20Produk%20Terrazzo"
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Kirim Email
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="glass-terrazzo rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Lokasi Kami</h2>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.2!2d116.1!3d-8.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzYnMDAuMCJTIDExNsKwMDYnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              📍 Kami berlokasi di Jl. Dakota, Rembiga, Mataram, NTB. 
              Mudah diakses dari pusat kota Mataram.
            </p>
            <a
              href="https://maps.google.com/?q=Jl.+Dakota+Rembiga+Mataram+NTB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <MapPinIcon className="w-5 h-5" />
              Buka di Google Maps
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="glass rounded-2xl shadow-2xl p-6 mt-8 border border-white border-opacity-50">
          <h2 className="text-2xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">
                📦 Apakah ada layanan pengiriman?
              </h3>
              <p className="text-gray-600">
                Ya, kami melayani pengiriman ke seluruh Indonesia melalui berbagai ekspedisi terpercaya.
                Biaya pengiriman akan dihitung berdasarkan lokasi dan berat produk.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">
                💰 Bagaimana cara pembayaran?
              </h3>
              <p className="text-gray-600">
                Kami menerima pembayaran melalui transfer bank, e-wallet, dan COD (untuk area Mataram).
                Detail rekening akan diberikan setelah konfirmasi pesanan.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">
                🎨 Apakah bisa custom design?
              </h3>
              <p className="text-gray-600">
                Tentu! Kami menerima pesanan custom sesuai dengan kebutuhan dan desain Anda.
                Hubungi kami untuk konsultasi gratis.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="font-semibold text-lg mb-2">
                ⏱️ Berapa lama proses pembuatan?
              </h3>
              <p className="text-gray-600">
                Waktu produksi bervariasi tergantung jenis dan jumlah pesanan, biasanya 7-14 hari kerja.
                Untuk pesanan custom, waktu bisa lebih lama. Kami akan informasikan estimasi waktu saat pemesanan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Memesan Produk Terrazzo Berkualitas?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/6289633406706"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-bold text-lg"
            >
              💬 Chat WhatsApp
            </a>
            <a
              href="/"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-bold text-lg border-2 border-white"
            >
              🛍️ Lihat Produk
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 My Terazo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
