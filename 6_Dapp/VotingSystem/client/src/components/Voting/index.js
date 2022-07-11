// == Imports npm
import { Header, Icon } from 'semantic-ui-react';

// == Imports assets
import './voting.css';

// == Import components
import { EthProvider } from '../../contexts/EthContext'
import AdminPanel from '../AdminPanel';
import VotersPanel from '../VotersPanel';
import Winner from '../Winner';
import Lists from '../Lists';

// == Composant
function Voting() {
  return (
    <EthProvider>
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
        <AdminPanel />
        <VotersPanel />
        <Winner />
        <Lists />
      </main>
    </EthProvider>
  );
}

// == Export
export default Voting;
