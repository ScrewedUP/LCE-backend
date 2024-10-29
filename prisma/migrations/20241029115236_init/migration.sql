/*
  Warnings:

  - The primary key for the `Founders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Founders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Founders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Founders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Founders" DROP CONSTRAINT "Founders_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "mobile" SET DATA TYPE TEXT,
ADD CONSTRAINT "Founders_pkey" PRIMARY KEY ("founderid");

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Founders_email_key" ON "Founders"("email");
