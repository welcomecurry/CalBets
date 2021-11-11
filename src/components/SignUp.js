import { useState } from "react";
import { useAuthStateContext } from "./AuthStateContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signUpWithEmailAndPassword, signInWithGoogle } =
    useAuthStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpWithEmailAndPassword(email, password, displayName);
  };

  return (
    <div>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="displayName"
                    fullWidth
                    id="displayName"
                    label="Full Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    value={displayName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    fullWidth
                    id="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    value={password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                onClick={signInWithGoogle}
                startIcon={
                  <Avatar
                    src={
                      "https://img.icons8.com/color/144/000000/google-logo.png"
                    }
                  />
                }
              >
                Sign Up with Google
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export { SignUp };
