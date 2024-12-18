import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

export default function Home() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; 
    const abi = [
        "function createProposal(string description) public",
        "function vote(uint proposalId) public",
        "function proposals(uint) public view returns (uint, string, uint, bool)",
    ];

    useEffect(() => {
        const initBlockchain = async () => {
            try {
                if (typeof window.ethereum === "undefined") {
                    setError("MetaMask is not installed. Please install MetaMask to use this app.");
                    setLoading(false);
                    return;
                }

                
                await window.ethereum.request({ method: "eth_requestAccounts" });
   
                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                const _signer = _provider.getSigner();

                const _contract = new ethers.Contract(contractAddress, abi, _signer);

                const userAddress = await _signer.getAddress();

                setProvider(_provider);
                setSigner(_signer);
                setContract(_contract);
                setAddress(userAddress);
            } catch (err) {
                console.error("Error initializing blockchain:", err);
                setError("Failed to connect to MetaMask. Please ensure MetaMask is unlocked and you are on the correct network.");
            } finally {
                setLoading(false);
            }
        };

        initBlockchain();
    }, []);

    const createProposal = async () => {
        try {
            if (!contract) {
                alert("Contract is not initialized.");
                return;
            }
            const description = prompt("Enter the proposal description:");
            if (!description) return;

            const tx = await contract.createProposal(description);
            await tx.wait(); 
            alert("Proposal created successfully!");
        } catch (err) {
            console.error("Error creating proposal:", err);
            alert("Failed to create proposal. Please check the console for details.");
        }
    };

    const voteOnProposal = async () => {
        try {
            if (!contract) {
                alert("Contract is not initialized.");
                return;
            }
            const proposalId = prompt("Enter the proposal ID to vote:");
            if (!proposalId) return;

            const tx = await contract.vote(proposalId);
            await tx.wait(); 
            alert("Vote submitted successfully!");
        } catch (err) {
            console.error("Error voting on proposal:", err);
            alert("Failed to submit vote. Please check the console for details.");
        }
    };

    if (loading) {
        return <p className="loading">Connecting to the blockchain...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="container">
            <h1 className="title">Smart City Platform</h1>
            <p className="address">Connected Address: {address || "Not connected"}</p>
            <div className="button-group">
                <button className="btn create" onClick={createProposal} disabled={!contract}>
                    Create Proposal
                </button>
                <button className="btn vote" onClick={voteOnProposal} disabled={!contract}>
                    Vote
                </button>
            </div>
        </div>
    );
}
