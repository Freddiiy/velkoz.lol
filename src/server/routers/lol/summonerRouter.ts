import {prisma} from "@/server/util/prisma";
import {date, z} from "zod"
import {publicProcedure, router} from "../../trpc";
import {ISummoner} from "@/utils/@types/summoner.t";
import {riotRequest} from "@/server/data/riot/riotRequest";
import {inferProcedureOutput} from "@trpc/server";
import {AppRouter} from "@/server/routers/_app";
import {ISummonerRank} from "@/utils/@types/lol/summoner";

//TODO: add update mutation.

export const summonerRouter = router({
	byName: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async({input}) => {
			const count = await prisma.summoner.count({
				where: {
					name: {
						equals: input.name,
					},
					region: input.region,
				}
			});

			if (count == 0) {
				const summonerFromApi = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);

				return await prisma.summoner.create({
					data: {
						id: summonerFromApi.id,
						accountId: summonerFromApi.accountId,
						puuid: summonerFromApi.puuid,
						name: summonerFromApi.name,
						summonerLevel: summonerFromApi.summonerLevel,
						profileIconId: summonerFromApi.profileIconId,
						revisionDate: summonerFromApi.revisionDate.toString(),
						region: input.region
					}
				});
			} else {
				return await prisma.summoner.findFirst({
					where: {
						name: {
							equals: input.name,
						},
						region: input.region,
					}
				})
			}
		}),

	byPuuid: publicProcedure
		.input(
			z.object({
				puuid: z.string(),
				region: z.string()
			})
		)
		.query( async({input}) => {
			return await prisma.summoner.findFirst({
				where: {
					puuid: input.puuid,
					region: input.region,
				}
			});
		}),

	byPart: publicProcedure
		.input(
			z.string().nullish(),
		)
		.query( async({input}) => {
			if (input == null) {
				input = "";
			}
			return await prisma.summoner.findMany({
				where: {
					name: {
						startsWith: input,
					},
				},
			});
		}),
	rank: publicProcedure
		.input(
			z.object({
				encryptedSummonerId: z.string(),
				region: z.string(),
			}),
		)
		.query(async({input}) => {
			const url = `https://${input.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${input.encryptedSummonerId}`;
			const summonerRank = await riotRequest<ISummonerRank>(url);

		}),
	update: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.mutation(async({input}) => {
			const summonerFromApi = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
			return await prisma.summoner.update({
				where: {
					puuid: summonerFromApi.puuid,
				},
				data: {
					id: summonerFromApi.id,
					accountId: summonerFromApi.accountId,
					puuid: summonerFromApi.puuid,
					name: summonerFromApi.name,
					summonerLevel: summonerFromApi.summonerLevel,
					profileIconId: summonerFromApi.profileIconId,
					revisionDate: summonerFromApi.revisionDate.toString(),
					region: input.region,
				},
			});
		})
})


export type TSummoner = inferProcedureOutput<AppRouter["summoner"]["byName"]>