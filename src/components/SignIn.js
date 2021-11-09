import { useState } from "react";
import Button from "@mui/material/Button";

import { useAuthStateContext } from "./AuthStateContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmailAndPassword, signInWithGoogle } =
    useAuthStateContext();

  return (
    <div>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      <form
        onSubmit={(e) => {
          signInWithEmailAndPassword(email, password);
          e.preventDefault();
        }}
      >
        <div>Sign in with Email</div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export { SignIn };
