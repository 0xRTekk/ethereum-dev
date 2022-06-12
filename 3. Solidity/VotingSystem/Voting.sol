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
}