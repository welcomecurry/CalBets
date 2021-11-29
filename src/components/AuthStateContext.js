import React, { createContext, useContext, useState, useEffect } from "react";
import { AUTHENTICATED, UNAUTHENTICATED } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { fetchUserBets, fetchGame } from "../utils/firebaseFunctions";

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

  useEffect(async () => {
    if (authState.status === AUTHENTICATED) {
      const userDoc = doc(Firebase.firestore, "users", authState.user.uid);
      const unsub = onSnapshot(userDoc, (doc) => {
        setUserData(doc.data());
      });

      const userBets = await fetchUserBets(Firebase.firestore, authState.user.uid);
      for (const gameId in userBets) {
        const bet = userBets[gameId];
        const game = await fetchGame(Firebase.firestore, gameId);
        userBets[gameId] = { ...game, ...bet };
      };
      setUserBets(userBets);

      return () => unsub();
    }
  }, [authState.status === AUTHENTICATED]);

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        db: Firebase.firestore,
        userData,
        userBets,
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
