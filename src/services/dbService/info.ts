import { db, schema } from '@/db/index.js';
import { eq } from 'drizzle-orm';

export const getGenders = async () => {
  const result = await db.select().from(schema.genders);

  return result.map((gender) => gender.code);
};

export const getInterests = async () => {
  return await db
    .select({
      id: schema.interests.id,
      name: schema.interests.name,
      icon: schema.interests.icon,
      groupName: schema.interstsCategories.name,
    })
    .from(schema.interests)
    .innerJoin(schema.interstsCategories, eq(schema.interests.category_id, schema.interstsCategories.id));
};
