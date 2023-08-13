/*
  Warnings:

  - You are about to drop the column `SpecialistPrice` on the `TariffPrice` table. All the data in the column will be lost.
  - Added the required column `specialistPrice` to the `TariffPrice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TariffPrice" (
    "tariffId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "generalPrice" INTEGER NOT NULL,
    "specialistPrice" INTEGER NOT NULL,

    PRIMARY KEY ("tariffId", "year"),
    CONSTRAINT "TariffPrice_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TariffPrice" ("generalPrice", "tariffId", "year") SELECT "generalPrice", "tariffId", "year" FROM "TariffPrice";
DROP TABLE "TariffPrice";
ALTER TABLE "new_TariffPrice" RENAME TO "TariffPrice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
