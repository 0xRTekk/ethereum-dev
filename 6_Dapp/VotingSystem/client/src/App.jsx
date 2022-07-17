import { useState } from "react";

import { EthProvider } from "./contexts/EthContext";

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
    "VotesTallied",
  ];
  const [proposals, setProposals] = useState([]);
  const [winner, setWinner] = useState(null);

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <AdminPanel currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} phases={phases} />
          <hr />
          <VoterPanel proposals={proposals} setProposals={setProposals} currentPhase={currentPhase} setWinner={setWinner} />
          <hr />
          <VotersList />
          <hr />
          <ProposalsList proposals={proposals} />
          <hr />
          {winner !== null && (
            <div>The winner is : {winner}</div>
          )}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
