import { NextResponse } from 'next/server';
import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';

// Path for server-side JSON persistence across devices
const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getStoredProducts(): Product[] {
  try {
    ensureDirectory();
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading products file:', e);
  }
  return [];
}

function saveStoredProducts(products: Product[]) {
  try {
    ensureDirectory();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing products file:', e);
  }
}

export async function GET() {
  const products = getStoredProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentProds = getStoredProducts();

    if (body.action === 'CREATE') {
      const newProduct: Product = {
        ...body.product,
        id: `p_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = [newProduct, ...currentProds];
      saveStoredProducts(updated);
      return NextResponse.json({ success: true, product: newProduct, products: updated });
    }

    if (body.action === 'UPDATE') {
      const { id, product } = body;
      const updated = currentProds.map((p) =>
        p.id === id ? { ...p, ...product, updatedAt: new Date().toISOString() } : p
      );
      saveStoredProducts(updated);
      return NextResponse.json({ success: true, products: updated });
    }

    if (body.action === 'DELETE') {
      const { id } = body;
      const updated = currentProds.filter((p) => p.id !== id);
      saveStoredProducts(updated);
      return NextResponse.json({ success: true, products: updated });
    }

    if (body.action === 'SYNC') {
      const { products } = body;
      saveStoredProducts(products || []);
      return NextResponse.json({ success: true, products: products || [] });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
