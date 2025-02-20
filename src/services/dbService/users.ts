import { db } from '@/db/connection.js';
import { schema } from '@/db/index.js';
import { eq } from 'drizzle-orm';

type CreateUserArgs = typeof schema.users.$inferInsert;

export const createUser = async (userData: CreateUserArgs) => {
  const [result] = await db.insert(schema.users).values(userData).returning();
  return result;
};

export const findByEmail = async (email: string) => {
  const [result] = await db.select().from(schema.users).where(eq(schema.users.email, email));
  return result;
};
