'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <h2 className="font-heading text-3xl text-foreground mb-4">Something went wrong!</h2>
      <p className="text-foreground-muted mb-8 max-w-md mx-auto">
        An unexpected error occurred.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex h-12 items-center justify-center bg-accent text-accent-foreground px-8 text-sm uppercase tracking-widest transition-colors hover:bg-accent/90"
      >
        Try again
      </button>
    </div>
  );
}
