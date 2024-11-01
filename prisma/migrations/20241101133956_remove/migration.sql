/*
  Warnings:

  - You are about to drop the column `name` on the `PlacesData` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlacesData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address_name" TEXT NOT NULL,
    "address_street" TEXT NOT NULL,
    "address_zipcode" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "contact_url" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlacesData" ("access_link", "address_city", "address_name", "address_street", "address_zipcode", "contact_url", "id", "latitude", "longitude", "updatedAt") SELECT "access_link", "address_city", "address_name", "address_street", "address_zipcode", "contact_url", "id", "latitude", "longitude", "updatedAt" FROM "PlacesData";
DROP TABLE "PlacesData";
ALTER TABLE "new_PlacesData" RENAME TO "PlacesData";
CREATE UNIQUE INDEX "PlacesData_address_name_key" ON "PlacesData"("address_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
