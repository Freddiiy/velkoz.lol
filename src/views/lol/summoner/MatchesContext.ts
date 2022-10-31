import {TMatches} from "@/server/routers/lol/matchRouter";
import React from "react";

const MatchesContext = React.createContext<TMatches>([]);

export default MatchesContext;