CREATE TABLE "interest_to_user" (
	"user_id" uuid NOT NULL,
	"interest_id" uuid NOT NULL,
	CONSTRAINT "interest_to_user_user_id_interest_id_pk" PRIMARY KEY("user_id","interest_id")
);
--> statement-breakpoint
ALTER TABLE "interest_to_user" ADD CONSTRAINT "interest_to_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_to_user" ADD CONSTRAINT "interest_to_user_interest_id_interests_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interests"("id") ON DELETE no action ON UPDATE no action;