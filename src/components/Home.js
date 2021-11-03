import { useState, useEffect } from "react";
import { useAuthStateContext } from "./AuthStateContext";
import { AUTHENTICATED } from "../utils/firebase";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { fetchOdds } from "../services/BetsAPI";

const Home = () => {
  const {
    authState,
    signOut,
  } = useAuthStateContext();

  const [odds, setOdds] = useState([])

  useEffect(async () => {
    const data = await fetchOdds();
    if (data) setOdds(data);
  }, []);

  const userIsLoggedIn = authState.status === AUTHENTICATED;
  console.log(odds);
  return (
    <div>
      {!userIsLoggedIn ? (
        <div>
          {/* <SignIn /> */}
          <SignUp />
        </div>
      ) : (
        <div>
          <div>{odds.map(e => <div key={e.id}>
            <div>Sport: {e.sport_title}</div>
            <div>Odds: {e.bookmakers[0].markets[0].outcomes.map(o => <div>({o.name}, {o.price})</div>)}</div>
            <div>Time: {e.commence_time}</div>
            </div>)}</div>
          <button onClick={signOut}>
            Log out {authState?.user?.displayName}
          </button>
        </div>
      )}
    </div>
  );
};

export { Home };
