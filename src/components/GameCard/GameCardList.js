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
  const { selectedLeague, odds, liveResults } = props;
  console.log(odds);
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
          .map((e) => (
            <GameCard
              key={e.id}
              title={e.sport_title}
              time={e.commence_time}
              teamOneName={
                e.bookmakers[0].markets[0].outcomes[0].name === undefined
                  ? null
                  : e.bookmakers[0].markets[0].outcomes[0].name
              }
              teamOneOdds={
                e.bookmakers[0].markets[0].outcomes[0].price === undefined
                  ? null
                  : e.bookmakers[0].markets[0].outcomes[0].price
              }
              teamTwoName={
                e.bookmakers[0].markets[0].outcomes[1].name === undefined
                  ? null
                  : e.bookmakers[0].markets[0].outcomes[1].name
              }
              teamTwoOdds={
                e.bookmakers[0].markets[0].outcomes[1].price === undefined
                  ? null
                  : e.bookmakers[0].markets[0].outcomes[1].price
              }
              isLive={true}
            />
          ))}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        {upcomingOdds.length === 0 ? <CircularProgress /> : "Upcoming"}
        {upcomingOdds
          .filter(
            (e) => selectedLeague === "all" || e.sport_title === selectedLeague
          )
          .map((e) => (
            <GameCard
              key={e.id}
              title={e.sport_title}
              time={e.commence_time}
              teamOneName={e.bookmakers[0].markets[0].outcomes[0].name}
              teamOneOdds={e.bookmakers[0].markets[0].outcomes[0].price}
              teamTwoName={e.bookmakers[0].markets[0].outcomes[1].name}
              teamTwoOdds={e.bookmakers[0].markets[0].outcomes[1].price}
              isLive={false}
            />
          ))}
      </Box>
    </div>
  );
};

export { GameCardList };
