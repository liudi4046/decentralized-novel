import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { voteTokenContract } from "../../contracts";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";

export default function TransferToken() {
  const [recipient, setRecipient] = useState("");
  const { user } = useUserContext();

  const [amount, setAmount] = useState("");
  const handleTransfer = async () => {
    await (
      await voteTokenContract.connect(user).transfer(recipient, amount)
    ).wait();
    toast.success("success");
  };
  return (
    <div>
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
  );
}
