// == Import npm
import { Segment, Header, Form, Button, Input } from 'semantic-ui-react';

// == Composant
function AdminPanel() {
  return (
    <Segment raised size='huge' color='orange'>

      <Header as='h2'>Admin's panel</Header>

      <Form>
        <Form.Field>
          <Input icon='users' iconPosition='left' placeholder='Add Voter' size='huge' fluid />
        </Form.Field>
        <Button color='orange' type="submit" size='huge'>Add</Button>
      </Form>

      <Segment textAlign='center' size='huge'>
        <Header as='h3'>Phases control</Header>

        <Button.Group>
          <Button size='huge' basic color='orange'>Add Voter's phase</Button>
          <Button.Or text="&#10140;"/>
          <Button size='huge'>Start proposal's phase</Button>
          <Button.Or text="&#10140;"/>
          <Button size='huge'>End proposal's phase</Button>
          <Button.Or text="&#10140;"/>
          <Button size='huge'>Start voting phase</Button>
          <Button.Or text="&#10140;"/>
          <Button size='huge'>End voting phase</Button>
          <Button.Or text="&#10140;"/>
          <Button size='huge'>Tally phase</Button>
        </Button.Group>
      </Segment>

    </Segment>
  );
}

// == Export
export default AdminPanel;
