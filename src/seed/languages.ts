import { db, schema } from '@/db/index.js';
import languages from './info/langs-list.json' assert { type: 'json' };

await db.delete(schema.languages);

await db.insert(schema.languages).values(languages.map((l) => ({ name: l.language, country_code: l.country_code })));

console.log('languages done');
