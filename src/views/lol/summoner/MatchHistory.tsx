import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {TMatch, TMatches} from "@/server/routers/lol/matchRouter";
import {calcChampFreq, calcChampWinRate, calcKDA, calcWinRate} from "@/utils/calcMatchInfo";
import ChampImg from "@/components/LeagueIcons/ChampImg";
import {useContext} from "react";
import SummonerContext from "@/views/lol/summoner/SummonerContext";
import MatchesContext from "@/views/lol/summoner/MatchesContext";
import Match from "./Match";

const MatchHistory = () => {
	const summoner = useContext(SummonerContext);
	const matches = useContext(MatchesContext);
	if (!matches) return <div>Loading...</div>;

	const sortedMatches = matches?.sort((a: TMatch, b: TMatch) => {
		if (!a.info || !b.info) return -1;
		return parseInt(b.info.gameEndTimestamp) - parseInt(a.info.gameEndTimestamp);
	});

	const times = 20;

	const champFreq = calcChampFreq(summoner?.puuid, matches, times);
	const [wins, loses] = calcWinRate(summoner?.puuid, matches, times);
	return (
		<>
			<div className={"w-full flex flex-col"}>
				<div className={"bg-brand-500 mb-2 rounded-xl"}>
					<div
						className={"flex flex-row justify-between items-center px-7 py-5"}
					>
						<div className={"inline-block"}>
							<p>Last {times} games</p>
							<p>
								{wins}W-{loses}L
							</p>
						</div>
						<div className={"flex flex-row gap-4"}>
							{champFreq ? (
								champFreq.map((c) => (
										<div key={c.champId} className={"flex flex-row items-center"}>
											<ChampImg champId={c.champId} size={"lg"}/>
											<div className={"mx-3 flex flex-col"}>
												<div className={"inline-flex"}>
													<p>
														{calcChampWinRate(c.wins, c.played)}% - {c.wins}W
														- {c.played - c.wins}L
													</p>
												</div>
												<p className={"text-neutral-500"}>{calcKDA(c.kills, c.deaths, c.assists)} KDA</p>
											</div>
										</div>
									)
								)) : <p>Could not calculate :(</p>}
						</div>
					</div>
				</div>
				<div className={"rounded-xl bg-brand-500 overflow-auto"}>
					{sortedMatches.map((match) => (
						<Match key={match.matchId} match={match} summoner={summoner}/>
					))}
				</div>
			</div>
		</>
	);
};

export default MatchHistory