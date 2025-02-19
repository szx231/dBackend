import { db, schema } from '@/db/index.js';

export const getList = async () => {
  const result = await db.select().from(schema.languages);

  return result;
};
