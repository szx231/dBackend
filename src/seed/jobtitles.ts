import { db, schema } from '@/db/index.js';
import jobTitles from './info/linkedin_titles-list.json' assert { type: 'json' };

const customTitles = ['Fullstack Developer', 'Scrapp Developer'];

const titles = [...jobTitles, ...customTitles].map((title) => ({ name: title }));

await db.delete(schema.jobTitles);

await db.insert(schema.jobTitles).values(titles);

console.log('jobs done');
