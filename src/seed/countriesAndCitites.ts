import { db, schema } from '@/db/index.js';
import cities from './info/cities500.json' assert { type: 'json' };
import countries from './info/countryInfo.json' assert { type: 'json' };

type City = {
  name: string;
  alternatenames: string;
  timezone: string;
  'country code': string;
};

let cityCounter = 1;

function splitIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

for (const country of countries) {
  await db
    .insert(schema.countries)
    .values({
      code: country.ISO,
      name: country.Country,
    })
    .onConflictDoNothing();
}

const preparedCities = (cities as City[]).map((city) => ({
  name: city.name,
  country_code: city['country code'],
  alternatenames: city.alternatenames,
  timezone: city.timezone,
}));

const chunks = splitIntoChunks(preparedCities, 1000);

await db.delete(schema.cities);

for (const chunk of chunks) {
  try {
    await db.insert(schema.cities).values(chunk);
    process.stdout.write(`\r[${cityCounter++}/${chunks.length}]`);
  } catch (_) {
    console.log(chunk);
    process.exit();
  }
}
console.log();

console.log('countries done');
