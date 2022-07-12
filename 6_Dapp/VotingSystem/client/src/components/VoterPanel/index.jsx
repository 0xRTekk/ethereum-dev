import { useState, useEffect } from "react";
import { Segment, Header, Form, Button, Input } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function VoterPanel() {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

    getVoter();
  }, [accounts, contract, artifact]);

  const handleChange = (evt) => {
    setInputValue(evt.currentTarget.value);
  };

  return (
    isVoter && (
      <Segment raised size="huge" color="green">
        <Header as="h2">Voter's panel</Header>

        <Segment size="huge">
          <Form>
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
              <Input list="proposal" placeholder="Chose a proposal" size="huge" />
              <datalist id="proposal">
                <option value="1">Lorem 1</option>
                <option value="2">Lorem 2</option>
                <option value="3">Lorem 3</option>
              </datalist>
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
