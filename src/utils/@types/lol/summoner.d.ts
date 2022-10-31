export interface ISummonerRank {
	leagueID:     string;
	queueType:    string;
	tier:         string;
	rank:         string;
	summonerID:   string;
	summonerName: string;
	leaguePoints: number;
	wins:         number;
	losses:       number;
	veteran:      boolean;
	inactive:     boolean;
	freshBlood:   boolean;
	hotStreak:    boolean;
}
