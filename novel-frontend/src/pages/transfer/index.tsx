import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { voteTokenContract } from "../../contracts";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const { user } = useUserContext();

  const [amount, setAmount] = useState("");
  const handleTransfer = async () => {
    try {
      const transactionResponse = await voteTokenContract
        .connect(user)
        .transfer(recipient, amount);

      toast.promise(transactionResponse.wait(), {
        pending: {
          render() {
            return (
              <div className="flex gap-3">
                <CircularProgress size={24} />
                <p> The transfer transaction is pending...</p>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return "Transfer succeeded!";
          },

          icon: "🟢",
        },
        error: {
          render() {
            return "Transaction failed";
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason ?? error.message);
    }
  };
  return (
    <div className="flex justify-center items-center fullscreen-minus-64px">
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
