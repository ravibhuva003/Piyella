import { NextResponse } from 'next/server';
import { getShipmentTracking } from '@/lib/shiprocket/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const awb = searchParams.get('awb') || 'SHIP-881204';

  try {
    const tracking = await getShipmentTracking(awb);
    return NextResponse.json({ success: true, tracking });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch tracking' }, { status: 500 });
  }
}
