/*
  Warnings:

  - You are about to drop the column `name` on the `EventsData` table. All the data in the column will be lost.
  - Added the required column `title` to the `EventsData` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_EventsData" ("audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "updatedAt", "url") SELECT "audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "updatedAt", "url" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
