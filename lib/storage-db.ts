// Server-side storage using Prisma + Turso
import { prisma } from './prisma'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  discount?: number
  createdAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled'
  paymentMethod: 'transfer' | 'cod' | 'cash'
  paymentProof?: string | null
  notes?: string | null
  isRead?: boolean
  createdAt: string
  updatedAt: string
}

// Products
export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return products.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    stock: p.stock,
    image: p.image,
    category: p.category,
    discount: p.discount || 0,
    createdAt: new Date(p.createdAt).toISOString(),
  }))
}

export async function getProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
  })
  if (!product) return null
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    stock: product.stock,
    image: product.image,
    category: product.category,
    discount: product.discount || 0,
    createdAt: new Date(product.createdAt).toISOString(),
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const newProduct = await prisma.product.create({
    data: {
      id: crypto.randomUUID(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category: product.category,
      discount: product.discount || 0,
      createdAt: new Date().toISOString(),
    },
  })
  return {
    id: newProduct.id,
    name: newProduct.name,
    description: newProduct.description,
    price: Number(newProduct.price),
    stock: newProduct.stock,
    image: newProduct.image,
    category: newProduct.category,
    discount: newProduct.discount || 0,
    createdAt: new Date(newProduct.createdAt).toISOString(),
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: updates,
    })
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      price: Number(updated.price),
      stock: updated.stock,
      image: updated.image,
      category: updated.category,
      discount: updated.discount || 0,
      createdAt: new Date(updated.createdAt).toISOString(),
    }
  } catch {
    return null
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({
      where: { id },
    })
    return true
  } catch {
    return false
  }
}

// Orders
export async function getOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return orders.map(o => ({
    id: o.id,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    customerAddress: o.customerAddress,
    items: JSON.parse(o.items),
    total: Number(o.total),
    status: o.status as Order['status'],
    paymentMethod: o.paymentMethod as Order['paymentMethod'],
    paymentProof: o.paymentProof,
    notes: o.notes,
    isRead: Boolean(o.isRead),
    createdAt: new Date(o.createdAt).toISOString(),
    updatedAt: new Date(o.updatedAt).toISOString(),
  }))
}

export async function getOrder(id: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id },
  })
  if (!order) return null
  return {
    id: order.id,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerAddress: order.customerAddress,
    items: JSON.parse(order.items),
    total: Number(order.total),
    status: order.status as Order['status'],
    paymentMethod: order.paymentMethod as Order['paymentMethod'],
    paymentProof: order.paymentProof,
    notes: order.notes,
    isRead: Boolean(order.isRead),
    createdAt: new Date(order.createdAt).toISOString(),
    updatedAt: new Date(order.updatedAt).toISOString(),
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  const newOrder = await prisma.order.create({
    data: {
      id: crypto.randomUUID(),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      items: JSON.stringify(order.items),
      total: order.total,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentProof: order.paymentProof || null,
      notes: order.notes || null,
      isRead: order.isRead || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
  return {
    id: newOrder.id,
    customerName: newOrder.customerName,
    customerPhone: newOrder.customerPhone,
    customerAddress: newOrder.customerAddress,
    items: JSON.parse(newOrder.items),
    total: Number(newOrder.total),
    status: newOrder.status as Order['status'],
    paymentMethod: newOrder.paymentMethod as Order['paymentMethod'],
    paymentProof: newOrder.paymentProof,
    notes: newOrder.notes,
    isRead: Boolean(newOrder.isRead),
    createdAt: new Date(newOrder.createdAt).toISOString(),
    updatedAt: new Date(newOrder.updatedAt).toISOString(),
  }
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  try {
    const data: any = { ...updates }
    if (updates.items) {
      data.items = JSON.stringify(updates.items)
    }
    data.updatedAt = new Date().toISOString()
    
    const updated = await prisma.order.update({
      where: { id },
      data,
    })
    return {
      id: updated.id,
      customerName: updated.customerName,
      customerPhone: updated.customerPhone,
      customerAddress: updated.customerAddress,
      items: JSON.parse(updated.items),
      total: Number(updated.total),
      status: updated.status as Order['status'],
      paymentMethod: updated.paymentMethod as Order['paymentMethod'],
      paymentProof: updated.paymentProof,
      notes: updated.notes,
      isRead: Boolean(updated.isRead),
      createdAt: new Date(updated.createdAt).toISOString(),
      updatedAt: new Date(updated.updatedAt).toISOString(),
    }
  } catch {
    return null
  }
}

// Helper functions
export function calculateDiscountedPrice(price: number, discount?: number): number {
  if (!discount || discount <= 0) return price
  return Math.round(price * (1 - discount / 100))
}

export async function getUnreadOrdersCount(): Promise<number> {
  return await prisma.order.count({
    where: {
      isRead: false,
      status: 'pending',
    },
  })
}

export async function markOrderAsRead(id: string): Promise<void> {
  await updateOrder(id, { isRead: true })
}

export async function markAllOrdersAsRead(): Promise<void> {
  await prisma.order.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  })
}
