/*
  Warnings:

  - You are about to drop the `Accessibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventAccessibility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `canonicalurl` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `conditions_fr` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `daterange_fr` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `description_fr` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `firstdate_begin` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `imagecredits` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `lastdate_end` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `longdescription_fr` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `title_fr` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `location_address` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_city` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_countrycode` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_department` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_district` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_image` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_imagecredits` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_links` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_postalcode` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_region` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_tags` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `location_website` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `PlacesData` table. All the data in the column will be lost.
  - Added the required column `audience` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_alt` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_credit` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_description` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_end` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lead_text` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_city` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_name` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_zipcode` to the `PlacesData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Accessibility_name_key";

-- DropIndex
DROP INDEX "_EventAccessibility_B_index";

-- DropIndex
DROP INDEX "_EventAccessibility_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Accessibility";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EventAccessibility";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventsData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lead_text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_start" DATETIME NOT NULL,
    "date_end" DATETIME NOT NULL,
    "date_description" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "cover_alt" TEXT NOT NULL,
    "cover_credit" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("id", "placeId", "updatedAt") SELECT "id", "placeId", "updatedAt" FROM "EventsData";
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
    "contact_url" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlacesData" ("access_link", "contact_url", "id", "latitude", "longitude", "updatedAt") SELECT "access_link", "contact_url", "id", "latitude", "longitude", "updatedAt" FROM "PlacesData";
DROP TABLE "PlacesData";
ALTER TABLE "new_PlacesData" RENAME TO "PlacesData";
CREATE UNIQUE INDEX "PlacesData_address_name_key" ON "PlacesData"("address_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
