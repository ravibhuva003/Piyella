type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
}

function formatLog(payload: LogPayload): string {
  return JSON.stringify({
    app: 'piyella-atelier',
    env: process.env.NODE_ENV || 'development',
    timestamp: payload.timestamp,
    level: payload.level,
    message: payload.message,
    context: payload.context,
    error: payload.error instanceof Error ? { message: payload.error.message, stack: payload.error.stack } : payload.error,
  });
}

export const logger = {
  info(message: string, context?: Record<string, unknown>) {
    const formatted = formatLog({ message, level: 'info', timestamp: new Date().toISOString(), context });
    console.log(formatted);
  },

  warn(message: string, context?: Record<string, unknown>) {
    const formatted = formatLog({ message, level: 'warn', timestamp: new Date().toISOString(), context });
    console.warn(formatted);
  },

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const formatted = formatLog({ message, level: 'error', timestamp: new Date().toISOString(), error, context });
    console.error(formatted);
  },

  debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'production') {
      const formatted = formatLog({ message, level: 'debug', timestamp: new Date().toISOString(), context });
      console.debug(formatted);
    }
  },
};
