import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import WithdrawButton from "./WithdrawButton";
import {Provider} from "../contracts";
import {useUserContext} from "../context/UserContext";
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

            const ts = new Date()
            const randomNum = '' + ts.getTime() + '-' + Math.floor( Math.random() * 10000000);
            const signature = await signer.signMessage(randomNum.toString());

            console.log("Random Number:", randomNum);
            console.log("Signature:", signature);
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
