import { useState, useEffect } from "react";
import { partition } from "lodash";
import { Box, CircularProgress } from "@mui/material";
import { OddsCard } from "./OddsCard";
import { ResultCard } from "../ResultCard";
import "./OddsCard.css";

// const isUpcoming = (timeStart) => {
//   const now = new Date();
//   const dateStart = new Date(timeStart);
//   return now.getTime() < dateStart.getTime();
// };

const GameCardList = (props) => {
  const { db, selectedLeague, odds, results, userId } = props;
  // const [upcomingOdds, setUpcomingOdds] = useState([]);
  const [startedOdds, setStartedOdds] = useState([]);

  // useEffect(() => {
  //   const [upcomingOddsNew, startedOddsNew] = partition(odds, (e) =>
  //     isUpcoming(e.MatchTime)
  //   );
  //   setStartedOdds(startedOddsNew);
  //   setUpcomingOdds(upcomingOddsNew);
  // }, [odds]);

  return (
    <div>
      <Box sx={{ border: "1px dashed grey" }}>
        {results.length === 0 ? <CircularProgress /> : <div>Results</div>}
        {results.map((e) => {
          return (
            <ResultCard
              db={db}
              key={e.ID}
              leagueName={e.Sport}
              homeTeam={{
                name: "TODO",
                score: e.HomeScore,
              }}
              awayTeam={{
                name: "TODO",
                score: e.AwayScore,
              }}
              isLive={!e.Final}
              userId={userId}
            />
          );
        })}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        {odds.length === 0 ? <CircularProgress /> : <div>Odds</div>}
        {odds.map((e) => {
          return (
            <OddsCard
              db={db}
              key={e.ID}
              leagueName={e.Sport}
              gameStartTime={e.MatchTime}
              homeTeam={{
                name: e.HomeTeam,
                price: e.Odds[0].TotalNumber,
              }}
              // TODO: FIND OUT WHY SOME ODDS ONLY ONE VALUE
              awayTeam={{
                name: e.AwayTeam,
                price: e.Odds[0].TotalNumber,
              }}
              isLive={false}
              userId={userId}
            />
          );
        })}
      </Box>
    </div>
  );
};

export { GameCardList };
