import { NextResponse } from 'next/server';
import { createShipmentOrder } from '@/lib/shiprocket/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createShipmentOrder(body);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create shipment order' }, { status: 500 });
  }
}
