import { sql } from 'drizzle-orm';
import { boolean, date, index, pgTable, primaryKey, real, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const genders = pgTable('genders', {
  code: varchar({ length: 16 }).primaryKey(),
  name: text(),
});

export const languages = pgTable('languages', {
  country_code: varchar({ length: 16 })
    .notNull()
    .references(() => countries.code),
  name: varchar({ length: 32 }).primaryKey(),
});

export const languagesToUser = pgTable(
  'languages_to_user',
  {
    user_id: uuid()
      .notNull()
      .references(() => users.id),
    language_name: varchar({ length: 32 })
      .notNull()
      .references(() => languages.name),
  },
  (t) => [primaryKey({ columns: [t.user_id, t.language_name] })],
);

export const files = pgTable('files', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 256 }).notNull(),
  original_name: varchar({ length: 256 }).notNull(),
  ext: varchar({ length: 32 }).notNull(),
  mime: varchar({ length: 256 }).notNull(),
});

export const countries = pgTable('countries', {
  code: varchar({ length: 16 }).primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  icon_file: uuid().references(() => files.id),
});

export const cities = pgTable(
  'cities',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 128 }).notNull(),
    alternatenames: varchar({ length: 3072 }),
    timezone: varchar({ length: 32 }),
    country_code: varchar({ length: 16 })
      .notNull()
      .references(() => countries.code),
  },
  (t) => [index('alternatenames_index').on(t.alternatenames)],
);

export const relationTypes = pgTable('relation_types', {
  type: varchar({ length: 16 }).primaryKey(),
  name: text(),
});

export const jobTitles = pgTable('job_titles', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
});

export const habbits = pgTable('habbits', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
});

export const religions = pgTable('religions', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
});

export const sportAttitudes = pgTable('sport_attitudes', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
});

export const eduTypes = pgTable('edu_types', {
  type: varchar({ length: 16 }).primaryKey(),
  name: text(),
});

export const eduDeps = pgTable('edu_deps', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  edu_type: varchar({ length: 16 })
    .references(() => eduTypes.type)
    .notNull(),
});

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 128 }).notNull().unique(),
  hash: varchar({ length: 2048 }),
  full_name: varchar({ length: 128 }).notNull(),
  date_birth: date().notNull(),
  gender: varchar({ length: 16 })
    .references(() => genders.code)
    .notNull(),
  partner_gender: varchar({ length: 16 })
    .references(() => genders.code)
    .notNull(),
  height: real().notNull(),
  relation_type: varchar({ length: 16 })
    .references(() => relationTypes.type)
    .notNull(),
  job_title_id: uuid()
    .notNull()
    .references(() => jobTitles.id),
  education_dep: uuid().references(() => eduDeps.id),
  about_me: varchar({ length: 200 }),
  about_partner: varchar({ length: 200 }),
  is_verificated: boolean()
    .default(sql`false::boolean`)
    .notNull(),

  // TODO
  // skills - need
  // intersts - need

  // location_lat float [not null]
  // location_lon float [not null]

  // growup
  birth_country_code: varchar({ length: 16 }).references(() => countries.code),

  drinking: uuid().references(() => habbits.id),
  smoking: uuid().references(() => habbits.id),

  fav_book: varchar({ length: 128 }),
  fav_movie: varchar({ length: 128 }),

  sport_attitude: uuid().references(() => sportAttitudes.id),
  religion: uuid().references(() => religions.id),

  created_at: date().defaultNow(),
  role_code: varchar({ length: 32 })
    .references(() => roles.code, { onDelete: 'set null', onUpdate: 'cascade' })
    .notNull(),
});

export const interstsCategories = pgTable('interests_categories', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 128 }).notNull().unique(),
});

export const interests = pgTable('interests', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 128 }).notNull(),
  icon: varchar({ length: 128 }).notNull(),
  category_id: uuid()
    .notNull()
    .references(() => interstsCategories.id),
});

export const roles = pgTable('roles', {
  code: varchar({ length: 32 }).primaryKey(),
  description: text(),
});

export const rights = pgTable('rights', {
  code: varchar({ length: 32 }).primaryKey(),
  description: text(),
});

export const rightsToRoles = pgTable(
  'rights_to_roles',
  {
    role_code: varchar({ length: 32 })
      .references(() => roles.code)
      .notNull(),
    right_code: varchar({ length: 32 })
      .references(() => rights.code)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.role_code, table.right_code], name: 'pk_rtr_key' })],
);

export const activation = pgTable('activations', {
  is_activated: boolean().notNull(),
  activated_at: date().defaultNow(),
  user_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const exteralProviders = pgTable('external_providers', {
  name: varchar({ length: 32 }).primaryKey(),
});

export const externalUserProviders = pgTable('external_user_providers', {
  user_id: uuid()
    .notNull()
    .references(() => users.id),
  provider_name: varchar({ length: 32 })
    .notNull()
    .references(() => exteralProviders.name),
  provider_user_id: varchar({ length: 128 }).notNull(),
  provider_user_token: varchar({ length: 128 }),
});
