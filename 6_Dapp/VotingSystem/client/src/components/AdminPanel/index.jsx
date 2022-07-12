import { useState, useEffect } from "react";
import { Segment, Header, Form, Button, Input } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function AdminPanel() {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [isOwner, setIsOwner] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPhase, setCurrentPhase] = useState(0);
  const phases = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied",
  ];

  useEffect(() => {
    async function getPhase() {
      if (artifact) {
        // On check si l'account courant est l'owner du contract
        const phase = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setCurrentPhase(parseInt(phase));
      }
    }

    getPhase();
  });

  useEffect(() => {
    async function getOwner() {
      if (artifact) {
        // On check si l'account courant est l'owner du contract
        const owner = await contract.methods.owner().call({ from: accounts[0] });
        accounts[0] === owner ? setIsOwner(true) : setIsOwner(false);
      }
    }

    getOwner();
  }, [accounts, contract, artifact]);

  const handleChange = (evt) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (inputValue === "") {
      alert("Please enter an address");
      return;
    }
    await contract.methods.addVoter(inputValue).send({ from: accounts[0] });
    const newVoter = await contract.methods.getVoter(inputValue).call({ from: accounts[0] });
    console.log(newVoter);
  };

  return (
    isOwner && (
      <Segment raised size="huge" color="orange">
        <Header as="h2">Admin's panel</Header>

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              value={inputValue}
              icon="users"
              iconPosition="left"
              placeholder="Add Voter"
              size="huge"
              fluid
              onChange={handleChange}
            />
          </Form.Field>
          <Button color="orange" type="submit" size="huge" fluid>
            Add
          </Button>
        </Form>

        <Segment textAlign="center" size="huge">
          <Header as="h3">Next phase</Header>

          {phases.map((phase, index) => {
            if (index === currentPhase + 1) {
              return (
                <Button key={phase} size="huge" basic color="orange">
                  {phase}
                </Button>
              );
            }
          })}
        </Segment>
      </Segment>
    )
  );
}

export default AdminPanel;
