import { ethers } from "ethers";
import NovelManagement from "./abi/NovelManagement.json";
import VoteToken from "./abi/DecentralizedNovelVoteToken.json";
import NFTContractABI from "./abi/DecentralizedNovelChapter.json";
import { NovelManagement as NovelManagementType } from "../typechain";
import { DecentralizedNovelChapter } from "../typechain";
import { DecentralizedNovelVoteToken } from "../typechain";

export const Provider = new ethers.BrowserProvider(window.ethereum);
const novelManagementContractAddress =
  "0x98ce973C84FF9cbf6987e0C3225954F70eC04332";
const novelManagementABI = NovelManagement;
export const novelManagementContract = new ethers.Contract(
  novelManagementContractAddress,
  novelManagementABI,
  Provider
) as unknown as NovelManagementType;

const voteTokenContractAddress = "0xc1836e805D2d6F8eCcBe07cbb356d3336C9AEb61";
const voteTokenABI = VoteToken;
export const voteTokenContract = new ethers.Contract(
  voteTokenContractAddress,
  voteTokenABI,
  Provider
) as unknown as DecentralizedNovelVoteToken;

const NFTContractAddress = "0xc64f5324507C9A1c0d2735062aC4137994d5E410";
export const nftContract = new ethers.Contract(
  NFTContractAddress,
  NFTContractABI,
  Provider
) as unknown as DecentralizedNovelChapter;
