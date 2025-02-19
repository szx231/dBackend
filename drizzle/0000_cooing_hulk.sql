CREATE TABLE "activations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_activated" boolean NOT NULL,
	"activated_at" date DEFAULT now(),
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"alternatenames" varchar(3072),
	"timezone" varchar(32),
	"country_code" varchar(16) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"code" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"icon_file" uuid
);
--> statement-breakpoint
CREATE TABLE "edu_deps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"edu_type" varchar(16) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "edu_types" (
	"type" varchar(16) PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"original_name" varchar(256) NOT NULL,
	"ext" varchar(32) NOT NULL,
	"mime" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genders" (
	"code" varchar(16) PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "habbits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "job_titles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"country_code" varchar(16) NOT NULL,
	"name" varchar(32) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages_to_user" (
	"user_id" uuid NOT NULL,
	"language_name" varchar(32) NOT NULL,
	CONSTRAINT "languages_to_user_user_id_language_name_pk" PRIMARY KEY("user_id","language_name")
);
--> statement-breakpoint
CREATE TABLE "relation_types" (
	"type" varchar(16) PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "religions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "rights" (
	"code" varchar(32) PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "rights_to_roles" (
	"role_code" varchar(32) NOT NULL,
	"right_code" varchar(32) NOT NULL,
	CONSTRAINT "pk_rtr_key" PRIMARY KEY("role_code","right_code")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"code" varchar(32) PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "sport_attitudes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(128) NOT NULL,
	"hash" varchar(2048),
	"full_name" varchar(128) NOT NULL,
	"date_birth" date NOT NULL,
	"gender" varchar(16) NOT NULL,
	"partner_gender" varchar(16) NOT NULL,
	"height" real NOT NULL,
	"relation_type" varchar(16) NOT NULL,
	"job_title_id" uuid NOT NULL,
	"education_dep" uuid,
	"about_me" varchar(200),
	"about_partner" varchar(200),
	"is_verificated" boolean DEFAULT false::boolean NOT NULL,
	"birth_country_code" varchar(16),
	"drinking" uuid,
	"smoking" uuid,
	"fav_book" varchar(128),
	"fav_movie" varchar(128),
	"sport_attitude" uuid,
	"religion" uuid,
	"created_at" date DEFAULT now(),
	"role_code" varchar(32) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "activations" ADD CONSTRAINT "activations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_code_countries_code_fk" FOREIGN KEY ("country_code") REFERENCES "public"."countries"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_icon_file_files_id_fk" FOREIGN KEY ("icon_file") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "edu_deps" ADD CONSTRAINT "edu_deps_edu_type_edu_types_type_fk" FOREIGN KEY ("edu_type") REFERENCES "public"."edu_types"("type") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages" ADD CONSTRAINT "languages_country_code_countries_code_fk" FOREIGN KEY ("country_code") REFERENCES "public"."countries"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages_to_user" ADD CONSTRAINT "languages_to_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages_to_user" ADD CONSTRAINT "languages_to_user_language_name_languages_name_fk" FOREIGN KEY ("language_name") REFERENCES "public"."languages"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rights_to_roles" ADD CONSTRAINT "rights_to_roles_role_code_roles_code_fk" FOREIGN KEY ("role_code") REFERENCES "public"."roles"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rights_to_roles" ADD CONSTRAINT "rights_to_roles_right_code_rights_code_fk" FOREIGN KEY ("right_code") REFERENCES "public"."rights"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_gender_genders_code_fk" FOREIGN KEY ("gender") REFERENCES "public"."genders"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_partner_gender_genders_code_fk" FOREIGN KEY ("partner_gender") REFERENCES "public"."genders"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_relation_type_relation_types_type_fk" FOREIGN KEY ("relation_type") REFERENCES "public"."relation_types"("type") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_job_title_id_job_titles_id_fk" FOREIGN KEY ("job_title_id") REFERENCES "public"."job_titles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_education_dep_edu_deps_id_fk" FOREIGN KEY ("education_dep") REFERENCES "public"."edu_deps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_birth_country_code_countries_code_fk" FOREIGN KEY ("birth_country_code") REFERENCES "public"."countries"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_drinking_habbits_id_fk" FOREIGN KEY ("drinking") REFERENCES "public"."habbits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_smoking_habbits_id_fk" FOREIGN KEY ("smoking") REFERENCES "public"."habbits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_sport_attitude_sport_attitudes_id_fk" FOREIGN KEY ("sport_attitude") REFERENCES "public"."sport_attitudes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_religion_religions_id_fk" FOREIGN KEY ("religion") REFERENCES "public"."religions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_code_roles_code_fk" FOREIGN KEY ("role_code") REFERENCES "public"."roles"("code") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "alternatenames_index" ON "cities" USING btree ("alternatenames");