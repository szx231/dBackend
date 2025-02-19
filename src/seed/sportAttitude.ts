import { db, schema } from '@/db/index.js';

const sport_attitude = [
  {
    name: 'Don’t like sports',
  },
  {
    name: 'Walk regularly',
  },
  {
    name: 'Stay in shape',
  },
  {
    name: 'Live for sports',
  },
  {
    name: 'Neutral',
  },
];

await db.delete(schema.sportAttitudes);

await db.insert(schema.sportAttitudes).values(sport_attitude);

console.log('sport attitudes done');
