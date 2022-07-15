import { useState, useEffect } from "react";
import { Segment, Header, Form, Button, Input, Radio } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function VoterPanel({ proposals, setProposals }) {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [votedProposal, setVotedProposal] = useState(0);
  const [proposalsArray, setProposalsArray] = useState([]);

  useEffect(() => {
    async function getVoter() {
      if (artifact) {
        let voters = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
        const voter = voters.find((voter) => voter.returnValues._voterAddress === accounts[0]);
        if (voter) {
          setIsVoter(true);
        } else {
          setIsVoter(false);
        }
      }
    };

    async function getProposals() {
      if (contract) {
        // On fait une copie du tableau de proposals
        const newProposals = [...proposals];
        // On écoute les events ProposalRegistered
        contract.events.ProposalRegistered({ fromBlock: 0 }).on("data", (event) => {
          console.log(`ProposalRegistered event log : ${event.returnValues._proposalId}`);
          // On rajoute le nouvel id dans le tableau
          newProposals.push(event.returnValues._proposalId);
          // On met dans le state
          setProposals(newProposals);
        });
      }
    };

    getVoter();
    getProposals();
  }, [accounts, contract, artifact]);

  const handleChange = (evt) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddProposal = async () => {
    const newProposals = [...proposals];
    const receipt = await contract.methods.addProposal(inputValue).send({ from: accounts[0] });
    newProposals.push(receipt.events.ProposalRegistered.returnValues._proposalId);
    setProposals(newProposals);
    setInputValue("");
  };

  return (
    isVoter && (
      <Segment raised size="huge" color="green">
        <Header as="h2">Voter's panel</Header>

        <Segment size="huge">
          <Form onSubmit={handleAddProposal}>
            <Form.Field>
              <Input
                value={inputValue}
                onChange={handleChange}
                icon="file alternate outline"
                iconPosition="left"
                placeholder="Add Proposal"
                size="huge"
                fluid
              />
            </Form.Field>
            <Button color="green" type="submit" size="huge" fluid>
              Add
            </Button>
          </Form>
        </Segment>

        <Segment size="huge">
          <Form>
            <Form.Field>
              {proposals.forEach(async (id) => {
                const proposal = await contract.methods.getOneProposal(parseInt(id)).call({ from: accounts[0] });
                console.log(proposal);
                let newProposals = proposalsArray;
                newProposals.push({ key: id, text: proposal.description, value: id });
                setProposalsArray(newProposals);
              })}
              <Form.Select fluid label="Proposal's list" options={proposalsArray} placeholder="Proposal's list" />
            </Form.Field>
            <Button color="green" type="submit" size="huge">
              Add
            </Button>
          </Form>
        </Segment>
      </Segment>
    )
  );
}

export default VoterPanel;
