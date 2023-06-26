async function main() {
  const hre = require("hardhat");

  const accounts = await hre.ethers.getSigners();
  console.log("account 0", accounts[0]);
  const NovelManagement = await hre.ethers.getContractFactory(
    "NovelManagement"
  );
  const novelManagement = await NovelManagement.deploy();
  const NFTContract = await hre.ethers.getContractFactory(
    "DecentralizedNovelChapter"
  );
  const nftContract = await NFTContract.deploy(novelManagement.address);
  const VoteToken = await hre.ethers.getContractFactory(
    "DecentralizedNovelVoteToken"
  );
  const voteToken = await VoteToken.deploy(1000, novelManagement.address);
  console.log("NovelManagement address:", novelManagement.address);
  console.log("NFTContract address", nftContract.address);
  console.log("VoteToken address", voteToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
