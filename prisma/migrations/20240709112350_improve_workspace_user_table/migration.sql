/*
  Warnings:

  - A unique constraint covering the columns `[user_id,workspace_id]` on the table `workspace_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_user_id_workspace_id_key" ON "workspace_user"("user_id", "workspace_id");
