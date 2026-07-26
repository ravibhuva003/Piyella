import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const eventType = payload?.type;

    console.log(`Clerk webhook received: ${eventType}`);

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = payload.data;
      console.log(`Synced new user ${id} (${email_addresses?.[0]?.email_address})`);
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Clerk webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
