import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTHENTICATED } from "../utils/firebase";
import { Balance } from "../components/Balance/Balance";
import { BetCard } from "../components/BetCard/BetCard";
import { useAuthStateContext } from "../components/AuthStateContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getResultsByEventId } from "../services/JsonOddsAPI";
import { settleUserBet, updateUserBalance } from "../utils/firebaseFunctions";

const UserBets = () => {
  const { authState, userData, userBets, userGames, signOut } =
    useAuthStateContext();

  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  useEffect(async () => {
    if (isAuthenticated) {
      const gameResults = await Promise.all(
        Object.keys(userBets)
          .filter((k) => userBets[k].active)
          .map((key) => {
            const userBet = userBets[key];
            const eventResult = getResultsByEventId(userBet.gameId);
            return eventResult;
          })
      );

      const gameResultsFinished = gameResults
        .filter((r) => {
          return r.length > 0 && r[0].Final === true;
        })
        .map((r) => r[0]);

      console.log(gameResultsFinished);

      // for (const result of gameResultsFinished) {
      //   settleUserBet(db, userId, betId, result);
      //   const newBalance = calculate;
      //   updateUserBalance(db, userId, newValue);
      // }
    }
  }, []);

  return (
    <div>
      {isAuthenticated && (
        <div>
          <Balance value={userData.balance} />
          <RouterLink to="/">
            <Button sx={{ margin: "1rem" }} variant="contained">
              <MonetizationOnIcon />
              Place Bets
            </Button>
          </RouterLink>
          <div>{authState.user.displayName} Placed Bets:</div>
          {userBets &&
            userGames &&
            Object.keys(userBets).map((key) => {
              const userBet = userBets[key];
              return (
                <BetCard
                  key={userBet.gameId}
                  teamNames={userGames[userBet.gameId].teams}
                  choice={userBet.choice}
                  price={userBet.price}
                  value={userBet.value}
                  gameStartTime={userGames[userBet.gameId].date}
                  betDate={userBet.date}
                />
              );
            })}
          <Button
            sx={{ m: 1, backgroundColor: "danger.light" }}
            variant="contained"
            onClick={signOut}
          >
            Log out {authState.user.displayName}
          </Button>
        </div>
      )}
    </div>
  );
};

export { UserBets };
