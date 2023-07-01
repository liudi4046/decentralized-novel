import React from "react";
import { novelManagementContract } from "../contracts";
import { useUserContext } from "../context/UserContext";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

export default function WithdrawButton() {
  const { user, setUser } = useUserContext();

  const handleWithdraw = async () => {
    try {
      await (await novelManagementContract.connect(user).withdraw()).wait();
      toast.success("withdraw 50 tokens success");
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason);
    }
  };
  return <div onClick={handleWithdraw}>Withdraw Token</div>;
}
