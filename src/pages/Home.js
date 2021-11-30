import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";

import { useAuthStateContext } from "../components/AuthStateContext";
import { AUTHENTICATED } from "../utils/firebase";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { fetchOdds } from "../services/BetsAPI";
import { Sidebar } from "../components/Sidebar";
import { GameCardList } from "../components/GameCard/GameCardList";
import { Balance } from "../components/Balance/Balance";

const Home = () => {
  const { authState, db, userData, signOut } = useAuthStateContext();
  const [isSignIn, setIsSignIn] = useState(false);
  const [odds, setOdds] = useState([]);
  const [sport, setSport] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  useEffect(async () => {
    if (isAuthenticated && sport !== "") {
      const oddsData = await fetchOdds(sport);
      if (oddsData) setOdds(oddsData);
      setSelectedLeague("all");
    }
  }, [sport]);

  useEffect(() => {
    if (isAuthenticated) {
      if (sport === "") setSport("upcoming");
      if (selectedLeague === "") setSelectedLeague("all");
    } else {
      // reset state if user not logged in
      setSport("");
      setOdds([]);
      setSelectedLeague("");
    }
  }, [isAuthenticated]);

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          {isSignIn ? (
            <div>
              <SignIn />
              <Link onClick={() => setIsSignIn(!isSignIn)}>
                Don't have an account? Sign up.
              </Link>
            </div>
          ) : (
            <div>
              <SignUp />
              <Link onClick={() => setIsSignIn(!isSignIn)}>
                Already have an account? Sign in.
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <nav>
            <RouterLink to="/user">My Bets</RouterLink>
          </nav>
          <Balance value={userData.balance} />
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <Select
                sx={{ m: 1 }}
                id="sport-selector"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
              >
                <MenuItem value={"upcoming"}>Upcoming Events</MenuItem>
                <MenuItem value={"americanfootball"}>Football</MenuItem>
                <MenuItem value={"basketball"}>Basketball</MenuItem>
                <MenuItem value={"soccer"}>Soccer</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Sidebar
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
            odds={odds}
          />
          <GameCardList
            db={db}
            userId={authState.user.uid}
            odds={odds}
            selectedLeague={selectedLeague}
          />
          <Button
            sx={{ m: 1, backgroundColor: "danger.light" }}
            variant="contained"
            onClick={signOut}
          >
            Log out {authState?.user?.displayName}
          </Button>
        </div>
      )}
    </div>
  );
};

export { Home };
