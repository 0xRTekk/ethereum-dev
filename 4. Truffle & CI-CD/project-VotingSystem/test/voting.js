const Voting = artifacts.require("Voting.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('Voting', (accounts) => {
  // Instanciations des accounts pour nos tests
  const owner = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const voter3 = accounts[3];
  const voter4 = accounts[4];
  const voter5 = accounts[5];
  const voter6 = accounts[6];
  const voter7 = accounts[7];
  const nonVoter = accounts[8];
  // Déclaration d'une variable qui va recevoir une instance du contrat Voting
  let VotingInstance;


  describe("Tests des requires", () => {

    beforeEach(async () => {
      VotingInstance = await Voting.new({from:owner});
      await VotingInstance.addVoter(voter1, {from:owner});
    });

    // Sous chapitre de tests : modifiers
    context("Modifiers", () => {

      // onlyOwner
      it("should be the owner calling the function", async () => {
        await expectRevert(VotingInstance.addVoter(voter1, {from: voter2}), "Ownable: caller is not the owner");
      });

      // onlyVoters
      it("should be a voter calling the function", async () => {
          await expectRevert(VotingInstance.addProposal({from: nonVoter}), "You're not a voter");
      });

    });

    // Sous chapitre de tests : phase enregistrement des voters
    context("Phase enregistrement des voters", () => {

      // Phase Registering Voters
      it("should be the phase of voters registering", async () => {
        await VotingInstance.startProposalsRegistering({from: owner});
        await expectRevert(VotingInstance.addVoter(voter2, {from: owner}), "Voters registration is not open yet");
      });

      // Voter Already Exists
      it("should add a non registered voter", async () => {
        await expectRevert(VotingInstance.addVoter(voter1, {from: owner}), "Already registered");
      });

    });

    // Sous chapitre de tests : phase enregistrement des proposals
    context("Phase enregistrement des proposals", () => {

      // Phase Registering Proposals
      it("should be the phase of proposals registering", async () => {
        await expectRevert(VotingInstance.addProposal("Une proposal de test", {from: voter1}), "Proposals are not allowed yet");
      });

      // Proposals is not null / empty
      it("should add a non-empty / null proposal", async () => {
        await VotingInstance.startProposalsRegistering({from: owner});
        await expectRevert(VotingInstance.addProposal("", {from: voter1}), "Vous ne pouvez pas ne rien proposer");
      });

      // Proposals phase is not finished
      it("should be the end of the registering proposals phase", async () => {
        await expectRevert(VotingInstance.startVotingSession({from: owner}), "Registering proposals phase is not finished");
      });
    });

    // Sous chapitre de tests : phase de vote
    context("Phase de vote", () => {

      // Voting phase
      it("should be the voting phase", async () => {
        await expectRevert(VotingInstance.endVotingSession({from: owner}), "Voting session havent started yet");
      });

      // Already vote
      it("should vote one time", async () => {
        await VotingInstance.startProposalsRegistering({from : owner});
        await VotingInstance.addProposal("Test proposal 1", {from: voter1});
        await VotingInstance.endProposalsRegistering({from : owner});
        await VotingInstance.startVotingSession({from : owner});
        await VotingInstance.setVote(0, {from : voter1});

        await expectRevert(VotingInstance.setVote(0, {from : voter1}), "You have already voted");
      });

      // Proposal not found
      it("should vote on an existing proposal", async () => {
        await VotingInstance.startProposalsRegistering({from : owner});
        await VotingInstance.addProposal("Test proposal 1", {from: voter1});
        await VotingInstance.endProposalsRegistering({from : owner});
        await VotingInstance.startVotingSession({from : owner});

        await expectRevert(VotingInstance.setVote(1, {from : voter1}), "Proposal not found");
      });

      // Voting phase ended
      it("should vote on an existing proposal", async () => {
        await expectRevert(VotingInstance.tallyVotes({from : owner}), "Current status is not voting session ended");
      });
    });
  });


  describe("Tests des events", () => {

    before(async () => {
      VotingInstance = await Voting.new({from:owner});
    });
    
    // Enregistrement voter
    it("should emit the VoterRegistered event", async () => {
      const calledFunction = await VotingInstance.addVoter(voter1, {from: owner});
      expectEvent(calledFunction, "VoterRegistered", {voterAddress: voter1});
    });

    // Changement de phase
    it("should emit the WorkflowStatusChange event", async () => {
      const calledFunction = await VotingInstance.startProposalsRegistering({from: owner});
      expectEvent(
        calledFunction,
        "WorkflowStatusChange",
        {
          previousStatus: new BN(Voting.WorkflowStatus.RegisteringVoters),
          newStatus: new BN(Voting.WorkflowStatus.ProposalsRegistrationStarted)
        }
      );
    });

    // Enregistrement proposal
    it("should emit the ProposalRegistered event", async () => {
      const calledFunction = await VotingInstance.addProposal("Proposal de test", {from: voter1});
      expectEvent(calledFunction, "ProposalRegistered", {proposalId: new BN(0)});
    });

    // Enregistrement vote
    it("should emit the Voted event", async () => {
      await VotingInstance.endProposalsRegistering({from: owner});
      await VotingInstance.startVotingSession({from: owner});

      const calledFunction = await VotingInstance.setVote(new BN(0), {from: voter1});
      expectEvent(calledFunction, "Voted", {voter: voter1, proposalId: new BN(0)});
    });
  });


  describe("Tests des setters", () => {

  });


  describe("Tests des getters", () => {

  });


  describe("Tests des WorkflowStatus", () => {

  });


  describe("Tests du dépouillage", () => {

  });
});
