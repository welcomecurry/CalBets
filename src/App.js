// import React, { useEffect, useState } from "react";
// import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./assets/App.css";
import { Firebase } from "./utils/firebase";
import { AuthStateProvider } from "./components/AuthStateContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer";
import { theme } from "./assets/theme";

import { Home } from "./pages/Home";
import { UserBets } from "./pages/UserBets";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <div style={{ paddingBottom: "60px" }}>
            <Header></Header>
            <AuthStateProvider Firebase={new Firebase()}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserBets />} />
              </Routes>
            </AuthStateProvider>
          </div>
          <Footer></Footer>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
