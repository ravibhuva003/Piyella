'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logger } from '@/lib/logger';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    logger.info(`Page View: ${pathname}`);
  }, [pathname]);

  return <>{children}</>;
}
