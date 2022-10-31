import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {useContext} from "react";
import {VersionContext} from "@/data/VersionContext";
import {formatTime} from "@/utils/formatTime";
import {useScrollDistance} from "@/hooks/useScrollDistance";
import Avatar from "@/components/LeagueIcons/Avatar";
import SummonerContext from "@/views/lol/summoner/SummonerContext";

const SummonerHeader = ({
							handleUpdate,
							isLoading,
						}: {
	handleUpdate: () => void;
	isLoading: boolean;
}) => {
	const summoner = useContext(SummonerContext);
	const version = useContext(VersionContext);
	const date = new Date(summoner ? summoner.lastUpdated : Date.now());
	const lastUpdated = formatTime(date.getTime());
	const scrolled = useScrollDistance(190);

	return (
		<>
			<header
				className={`${scrolled ? "opacity-0" : "opacity-100 translate-y-8"} flex bg-bg-brand-600 flex-row w-full transition-all duration-200`}>
				{!summoner ? (
					<>
						<div className={"block"}>
							<div
								className={
									"relative border-2 border-neutral-900 bg-neutral-800 rounded-2xl w-24 h-24"
								}
							/>
						</div>
					</>
				) : (
					<>
						<div className={"block"}>
							<Avatar
								img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
								lvl={summoner.summonerLevel}
							/>
						</div>
						<div className={"flex flex-col ml-4"}>
							<h2 className={"text-white font-bold text-4xl"}>
								{summoner.name}
							</h2>
							<div className={"flex justify-start mt-4"}>
								<button
									className={
										"bg-brand-500 text-white rounded-2xl px-4 py-2 outline-none border-2 border-brand-500 hover:border-brand-400 focus:border-brand-400 transition-all duration-100"
									}
									onClick={handleUpdate}
									disabled={isLoading}
								>
									{isLoading ? "Updating..." : "Update"}
								</button>
							</div>
							{summoner.lastUpdated && (
								<p className={"text-sm text-neutral-700 font-semibold"}>
									{lastUpdated}
								</p>
							)}
						</div>
					</>
				)}
			</header>
			<header
				className={`${scrolled ? "opacity-100" : "opacity-0"} transition-all duration-200 bg-bg-brand sticky top-0 py-4 z-50`}>
				{!summoner ? (
					<>
						<div className={"block"}>
							<div
								className={
									"relative border-2 border-neutral-900 bg-neutral-800 rounded-2xl w-12 h-12"
								}
							/>
						</div>
					</>
				) : (
					<>
						<div
							className={`flex flex-row ${scrolled ? "translate-y-0" : "translate-y-5"} transition-all duration-200`}>
							<div className={"block mx-3"}>
								<Avatar
									img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
									size={"sm"}
								/>
							</div>
							<h2 className={"text-white font-bold text-2xl"}>
								{summoner.name}
							</h2>
						</div>
					</>
				)}
			</header>
		</>
	);
};

export default SummonerHeader;