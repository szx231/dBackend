import { db, schema } from '@/db/index.js';
import interests from './info/interests.json' with { type: 'json' };

const grouped = Object.groupBy(interests, (item) => item.category);

for (const [category, list] of Object.entries(grouped)) {
  const [inbaseCat] = await db.insert(schema.interstsCategories).values({ name: category }).returning();
  await db
    .insert(schema.interests)
    .values(list!.map((i) => ({ category_id: inbaseCat.id, icon: i.icon, name: i.name })));
}

console.log('seeding interests done!');
