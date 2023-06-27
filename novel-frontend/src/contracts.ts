import { ethers } from "ethers";
import NovelManagement from "./abi/NovelManagement.json";
import VoteToken from "./abi/DecentralizedNovelVoteToken.json";
import NFTContractABI from "./abi/DecentralizedNovelChapter.json";
import { NovelManagement as NovelManagementType } from "../../typechain";
import { DecentralizedNovelChapter } from "../../typechain";
import { DecentralizedNovelVoteToken } from "../../typechain";

export const Provider = new ethers.BrowserProvider(window.ethereum);
const novelManagementContractAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const novelManagementABI = NovelManagement;
export const novelManagementContract = new ethers.Contract(
  novelManagementContractAddress,
  novelManagementABI,
  Provider
) as unknown as NovelManagementType;

const voteTokenContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const voteTokenABI = VoteToken;
export const voteTokenContract = new ethers.Contract(
  voteTokenContractAddress,
  voteTokenABI,
  Provider
) as unknown as DecentralizedNovelVoteToken;

const NFTContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const nftContract = new ethers.Contract(
  NFTContractAddress,
  NFTContractABI,
  Provider
) as unknown as DecentralizedNovelChapter;
