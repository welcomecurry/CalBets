import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTHENTICATED } from "../utils/firebase";
import { Balance } from "../components/Balance/Balance";
import { BetCard } from "../components/BetCard/BetCard";
import { useAuthStateContext } from "../components/AuthStateContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getResultsByEventId } from "../services/JsonOddsAPI";
import {
  settleUserBet,
  updateGame,
  updateUserBalance,
} from "../utils/firebaseFunctions";

const UserBets = () => {
  const { db, authState, userData, userBets, userGames, signOut } =
    useAuthStateContext();

  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  useEffect(async () => {
    if (isAuthenticated) {
      Object.keys(userBets)
        .filter((betId) => userBets[betId].active)
        .map(async (betId) => {
          const userBet = userBets[betId];
          const r = await getResultsByEventId(userBet.gameId);
          if (r.length > 0 && r[0].Final == true) {
            const gameResult = r[0];
            const winner =
              gameResult.HomeScore - gameResult.AwayScore > 0 ? 0 : 1;
            const betResult = winner === userBet.choice ? "win" : "loss";
            updateGame(db, userBet.gameId, {
              result: [gameResult.HomeScore, gameResult.AwayScore],
            });
            settleUserBet(db, authState.user.uid, betId, betResult);
            if (betResult === "win") {
              const userOdd = userBet.odds[userBet.choice];
              if (userOdd > 0) {
                const newBalance = userData.balance + userBet.value / 100 * userOdd + userBet.value;
                updateUserBalance(db, authState.user.uid, newBalance);
              } else {
                const newBalance = userData.balance + userBet.value / -userOdd * 100 + userBet.value;
                updateUserBalance(db, authState.user.uid, newBalance);
              }
            }
          }
        });
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
