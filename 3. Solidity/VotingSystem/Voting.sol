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
    // Nb de Voters enregistrés
    uint nbWhitelisted;
    // Nb de Voters enregistrés qui ont votés. (On part du principe que certains électeurs enregistrés ne vont pas voter)
    uint nbVoters;
    Proposal[] proposals;
    uint winnigProposalId;

    // == Events ==
    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);

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
    modifier onlyVotingSessionStarted() {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            unicode"Il faut être en phase de vote"
        );
        _;
    }
    modifier onlyNotVotedYet() {
        require(
        whitelist[address(msg.sender)].hasVoted == false,
        unicode"Vous avez déjà voté !"
        );
        _;
    }
    modifier onlyValidProposalId(uint _id) {
        require(
        _id < proposals.length,
        "Veuillez renseigner un id de proposition valide"
        );
        _;
    }
    modifier onlyNotAlreadyWhitelisted(address _addr) {
        require(
        whitelist[_addr].isRegistered == false,
        unicode"L'électeur est déjà présent dans la whitelist"
        );
        _;
    }
    modifier onlyWhitelisted(address _addr) {
        require(
        whitelist[_addr].isRegistered == true,
        unicode"L'électeur n'est pas dans la liste blanche"
        );
        _;
    }
    modifier onlyVotingSessionEnded() {
        require(
        uint(workflowStatus) >= uint(WorkflowStatus.VotingSessionEnded) && uint(workflowStatus) <= uint(WorkflowStatus.VotesTallied),
        unicode"Il faut attendre la fin de la phase de vote"
        );
        _;
    }

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
        onlyNotAlreadyWhitelisted(_addr)
        returns (Voter memory)
    {
        whitelist[_addr] = Voter(true, false, 0);
        nbWhitelisted++;
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

    function getProposal(uint _id)
        external
        view
        onlyValidProposalId(_id)
        returns (Proposal memory)
    {
        return proposals[_id];
    }

    // === Voters & Voting functions ===
    function getVoter(address _addr)
        external
        view
        onlyWhitelisted(_addr)
        returns (Voter memory)
    {
        return whitelist[_addr];
    }

    function vote(uint _idProposal)
        external
        onlyVoter
        onlyVotingSessionStarted
        onlyNotVotedYet
        onlyValidProposalId(_idProposal)
    {
        proposals[_idProposal].voteCount++;
        whitelist[address(msg.sender)].votedProposalId = _idProposal;
        whitelist[address(msg.sender)].hasVoted = true;
        nbVoters++;
        emit Voted(address(msg.sender), _idProposal);
    }

    function getVoteOfVoter(address _addr) 
        external
        view
        returns (Proposal memory)
    {
        // On s'assure d'être dans l'une des phases qui permet de checker les votes
        // Le vote n'étant pas secret, je pars du principe que dès le début de la phase de vote les électeurs peuvent checker les votes des autres
        require(
        uint(workflowStatus) >= uint(WorkflowStatus.VotingSessionStarted) && uint(workflowStatus) <= uint(WorkflowStatus.VotesTallied),
        unicode"Vous ne pouvez pas encore voir le vote de cet électeur"
        );
        // On s'assure que l'électeur a bien voté
        require(
        whitelist[_addr].isRegistered == true && whitelist[_addr].hasVoted == true,
        unicode"L'électeur en question n'a pas voté" 
        );
        return proposals[whitelist[_addr].votedProposalId];
    }

    // === Tallied functions ===
    function determineWinner()
        private
    {
        uint winningVoteCount = 0;
        for (uint id = 0; id < proposals.length; id++) {
            if (proposals[id].voteCount > winningVoteCount) {
                winningVoteCount = proposals[id].voteCount;
                winnigProposalId = id;
            }
        }
    }

    function getWinner()
        external
        onlyVotingSessionEnded
        returns (Proposal memory)
    {
        determineWinner();
        return proposals[winnigProposalId];
    }

    function getVotingPercent()
      external
      view
      returns (uint)
    {
      // nbVoters*100/nbWhitelisted permet d'avoir le pourcentage de vote
      // Soucis de division à virgule impossible en Solidity :
      // On utilise un multiplicateur (dans notre cas : 100) pour rester précis sur notre pourcentage
      // Sur notre FrontEnd, il faudra diviser d'autant pour retrouver le bon taux
      return (nbVoters*100/nbWhitelisted)*100;
    }

    function getAbsenteeismPercent()
      external
      view
      returns (uint)
    {
      return ((nbWhitelisted - nbVoters)*100/nbWhitelisted)*100;
    }
}