import React, { createContext, useContext, useState, useEffect } from "react";
import { AUTHENTICATED, UNAUTHENTICATED } from "../utils/firebase";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { fetchGame } from "../utils/firebaseFunctions";

const AuthStateContext = createContext({
  state: UNAUTHENTICATED,
  user: {},
});

function AuthStateProvider({ children, Firebase }) {
  const [authState, setAuthState] = useState({
    status: UNAUTHENTICATED,
    user: undefined,
  });
  const [userData, setUserData] = useState({});
  const [userBets, setUserBets] = useState({});
  const [userBetsWithGames, setUserBetsWithGames] = useState({});

  const signOut = () => Firebase.signOut(setAuthState);
  const signUpWithEmailAndPassword = (email, password, name) => {
    const expandedOnError = (error) => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
    };
    Firebase.signUpWithEmailAndPassword(
      email,
      password,
      name,
      setAuthState,
      expandedOnError
    ).catch((e) => {
      alert(e.message);
    });
  };

  const signInWithEmailAndPassword = (email, password) => {
    const expandedOnError = (error) => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
    };
    Firebase.signInWithEmailAndPassword(
      email,
      password,
      setAuthState,
      expandedOnError
    );
  };
  const signInWithGoogle = () => Firebase.signInWithGoogle(setAuthState);
  const updateEmailAddress = (email) => Firebase.updateEmailAddress(email);
  const sendPasswordResetEmail = (email) =>
    Firebase.sendPasswordResetEmail(email);
  const userHasOnlyEmailProvider = () => Firebase.userHasOnlyEmailProvider();

  useEffect(() => {
    const unsubscribe = Firebase.authState(setAuthState);
    return () => unsubscribe();
  }, [authState.user]);

  useEffect(() => {
    if (authState.status === AUTHENTICATED) {
      const userDoc = doc(Firebase.firestore, "users", authState.user.uid);
      const unsub = onSnapshot(userDoc, (doc) => {
        setUserData(doc.data());
      });

      return () => unsub();
    }
  }, [authState.status === AUTHENTICATED]);

  useEffect(() => {
    if (authState.status === AUTHENTICATED) {
      const betsRef = collection(Firebase.firestore, "users", authState.user.uid, "bets");
      const unsub = onSnapshot(betsRef, (snapshot) => {
        var userBets = {}
        snapshot.forEach((doc) => {
          userBets[doc.id] = doc.data();
        });
        setUserBets(userBets);
      });

      // Stop listening to changes
      return () => unsub();
    }
  }, [authState.status === AUTHENTICATED]);

  useEffect(async () => {
      var userBetsWithGames = {}
      for (const gameId in userBets) {
        const bet = userBets[gameId];
        const game = await fetchGame(Firebase.firestore, gameId);
        userBetsWithGames[gameId] = { ...game, ...bet };
      };

      setUserBetsWithGames(userBetsWithGames)
  }, [userBets]);

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        db: Firebase.firestore,
        userData,
        userBets: userBetsWithGames,
        signOut,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        updateEmailAddress,
        sendPasswordResetEmail,
        userHasOnlyEmailProvider,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

const useAuthStateContext = () => useContext(AuthStateContext);

export { AuthStateProvider, useAuthStateContext };
