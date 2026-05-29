'use client';

import Link from 'next/link';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">My Terazo</h3>
            <p className="text-gray-400 text-sm mb-4">
              Produsen dan penjual produk terrazzo berkualitas tinggi untuk kebutuhan hunian dan komersial Anda.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/6289633406706"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition"
                title="WhatsApp"
              >
                <PhoneIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@myterazo.com"
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition"
                title="Email"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  🏠 Beranda
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  🛒 Keranjang
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  📦 Pesanan Saya
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  📞 Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  👨‍💼 Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kategori Produk</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/?category=Lantai" className="hover:text-white transition">
                  Terrazzo Lantai
                </Link>
              </li>
              <li>
                <Link href="/?category=Dinding" className="hover:text-white transition">
                  Terrazzo Dinding
                </Link>
              </li>
              <li>
                <Link href="/?category=Meja" className="hover:text-white transition">
                  Terrazzo Meja
                </Link>
              </li>
              <li>
                <Link href="/?category=Custom" className="hover:text-white transition">
                  Custom Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Jl. Dakota (Sebrang Dakota Society)<br />
                  Rembiga, Mataram, NTB
                </span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <a 
                  href="https://wa.me/6289633406706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  +62 896-3340-6706
                </a>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                <a 
                  href="mailto:info@myterazo.com"
                  className="hover:text-white transition"
                >
                  info@myterazo.com
                </a>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">Jam Operasional:</p>
              <p className="text-sm text-gray-400">
                Senin - Jumat: 08:00 - 17:00<br />
                Sabtu: 08:00 - 14:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 My Terazo. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with ❤️ by enowX Labs AI
          </p>
        </div>
      </div>
    </footer>
  );
}
