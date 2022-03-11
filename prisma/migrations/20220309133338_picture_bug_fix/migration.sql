/*
  Warnings:

  - You are about to drop the column `profilePiture` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profilePiture",
ADD COLUMN     "profilePicture" TEXT;
