import { db, schema } from '@/db/index.js';

const eduTypes: (typeof schema.eduTypes.$inferInsert)[] = [
  { type: 'SECONDARY', name: 'Среднее и доп' },
  { type: 'HIGHER', name: 'Высшее' },
];

await db.delete(schema.eduTypes);
await db.insert(schema.eduTypes).values(eduTypes);

console.log('eduTypes done');
