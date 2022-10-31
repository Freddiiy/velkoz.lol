-- CreateTable
CREATE TABLE "SummonerRank" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "summonerName" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,

    CONSTRAINT "SummonerRank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummonerRank_id_key" ON "SummonerRank"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerRank_leagueId_key" ON "SummonerRank"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerRank_summonerId_key" ON "SummonerRank"("summonerId");
