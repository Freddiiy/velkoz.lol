import Container from "@/components/Container";
import {SummonerContext} from "@/views/lol/summoner/SummonerContext";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import SummonerHeader from "@/views/lol/summoner/SummonerHeader";


const SummonerPage = () => {
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
			<Container>
				<SummonerHeader handleUpdate={handleUpdate} isLoading={summoner.isLoading}/>
			</Container>
		</SummonerContext.Provider>
	)
}

export default SummonerPage