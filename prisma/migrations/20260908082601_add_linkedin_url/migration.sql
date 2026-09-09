-- AlterTable: add linkedinUrl with a default for existing rows, then remove the default
ALTER TABLE "waitlist_applications" ADD COLUMN "linkedinUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "waitlist_applications" ALTER COLUMN "linkedinUrl" DROP DEFAULT;
