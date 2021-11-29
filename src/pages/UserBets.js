import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTHENTICATED } from "../utils/firebase";
import { useAuthStateContext } from "../components/AuthStateContext";

const UserBets = () => {
  const { authState, userData, userBets, signOut } = useAuthStateContext();

  return (
    <div>
      <nav>
        <RouterLink to="/">Place Bets</RouterLink>
      </nav>
      {authState.status === AUTHENTICATED && (
        <div>
          <div>Name: {authState.user.displayName}</div>
          <div>Email: {authState.user.email}</div>
          <div>Balance: {userData.balance}</div>
          {<div>Placed Bets: {JSON.stringify(userBets)}</div>}
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
