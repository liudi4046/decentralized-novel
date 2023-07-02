import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { novelManagementContract, voteTokenContract } from "../../contracts";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { getAcceptedSubmissions } from "../home/NovelBody";

export default function VoteButton({
  submissionIndex,
}: {
  submissionIndex: number;
}) {
  const { user, setCurrentSubmissionRound } = useUserContext();
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

      getAcceptedSubmissions(setCurrentSubmissionRound);
      toast.success("vote success");
    } catch (error: any) {
      toast.error(error.reason);
    }
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{
          backgroundColor: "inherit !important",
          color: "#fff",
          borderRadius: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          border: 1,
          transition: "all 0.3s ease",
          filter: "brightness(0.7) !important",
          "&:hover": {
            filter: "brightness(1) !important",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        vote
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You need a deposit of 50 tokens to vote. Once the round of voting
          ends, you can withdraw your 50 tokens. Proceed with the voting?
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
