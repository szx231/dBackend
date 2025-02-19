import { db, schema } from '@/db/index.js';

const roles = [
  {
    code: 'ADMIN',
  },
  {
    code: 'USER',
  },
  {
    code: 'MODERATOR',
  },
];

await db.delete(schema.roles);

await db.insert(schema.roles).values(roles);

console.log('roles done');
