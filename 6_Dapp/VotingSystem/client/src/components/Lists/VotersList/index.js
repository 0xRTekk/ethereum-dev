// == Import npm
import { Segment, Header, Table } from 'semantic-ui-react';

// == Composant
function VotersList() {
  return (
    <Segment size='huge' textAlign='center'>

      <Header as='h2'>List of voters</Header>

      <Table celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Voted</Table.HeaderCell>
            <Table.HeaderCell>Proposal voted</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>0x0000000000000000000000000000000000000000</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>0x0000000000000000000000000000000000000000</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>0x0000000000000000000000000000000000000000</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>-</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

    </Segment>
  );
}

// == Export
export default VotersList;
