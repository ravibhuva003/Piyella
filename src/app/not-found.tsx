import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="font-heading text-9xl text-accent mb-4">404</h1>
      <h2 className="font-heading text-3xl text-foreground mb-4">Page Not Found</h2>
      <p className="text-foreground-muted mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center bg-accent text-accent-foreground px-8 text-sm uppercase tracking-widest transition-colors hover:bg-accent/90"
      >
        Return Home
      </Link>
    </div>
  );
}
