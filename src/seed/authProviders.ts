import { db, schema } from '@/db/index.js';

const providers = ['LINKEDIN', 'GOOGLE'];

await db.delete(schema.exteralProviders);

await db.insert(schema.exteralProviders).values(providers.map((name) => ({ name })));

console.log('seeding external providers done');
