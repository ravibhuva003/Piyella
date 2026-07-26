import { logger } from '@/lib/logger';

export type EventName = 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'search';

export function trackEvent(eventName: EventName, params?: Record<string, unknown>) {
  logger.info(`Analytics Event: ${eventName}`, params);

  if (typeof window !== 'undefined') {
    // Google Analytics / Vercel Analytics Hook
    const win = window as unknown as { gtag?: (type: string, name: string, data?: Record<string, unknown>) => void };
    if (win.gtag) {
      win.gtag('event', eventName, params);
    }
  }
}
