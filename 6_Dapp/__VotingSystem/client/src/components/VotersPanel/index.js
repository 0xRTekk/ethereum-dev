// == Import npm
import { Segment, Header, Form, Input, Button } from 'semantic-ui-react';

// == Composant
function VotersPanel() {
  return (
    <Segment raised size='huge' color='green'>
      <Header as='h2'>Voter's panel</Header>

      <Segment size='huge'>
        <Form>
          <Form.Field>
            <Input icon='file alternate outline' iconPosition='left' placeholder='Add Proposal' size='huge' fluid />
          </Form.Field>
          <Button color='green' type="submit" size='huge'>Add</Button>
        </Form>
      </Segment>

      <Segment size='huge'>
        <Form>
          <Form.Field>
            <Input
              list='proposal'
              placeholder='Chose a proposal'
              size='huge'
            />
            <datalist id='proposal'>
              <option value='1'>Lorem 1</option>
              <option value='2'>Lorem 2</option>
              <option value='3'>Lorem 3</option>
              </datalist>
          </Form.Field>
          <Button color='green' type="submit" size='huge'>Add</Button>
        </Form>
      </Segment>
    </Segment>
  );
}

// == Export
export default VotersPanel;
