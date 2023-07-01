import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import WithdrawButton from "./WithdrawButton";
import Submissions from "../pages/submissions";

function MenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>Menu</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link to="transfer">Transfer Token</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="usernfts">My NFTs</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WithdrawButton />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="submissions">Submissions</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuButton;
