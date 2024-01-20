import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { novelManagementContract, voteTokenContract } from "../../contracts";
import { useState } from "react";
import { getAcceptedSubmissions } from "../home/NovelBody";
//
export default function VoteButton({
  submissionIndex,
}: {
  submissionIndex: number;
}) {
  const { user, setCurrentSubmissionRound, currentSubmissionRound } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
      setOpen(false);
    try {
      const approveTransaction = await voteTokenContract
        .connect(user)
        .approve(await novelManagementContract.getAddress(), 50);

      await toast.promise(approveTransaction.wait(), {
        pending: {
          render() {
            return (
              <div className="flex gap-3">
                <CircularProgress size={24} />
                <p> The approving transaction is pending...</p>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return "approving succeeded!";
          },

          icon: "🟢",
        },
        error: {
          render() {
            return "approving failed";
          },
        },
      });

      const voteTransaction = await novelManagementContract
        .connect(user)
        .vote(submissionIndex);

      await toast.promise(voteTransaction.wait(), {
        pending: {
          render() {
            return (
              <div className="flex gap-3">
                <CircularProgress size={24} />
                <p> The voting transaction is pending...</p>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return "Voting succeeded!";
          },

          icon: "🟢",
        },
        error: {
          render() {
            return "Voting failed";
          },
        },
      });

      await getAcceptedSubmissions(setCurrentSubmissionRound);
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason ?? error.message);
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
        onClick={() => {
            setOpen(true)
        }}
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
