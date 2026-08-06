import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface BannerConfig {
  announcementText: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubtitle: string;
  heroBackgroundImage?: string;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const BANNERS_FILE = path.join(DATA_DIR, 'banners.json');

const DEFAULT_BANNER: BannerConfig = {
  announcementText: 'Handcrafted Bespoke Luxury Collection',
  announcementActive: false,
  heroHeadline: 'Mastery of Bespoke Luxury',
  heroSubtitle: 'Handcrafted in Italian workshops with rare calfskin, 100% pure Mulberry silk, and Swiss automatic movements.',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop',
};

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getStoredBanners(): BannerConfig {
  try {
    ensureDirectory();
    if (fs.existsSync(BANNERS_FILE)) {
      const data = fs.readFileSync(BANNERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading banners file:', e);
  }
  return DEFAULT_BANNER;
}

function saveStoredBanners(banners: BannerConfig) {
  try {
    ensureDirectory();
    fs.writeFileSync(BANNERS_FILE, JSON.stringify(banners, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing banners file:', e);
  }
}

export async function GET() {
  const banners = getStoredBanners();
  return NextResponse.json({ banners });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated: BannerConfig = {
      ...getStoredBanners(),
      ...body.banners,
    };
    saveStoredBanners(updated);
    return NextResponse.json({ success: true, banners: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
