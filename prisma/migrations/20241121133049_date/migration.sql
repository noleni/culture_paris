/*
  Warnings:

  - The primary key for the `EventsData` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
    "placeId" INTEGER,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EventsData_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlacesData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EventsData" ("audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "title", "updatedAt", "url") SELECT "audience", "cover_alt", "cover_credit", "cover_url", "date_description", "date_end", "date_start", "description", "id", "info", "lead_text", "placeId", "title", "updatedAt", "url" FROM "EventsData";
DROP TABLE "EventsData";
ALTER TABLE "new_EventsData" RENAME TO "EventsData";
CREATE UNIQUE INDEX "EventsData_title_key" ON "EventsData"("title");
CREATE TABLE "new__EventTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventTags_A_fkey" FOREIGN KEY ("A") REFERENCES "EventsData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__EventTags" ("A", "B") SELECT "A", "B" FROM "_EventTags";
DROP TABLE "_EventTags";
ALTER TABLE "new__EventTags" RENAME TO "_EventTags";
CREATE UNIQUE INDEX "_EventTags_AB_unique" ON "_EventTags"("A", "B");
CREATE INDEX "_EventTags_B_index" ON "_EventTags"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
