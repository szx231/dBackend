import { db } from '@/db/connection.js';
import { schema } from '@/db/index.js';
import { and, eq } from 'drizzle-orm';

type CreateUserArgs = typeof schema.users.$inferInsert;
type AddInterestArgs = { userId: string; interests: string[] };

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

export const updateInterests = async (data: AddInterestArgs) => {
  await db.delete(schema.interestToUser).where(eq(schema.interestToUser.user_id, data.userId));
  return await db
    .insert(schema.interestToUser)
    .values(data.interests.map((interId) => ({ user_id: data.userId, interest_id: interId })))
    .returning();
};
