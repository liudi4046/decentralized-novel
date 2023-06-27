import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  console.log("account 0", accounts[0]);
  const NovelManagement = await ethers.getContractFactory("NovelManagement");
  const novelManagement = await NovelManagement.deploy();
  const NFTContract = await ethers.getContractFactory(
    "DecentralizedNovelChapter"
  );
  const nftContract = await NFTContract.deploy(novelManagement.getAddress());
  const VoteToken = await ethers.getContractFactory(
    "DecentralizedNovelVoteToken"
  );
  const voteToken = await VoteToken.deploy(1000, novelManagement.getAddress());

  //set nft contract address and token contract address in novelmanagement
  novelManagement.setNFTAddress(await nftContract.getAddress());
  novelManagement.setVoteTokenAddress(await voteToken.getAddress());

  console.log("NovelManagement address:", await novelManagement.getAddress());
  console.log("NFTContract address", await nftContract.getAddress());
  console.log("VoteToken address", await voteToken.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
