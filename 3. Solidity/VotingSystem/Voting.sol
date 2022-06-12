// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

  // == Variables ==
  struct Voter {
    bool isRegistered;
    bool hasVoted;
    uint votedProposalId;
  }
  struct Proposal {
    string description;
    uint voteCount;
  }
  enum WorkflowStatus {
    RegisteringVoters,
    ProposalsRegistrationStarted,
    ProposalsRegistrationEnded,
    VotingSessionStarted,
    VotingSessionEnded,
    VotesTallied
  }
  // La valeur par défaut sera le premier élément de l'énumération => workflowStatus = WorkflowStatus.RegisteringVoters
  // public pour avoir un getter automatiquement : pratique pour voir sur quelle phase on se trouve
  WorkflowStatus public workflowStatus;
  mapping(address=>Voter) whitelist;
  Proposal[] proposals;
  uint winnigProposalId;

  // == Events ==
  event VoterRegistered(address voterAddress); 
  event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
  event ProposalRegistered(uint proposalId);
  event Voted (address voter, uint proposalId);

  // == Modifiers ==
  modifier onlyValidAddress(address _addr) {
    require(
      _addr != address(0),
      "Il faut renseigner une adresse valide"
    );
    _;
  }
  modifier onlyRegisteringVoters() {
    require(
      workflowStatus == WorkflowStatus.RegisteringVoters,
      unicode"Il faut être en phase d'enregistrement d'électeurs"
    );
    _;
  }
  modifier onlyVoter() {
    // Dans notre mapping whitelist, toutes les adresses existent par defaut.
    // On s'assure donc que la personne qui call la function ait bien été enregistré dans la whitelist par l'amdin
    require(
        whitelist[msg.sender].isRegistered == true,
        unicode"Vous n'êtes pas sur la liste des électeurs"
    );
    _;
  }
  modifier onlyProposalsRegistrationStarted() {
    require(
        workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
        unicode"Il faut être en phase d'enregistrement de propositions"
    );
    _;
  }
  modifier onlyValidString(string calldata _string) {
    // Pour comparer des strings entre elles on doit les hasher puis comparer leur hash
    require(
      keccak256(abi.encode(_string)) != keccak256(abi.encode("")),
      "Veuillez entrer une phrase correcte"
    );
    _;
  }

  // == Constructor

  // == Functions ==
  // === Admin functions ===
  function changeWorkflowStatus(uint _id)
    external
    onlyOwner
  {
    require(_id < 6, "Il faut renseigner un ID correct");
    emit WorkflowStatusChange(workflowStatus, WorkflowStatus(_id));
    workflowStatus = WorkflowStatus(_id);
  }

  function addVoter(address _addr)
    external
    onlyOwner
    onlyRegisteringVoters
    onlyValidAddress(_addr)
    returns (Voter memory)
  {
    whitelist[_addr] = Voter(true, false, 0);
    emit VoterRegistered(_addr);
    return whitelist[_addr];
  }

  // === Proposals functions ===
  function addProposal(string calldata _description)
    external
    onlyVoter
    onlyProposalsRegistrationStarted
    onlyValidString(_description)
  {
    proposals.push(Proposal(_description, 0));
    emit ProposalRegistered(proposals.length-1);
  }
}