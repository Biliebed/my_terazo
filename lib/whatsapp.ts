// WhatsApp Integration Helper

const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp admin (format: 62xxx tanpa +)

export function formatWhatsAppNumber(number: string): string {
  // Remove all non-numeric characters
  let cleaned = number.replace(/\D/g, '');
  
  // If starts with 0, replace with 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  // If doesn't start with 62, add it
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
}

export function getWhatsAppLink(message: string, phoneNumber?: string): string {
  const number = phoneNumber ? formatWhatsAppNumber(phoneNumber) : WHATSAPP_NUMBER;
  const encodedMessage = encodeURIComponent(message);
  
  // Use wa.me for universal compatibility (works on mobile & desktop)
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function formatProductOrderMessage(
  productName: string,
  price: number,
  quantity: number,
  customerName?: string
): string {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = price * quantity;
  
  let message = `🛒 *Halo, saya ingin order:*\n\n`;
  message += `📦 Produk: ${productName}\n`;
  message += `💰 Harga: ${formatPrice(price)}\n`;
  message += `🔢 Jumlah: ${quantity}\n`;
  message += `💵 Total: ${formatPrice(total)}\n\n`;
  
  if (customerName) {
    message += `👤 Nama: ${customerName}\n\n`;
  }
  
  message += `Mohon informasi ketersediaan dan cara pembayarannya. Terima kasih! 🙏`;
  
  return message;
}

export function formatCartOrderMessage(
  items: Array<{ productName: string; price: number; quantity: number }>,
  total: number,
  customerName?: string,
  customerPhone?: string,
  customerAddress?: string
): string {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  let message = `🛒 *Halo, saya ingin order:*\n\n`;
  message += `📋 *Detail Pesanan:*\n`;
  
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.productName}\n`;
    message += `   ${formatPrice(item.price)} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
  });
  
  message += `\n💵 *Total: ${formatPrice(total)}*\n\n`;
  
  if (customerName || customerPhone || customerAddress) {
    message += `📝 *Data Pembeli:*\n`;
    if (customerName) message += `👤 Nama: ${customerName}\n`;
    if (customerPhone) message += `📱 HP: ${customerPhone}\n`;
    if (customerAddress) message += `📍 Alamat: ${customerAddress}\n`;
    message += `\n`;
  }
  
  message += `Mohon konfirmasi pesanan dan cara pembayarannya. Terima kasih! 🙏`;
  
  return message;
}

export function openWhatsApp(message: string, phoneNumber?: string): void {
  const link = getWhatsAppLink(message, phoneNumber);
  window.open(link, '_blank');
}
