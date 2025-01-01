/*
  Warnings:

  - You are about to drop the column `description_figcaption` on the `EventsData` table. All the data in the column will be lost.
  - You are about to drop the column `description_img` on the `EventsData` table. All the data in the column will be lost.
  - Added the required column `description_figures` to the `EventsData` table without a default value. This is not possible if the table is not empty.

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
    "description_text" TEXT NOT NULL,
    "description_figures" TEXT NOT NULL,
    "date_start" DATETIME NOT NULL,
    "date_end" DATETIME NOT NULL,
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
    "average_rating" REAL,
    "placeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("access_link", "access_link_text", "access_type", "audience", "average_rating", "contact_facebook", "contact_mail", "contact_twitter", "contact_url", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description_text", "id", "info", "lead_text", "placeId", "price_detail", "price_type", "title", "updatedAt", "url") SELECT "access_link", "access_link_text", "access_type", "audience", "average_rating", "contact_facebook", "contact_mail", "contact_twitter", "contact_url", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description_text", "id", "info", "lead_text", "placeId", "price_detail", "price_type", "title", "updatedAt", "url" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
CREATE UNIQUE INDEX "EventsData_title_key" ON "EventsData"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
