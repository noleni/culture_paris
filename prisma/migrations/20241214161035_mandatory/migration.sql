/*
  Warnings:

  - Made the column `placeId` on table `EventsData` required. This step will fail if there are existing NULL values in that column.

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
    "placeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("access_link", "access_link_text", "access_type", "audience", "contact_facebook", "contact_mail", "contact_twitter", "contact_url", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "price_detail", "price_type", "title", "updatedAt", "url") SELECT "access_link", "access_link_text", "access_type", "audience", "contact_facebook", "contact_mail", "contact_twitter", "contact_url", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "price_detail", "price_type", "title", "updatedAt", "url" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
CREATE UNIQUE INDEX "EventsData_title_key" ON "EventsData"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
