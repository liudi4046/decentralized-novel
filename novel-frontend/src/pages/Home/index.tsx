import { useEffect } from "react";
import NovelBody from "./NovelBody";
import { useUserContext } from "../../context/UserContext";
import { ethers } from "ethers";
import NovelManagement from "../../abi/NovelManagement.json";
import { NovelManagement as NovelManagementType } from "../../../../typechain";
import Submissions from "./Submissions";
import Submit from "./SubmitChapter";
import { ToastContainer } from "react-toastify";
import Balance from "./Balance";
import { Provider } from "../../contracts";
import TransferToken from "./TransferToken";

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

      setUser(await Provider.getSigner());
      window.ethereum.on("accountsChanged", async function () {
        setUser(await Provider.getSigner());
      });
      console.log("Connected accounts:", user);
    } catch (error) {
      console.log("Error on connecting MetaMask account:", error);
    }
  };

  return (
    <div className="flex ">
      <NovelBody />
      <Submissions />
      <Submit />

      <TransferToken />
    </div>
  );
}
