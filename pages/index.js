import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [address, setAddress] = useState("");

    const contractAddress = "DEPLOYED_CONTRACT_ADDRESS";
    const abi = [
        "function createProposal(string description) public",
        "function vote(uint proposalId) public",
        "function proposals(uint) public view returns (uint, string, uint, bool)",
    ];

    useEffect(() => {
        const initBlockchain = async () => {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = _provider.getSigner();
            const _contract = new ethers.Contract(contractAddress, abi, _signer);

            setProvider(_provider);
            setSigner(_signer);
            setContract(_contract);

            const userAddress = await _signer.getAddress();
            setAddress(userAddress);
        };

        if (typeof window.ethereum !== "undefined") {
            initBlockchain();
        } else {
            alert("MetaMask is not installed!");
        }
    }, []);

    const createProposal = async () => {
        const description = prompt("Enter proposal description:");
        await contract.createProposal(description);
        alert("Proposal created!");
    };

    const voteOnProposal = async () => {
        const proposalId = prompt("Enter proposal ID to vote:");
        await contract.vote(proposalId);
        alert("Voted successfully!");
    };

    return (
        <div>
            <h1>Smart City Platform</h1>
            <p>Connected Address: {address}</p>

            <button onClick={createProposal}>Create Proposal</button>
            <button onClick={voteOnProposal}>Vote</button>
        </div>
    );
}
