import { db, schema } from '@/db/index.js';

const habits = [
  {
    name: 'NEGATIVE',
  },
  {
    name: 'NEUTRAL',
  },
  {
    name: 'POSITIVE',
  },
  {
    name: 'RARELY, SOCIALLY',
  },
];

await db.delete(schema.habbits);

await db.insert(schema.habbits).values(habits);

console.log('habits done');
