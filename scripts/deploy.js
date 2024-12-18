const hre = require("hardhat");

async function main() {
    try {

        const SmartCity = await hre.ethers.getContractFactory("SmartCity");

        console.log("Deploying SmartCity contract...");
      
        const smartCity = await SmartCity.deploy();

        
        await smartCity.deployed();

        console.log("SmartCity deployed successfully to:", smartCity.address);
    } catch (error) {
        console.error("Error deploying the SmartCity contract:", error);
        process.exitCode = 1;
    }
}


main().then(() => {
    console.log("Deployment script completed.");
}).catch((error) => {
    console.error("Unhandled error in script:", error);
    process.exitCode = 1;
});
