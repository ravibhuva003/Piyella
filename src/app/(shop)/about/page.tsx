import { constructMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/container';

export const metadata = constructMetadata({ title: 'About Us | Piyella' });

export default function AboutPage() {
  return (
    <div className="py-24 min-h-screen">
      <Container className="max-w-3xl text-center">
        <h1 className="font-heading text-4xl mb-8">About Piyella</h1>
        <p className="text-foreground-muted mb-6">
          Piyella is a premium luxury fashion ecommerce platform dedicated to bringing you curated elegance from around the world.
        </p>
      </Container>
    </div>
  );
}
