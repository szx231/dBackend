import type { schema } from '@/db/index.js';

declare module 'fastify' {
  interface Session {
    user: typeof schema.users.$inferSelect;
  }
}
