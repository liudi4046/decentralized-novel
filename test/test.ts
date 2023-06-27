import { ethers } from "hardhat";
import { expect } from "chai";
import {
  DecentralizedNovelChapter,
  DecentralizedNovelChapter__factory,
  DecentralizedNovelVoteToken__factory,
  NovelManagement,
  NovelManagement__factory,
} from "../typechain";
import { DecentralizedNovelVoteToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("test", () => {
  let novelManagementAddress: string;
  let VoteToken: DecentralizedNovelVoteToken__factory,
    voteToken: DecentralizedNovelVoteToken;
  let NovelManagement: NovelManagement__factory,
    novelManagement: NovelManagement;
  let NFTContract: DecentralizedNovelChapter__factory,
    nftContract: DecentralizedNovelChapter;
  let signers: HardhatEthersSigner[];
  beforeEach(async () => {
    //每个it开始前，部署三个合约，并且得到signers
    NovelManagement = await ethers.getContractFactory("NovelManagement");
    novelManagement = await NovelManagement.deploy();

    VoteToken = await ethers.getContractFactory("DecentralizedNovelVoteToken");
    voteToken = await VoteToken.deploy(
      1000,
      await novelManagement.getAddress()
    );
    NFTContract = await ethers.getContractFactory("DecentralizedNovelChapter");
    nftContract = await NFTContract.deploy(await novelManagement.getAddress());
    signers = await ethers.getSigners();
  });
  it("deployment vote contract should reward token to deployer", async () => {
    const signerAddress = signers[0].address;
    expect(await voteToken.balanceOf(signerAddress)).to.equal(1000);
  });
  it("anyone can submit a new chapter", async () => {
    await novelManagement
      .connect(signers[1])
      .submit("this is a content submitted by signers[1]");
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

    //signers[0] can vote cause he has token
    await novelManagement.connect(signers[0]).vote(0);
    expect((await novelManagement.submissions(0)).yesVotes).to.equal(1);
    expect(await novelManagement.hasVoted(0, signers[0].address)).to.equal(
      true
    );
  });
});
