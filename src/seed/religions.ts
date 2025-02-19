import { db, schema } from '@/db/index.js';

const religions = [
  {
    name: 'Christianity',
  },
  {
    name: 'Islam',
  },
  {
    name: 'Hinduism',
  },
  {
    name: 'Buddhism',
  },
  {
    name: 'Judaism',
  },
  {
    name: 'Sikhism',
  },
  {
    name: 'Baháʼí Faith',
  },
  {
    name: 'Jainism',
  },
  {
    name: 'Shinto',
  },
  {
    name: 'Taoism',
  },
  {
    name: 'Zoroastrianism',
  },
  {
    name: 'Paganism',
  },
  {
    name: 'Animism',
  },
  {
    name: 'Spiritual but not religious',
  },
  {
    name: 'Agnosticism',
  },
  {
    name: 'Atheism',
  },
  {
    name: 'Other',
  },
  {
    name: 'Non-Religious People',
  },
];

await db.delete(schema.religions);

await db.insert(schema.religions).values(religions);

console.log('religions done');
