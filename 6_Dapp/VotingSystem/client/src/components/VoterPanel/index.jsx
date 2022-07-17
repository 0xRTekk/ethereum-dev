import { useState, useEffect } from "react";
import { Segment, Header, Form, Button, Input, Radio } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function VoterPanel({ proposals, setProposals, currentPhase }) {
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
    }

    async function getProposals() {
      if (contract) {
        // On recup les proposals déjà dans la whitelist
        const eventProposals = await contract.getPastEvents("ProposalRegistered", { fromBlock: 0, toBlock: "latest" });
        // On fait un tableau avec leur ids
        const proposalsId = eventProposals.map((proposal) => proposal.returnValues._proposalId);
        // On mémorise dans le state
        setProposals(proposalsId);
      }
    }

    getVoter();
    // getProposals();
  }, [accounts, contract, artifact]);

  const handleChange = (evt) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddProposal = async () => {
    if (inputValue === "") {
      alert("Please enter a description");
      return;
    }
    // const newProposals = [...proposals];
    const receipt = await contract.methods.addProposal(inputValue).send({ from: accounts[0] });
    // newProposals.push(receipt.events.ProposalRegistered.returnValues._proposalId);
    // setProposals(receipt.events.ProposalRegistered.returnValues._proposalId);
    // setInputValue("");
    window.location.reload();
  };

  return (
    isVoter && (
      <Segment raised size="huge" color="green">
        <Header as="h2">Voter's panel</Header>
        {currentPhase === 1 && (
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
        )}
        {currentPhase === 3 && (
          <Segment size="huge">
            <Form>
              <Form.Field>
                {proposals.forEach(async (id) => {
                  const proposal = await contract.methods.getOneProposal(parseInt(id)).call({ from: accounts[0] });
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
          )}
      </Segment>
    )
  );
}

export default VoterPanel;
