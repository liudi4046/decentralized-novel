import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ethers } from "ethers";

export default function Layout() {
  const { user } = useUserContext();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const setUserAddress = async () => {
      setAddress(await (user as ethers.JsonRpcSigner).getAddress());
    };
    if (typeof user !== "string") {
      setUserAddress();
    }
  }, [user]);

  return (
    <div>
      current user address:{address}
      <Outlet />
    </div>
  );
}
