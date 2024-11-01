/*
  Warnings:

  - A unique constraint covering the columns `[address_name]` on the table `PlacesData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlacesData_address_name_key" ON "PlacesData"("address_name");
