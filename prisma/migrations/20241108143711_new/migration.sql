/*
  Warnings:

  - You are about to drop the column `audience` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `cover_alt` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `cover_credit` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `cover_url` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `date_description` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `date_end` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `info` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `lead_text` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `address_city` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `address_name` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `address_street` on the `PlacesData` table. All the data in the column will be lost.
  - You are about to drop the column `address_zipcode` on the `PlacesData` table. All the data in the column will be lost.
  - Added the required column `canonicalurl` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conditions_fr` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daterange_fr` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_fr` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstdate_begin` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagecredits` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastdate_end` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longdescription_fr` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fr` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `EventsData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_address` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_city` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_countrycode` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_department` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_district` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_image` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_imagecredits` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_links` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_name` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_postalcode` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_region` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_tags` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_website` to the `PlacesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `PlacesData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Accessibility" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventAccessibility" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventAccessibility_A_fkey" FOREIGN KEY ("A") REFERENCES "Accessibility" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventAccessibility_B_fkey" FOREIGN KEY ("B") REFERENCES "EventsData" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventsData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "canonicalurl" TEXT NOT NULL,
    "title_fr" TEXT NOT NULL,
    "description_fr" TEXT NOT NULL,
    "longdescription_fr" TEXT NOT NULL,
    "conditions_fr" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imagecredits" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "daterange_fr" TEXT NOT NULL,
    "firstdate_begin" TEXT NOT NULL,
    "lastdate_end" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("id", "placeId", "updatedAt") SELECT "id", "placeId", "updatedAt" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
CREATE UNIQUE INDEX "EventsData_uid_key" ON "EventsData"("uid");
CREATE TABLE "new_PlacesData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "location_name" TEXT NOT NULL,
    "location_address" TEXT NOT NULL,
    "location_district" TEXT NOT NULL,
    "location_postalcode" TEXT NOT NULL,
    "location_city" TEXT NOT NULL,
    "location_department" TEXT NOT NULL,
    "location_region" TEXT NOT NULL,
    "location_countrycode" TEXT NOT NULL,
    "location_image" TEXT NOT NULL,
    "location_imagecredits" TEXT NOT NULL,
    "location_website" TEXT NOT NULL,
    "location_links" TEXT NOT NULL,
    "location_tags" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "contact_url" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PlacesData" ("access_link", "contact_url", "id", "latitude", "longitude", "updatedAt") SELECT "access_link", "contact_url", "id", "latitude", "longitude", "updatedAt" FROM "PlacesData";
DROP TABLE "PlacesData";
ALTER TABLE "new_PlacesData" RENAME TO "PlacesData";
CREATE UNIQUE INDEX "PlacesData_uid_key" ON "PlacesData"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Accessibility_name_key" ON "Accessibility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventAccessibility_AB_unique" ON "_EventAccessibility"("A", "B");

-- CreateIndex
CREATE INDEX "_EventAccessibility_B_index" ON "_EventAccessibility"("B");
