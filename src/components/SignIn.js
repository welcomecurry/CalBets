import { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { useAuthStateContext } from "./AuthStateContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const { signInWithEmailAndPassword, signInWithGoogle } =
    useAuthStateContext();

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
              Sign in
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
                    autoComplete="password"
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
                Sign In
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
                Sign in with Google
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export { SignIn };
