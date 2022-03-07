/*
  Warnings:

  - Made the column `active` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
