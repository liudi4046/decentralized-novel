import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useUserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { novelManagementContract, voteTokenContract } from "../../contracts";
import { useState } from "react";

export default function SubmissionDetailButton({
  content,
  author,
}: {
  content: string;
  author: string;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
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
        Detail
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <p>{content}</p>
          <br />
          <p className="w-fit ml-auto">Author:{author}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
