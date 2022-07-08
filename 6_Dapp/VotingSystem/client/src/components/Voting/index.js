// == Imports npm
import { Container } from 'semantic-ui-react';

// == Imports assets
import './voting.css';

// == Composant
function Voting() {
  return (
    <Container>
      <main className="voting">
        <section>Admin's Panel</section>
        <section>Voter's Panel</section>
        <section>Winner</section>
        <div className="list">
          <section className="list__voters">List of voters</section>
          <section className="list__proposals">List of voters</section>
        </div>
      </main>
    </Container>
  );
}

// == Export
export default Voting;
