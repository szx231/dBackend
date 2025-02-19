import { db, schema } from '@/db/index.js';
import { eq, ilike, or } from 'drizzle-orm';

export const getJobTitlesByPartialName = async (name: string) => {
  const result = await db
    .select()
    .from(schema.jobTitles)
    .where(or(ilike(schema.jobTitles.name, `${name}%`), ilike(schema.jobTitles.name, `%${name}%`)))
    .orderBy(schema.jobTitles.name)
    .limit(20);

  return result;
};

export const getTitleById = async (id: string) => {
  const [result] = await db.select().from(schema.jobTitles).where(eq(schema.jobTitles.id, id));

  return result;
};
