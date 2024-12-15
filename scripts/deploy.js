const hre = require("hardhat");

async function main() {
    const SmartCity = await hre.ethers.getContractFactory("SmartCity");
    const smartCity = await SmartCity.deploy();

    await smartCity.deployed();

    console.log("SmartCity deployed to:", smartCity.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
