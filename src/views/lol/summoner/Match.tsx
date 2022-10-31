import {TMatch} from "@/server/routers/lol/matchRouter";
import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {useContext} from "react";
import {ChampionContext} from "@/data/ChampionContext";
import {formatTime} from "@/utils/formatTime";
import {convertLaneName} from "@/utils/lanePosition";
import getQueueType from "@/data/getQueueType";
import Link from "next/link";
import Image from "next/future/image";
import ChampImg from "@/components/LeagueIcons/ChampImg";
import RuneIcon from "@/components/LeagueIcons/RuneIcon";
import SecRuneIcon from "@/components/LeagueIcons/SecRuneIcon";
import SumSpellIcon from "@/components/LeagueIcons/SumSpellIcon";
import {calcKDA} from "@/utils/calcMatchInfo";
import ItemIcon from "@/components/LeagueIcons/ItemIcon";

const Match = ({match, summoner}: { match: TMatch; summoner: TSummoner | null }) => {
	const champContext = useContext(ChampionContext);
	if (!match || !match.info || !match.metaData || !summoner)
		return <div>Loading...</div>;

	const team1Participants = match.info.participants.slice(0, 5);
	const team2Participants = match.info.participants.slice(5, 10);

	const sumInfo = match.info.participants.find(
		(e) => e.puuid == summoner?.puuid
	);
	const win = sumInfo?.win;
	const winBorder = win ? "border-blue-400" : "border-red-500";
	const winText = win ? "text-blue-400" : "text-red-500";
	const timeSince = formatTime(match.info.gameEndTimestamp);
	const lane = convertLaneName(sumInfo?.individualPosition ?? "Invalid");
	const queue = getQueueType(match.info.queueId);

	const keyStoneId = sumInfo?.perks?.styles[0].selections[0].perk;
	const secondRune = sumInfo?.perks?.styles[1].style;

	const champ = champContext?.find(
		(c) => parseInt(c.key) == sumInfo?.championId
	);
	return (
		<>
			<Link href={"/"} passHref>
				<div
					className={`w-full bg-brand-500 active:bg-brand-400 hover:bg-brand-400 border-l-8 ${winBorder} cursor-pointer transition-all duration-100`}
				>
					<div className={"flex flex-col px-4 border-b border-b-neutral-800"}>
						<div className={"mx-2 flex flex-row items-center justify-end"}>
							<div
								className={
									"flex flex-row text-neutral-500 font-semibold items-center justify-end gap-2"
								}
							>
								<div className={"w-4 h-4 relative"}>
									<Image
										src={lane.imgUrl}
										alt={lane.role}
										fill
										sizes={"16px"}
									/>
								</div>
								<p>{lane.role}</p>
								<p> • </p>
								<p>{queue}</p>
								<p> • </p>
								<p>{timeSince}</p>
							</div>
						</div>
						<div className={"flex flex-row items-center justify-between px-2 py-4"}>
							<div className={"flex flex-row items-center"}>
								{champ && <ChampImg champId={champ.key} size={"2xl"}/>}
								<div className={"flex flex-col items-center pr-2 gap-1.5"}>
									<RuneIcon keystoneId={keyStoneId}/>
									<SecRuneIcon keystoneId={secondRune}/>
								</div>
								<div className={"flex flex-col items-center pr-2 gap-1.5"}>
									<SumSpellIcon spellId={sumInfo?.summoner1Id}/>
									<SumSpellIcon spellId={sumInfo?.summoner2Id}/>
								</div>
							</div>

							<div className={"flex flex-col text-center text-white gap-1.5"}>
								<h2 className={`text-3xl font-bold ${winText} justify-center`}>
									{win ? "Victory" : "Defeat"}
								</h2>
								<div className={"block text-neutral-400 text-4xl"}>
									<span className={"text-white font-semibold"}>
										{sumInfo?.kills}
									</span>
									{" / "}
									<span className={"font-semibold text-white"}>
										{sumInfo?.deaths}
									</span>
									{" / "}
									<span className={"text-white font-semibold"}>
										{sumInfo?.assists}
									</span>
								</div>
								<p className={"font-semibold text-neutral-400 text-lg"}>
									{calcKDA(sumInfo!.kills, sumInfo!.deaths, sumInfo!.assists)}{" "}
									KDA
								</p>
							</div>
							<div className={"flex flex-col gap-1"}>
								<div className={"flex flex-row items-end gap-1"}>
									<ItemIcon itemId={sumInfo?.item0}/>
									<ItemIcon itemId={sumInfo?.item1}/>
									<ItemIcon itemId={sumInfo?.item2}/>
									<ItemIcon itemId={sumInfo?.item6}/>
								</div>
								<div className={"flex flex-row items-end gap-1"}>
									<ItemIcon itemId={sumInfo?.item3}/>
									<ItemIcon itemId={sumInfo?.item4}/>
									<ItemIcon itemId={sumInfo?.item5}/>
								</div>
							</div>
							<div className={"flex flex-row gap-2"}>
								<div className={"flex flex-col text-neutral-500"}>
									{team1Participants.map((p) => (
										<div key={p.summonerName}>
											<Link href={`/lol/summoner/euw1/${p.summonerName}`} passHref>
												<div className={"flex flex-row items-center w-28"}>
													<ChampImg champId={p.championId.toString()} size={"sm"}/>
													<a className={`pl-1 pt-1 truncate text-sm ${p.summonerName == summoner.name && "font-bold"} hover:underline`}>
														{p.summonerName}
													</a>
												</div>
											</Link>
										</div>
									))}
								</div>
								<div className={"flex flex-col text-neutral-500"}>
									{team2Participants.map((p) => (
										<div key={p.summonerName}>
											<Link href={`/lol/summoner/euw1/${p.summonerName}`} passHref>
												<div className={"flex flex-row items-center w-28"}>
													<ChampImg champId={p.championId.toString()} size={"sm"}/>
													<a className={`pl-1 pt-1 truncate text-sm ${p.summonerName == summoner.name && "font-bold"} hover:underline`}>
														{p.summonerName}
													</a>
												</div>
											</Link>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default Match;