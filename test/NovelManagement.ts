// import { expect } from "chai";
// import { ethers } from "hardhat";

// import {
//   DecentralizedNovelChapter,
//   DecentralizedNovelChapter__factory,
//   DecentralizedNovelVoteToken,
//   DecentralizedNovelVoteToken__factory,
//   NovelManagement,
//   NovelManagement__factory,
// } from "../typechain";
// import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

// // describe("NovelManagement", function () {
// //   let VoteToken: DecentralizedNovelVoteToken__factory,
// //     voteToken: DecentralizedNovelVoteToken;
// //   let NovelManagement: NovelManagement__factory,
// //     novelManagement: NovelManagement;
// //   let NFTContract: DecentralizedNovelChapter__factory,
// //     nftContract: DecentralizedNovelChapter;
// //   let accounts: HardhatEthersSigner[],
// //     submitter1: HardhatEthersSigner,
// //     voter1: HardhatEthersSigner,
// //     submitter2: HardhatEthersSigner,
// //     voter2: HardhatEthersSigner,
// //     submitter3: HardhatEthersSigner,
// //     voter3: HardhatEthersSigner;
// //   beforeEach(async () => {
// //     VoteToken = await ethers.getContractFactory("DecentralizedNovelVoteToken");
// //     voteToken = await VoteToken.deploy(1000);

// //     NovelManagement = await ethers.getContractFactory("NovelManagement");
// //     novelManagement = await NovelManagement.deploy(
// //       await voteToken.getAddress()
// //     );
// //     NFTContract = await ethers.getContractFactory("DecentralizedNovelChapter");
// //     nftContract = await NFTContract.deploy(await novelManagement.getAddress());

// //   it("should set nft contract address correctly", async () => {
// //     await novelManagement.setNFTAddress(await nftContract.getAddress());
// //     const deployedNFTContract =
// //       await novelManagement.decentralizedNovelChapter();
// //     expect(deployedNFTContract).to.equal(await nftContract.getAddress());
// //   });
// //   async function addThreeSubmits() {
// //     await novelManagement.connect(submitter1).submit("submit 1");
// //     await novelManagement.connect(submitter2).submit("submit 2");
// //     await novelManagement.connect(submitter3).submit("submit 3");
// //   }
// //   async function transferTokenToVoters() {
// //     await voteToken.connect(submitter1).transfer(voter1.address, 10);
// //     await voteToken.connect(submitter1).transfer(voter2.address, 10);
// //     await voteToken.connect(submitter1).transfer(voter3.address, 10);
// //   }

// //   it("Should submit correctly", async function () {
// //     // Submit new chapters
// //     await addThreeSubmits();

// //     // Check that the new chapter is there

// //     for (let i = 0; i <= 2; i++) {
// //       console.log("i:", i);
// //       const submission = await novelManagement.getSubmission(i);
// //       expect(submission.content).to.equal(`submit ${i + 1}`);
// //       expect(submission.accepted).to.equal(false);
// //       expect(submission.yesVotes).to.equal(0);
// //     }
// //   });
// //   it("Should transfer erc20 token properly", async () => {
// //     await transferTokenToVoters();
// //     expect(await voteToken.connect(voter1).balanceOf(voter1.address)).to.equal(
// //       10
// //     );
// //     expect(
// //       await voteToken.connect(submitter1).balanceOf(voter2.address)
// //     ).to.equal(10);
// //     expect(
// //       await voteToken.connect(submitter1).balanceOf(voter3.address)
// //     ).to.equal(10);
// //   });
// //   it("Should first-time vote correctly", async () => {
// //     await transferTokenToVoters();
// //     await novelManagement.connect(voter2).vote(1);
// //     await novelManagement.connect(voter3).vote(1);
// //     await novelManagement.connect(voter1).vote(1);
// //     expect((await novelManagement.getSubmission(1)).yesVotes).to.equal(3);
// //   });
// //   it("should reward submitter when chapter get passed", async () => {
// //     await transferTokenToVoters();
// //     await novelManagement.connect(submitter1).vote(0);
// //   });
// // });
// //get
// let novelManagementAddress: string;
// let VoteToken: DecentralizedNovelVoteToken__factory,
//   voteToken: DecentralizedNovelVoteToken;
// let NovelManagement: NovelManagement__factory, novelManagement: NovelManagement;
// let NFTContract: DecentralizedNovelChapter__factory,
//   nftContract: DecentralizedNovelChapter;
// let accounts: HardhatEthersSigner[],
//   submitter1: HardhatEthersSigner,
//   voter1: HardhatEthersSigner,
//   submitter2: HardhatEthersSigner,
//   voter2: HardhatEthersSigner,
//   submitter3: HardhatEthersSigner,
//   voter3: HardhatEthersSigner;

