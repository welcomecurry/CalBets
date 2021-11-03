import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles.css";
import { Home } from "./components/Home";
import { Firebase } from "./utils/firebase";
import { AuthStateProvider } from "./components/AuthStateContext";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <AuthStateProvider Firebase={new Firebase()}>
        <Home />
      </AuthStateProvider>
    </div>
  );
}

export default App;
