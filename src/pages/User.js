import { useAuthStateContext } from "../components/AuthStateContext";


const User = () => {
  const { authState, userData } = useAuthStateContext();

  return (
    <div>
      <div>Name: {authState.user.displayName}</div>
      <div>Email: {authState.user.email}</div>
      <div>Balance: {userData.balance}</div>
      {userData.bets && <div>Placed Bets: {JSON.stringify(userData.bets)}</div>}
    </div>
  );
};

export { User };
