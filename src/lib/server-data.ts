import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { products as defaultProducts } from '@/data/mock-products';
import { collections as defaultCollections } from '@/data/mock-collections';

export function getServerProducts(): Product[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'storage', 'products.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultProducts;
}

export function getServerCollections(): Collection[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'storage', 'collections.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultCollections;
}
