import { logger } from '@/lib/logger';

export function captureException(error: Error | unknown, context?: Record<string, unknown>) {
  logger.error('Unhandled Application Exception', error, context);
  
  // Sentry or Monitoring service hook
  if (typeof window !== 'undefined' && (window as unknown as { Sentry?: { captureException: (e: unknown) => void } }).Sentry) {
    (window as unknown as { Sentry: { captureException: (e: unknown) => void } }).Sentry.captureException(error);
  }
}
