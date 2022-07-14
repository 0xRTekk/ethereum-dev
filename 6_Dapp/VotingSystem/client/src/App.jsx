import { useState } from "react";

import { EthProvider } from "./contexts/EthContext";

import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import AdminPanel from "./components/AdminPanel";
import VoterPanel from "./components/VoterPanel";
import VotersList from "./components/VotersList";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [proposals, setProposals] = useState([]);

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <AdminPanel />
          <hr />
          <VoterPanel proposals={proposals} setProposals={setProposals} />
          <hr />
          <VotersList />
          <hr />
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
