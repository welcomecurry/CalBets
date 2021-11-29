import { useState, useEffect } from "react";
import { GameCard } from "./GameCard";
import { partition } from "lodash";
import { Box } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import "./GameCard.css";

const isUpcoming = (timeStart) => {
  const now = new Date();
  const dateStart = new Date(timeStart);
  return now.getTime() < dateStart.getTime();
};

const GameCardList = (props) => {
  const { db, selectedLeague, odds, userId } = props;
  const [upcomingOdds, setUpcomingOdds] = useState([]);
  const [startedOdds, setStartedOdds] = useState([]);

  useEffect(() => {
    const [upcomingOddsNew, startedOddsNew] = partition(odds, (e) =>
      isUpcoming(e.commence_time)
    );
    setStartedOdds(startedOddsNew);
    setUpcomingOdds(upcomingOddsNew);
  }, [odds]);

  return (
    <div>
      <Box sx={{ border: "1px dashed grey" }}>
        {startedOdds.length === 0 ? <CircularProgress /> : "Ongoing"}
        {startedOdds
          .filter(
            (e) => selectedLeague === "all" || e.sport_title === selectedLeague
          )
          .map((e) => {
            const { outcomes } = e.bookmakers[0].markets[0];
            return (
              <GameCard
                db={db}
                gameId={e.id}
                leagueName={e.sport_title}
                gameStartTime={e.commence_time}
                teamOne={{ name: outcomes[0].name, price: outcomes[0].price }}
                teamTwo={{ name: outcomes[1].name, price: outcomes[1].price }}
                isLive={true}
                userId={userId}
              />
            );
          })}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        {upcomingOdds.length === 0 ? <CircularProgress /> : "Upcoming"}
        {upcomingOdds
          .filter(
            (e) => selectedLeague === "all" || e.sport_title === selectedLeague
          )
          .map((e) => {
            const { outcomes } = e.bookmakers[0].markets[0];
            return (
              <GameCard
                db={db}
                gameId={e.id}
                leagueName={e.sport_title}
                gameStartTime={e.commence_time}
                teamOne={{ name: outcomes[0].name, price: outcomes[0].price }}
                teamTwo={{ name: outcomes[1].name, price: outcomes[1].price }}
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
