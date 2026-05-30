/*
  Warnings:

  - A unique constraint covering the columns `[userId,carModelId,month,year]` on the table `SalesEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SalesEntry_carModelId_idx";

-- DropIndex
DROP INDEX "SalesEntry_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "SalesEntry_userId_carModelId_month_year_key" ON "SalesEntry"("userId", "carModelId", "month", "year");
