CREATE TABLE "external_providers" (
	"name" varchar(32) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "external_user_providers" (
	"user_id" uuid NOT NULL,
	"provider_name" varchar(32) NOT NULL,
	"provider_user_id" varchar(128) NOT NULL,
	"provider_user_token" varchar(128)
);
--> statement-breakpoint
ALTER TABLE "external_user_providers" ADD CONSTRAINT "external_user_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_user_providers" ADD CONSTRAINT "external_user_providers_provider_name_external_providers_name_fk" FOREIGN KEY ("provider_name") REFERENCES "public"."external_providers"("name") ON DELETE no action ON UPDATE no action;