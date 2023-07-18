import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import WithdrawButton from "./WithdrawButton";
//abc
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
        <Link to="transfer">
          <MenuItem onClick={handleClose}>Transfer Token</MenuItem>
        </Link>

        <Link to="usernfts">
          <MenuItem onClick={handleClose}>My NFTs</MenuItem>
        </Link>

        <MenuItem onClick={handleClose}>
          <WithdrawButton />
        </MenuItem>

        <Link to="submissions">
          <MenuItem onClick={handleClose}>Submissions</MenuItem>
        </Link>
        <Link to="create-chapter">
          <MenuItem onClick={handleClose}>Create Chapter</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default MenuButton;
