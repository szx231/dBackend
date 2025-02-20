import { db } from '@/db/connection.js';
import { schema } from '@/db/index.js';
import { and, eq } from 'drizzle-orm';

type CreateUserArgs = typeof schema.users.$inferInsert;

export const createUser = async (userData: CreateUserArgs) => {
  const [result] = await db.insert(schema.users).values(userData).returning();
  await db.insert(schema.activation).values({ is_activated: false, user_id: result.id });
  return result;
};

export const findByEmail = async (email: string) => {
  const [result] = await db.select().from(schema.users).where(eq(schema.users.email, email));
  return result;
};

export const isActivated = async (id: string) => {
  const [result] = await db
    .select()
    .from(schema.activation)
    .where(and(eq(schema.activation.user_id, id), eq(schema.activation.is_activated, true)));

  return Boolean(result);
};

export const activate = async (id: string) => {
  return await db.update(schema.activation).set({ is_activated: true }).where(eq(schema.activation.user_id, id));
};
