-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tariff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "criteria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TariffPrice" (
    "tariffId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "generalPrice" INTEGER NOT NULL,
    "specialistPrice" INTEGER NOT NULL,

    PRIMARY KEY ("tariffId", "year"),
    CONSTRAINT "TariffPrice_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
