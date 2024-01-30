import { ethers } from "hardhat";
import { expect } from "chai";
import {
  DecentralizedNovelChapter,
  DecentralizedNovelChapter__factory,
  DecentralizedNovelVoteToken__factory,
  NovelManagement,
  NovelManagement__factory,
} from "../typechain";

// import { DecentralizedNovelVoteToken } from "../typechain-types";
import { DecentralizedNovelVoteToken } from "../typechain";

import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("test", () => {

  let ini_supply = 1000;
  let signer001Token: any;
  let signer002Token: any;
  let novelManagementAddress: string;
  let VoteToken: DecentralizedNovelVoteToken__factory,
    voteToken: DecentralizedNovelVoteToken;
  let NovelManagement: NovelManagement__factory,
    novelManagement: NovelManagement;
  let NFTContract: DecentralizedNovelChapter__factory,
    nftContract: DecentralizedNovelChapter;
  let signers: HardhatEthersSigner[];

  before(async () => {
    //每个it开始前，部署三个合约，并且得到signers
    NovelManagement = await ethers.getContractFactory("NovelManagement");
    novelManagement = await NovelManagement.deploy();
    // 在这里输出NovelManagement合约的地址
    novelManagementAddress = await novelManagement.getAddress();
    console.log("NovelManagement Address:", novelManagementAddress);


    VoteToken = await ethers.getContractFactory("DecentralizedNovelVoteToken");
    voteToken = await VoteToken.deploy(
      ini_supply, // 开始的供应量
      await novelManagement.getAddress()
    );
    console.log("voteToken Address:", await voteToken.getAddress());

    NFTContract = await ethers.getContractFactory("DecentralizedNovelChapter");
    nftContract = await NFTContract.deploy(
      await novelManagement.getAddress()
    );
    console.log("nftContract Address:", await nftContract.getAddress());

    signers = await ethers.getSigners();
  });





  

  it("deployment vote contract should reward token to deployer", async () => {
    const signerAddress = signers[0].address;
    console.log("signer001Address:", signerAddress);
    signer001Token = await voteToken.balanceOf(signerAddress)
    console.log("signer001Token:", signer001Token);
    expect(signer001Token).to.equal(ini_supply);
  });



  it("anyone can submit a new chapter", async () => {
    await novelManagement
      .connect(signers[1])
      .submit("this is a content submitted by signers[1]");
    console.log("signer002Address:", signers[1].address);
    expect((await novelManagement.submissions(0)).content).to.equal(
      "this is a content submitted by signers[1]"
    );
  });



  it("once a user has token, he should be able to vote", async () => {
    //set nft contract address and token contract address in novelmanagement
    await novelManagement.setNFTAddress(await nftContract.getAddress());
    await novelManagement.setVoteTokenAddress(await voteToken.getAddress());

    //someone submit a new chapter first
    await novelManagement
      .connect(signers[1])
      .submit("this is a content submitted by signers[1]");

    signer001Token = await voteToken.balanceOf(signers[0].address)
    console.log("signer001Token:", signer001Token);
    signer002Token = await voteToken.balanceOf(signers[1].address)
    console.log("signer002Token:", signer002Token);

    //signers[0] can vote cause he has token
    // User (signers[0]) approves the NovelManagement contract to spend their tokens
    await voteToken.connect(signers[0]).approve(await novelManagement.getAddress(), 50);
    // Now signers[0] can vote, as the NovelManagement contract has been given allowance to spend tokens on their behalf
    await novelManagement.connect(signers[0]).vote(0);

    expect((await novelManagement.submissions(0)).yesVotes).to.equal(1);
    expect(await novelManagement.hasVoted(0, signers[0].address)).to.equal(
      true
    );
  });
});
