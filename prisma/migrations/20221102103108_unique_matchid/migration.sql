/*
  Warnings:

  - A unique constraint covering the columns `[matchId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchId]` on the table `Metadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Match_matchId_key` ON `Match`(`matchId`);

-- CreateIndex
CREATE UNIQUE INDEX `Metadata_matchId_key` ON `Metadata`(`matchId`);
