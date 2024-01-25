import { ethers } from "ethers";
import NovelManagement from "./abi/NovelManagement.json";
import VoteToken from "./abi/DecentralizedNovelVoteToken.json";
import NFTContractABI from "./abi/DecentralizedNovelChapter.json";
import { NovelManagement as NovelManagementType } from "../typechain";
import { DecentralizedNovelChapter } from "../typechain";
import { DecentralizedNovelVoteToken } from "../typechain";

let Provider = null
if(window.ethereum) {
    Provider = new ethers.BrowserProvider(window.ethereum);
} else {
    Provider = ethers.getDefaultProvider(11155111)
}
export { Provider }
const novelManagementContractAddress =
  "0xd8c8FA3e85fb2A1794dFDc09c62e2297c6a592F8";
const novelManagementABI = NovelManagement;
export const novelManagementContract = new ethers.Contract(
  novelManagementContractAddress,
  novelManagementABI,
  Provider
) as unknown as NovelManagementType;

const voteTokenContractAddress = "0xc64f5324507C9A1c0d2735062aC4137994d5E410";
const voteTokenABI = VoteToken;
export const voteTokenContract = new ethers.Contract(
  voteTokenContractAddress,
  voteTokenABI,
  Provider
) as unknown as DecentralizedNovelVoteToken;

const NFTContractAddress = "0x986A0e9f27e137c463628e93063283b620B71b56";
export const nftContract = new ethers.Contract(
  NFTContractAddress,
  NFTContractABI,
  Provider
) as unknown as DecentralizedNovelChapter;