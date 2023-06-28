import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ethers } from "ethers";
import Balance from "../pages/Home/Balance";

export default function Layout() {
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
      current user address:{address}
      <Balance />
      <Outlet />
    </div>
  );
}
