-- CreateTable
CREATE TABLE "PlacesData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EventsData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "_EventTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventTags_A_fkey" FOREIGN KEY ("A") REFERENCES "EventsData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTags_AB_unique" ON "_EventTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTags_B_index" ON "_EventTags"("B");
