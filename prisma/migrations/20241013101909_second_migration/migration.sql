-- CreateTable
CREATE TABLE "Startup_Profile" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entity_name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brand_name" TEXT,
    "entityRegistrationStatus" BOOLEAN,
    "stage" TEXT,
    "detailsText" TEXT,
    "size" INTEGER NOT NULL,
    "incubation_status" BOOLEAN NOT NULL,
    "startupIndiaRegister" BOOLEAN NOT NULL,

    CONSTRAINT "Startup_Profile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Registration_Details" (
    "user_id" TEXT NOT NULL,
    "reg_number" TEXT NOT NULL,
    "reg_date" TIMESTAMP(3) NOT NULL,
    "reg_certificate" TEXT NOT NULL,
    "gst" TEXT NOT NULL,
    "ipr" BOOLEAN NOT NULL,

    CONSTRAINT "Registration_Details_pkey" PRIMARY KEY ("user_id","reg_number")
);

-- CreateTable
CREATE TABLE "Registered_address" (
    "addr_id" SERIAL NOT NULL,
    "addrLine1" TEXT NOT NULL,
    "addLine2" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Registered_address_pkey" PRIMARY KEY ("user_id","addr_id")
);

-- CreateTable
CREATE TABLE "Founders" (
    "founderid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "equity" INTEGER NOT NULL,

    CONSTRAINT "Founders_pkey" PRIMARY KEY ("founderid","user_id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "user_id" TEXT NOT NULL,
    "pitch_deck" TEXT NOT NULL,
    "Aadhar_Number" BIGINT NOT NULL,
    "Pan_Number" TEXT NOT NULL,
    "Reg_certificate" TEXT NOT NULL,
    "Dipp_number" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Startup_Profile_user_id_key" ON "Startup_Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_Details_user_id_key" ON "Registration_Details"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_Details_reg_number_key" ON "Registration_Details"("reg_number");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_user_id_key" ON "Documents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_Reg_certificate_key" ON "Documents"("Reg_certificate");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_Dipp_number_key" ON "Documents"("Dipp_number");

-- AddForeignKey
ALTER TABLE "Registration_Details" ADD CONSTRAINT "Registration_Details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registered_address" ADD CONSTRAINT "Registered_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Founders" ADD CONSTRAINT "Founders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Startup_Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
