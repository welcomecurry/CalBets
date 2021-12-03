import { useState, useEffect } from "react";
// import { partition } from "lodash";
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
        <div>Results</div>
        {results == null ? (
          <CircularProgress />
        ) : results.length == 0 ? (
          <div>Currently no results. Try again later.</div>
        ) : (
          results.map((e) => {
            return (
              <ResultCard
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
          })
        )}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        <div>Odds</div>
        {odds == null ? (
          <CircularProgress />
        ) : odds.length == 0 ? (
          <div>Currently no odds. Try again later.</div>
        ) : (
          odds.flatMap((e) => {
            const elementOdds = e.Odds.filter((e) => e.OddType === "Game");

            if (elementOdds.length > 0) {
              return (
                <OddsCard
                  db={db}
                  key={e.ID}
                  gameId={e.ID}
                  leagueName={e.Sport}
                  gameStartTime={e.MatchTime}
                  homeTeam={{
                    name: e.HomeTeam,
                    price: elementOdds[0].MoneyLineHome,
                  }}
                  awayTeam={{
                    name: e.AwayTeam,
                    price: elementOdds[0].MoneyLineAway,
                  }}
                  isLive={false}
                  userId={userId}
                />
              );
            }
          })
        )}
      </Box>
    </div>
  );
};

export { GameCardList };
