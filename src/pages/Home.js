import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

import { useAuthStateContext } from "../components/AuthStateContext";
import { AUTHENTICATED } from "../utils/firebase";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { fetchOdds } from "../services/BetsAPI";
import { Sidebar } from "../components/Sidebar";
import { GameCard } from "../components/GameCard/GameCard";
import { Balance } from "../components/Balance/Balance";

const Home = () => {
  const { authState, signOut } = useAuthStateContext();
  const [sport, setSport] = useState("upcoming");
  const [odds, setOdds] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(async () => {
    const data = await fetchOdds(sport);
    if (data) setOdds(data);
  }, [sport]);

  const userIsLoggedIn = authState.status === AUTHENTICATED;
  return (
    <div>
      {!userIsLoggedIn ? (
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
          <Balance></Balance>
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
          <Sidebar odds={odds} />
          <div>
            {odds.map((e) => (
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
          </div>
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
