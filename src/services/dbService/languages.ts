import { db, schema } from '@/db/index.js';
import { eq } from 'drizzle-orm';

export const getList = async () => {
  const result = await db.select().from(schema.languages);
  return result;
};

export const getWithCountries = async () => {
  return await db
    .select({
      name: schema.languages.name,
      countryName: schema.countries.name,
      countryCode: schema.countries.code,
    })
    .from(schema.languages)
    .innerJoin(schema.countries, eq(schema.languages.country_code, schema.countries.code));
};
