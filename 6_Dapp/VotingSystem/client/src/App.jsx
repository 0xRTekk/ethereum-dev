import { useState } from "react";
import { Message } from 'semantic-ui-react';

import { EthProvider } from "./contexts/EthContext";

import Account from "./components/Account";
import Winner from "./components/Winner";
import AdminPanel from "./components/AdminPanel";
import VoterPanel from "./components/VoterPanel";
import VotersList from "./components/VotersList";
import ProposalsList from "./components/ProposalsList";

import "./App.css";

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const phases = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    // "VotesTallied",
  ];
  const [proposals, setProposals] = useState([]);
  const [winner, setWinner] = useState(null);
  console.log(winner, currentPhase);
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account />
          <hr />
          <Winner winner={winner} currentPhase={currentPhase} />
          <hr />
          <AdminPanel currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} phases={phases} />
          <hr />
          <VoterPanel proposals={proposals} setProposals={setProposals} currentPhase={currentPhase} setWinner={setWinner} />
          <hr />
          <VotersList />
          <hr />
          <ProposalsList proposals={proposals} />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
