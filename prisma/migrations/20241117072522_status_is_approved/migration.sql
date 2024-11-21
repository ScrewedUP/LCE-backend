/*
  Warnings:

  - Added the required column `isApproved` to the `Startup_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Startup_Profile" ADD COLUMN     "isApproved" BOOLEAN NOT NULL;
