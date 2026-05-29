import { NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.price || !body.stock || !body.image || !body.category) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: {
          name: !!body.name,
          description: !!body.description,
          price: !!body.price,
          stock: !!body.stock,
          image: !!body.image,
          category: !!body.category,
        }
      }, { status: 400 });
    }
    
    const product = createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ 
      error: 'Failed to create product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
