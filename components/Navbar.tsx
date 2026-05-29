'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationBell from './NotificationBell';
import { 
  ShoppingCartIcon, 
  HomeIcon, 
  PhoneIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda', icon: HomeIcon },
    { href: '/cart', label: 'Keranjang', icon: ShoppingCartIcon },
    { href: '/orders', label: 'Pesanan', icon: ClipboardDocumentListIcon },
    { href: '/contact', label: 'Kontak', icon: PhoneIcon },
    { href: '/admin', label: 'Admin', icon: UserCircleIcon },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl group-hover:bg-opacity-30 transition">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-blue-900">
                MT
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold block">My Terazo</span>
              <span className="text-xs text-blue-200">Premium Quality</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition transform hover:scale-105 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {isAdminPage && (
              <div className="ml-2">
                <NotificationBell />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white border-opacity-20">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : 'hover:bg-white hover:bg-opacity-20'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {isAdminPage && (
                <div className="px-4 py-2">
                  <NotificationBell />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
