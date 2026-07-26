'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { getShipmentTracking, ShiprocketTrackingResponse } from '@/lib/shiprocket/api';
import { TrackingTimeline } from '@/components/logistics/tracking-timeline';

interface PublicTrackingPageProps {
  params: Promise<{
    trackingId: string;
  }>;
}

export default function PublicTrackingPage({ params }: PublicTrackingPageProps) {
  const { trackingId } = use(params);
  const [tracking, setTracking] = useState<ShiprocketTrackingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const data = await getShipmentTracking(trackingId);
        setTracking(data);
      } catch (err) {
        console.error('Tracking Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTracking();
  }, [trackingId]);

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 selection:bg-[#C9A96E] selection:text-black">
      <Container className="max-w-5xl">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <Link href="/account/orders" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>
          <span className="text-xs text-[#C9A96E] font-mono">Shiprocket Live Tracking</span>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-white/50">Fetching Shiprocket Courier Status...</p>
          </div>
        ) : tracking ? (
          <TrackingTimeline tracking={tracking} />
        ) : (
          <div className="py-24 text-center space-y-4 text-white/40">
            <p className="text-lg">Tracking code #{trackingId} not found.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
