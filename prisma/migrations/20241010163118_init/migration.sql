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
