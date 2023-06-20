import { expect } from "chai";
import { ethers } from "hardhat";
import "./DecentralizedNovelVoteToken.sol";
import "./DecentralizedNovelChapter.sol";
describe("NovelManagement", function () {
  it("Should submit and vote correctly", async function () {
    const VoteToken = await ethers.getContractFactory(
      "DecentralizedNovelVoteToken"
    );
    const voteToken = await VoteToken.deploy(1000);
    console.log("voteToken", voteToken);
    const NovelManagement = await ethers.getContractFactory("NovelManagement");
    const novelManagement = await NovelManagement.deploy(voteToken.address);
    const NFTContract = await ethers.getContractFactory(
      "DecentralizedNovelChapter"
    );
    const nftContract = await NFTContract.deploy(novelManagement.address);

    const accounts = await ethers.getSigners();
    const submitter = accounts[0];
    const voter = accounts[1];

    // Submit a new chapter
    await novelManagement.connect(submitter).submit("This is a new chapter");

    // Check that the new chapter is there
    const submission = await novelManagement.getSubmission(0);
    expect(submission.content).to.equal("This is a new chapter");
    expect(submission.accepted).to.equal(false);
    expect(submission.yesVotes).to.equal(0);

    // Transfer some voting tokens to the voter
    await voteToken.transfer(voter.address, 100);

    // Vote on the new chapter
    await novelManagement.connect(voter).vote(0, true);

    // Check that the vote was counted
    const updatedSubmission = await novelManagement.getSubmission(0);
    expect(updatedSubmission.yesVotes).to.equal(1);
  });
});
