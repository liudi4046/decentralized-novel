import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { voteTokenContract } from "../../contracts";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const { user } = useUserContext();

  const [amount, setAmount] = useState("");
  const handleTransfer = async () => {
    try {
      await (
        await voteTokenContract.connect(user).transfer(recipient, amount)
      ).wait();
      toast.success("success");
    } catch (error: any) {
      toast.error(error.reason ?? error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="flex flex-col w-1/4 gap-4">
        <TextField
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          placeholder="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Button onClick={handleTransfer} variant="contained">
          transfer
        </Button>
      </div>
    </div>
  );
}
