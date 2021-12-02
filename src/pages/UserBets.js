import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTHENTICATED } from "../utils/firebase";
import { Balance } from "../components/Balance/Balance";
import { BetCard } from "../components/BetCard/BetCard";
import { useAuthStateContext } from "../components/AuthStateContext";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const UserBets = () => {
  const { authState, userData, userBets, userGames, signOut } = useAuthStateContext();
  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  return (
    <div>
      <RouterLink to="/">
        <Button variant="contained">
          <MonetizationOnIcon/>
          Place Bets
        </Button>
      </RouterLink>   
      <Balance value={userData.balance} />
      <nav>    
      </nav>
      {isAuthenticated && (
        <div>
          <div>Name: {authState.user.displayName}</div>
          <div>Email: {authState.user.email}</div>
          <BetCard />
          {<div>Placed Bets: {JSON.stringify(userBets)}</div>}
          {<div>Games: {JSON.stringify(userGames)}</div>}
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
