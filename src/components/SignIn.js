import { useState } from "react";
import Button from "@mui/material/Button";
import { useAuthStateContext } from "./AuthStateContext";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const theme = createTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password, displayName);
  };

  const { signInWithEmailAndPassword, signInWithGoogle } =
    useAuthStateContext();

  return (
<div>
    <div>
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button variant="contained" onClick={signInWithGoogle}>Sign in with Google</Button>

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
                  label="Username / Email Address"
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  value={displayName}
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </div>
    <div>
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
    </div>
  );
};

export { SignIn };
