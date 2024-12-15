// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartCity {
    mapping(address => uint256) public balances;

    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        bool executed;
    }

    Proposal[] public proposals;

    mapping(uint => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint id, string description);
    event Voted(uint proposalId, address voter);

    function mintGovernanceToken(address citizen, uint256 amount) public {
        balances[citizen] += amount;
    }

    function createProposal(string memory description) public {
        proposals.push(Proposal(proposals.length, description, 0, false));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint proposalId) public {
        require(balances[msg.sender] > 0, "You need governance tokens to vote.");
        require(!hasVoted[proposalId][msg.sender], "You have already voted on this proposal.");

        proposals[proposalId].voteCount += balances[msg.sender];
        hasVoted[proposalId][msg.sender] = true;
        emit Voted(proposalId, msg.sender);
    }
}
