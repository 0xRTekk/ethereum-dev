// == Import npm
import { Segment, Header, Table } from 'semantic-ui-react';

// == Composant
function ProposalsList() {
  return (
    <Segment size='huge' textAlign='center'>

      <Header as='h2'>List of proposals</Header>

      <Table celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell width='1'>1</Table.Cell>
            <Table.Cell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia soluta, eius ea fugit cupiditate labore.</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia soluta, eius ea fugit cupiditate labore.</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia soluta, eius ea fugit cupiditate labore.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

    </Segment>
  );
}

// == Export
export default ProposalsList;
