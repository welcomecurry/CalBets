import { useState, useEffect } from "react";
import { GameCard } from "./GameCard";
import { partition } from "lodash";
import { Box } from "@material-ui/core";

const isUpcoming = (timeStart) => {
  const now = new Date();
  const dateStart = new Date(timeStart);
  return now.getTime() < dateStart.getTime();
};

const GameCardList = (props) => {
  const { selectedLeague, odds } = props;

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
        {"Upcoming"}
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
            />
          ))}
      </Box>
      <Box sx={{ border: "1px dashed grey" }}>
        {"Already started"}
        {startedOdds
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
            />
          ))}
      </Box>
    </div>
  );
};

export { GameCardList };
