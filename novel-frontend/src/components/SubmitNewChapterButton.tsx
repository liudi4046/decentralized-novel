import { useState } from "react";

import { useUserContext } from "../context/UserContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { novelManagementContract } from "../contracts";
import { toast } from "react-toastify";
import sha256 from 'crypto-js/sha256';
import {addChapter} from '../api/chapter'
export default function SubmitNewChapterButton() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    alert(1)
    // const chapterHash = sha256(content)
    // alert(chapterHash)
    // const res = await addChapter({chapterHash, content})
    //
    // console.log(res)

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
