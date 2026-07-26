import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      returnTicketId: `RET-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Reverse Pickup Scheduled',
      estimatedPickup: 'Within 24 Hours',
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to initiate return' }, { status: 500 });
  }
}
