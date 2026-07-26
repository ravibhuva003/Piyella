import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import Link from 'next/link';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-16">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 shrink-0">
              <nav className="flex flex-col space-y-2">
                <Link href="/account" className="text-foreground hover:text-accent p-2 rounded transition-colors">Dashboard</Link>
                <Link href="/account/orders" className="text-foreground hover:text-accent p-2 rounded transition-colors">Orders</Link>
                <Link href="/account/addresses" className="text-foreground hover:text-accent p-2 rounded transition-colors">Addresses</Link>
              </nav>
            </aside>
            <div className="flex-1 min-h-[500px]">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
