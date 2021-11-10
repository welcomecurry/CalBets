import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles.css";
import { Home } from "./pages/Home";
import { Firebase } from "./utils/firebase";
import { AuthStateProvider } from "./components/AuthStateContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div style={{paddingBottom: "60px"}}>
      <Header></Header>
      <AuthStateProvider Firebase={new Firebase()}>
        <Home />
      </AuthStateProvider>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
