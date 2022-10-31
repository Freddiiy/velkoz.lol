import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/future/image";
import Container from "../../../../components/Container";
import {trpc} from "@/utils/trpc";
import {useContext} from "react";
import {TMatch, TMatches} from "@/server/routers/lol/matchRouter";
import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {ChampionContext} from "@/data/ChampionContext";
import {formatTime} from "@/utils/formatTime";
import {convertLaneName} from "@/utils/lanePosition";
import {calcChampFreq, calcChampWinRate, calcKDA, calcWinRate} from "@/utils/calcMatchInfo";
import Link from "next/link";
import ItemIcon from "@/components/LeagueIcons/ItemIcon";
import SumSpellIcon from "@/components/LeagueIcons/SumSpellIcon";
import SecRuneIcon from "@/components/LeagueIcons/SecRuneIcon";
import RuneIcon from "@/components/LeagueIcons/RuneIcon";
import ChampImg from "@/components/LeagueIcons/ChampImg";
import getQueueType from "@/data/getQueueType";

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const region = router.query.region as string;
	const summonerName = router.query.summonerName as string;

	const summoner = trpc.summoner.byName.useQuery({
		name: summonerName,
		region: region,
	});
	const mutateSummoner = trpc.summoner.update.useMutation({
		onSuccess: async () => {
			await summoner.refetch();
		},
	});

	const matches = trpc.match.getMatches.useQuery({
		name: summonerName,
		region: region,
	});
	const mutateMatch = trpc.match.update.useMutation({
		onSuccess: async () => {
			await matches.refetch();
		},
	});

	const handleUpdate = async () => {
		mutateMatch.mutate({name: summonerName, region: region});
		mutateSummoner.mutate({name: summonerName, region: region});
	};

	return (
		<Container>
			<div className={"grid gap-2 grid-cols-4"}>
				<div className={"col-span-1"}>
					<div className={"bg-brand-500 w-full h-12 rounded-xl"}>
						<h1>
							{summoner.data?.id}
						</h1>
					</div>
				</div>
				<div className={"col-span-3"}>
					{summoner.data && (
						<div className={"flex flex-row"}>
							<MatchHistory summoner={summoner.data} matches={matches.data}/>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
};

export default SummonerPage;
