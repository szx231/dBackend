import { db, schema } from '@/db/index.js';

export const getTypesList = async () => {
  const result = await db.select().from(schema.relationTypes);

  return result;
};
