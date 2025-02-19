import { db, schema } from '@/db/index.js';
import { eq, ilike, or } from 'drizzle-orm';

export const getCountriesList = async () => {
  const result = await db.select().from(schema.countries);
  return result;
};

export const findCountryByName = async (name: string) => {
  const [result] = await db.select().from(schema.countries).where(eq(schema.countries.name, name));
  return result;
};

export const findCountryByCode = async (code: string) => {
  const [result] = await db.select().from(schema.countries).where(eq(schema.countries.code, code));
  return result;
};

export const findCityByName = async (name: string) => {
  const [result] = await db.select().from(schema.cities).where(eq(schema.cities.name, name));
  return result;
};

export const getCitiesByPartialName = async (name: string) => {
  const result = await db
    .select({
      id: schema.cities.id,
      name: schema.cities.name,
      country: schema.countries.name,
    })
    .from(schema.cities)
    .where(
      or(
        ilike(schema.cities.name, `${name}%`),
        ilike(schema.cities.alternatenames, `%,${name}%`),
        ilike(schema.cities.alternatenames, `${name}%`),
      ),
    )
    .orderBy(schema.cities.name)
    .limit(15)
    .leftJoin(schema.countries, eq(schema.cities.country_code, schema.countries.code));

  return result;
};
