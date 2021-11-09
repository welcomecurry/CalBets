import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import { useAuthStateContext } from "../components/AuthStateContext";
import { AUTHENTICATED } from "../utils/firebase";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { fetchOdds } from "../services/BetsAPI";
import { Sidebar } from "../components/Sidebar";

const Home = () => {
  const { authState, signOut } = useAuthStateContext();

  const [odds, setOdds] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(async () => {
    const data = await fetchOdds();
    if (data) setOdds(data);
  }, []);

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
          <div>
            {odds.map((e) => (
              <div key={e.id}>
                <div>Sport: {e.sport_title}</div>
                <div>
                  Odds:{" "}
                  {e.bookmakers[0].markets[0].outcomes.map((o) => (
                    <div>
                      ({o.name}, {o.price})
                    </div>
                  ))}
                </div>
                <div>Time: {e.commence_time}</div>
              </div>
            ))}
          </div>
          <Button onClick={signOut}>
            Log out {authState?.user?.displayName}
          </Button>
        </div>
      )}
    <Sidebar odds={odds}/>
    </div>
  );
};

export { Home };
