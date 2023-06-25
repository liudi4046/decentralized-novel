import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Layout() {
  const { user } = useUserContext();

  return (
    <div>
      current user address:{user?.address}
      <Outlet />
    </div>
  );
}
