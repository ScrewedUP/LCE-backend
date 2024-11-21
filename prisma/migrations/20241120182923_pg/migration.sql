-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "team" INTEGER NOT NULL,
    "growth" TEXT NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);
