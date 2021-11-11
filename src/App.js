import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import "./assets/App.css";
import { Home } from "./pages/Home";
import { Firebase } from "./utils/firebase";
import { AuthStateProvider } from "./components/AuthStateContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer";
import { theme } from "./assets/theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div style={{ paddingBottom: "60px" }}>
          <Header></Header>
          <AuthStateProvider Firebase={new Firebase()}>
            <Home />
          </AuthStateProvider>
        </div>
        <Footer></Footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
