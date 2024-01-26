import {useContext, useEffect, useState} from "react";
import { useUserContext } from "../context/UserContext";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Balance from "./Balance";

import MenuButton from "./MenuButton";
import AccountButton from "./AccountButton";
import { Provider } from "../contracts";
import {HandsVisibleContext} from "../context/HandsVisibleContext";

export default function Navbar() {
  const { user, setUser } = useUserContext();
  const [address, setAddress] = useState<string | undefined>("");
  const { handsVisible, setHandsVisible } = useContext(HandsVisibleContext);

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

          <label className="swap swap-rotate mr-2">
            <input
                type="checkbox"
                checked={handsVisible}
                onChange={()=>setHandsVisible(i=>!i)}
            />
            <svg className="swap-on w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="swap-off w-6 h-6" >
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"/>
            </svg>



          </label>
          <div className="hover:text-blue-300">
            <Link to="/">HOME</Link>
          </div>

          <MenuButton />
          <AccountButton/>
        </div>
      </Toolbar>
    </AppBar>
  );
}
