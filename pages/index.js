import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const abi = [
    "function createProposal(string description) public",
    "function vote(uint proposalId) public",
    "function proposals(uint) public view returns (uint, string, uint, bool)",
  ];

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const _provider = new ethers.providers.Web3Provider(window.ethereum);
          const _signer = _provider.getSigner();
          const _contract = new ethers.Contract(contractAddress, abi, _signer);

          const userAddress = await _signer.getAddress();
          setProvider(_provider);
          setSigner(_signer);
          setContract(_contract);
          setAddress(userAddress);
        } else {
          alert("MetaMask is not installed! Please install it.");
        }
      } catch (error) {
        console.error("Error initializing blockchain:", error);
        alert("Failed to connect to MetaMask. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initBlockchain();
  }, []);

  const createProposal = async () => {
    try {
      if (!contract) {
        alert("Contract not initialized.");
        return;
      }
      const description = prompt("Enter proposal description:");
      if (!description) return;

      const tx = await contract.createProposal(description);
      await tx.wait();
      alert("Proposal created successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Failed to create proposal.");
    }
  };

  const voteOnProposal = async () => {
    try {
      if (!contract) {
        alert("Contract not initialized.");
        return;
      }
      const proposalId = prompt("Enter proposal ID to vote:");
      if (!proposalId) return;

      const tx = await contract.vote(proposalId);
      await tx.wait();
      alert("Vote submitted successfully!");
    } catch (error) {
      console.error("Error voting on proposal:", error);
      alert("Failed to vote.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-blue-600">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl font-bold"
        >
          Loading...
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
        >
          Smart City Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-lg text-gray-300"
        >
          Connected Address:{" "}
          <span className="text-green-400 font-semibold">
            {address || "Not connected"}
          </span>
        </motion.p>

        <div className="mt-8 space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={createProposal}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold shadow-lg transition-all"
          >
            Create Proposal
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={voteOnProposal}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-lg transition-all"
          >
            Vote
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-16"
      >
        <div className="border-t border-gray-700"></div>
        <p className="mt-6 text-gray-400 text-center">
          Powered by <span className="text-yellow-400">Ethereum Blockchain</span>
        </p>
      </motion.div>
    </div>
  );
}
