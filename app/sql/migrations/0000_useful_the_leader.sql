CREATE TYPE "public"."mbti" AS ENUM('istp', 'intp', 'isfp', 'infp', 'estp', 'entp', 'esfp', 'enfp', 'istj', 'intj', 'isfj', 'infj', 'estj', 'entj', 'esfj', 'enfj');--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"age" integer NOT NULL,
	"mbti" "mbti" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;