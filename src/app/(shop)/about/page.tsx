import { constructMetadata } from '@/lib/metadata';
import { AboutContent } from '@/components/about/about-content';

export const metadata = constructMetadata({
  title: 'About Us | Piyella',
  description: 'Discover the story, heritage craftsmanship, and slow artistry behind Piyella - luxury handcrafted fashion and modern heirlooms.'
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AboutContent />
    </main>
  );
}
