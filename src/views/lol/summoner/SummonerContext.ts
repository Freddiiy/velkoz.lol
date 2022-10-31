import {TSummoner} from "@/server/routers/lol/summonerRouter";
import React from "react";

const SummonerContext = React.createContext<TSummoner | undefined>(null);

export default SummonerContext;