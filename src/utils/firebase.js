// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBjGL_AEnWwr0lNy38gupLqLOMyvRIe-qE",
  authDomain: "cal-bets.firebaseapp.com",
  projectId: "cal-bets",
  storageBucket: "cal-bets.appspot.com",
  messagingSenderId: "348194718254",
  appId: "1:348194718254:web:6182e3b76a8be29a72d5bf",
};

export const AUTHENTICATION_LOADING = "AUTHENTICATION_LOADING";
export const AUTHENTICATED = "AUTHENTICATED";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";

const supportedPopupSignInMethods = [
  GoogleAuthProvider.PROVIDER_ID,
  EmailAuthProvider.PROVIDER_ID,
];

class Firebase {
  constructor(firebaseKeys) {
    // Do not initialize the app if this step was already done.
    if (!getApps().length) {
      const app = initializeApp(FIREBASE_CONFIG);
      this.firestore = getFirestore(app);
    }

    if (getApps().length) {
      this.auth = getAuth();
      this.googleLoginProvider = new GoogleAuthProvider();
      this.emailAuthProvider = new EmailAuthProvider();
    }
  }

  getProvider(providerId) {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return this.googleLoginProvider;
      case EmailAuthProvider.PROVIDER_ID:
        return this.emailAuthProvider;
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  /* Updates the authentication every time a change is received */
  authState = (setAuthState) =>
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthState({
          status: AUTHENTICATED,
          user,
          token,
        });
      }
    });

  signInWithGoogle = async (setAuthState) => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signInWithPopup(this.auth, this.googleLoginProvider);
      const user = this.auth.currentUser;
    } catch (error) {
      setAuthState({ status: UNAUTHENTICATED, error });
      console.log("signInWithGoogle failed: ", error);
    }
  };

  /*
   * Returns providers for currently signed in user.
   */
  providersForEmail = async (email) => {
    return fetchSignInMethodsForEmail(this.auth, email);
  };

  /*
   * Returns whether the user is only logged in using password provider.
   */
  userHasOnlyEmailProvider = async (email) => {
    let providers;
    if (email) {
      providers = await this.providersForEmail(email);
    } else {
      const user = this.auth.currentUser;
      if (!user) {
        return false;
      }
      providers = await this.providersForEmail(user.email);
    }
    return (
      providers.length === 1 && providers[0] === EmailAuthProvider.PROVIDER_ID
    );
  };

  /**
   * Links an email with their credential from provider A to already existing provider B.
   * This is needed when a user uses the same email to login with google
   */
  linkProviders = async (email, credential) => {
    const providers = await fetchSignInMethodsForEmail(this.auth, email);
    const firstPopupProviderMethod = providers.find((p) =>
      supportedPopupSignInMethods.includes(p)
    );
    if (!firstPopupProviderMethod) {
      throw new Error(
        `Your account is linked to a provider that isn't supported.`
      );
    }
    const linkedProvider = this.getProvider(firstPopupProviderMethod);
    linkedProvider.setCustomParameters({ login_hint: email });
    try {
      const result = await signInWithPopup(this.auth, linkedProvider);
      linkWithCredential(result.user, credential);
    } catch (error) {
      console.log("linkWithCredentials failed: ", error);
    }
  };

  updateEmailAddress = async (email) => {
    const user = this.auth.currentUser;
    try {
      await updateEmail(user, email);
    } catch (error) {
      console.log("updateEmail failed: ", error);
    }
  };

  sendPasswordResetEmail = async (email, onError) => {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      onError && onError(error);
      console.log("sendPasswordResetEmail failed: ", error);
    }
  };

  sendEmailVerification = async (onError) => {
    const user = this.auth.currentUser;
    try {
      await sendEmailVerification(user, {
        url: window.location.href,
        handleCodeInApp: true,
      });
    } catch (error) {
      onError && onError(error);
      console.log("sendEmailVerification failed: ", error.message);
    }
  };

  updateUserDisplayName = async (name) => {
    const user = this.auth.currentUser;
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.log("updateUserDisplayName failed: ", error);
    }
  };

  /* Creates a user using email and password. This  method also goes ahead and updates the username */
  signUpWithEmailAndPassword = async (
    email,
    password,
    name,
    setAuthState,
    onError
  ) => {
    setAuthState({ status: AUTHENTICATION_LOADING });
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification();
      await this.updateUserDisplayName(name);
      const user = this.auth.currentUser;
    } catch (error) {
      onError && onError(error);
      console.log("signUpWithEmailAndPassword failed: ", error);
    }
  };

  signInWithEmailAndPassword = async (
    email,
    password,
    setAuthState,
    onError
  ) => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signInWithEmailAndPassword(this.auth, email, password);
      const user = this.auth.currentUser;
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        throw new Error("Email already used for authentication.");
      } else {
        if (!onError) {
          throw new Error("signInWithEmailAndPassword failed: ", error);
        } else {
          onError(error);
        }
      }
    }
  };

  signOut = async (setAuthState) => {
    try {
      setAuthState({ status: AUTHENTICATION_LOADING });
      await signOut(this.auth);
    } catch (error) {
      console.log("signOut failed: ", error);
      setAuthState({ status: UNAUTHENTICATED, error });
    }
  };
}

export { Firebase };
