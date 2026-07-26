import { constructMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/container';

export const metadata = constructMetadata({ title: 'Contact Us | Piyella' });

export default function ContactPage() {
  return (
    <div className="py-24 min-h-screen">
      <Container className="max-w-2xl">
        <h1 className="font-heading text-4xl mb-8 text-center">Contact Us</h1>
        <p className="text-center text-foreground-muted mb-12">
          We'd love to hear from you. Please reach out with any inquiries.
        </p>
        {/* Contact form placeholder */}
      </Container>
    </div>
  );
}
