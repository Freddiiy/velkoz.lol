import {useSummonerSpell} from "@/hooks/useSummonerSpell";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";

type SizeProps = "xs" | "sm" | "md" | "lg" | "xl"

const SumSpellIcon = ({spellId, size = "md"}: { spellId: number | undefined, size?: SizeProps }) => {
	const sumSpell = useSummonerSpell(spellId);
	return (
		<LeagueHoverIcon img={sumSpell?.image.full} size={size}>
			<div className={"flex flex-row max-w-sm"}>
				<LeagueIcon img={sumSpell?.image.full} size={"lg"}/>
				<div className={"flex flex-col pl-4"}>
					<h2 className={"font-bold text-md"}>{sumSpell?.name}</h2>
					<p className={"text-neutral-400"}>{sumSpell?.description}</p>
				</div>
			</div>
		</LeagueHoverIcon>
	);
};

export default SumSpellIcon;