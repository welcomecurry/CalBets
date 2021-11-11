import React, { createContext, useContext, useState, useEffect } from "react";
import { UNAUTHENTICATED } from "../utils/firebase";

const AuthStateContext = createContext({
  state: UNAUTHENTICATED,
  user: {},
});

function AuthStateProvider({ children, Firebase }) {
  const [authState, setAuthState] = useState({
    status: UNAUTHENTICATED,
    user: undefined,
  });

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
  const sendEmailVerification = (onError) =>
    Firebase.sendEmailVerification(onError);
  const userHasOnlyEmailProvider = () => Firebase.userHasOnlyEmailProvider();

  useEffect(() => {
    let unsubscribe = Firebase.authState(setAuthState);
    return () => unsubscribe();
  }, [authState.user]);

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        signOut,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        updateEmailAddress,
        sendPasswordResetEmail,
        sendEmailVerification,
        userHasOnlyEmailProvider,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

const useAuthStateContext = () => useContext(AuthStateContext);

export { AuthStateProvider, useAuthStateContext };
