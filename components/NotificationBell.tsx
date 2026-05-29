'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUnreadOrdersCount } from '@/lib/storage';

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Initial load
    updateCount();

    // Poll every 10 seconds for new orders
    const interval = setInterval(() => {
      const newCount = getUnreadOrdersCount();
      if (newCount > unreadCount) {
        // New order detected!
        playNotificationSound();
        showBrowserNotification(newCount - unreadCount);
      }
      setUnreadCount(newCount);
    }, 10000);

    return () => clearInterval(interval);
  }, [unreadCount]);

  const updateCount = () => {
    setUnreadCount(getUnreadOrdersCount());
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const showBrowserNotification = (count: number) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🔔 Pesanan Baru!', {
        body: `Ada ${count} pesanan baru yang masuk`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showBrowserNotification(count);
        }
      });
    }
  };

  const handleClick = () => {
    router.push('/admin#orders');
  };

  if (unreadCount === 0) return null;

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-gray-700 hover:text-blue-600 transition"
      title={`${unreadCount} pesanan baru`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        {unreadCount}
      </span>
    </button>
  );
}
