import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import WithdrawButton from "./WithdrawButton";
import {Provider} from "../contracts";
import {useUserContext} from "../context/UserContext";
import {ethers} from 'ethers'

import {login} from '../api/auth'
//abcdefdff
function MenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

    const { user, setUser } = useUserContext();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    const connectMetaMask = async () => {
        try {
            await window?.ethereum?.request({
                method: "eth_requestAccounts",
            });
            const signer = await Provider.getSigner();
            setUser(signer);
            window.ethereum.on("accountsChanged", async function () {
                setUser(await Provider.getSigner());
            });



            const walletAddress = await signer.getAddress();
            const ts = new Date()
            const message = '' + ts.getTime() + '-' + Math.floor( Math.random() * 10000000);

            const signature = await signer.signMessage(message);

            console.log("Random Number:", message);
            console.log("Signature:", signature);



            const address = ethers.verifyMessage('Hello, World!','0x2360e345b8c5ddd815a098a379b81087ea3fb22b7920cfc9e67c8ab43826951f246deac44428361511b8cd7e879eaa429d748cd4906560476b48e5720346978c1c')

            // const recoveredAddress = ethers.utils.verifyMessage(ethers.utils.arrayify(messageHash), signature);

            const res: object = await login({
                signature,
                message,
                walletAddress
            })
            console.log(res)
            const { loginToken } = res.data
            localStorage.setItem('token',loginToken)

        } catch (error) {
            console.log("Error on connecting MetaMask account:", error);
        }
    };
  const handleLogin = () =>{
      handleClose()
      connectMetaMask()
  }
    const handleLogout = () =>{
        handleClose();
        setUser(null);
    }
  return (
    <div>
      <Button onClick={handleClick}>Account</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default MenuButton;