// describe("Deployment of the three contracts", () => {
//   it("should deploy the NovelManagement first correctly", async () => {
//     NovelManagement = await ethers.getContractFactory("NovelManagement");
//     novelManagement = await NovelManagement.deploy();
//     novelManagementAddress = await novelManagement.getAddress();
//     expect(novelManagementAddress).to.be.ok;
//   });
//   it("should then deploy the NFT contract correctly", async () => {
//     NFTContract = await ethers.getContractFactory("DecentralizedNovelChapter");
//     nftContract = await NFTContract.deploy(await novelManagement.getAddress());
//     const nftAddress = await nftContract.getAddress();
//     expect(nftAddress).to.be.ok;
//     expect(await nftContract.novelManagementAddress()).to.equal(
//       novelManagementAddress
//     );
//   });
//   it("should then deploy the token contract correctly", async () => {
//     VoteToken = await ethers.getContractFactory("DecentralizedNovelVoteToken");
//     voteToken = await VoteToken.deploy(1000, novelManagementAddress);
//     expect(await voteToken.getAddress()).to.be.ok;
//     expect(await voteToken.novelManagementAddress()).to.equal(
//       novelManagementAddress
//     );
//   });
//   it("the novelmanagement contract should only set nft address and token address once", async () => {
//     await novelManagement.setNFTAddress(await nftContract.getAddress());
//     await novelManagement.setVoteTokenAddress(await voteToken.getAddress());
//     expect(await novelManagement.isNFTAddressSet()).to.equal(true);
//     expect(await novelManagement.isVoteTokenAddressSet()).to.equal(true);
//   });
// });
// describe("Submission", () => {
//   before(async () => {
//     await setSubmittersAndVoters();
//   });
//   it("anyone should be able to submit chapter", async () => {
//     for (let i = 0; i <= 2; i++) {
//       let submitter;
//       if (i === 0) {
//         submitter = submitter1;
//       } else if (i === 1) {
//         submitter = submitter2;
//       } else {
//         submitter = submitter3;
//       }
//       await novelManagement
//         .connect(submitter)
//         .submit(`submit content ${i + 1}`);
//       expect((await novelManagement.submissions(i)).content).to.equal(
//         `submit content ${i + 1}`
//       );
//       expect((await novelManagement.submissions(i)).author).to.equal(
//         submitter.address
//       );
//       expect((await novelManagement.submissions(i)).yesVotes).to.equal(0);
//       expect((await novelManagement.submissions(i)).accepted).to.equal(false);
//       expect((await novelManagement.submissions(i)).targetChapterId).to.equal(
//         novelManagement.acceptedSubmissions.length
//       );
//     }
//   });
// });

// describe("Vote", () => {
//   it("should not be able to vote without having enough token", async () => {
//     await expect(novelManagement.connect(voter1).vote(1)).to.be.revertedWith(
//       "You must own enough voting token to vote."
//     );
//   });

//   it("should able to vote the submissions targeting the latest chapter", async () => {
//     await voteToken.connect(submitter1).transfer(voter1.address, 60);
//     await novelManagement.connect(voter1).vote(1);
//     expect((await novelManagement.submissions(1)).yesVotes).to.equal(1);
//     expect(await novelManagement.hasVoted(1, voter1.address)).to.equal(true);
//   });
//   it("submission should be accepted once vote number is enough", async () => {
//     await voteToken.connect(submitter1).transfer(voter2.address, 60);

//     await voteToken.connect(submitter1).transfer(voter3.address, 60);

//     await novelManagement.connect(voter2).vote(1);
//     await novelManagement.connect(voter3).vote(1);

//     expect((await novelManagement.acceptedSubmissions(0)).content).to.equal(
//       "submit content 2"
//     );
//   });
//   it("submitter should be rewarded vote token and nft once the submission get accepted", async () => {
//     expect(await voteToken.balanceOf(submitter2.address)).to.equal(100);
//     expect(await nftContract.balanceOf(submitter2.address)).to.equal(1);
//   });
//   //submit 3 times by submitter1,submitter2 and submitter3. vote 3 times to submission 2 (index 1 in submissions array), by
//   // voter1 voter2 voter3. and the token balance of submitter2 is 100 and voter1 , voter 2 voter3 has 60 token balance.
//   it("voter should be rewarded with vote token once they voted", async () => {
//     expect(await voteToken.balanceOf(voter1.address)).to.equal(70);
//   });
// });

// const setSubmittersAndVoters = async () => {
//   accounts = await ethers.getSigners();
//   submitter1 = accounts[0]; //deployer of three contracts
//   voter1 = accounts[1];
//   submitter2 = accounts[2];
//   voter2 = accounts[3];
//   submitter3 = accounts[4];
//   voter3 = accounts[5];
// };
