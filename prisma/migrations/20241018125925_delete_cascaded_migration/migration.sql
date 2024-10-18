-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Founders" DROP CONSTRAINT "Founders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Registered_address" DROP CONSTRAINT "Registered_address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Registration_Details" DROP CONSTRAINT "Registration_Details_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Registration_Details" ADD CONSTRAINT "Registration_Details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registered_address" ADD CONSTRAINT "Registered_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Founders" ADD CONSTRAINT "Founders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
