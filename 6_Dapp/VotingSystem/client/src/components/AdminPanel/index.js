// == Import npm
import { Segment, Header } from 'semantic-ui-react';

// == Composant
function AdminPanel() {
  return (
    <Segment raised size='huge' color='orange'>
      <Header as='h2'>Admin's panel</Header>
    </Segment>
  );
}

// == Export
export default AdminPanel;
