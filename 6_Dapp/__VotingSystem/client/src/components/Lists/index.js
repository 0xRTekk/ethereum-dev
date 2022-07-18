// == Import npm
import { Segment } from 'semantic-ui-react';

// == Import components
import VotersList from './VotersList';
import ProposalsList from './ProposalsList';

// == Composant
function Lists() {
  return (
    <Segment.Group horizontal>
      <VotersList />
      <ProposalsList />
  </Segment.Group>
  );
}

// == Export
export default Lists;
