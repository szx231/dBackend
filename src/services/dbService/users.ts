import { db } from '@/db/connection.js';
import { schema } from '@/db/index.js';

type CreateUserArgs = typeof schema.users.$inferInsert;

export const createUser = async (userData: CreateUserArgs) => {
  const [result] = await db.insert(schema.users).values(userData).returning();
  return result;
};
