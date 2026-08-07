import { constructMetadata } from '@/lib/metadata';
import { ContactClient } from '@/components/contact/contact-client';

export const metadata = constructMetadata({
  title: 'Contact Us | Piyella',
  description: 'Reach out to Piyella Atelier Concierge for bespoke inquiries, private appointments, and assistance.',
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ContactClient />
    </main>
  );
}
