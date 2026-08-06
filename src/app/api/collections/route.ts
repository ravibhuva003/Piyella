import { NextResponse } from 'next/server';
import { Collection } from '@/types/collection';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const COLLECTIONS_FILE = path.join(DATA_DIR, 'collections.json');

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getStoredCollections(): Collection[] {
  try {
    ensureDirectory();
    if (fs.existsSync(COLLECTIONS_FILE)) {
      const data = fs.readFileSync(COLLECTIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading collections file:', e);
  }
  return [];
}

function saveStoredCollections(collections: Collection[]) {
  try {
    ensureDirectory();
    fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(collections, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing collections file:', e);
  }
}

export async function GET() {
  const collections = getStoredCollections();
  return NextResponse.json({ collections });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentCols = getStoredCollections();

    if (body.action === 'CREATE') {
      const newCollection: Collection = {
        ...body.collection,
        id: `c_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newCollection, ...currentCols];
      saveStoredCollections(updated);
      return NextResponse.json({ success: true, collection: newCollection, collections: updated });
    }

    if (body.action === 'UPDATE') {
      const { id, collection } = body;
      const updated = currentCols.map((c) => (c.id === id ? { ...c, ...collection } : c));
      saveStoredCollections(updated);
      return NextResponse.json({ success: true, collections: updated });
    }

    if (body.action === 'DELETE') {
      const { id } = body;
      const updated = currentCols.filter((c) => c.id !== id);
      saveStoredCollections(updated);
      return NextResponse.json({ success: true, collections: updated });
    }

    if (body.action === 'SYNC') {
      const { collections } = body;
      saveStoredCollections(collections || []);
      return NextResponse.json({ success: true, collections: collections || [] });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
