import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Button,
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { useAuthStateContext } from "../components/AuthStateContext";
import { AUTHENTICATED } from "../utils/firebase";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import {
  getOddsBySport,
  getResultsBySport,
  getSports
} from "../services/JsonOddsAPI";
import { SportSelector } from "../components/SportSelector";
import { GameCardList } from "../components/GameCard/GameCardList";
import { Balance } from "../components/Balance/Balance";

const Home = () => {
  const { authState, db, userData, signOut } = useAuthStateContext();
  const [isSignIn, setIsSignIn] = useState(false);
  const [odds, setOdds] = useState(null);
  const [results, setResults] = useState(null);
  const [sports, setSports] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const isAuthenticated = authState.status === AUTHENTICATED && userData;

  useEffect(async () => {
    const sports = await getSports();
    if (sports) setSports(sports);
  }, []);

  useEffect(async () => {
    if (isAuthenticated && selectedSport != "") {
      const [oddsData, resultsData] = await Promise.all([getOddsBySport(selectedSport), getResultsBySport(selectedSport)]);
      if (oddsData) setOdds(oddsData);
      console.log("odds")
      console.log(oddsData)
      console.log(sports)
      if (resultsData) setResults(resultsData.filter((e) => e.OddType === "Game"));
      console.log("results")
      console.log(resultsData)
      // setSelectedLeague("all");
    }
  }, [selectedSport]);

  useEffect(() => {
    if (isAuthenticated) {
      if (selectedSport === "") setSelectedSport("nba");
    } else {
      // reset state if user not logged in
      setSelectedSport("");
      setOdds(null);
      setResults(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setOdds(null)
    setResults(null)
  }, [selectedSport]);

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
          <RouterLink to="/user">
            <Button variant="contained">
              <AccountBalanceWalletIcon/>
               My Bets
            </Button>
          </RouterLink>
          </nav>
          <Balance value={userData.balance} />
          <SportSelector
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            sports={sports}
          />
          <GameCardList
            db={db}
            userId={authState.user.uid}
            odds={odds}
            results={results}
            sports={sports}
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
