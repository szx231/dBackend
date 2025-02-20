ALTER TABLE "activations" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "activations" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activations" DROP COLUMN "id";