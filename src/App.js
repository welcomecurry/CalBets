import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles.css";
import { Home } from "./components/Home";
import { Firebase } from "./utils/firebase";
import { AuthStateProvider } from "./components/AuthStateContext";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <AuthStateProvider Firebase={new Firebase()}>
        <Home />
        <Sidebar />
      </AuthStateProvider>
    </div>
  );
}

export default App;
