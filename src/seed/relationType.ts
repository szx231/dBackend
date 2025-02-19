import { db, schema } from '@/db/index.js';

const relation_type = [
  {
    name: 'Long-term partner',
    type: 'LONG',
  },
  {
    name: 'Long-term, but short-term OK',
    type: 'LONGSHORT',
  },
  {
    name: 'Short-term, but long-term OK',
    type: 'SHORTLOG',
  },
  {
    name: 'Short-term fun',
    type: 'SHORT',
  },
  {
    name: 'New friends',
    type: 'FRIENDS',
  },
  {
    name: 'Still figuring it out',
    type: 'FIGURINGOUT',
  },
];

await db.delete(schema.relationTypes);

await db.insert(schema.relationTypes).values(relation_type);

console.log('relations done');
