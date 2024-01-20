import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Balance from "./Balance";

import MenuButton from "./MenuButton";
import AccountButton from "./AccountButton";
import { Provider } from "../contracts";

export default function Navbar() {
  const { user, setUser } = useUserContext();
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    const setUserAddress = async () => {
      setAddress(await user?.getAddress());
    };
    if (typeof user !== "string") {
      setUserAddress();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // connectMetaMask();
      const token = localStorage.getItem('token')
      if(token) {
        connectMetaMask()
      }
    } else {
      alert("Please install MetaMask first!");
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
    } catch (error) {
      console.log("Error on connecting MetaMask account:", error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <div className="flex flex-col ">
          <div className="flex ">
            My Address: &nbsp;<p className="font-bold">{address}</p>
          </div>

          <Balance />
        </div>
        <div className="w-fit ml-auto flex gap-5 items-center">
          <div className="hover:text-blue-300">
            <Link to="/">Home</Link>
          </div>

          <MenuButton />
          <AccountButton/>
        </div>
      </Toolbar>
    </AppBar>
  );
}
