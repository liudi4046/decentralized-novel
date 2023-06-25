import { useEffect } from "react";
import NovelBody from "./NovelBody";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import NovelManagement from "../../abi/NovelManagement.json";
import { NovelManagement as NovelManagementType } from "../../abi/types/ethers-contracts/NovelManagement";
import Submissions from "./Submissions";

const provider = new ethers.BrowserProvider(window.ethereum);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = NovelManagement;
export const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider
) as unknown as NovelManagementType;

export default function Home() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      connectMetaMask();
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      await window?.ethereum?.request({
        method: "eth_requestAccounts",
      });
      setUser(await provider.getSigner());

      console.log("Connected accounts:", user);
    } catch (error) {
      console.log("Error on connecting MetaMask account:", error);
    }
  };

  return (
    <div>
      <NovelBody />
      <Submissions />
    </div>
  );
}
