import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useUserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { novelManagementContract, voteTokenContract } from "../../contracts";
import { useState } from "react";

export default function VoteButton({
  submissionIndex,
}: {
  submissionIndex: number;
}) {
  const { user, setUser } = useUserContext();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    try {
      await voteTokenContract
        .connect(user)
        .approve(await novelManagementContract.getAddress(), 50);
      await (
        await novelManagementContract.connect(user).vote(submissionIndex)
      ).wait();
      console.log("voting");
      toast.success("🦄 Wow so easy!");
    } catch (error: any) {
      console.error("this", error);
      toast.error(error.reason);
    }
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        vote
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          you need 50 tokens for deposit to vote. proceed with the voting?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
