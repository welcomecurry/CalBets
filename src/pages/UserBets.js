import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTHENTICATED } from "../utils/firebase";
import { Balance } from "../components/Balance/Balance";
import { BetCard } from "../components/BetCard/BetCard";
import { useAuthStateContext } from "../components/AuthStateContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const UserBets = () => {
  const { authState, userData, userBets, userGames, signOut } =
    useAuthStateContext();
  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  return (
    <div>
      {isAuthenticated && (
        <div>
          <Balance value={userData.balance} />
          <RouterLink to="/">
            <Button sx={{ margin: "1rem"}} variant="contained">
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
