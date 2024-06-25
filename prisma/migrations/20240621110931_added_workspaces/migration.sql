/*
  Warnings:

  - You are about to drop the column `user_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `task` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspace_id` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspace_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkspaceUserRoles" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_user_id_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "workspace_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "user_id",
ADD COLUMN     "assigned_user_id" TEXT,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "workspace_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_user" (
    "id" TEXT NOT NULL,
    "role" "WorkspaceUserRoles" NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "workspace_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "workspace_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "workspace_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_user" ADD CONSTRAINT "workspace_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_user" ADD CONSTRAINT "workspace_user_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
