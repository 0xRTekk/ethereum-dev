// == Imports npm
import { useEffect, useState } from 'react';
import { Header, Icon, Button } from 'semantic-ui-react';

// == Imports assets
import './voting.css';

// == Import context
import useEth from "../../contexts/EthContext/useEth";

// == Import components
import AdminPanel from '../AdminPanel';
import VotersPanel from '../VotersPanel';
import Winner from '../Winner';
import Lists from '../Lists';

// == Composant
function Voting() {
  const { state: { accounts, contract } } = useEth();

  const [isEntered, setIsEntered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isVoter, setIsVoter] = useState(false);
  const [voters, setVoters] = useState([]);
  const [isTallied, setIsTallied] = useState(false);

  const init = async () => {
    setIsEntered(true);

    // On check si l'account courant est l'owner du contract
    const owner = await contract.methods.owner().call({ from: accounts[0] });
    accounts[0] === owner ? setIsOwner(true) : setIsOwner(false);

    // On check si l'account courant est un voter
    voters.find((voter) => voter === accounts[0]) ? setIsVoter(true) : setIsVoter(false);

    // On recup tous les events VoterRegistered passés du contrat
    let votersList = await contract.getPastEvents('VoterRegistered', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    // On se met en écoute des émissions d'events. On rajoute chaque nouvel event dans le state
    contract.events.VoterRegistered({ fromBlock: 0 }).on('data', event => votersList.push(event));
    setVoters(votersList);
  };

  return (
      <main className="voting">
        <Header
          as='h1'
          dividing
          textAlign='center'
          icon
        >
          <Icon name='cubes' />
          Blockchain Voting System
        </Header>

        {!isEntered && 
        (
          <Button
            animated
            fluid
            size='massive'
            basic
            color='orange'
            onClick={init}
          >
            <Button.Content visible>Enter the voting room</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        )}

        {isOwner && <AdminPanel />}
        {isVoter && <VotersPanel />}
        {isTallied && <Winner />}
        {isEntered && <Lists />}

      </main>
  );
}

// == Export
export default Voting;
