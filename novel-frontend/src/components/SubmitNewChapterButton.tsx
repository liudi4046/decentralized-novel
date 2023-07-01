import React, { useState } from "react";

import { useUserContext } from "../context/UserContext";
import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { novelManagementContract, voteTokenContract } from "../contracts";
import { toast } from "react-toastify";

export default function SubmitNewChapterButton() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      await (
        await novelManagementContract.connect(user).submit(content)
      ).wait();
      await queryClient.invalidateQueries("getAllSubmissions");
      toast.success("success");
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  };
  const handleCreateChapter = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleCreateChapter}>
        create chapter
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="alert-dialog-title">Enter your chapter</DialogTitle>
        <div className="mx-4">
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={5}
            maxRows={8}
            fullWidth
          />
        </div>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
