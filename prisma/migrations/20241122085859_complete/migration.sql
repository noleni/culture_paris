/*
  Warnings:

  - You are about to drop the column `access_link` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `contact_url` on the `PlacesData` table. All the data in the column will be lost.
  - Added the required column `access_link` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_link_text` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_type` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_facebook` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_mail` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_twitter` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_url` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_detail` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_type` to the `EventsData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventsData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lead_text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_start" TEXT NOT NULL,
    "date_end" TEXT NOT NULL,
    "date_description" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "cover_alt" TEXT NOT NULL,
    "cover_credit" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "contact_url" TEXT NOT NULL,
    "contact_mail" TEXT NOT NULL,
    "contact_facebook" TEXT NOT NULL,
    "contact_twitter" TEXT NOT NULL,
    "price_type" TEXT NOT NULL,
    "price_detail" TEXT NOT NULL,
    "access_type" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "access_link_text" TEXT NOT NULL,
    "placeId" INTEGER,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "title", "updatedAt", "url") SELECT "audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "title", "updatedAt", "url" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
CREATE UNIQUE INDEX "EventsData_title_key" ON "EventsData"("title");
CREATE TABLE "new_PlacesData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address_name" TEXT NOT NULL,
    "address_street" TEXT NOT NULL,
    "address_zipcode" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlacesData" ("address_city", "address_name", "address_street", "address_zipcode", "id", "latitude", "longitude", "updatedAt") SELECT "address_city", "address_name", "address_street", "address_zipcode", "id", "latitude", "longitude", "updatedAt" FROM "PlacesData";
DROP TABLE "PlacesData";
ALTER TABLE "new_PlacesData" RENAME TO "PlacesData";
CREATE UNIQUE INDEX "PlacesData_address_name_key" ON "PlacesData"("address_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
