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
  const { db, odds, results, userId } = props;
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
        <div>Odds</div>
        {!odds ? (
          <CircularProgress />
        ) : odds.length == 0 ? (
          <div>Currently no odds. Try again later.</div>
        ) : (
          odds.flatMap((o) => {
            const elementOdds = o.Odds.filter((e) => e.OddType === "Game");

            if (elementOdds.length > 0) {
              // const gameResult = results.filter((r) => r.ID == o.ID)[0];
              // console.log(gameResult);
              return (
                <OddsCard
                  db={db}
                  key={o.ID}
                  gameId={o.ID}
                  leagueName={null}
                  gameStartTime={o.MatchTime}
                  homeTeam={{
                    name: o.HomeTeam,
                    price: elementOdds[0].MoneyLineHome,
                    score: 0,
                  }}
                  awayTeam={{
                    name: o.AwayTeam,
                    price: elementOdds[0].MoneyLineAway,
                    score: 0,
                  }}
                  isLive={false}
                  userId={userId}
                />
              );
            }
          })
        )}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        <div>Results</div>
        {!results || !odds ? (
          <CircularProgress />
        ) : results.length == 0 ? (
          <div>Currently no results. Try again later.</div>
        ) : (
          results.map((r) => {
            const gameInfo = odds.filter((o) => o.ID == r.ID)[0];
            return (
              <ResultCard
                key={r.ID}
                leagueName={r.Sport}
                homeTeam={{
                  name: gameInfo?.HomeTeam || "homeTeam",
                  score: r.HomeScore,
                }}
                awayTeam={{
                  name: gameInfo?.AwayTeam || "awayTeam",
                  score: r.AwayScore,
                }}
                isLive={!r.Final}
                userId={userId}
              />
            );
          })
        )}
      </Box>
    </div>
  );
};

export { GameCardList };
