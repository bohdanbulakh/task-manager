/*
  Warnings:

  - You are about to drop the column `role` on the `workspace_user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "workspace_user" DROP COLUMN "role";

-- DropEnum
DROP TYPE "WorkspaceUserRoles";

-- CreateTable
CREATE TABLE "workspace_user_role" (
    "workspace_user_id" TEXT NOT NULL,
    "role" "RoleName" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_user_role_pkey" PRIMARY KEY ("workspace_user_id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "workspace_user_role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permission_action_workspace_user_role_id_key" ON "permission"("action", "workspace_user_role_id");

-- AddForeignKey
ALTER TABLE "workspace_user_role" ADD CONSTRAINT "workspace_user_role_workspace_user_id_fkey" FOREIGN KEY ("workspace_user_id") REFERENCES "workspace_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "permission_workspace_user_role_id_fkey" FOREIGN KEY ("workspace_user_role_id") REFERENCES "workspace_user_role"("workspace_user_id") ON DELETE CASCADE ON UPDATE CASCADE;
