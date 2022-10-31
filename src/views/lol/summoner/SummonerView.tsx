import Container from "@/components/Container";
import SummonerContext from "@/views/lol/summoner/SummonerContext";
import MatchesContext from "@/views/lol/summoner/MatchesContext";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import SummonerHeader from "@/views/lol/summoner/SummonerHeader";
import MatchHistory from "@/views/lol/summoner/MatchHistory";
import matchesContext from "@/views/lol/summoner/MatchesContext";


const SummonerView = () => {
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
		<SummonerContext.Provider value={summoner.data}>
			<MatchesContext.Provider value={matches.data}>
				<Container>
					<SummonerHeader handleUpdate={handleUpdate} isLoading={summoner.isLoading}/>
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
									<MatchHistory/>
								</div>
							)}
						</div>
					</div>
				</Container>
			</MatchesContext.Provider>
		</SummonerContext.Provider>
	)
}

export default SummonerView