import { expect } from "chai";
import { ethers } from "hardhat";

import {
  DecentralizedNovelChapter,
  DecentralizedNovelChapter__factory,
  DecentralizedNovelVoteToken,
  DecentralizedNovelVoteToken__factory,
  NovelManagement,
  NovelManagement__factory,
} from "../typechain";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("NovelManagement", function () {
  let VoteToken: DecentralizedNovelVoteToken__factory,
    voteToken: DecentralizedNovelVoteToken;
  let NovelManagement: NovelManagement__factory,
    novelManagement: NovelManagement;
  let NFTContract: DecentralizedNovelChapter__factory,
    nftContract: DecentralizedNovelChapter;
  let accounts: HardhatEthersSigner[],
    submitter1: HardhatEthersSigner,
    voter1: HardhatEthersSigner,
    submitter2: HardhatEthersSigner,
    voter2: HardhatEthersSigner,
    submitter3: HardhatEthersSigner,
    voter3: HardhatEthersSigner;
  beforeEach(async () => {
    VoteToken = await ethers.getContractFactory("DecentralizedNovelVoteToken");
    voteToken = await VoteToken.deploy(1000);

    NovelManagement = await ethers.getContractFactory("NovelManagement");
    novelManagement = await NovelManagement.deploy(
      await voteToken.getAddress()
    );
    NFTContract = await ethers.getContractFactory("DecentralizedNovelChapter");
    nftContract = await NFTContract.deploy(await novelManagement.getAddress());

    accounts = await ethers.getSigners();
    //submitter === deployer(all contracts)
    submitter1 = accounts[0]; //deployer of three contracts
    voter1 = accounts[1];
    submitter2 = accounts[2];
    voter2 = accounts[3];
    submitter3 = accounts[4];
    voter3 = accounts[5];
  });

  it("should set nft contract address correctly", async () => {
    await novelManagement.setNFTAddress(await nftContract.getAddress());
    const deployedNFTContract =
      await novelManagement.decentralizedNovelChapter();
    expect(deployedNFTContract).to.equal(await nftContract.getAddress());
  });
  async function addThreeSubmits() {
    await novelManagement.connect(submitter1).submit("submit 1");
    await novelManagement.connect(submitter2).submit("submit 2");
    await novelManagement.connect(submitter3).submit("submit 3");
  }
  async function transferTokenToVoters() {
    await voteToken.connect(submitter1).transfer(voter1.address, 10);
    await voteToken.connect(submitter1).transfer(voter2.address, 10);
    await voteToken.connect(submitter1).transfer(voter3.address, 10);
  }

  it("Should submit correctly", async function () {
    // Submit new chapters
    await addThreeSubmits();

    // Check that the new chapter is there

    for (let i = 0; i <= 2; i++) {
      console.log("i:", i);
      const submission = await novelManagement.getSubmission(i);
      expect(submission.content).to.equal(`submit ${i + 1}`);
      expect(submission.accepted).to.equal(false);
      expect(submission.yesVotes).to.equal(0);
    }
  });
  it("Should transfer erc20 token properly", async () => {
    await transferTokenToVoters();
    expect(await voteToken.connect(voter1).balanceOf(voter1.address)).to.equal(
      10
    );
    expect(
      await voteToken.connect(submitter1).balanceOf(voter2.address)
    ).to.equal(10);
    expect(
      await voteToken.connect(submitter1).balanceOf(voter3.address)
    ).to.equal(10);
  });
  it("Should first-time vote correctly", async () => {
    await transferTokenToVoters();
    await novelManagement.connect(voter2).vote(1);
    await novelManagement.connect(voter3).vote(1);
    await novelManagement.connect(voter1).vote(1);
    expect((await novelManagement.getSubmission(1)).yesVotes).to.equal(3);
  });
  it("should reward submitter when chapter get passed", async () => {
    await transferTokenToVoters();
    await novelManagement.connect(submitter1).vote(0);
  });
});

describe("NFT Contract", () => {
  it("should ");
});
