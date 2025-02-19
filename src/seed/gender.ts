import { db, schema } from '@/db/index.js';

const genders = [
  {
    name: 'MALE',
    code: 'MALE',
  },
  {
    name: 'FEMALE',
    code: 'FEMALE',
  },
  {
    name: 'OTHER',
    code: 'OTHER',
  },
];

await db.delete(schema.genders);

await db.insert(schema.genders).values(genders);

console.log('genders done');
