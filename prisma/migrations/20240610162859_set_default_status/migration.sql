-- AlterTable
ALTER TABLE "task" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'TO_DO';
