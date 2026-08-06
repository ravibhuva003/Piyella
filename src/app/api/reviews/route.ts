import { NextResponse } from 'next/server';
import { ProductReview } from '@/types/product';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getStoredReviews(): ProductReview[] {
  try {
    ensureDirectory();
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading reviews file:', e);
  }
  return [];
}

function saveStoredReviews(reviews: ProductReview[]) {
  try {
    ensureDirectory();
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing reviews file:', e);
  }
}

export async function GET() {
  const reviews = getStoredReviews();
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentReviews = getStoredReviews();

    if (body.action === 'CREATE') {
      const newReview: ProductReview = {
        ...body.review,
        id: `rev_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: body.review.status || 'Approved',
        isVerified: body.review.isVerified ?? true,
        likes: 0,
      };
      const updated = [newReview, ...currentReviews];
      saveStoredReviews(updated);
      return NextResponse.json({ success: true, review: newReview, reviews: updated });
    }

    if (body.action === 'UPDATE') {
      const { id, review } = body;
      const updated = currentReviews.map((r) => (r.id === id ? { ...r, ...review } : r));
      saveStoredReviews(updated);
      return NextResponse.json({ success: true, reviews: updated });
    }

    if (body.action === 'DELETE') {
      const { id } = body;
      const updated = currentReviews.filter((r) => r.id !== id);
      saveStoredReviews(updated);
      return NextResponse.json({ success: true, reviews: updated });
    }

    if (body.action === 'SYNC') {
      const { reviews } = body;
      saveStoredReviews(reviews || []);
      return NextResponse.json({ success: true, reviews: reviews || [] });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
