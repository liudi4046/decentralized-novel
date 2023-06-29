import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Balance from "../pages/Home/Balance";

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
            user address:{address}
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <Balance />
          </div>
          <Link to="usernfts">My NFTs</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
