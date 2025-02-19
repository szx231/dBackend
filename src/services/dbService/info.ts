import { db, schema } from '@/db/index.js';

export const getGenders = async () => {
  const result = await db.select().from(schema.genders);

  return result.map((gender) => gender.code);
};
