import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { OddsCard } from "./OddsCard";
import "./OddsCard.css";

const GameCardList = (props) => {
  const { db, odds, userId } = props;

  return (
    <div>
      {!odds ? (
        <CircularProgress />
      ) : odds.length == 0 ? (
        <div>Currently no odds. Try again later.</div>
      ) : (
        odds.flatMap((o) => {
          const elementOdds = o.Odds.filter((e) => e.OddType === "Game");

          if (elementOdds.length > 0) {
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
    </div>
  );
};

export { GameCardList };
