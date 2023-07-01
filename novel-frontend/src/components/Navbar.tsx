import { useEffect, useState, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popper,
  ClickAwayListener,
  Paper,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Balance from "../pages/home/Balance";
import TransferToken from "../pages/transfer";
import MenuButton from "./MenuButton";

export default function Navbar() {
  const { user } = useUserContext();
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    const setUserAddress = async () => {
      setAddress(await user?.getAddress());
    };
    if (typeof user !== "string") {
      setUserAddress();
    }
  }, [user]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Home</Link>
          </Typography>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            My Address: {address}
          </Typography>

          <div style={{ flexGrow: 1 }}>
            <Balance />
          </div>

          <MenuButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
