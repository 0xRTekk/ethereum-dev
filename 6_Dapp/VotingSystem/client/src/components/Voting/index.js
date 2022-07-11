// == Imports npm
import { useEffect, useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';

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
  const { state: { contract, accounts } } = useEth();

  const [isOwner, setIsOwner] = useState(false);
  const [isVoter, setIsVoter] = useState(false);
  const [voters, setVoters] = useState([]);
  const [isTallied, setIsTallied] = useState(false);

  /*
  Au montage  :
  - On recup les voters via l'event VoterRegistered
    => recup de tous les events passés et remplir une propriété du state
  - On en profite pour se mettre en écoute des futurs events VoterRegistered
    => On va remplir un tableau avec les voters à chaque émition de l'event puis rajouter dans le state
  */
  useEffect(() => {
    async function getVoterRegistered() {
      // On recup tous les events VoterRegistered passés du contrat
      let votersList = await contract.getPastEvents('VoterRegistered', {
        fromBlock: 0,
        toBlock: 'latest',
      });

      // On se met en écoute des émissions d'events. On rajoute chaque nouvel event dans le state
      contract.events.VoterRegistered({ fromBlock: 0 }).on('data', event => votersList.push(event));
      setVoters(votersList);
    };

    getVoterRegistered();
  }, []);

  /*
  Au montage et lors du changement d'account :
  - On recup l'owner du contract
    => call d'une fonction view de Owner.sol et mémorisation dans une variable
  - On recup les voters via l'event VoterRegistered
    => recup de tous les events passés et remplir une propriété du state

  - Si l'account metamask courant correspond à l'owner
    => Oui : isOwner true
  - Autrement si l'account metamask courant est présent dans le tableau des voters
    => isVoter true
  */
  useEffect(() => {
    async function checkAccount() {
      // On recup l'owner
      const owner = await contract.methods.owner().call({ from: accounts[0] });
      
      // On check si l'account courant est owner
      accounts[0] === owner ? setIsOwner(true) : setIsOwner(false);
      
      // On check si l'account courant est un voter
      voters.find((voter) => voter === accounts[0]) ? setIsVoter(true) : setIsVoter(false);
    };

    checkAccount();
  }, [accounts, voters]);

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
        {isOwner && <AdminPanel />}
        {isVoter && <VotersPanel />}
        {isTallied && <Winner />}
        <Lists />
      </main>
  );
}

// == Export
export default Voting;
