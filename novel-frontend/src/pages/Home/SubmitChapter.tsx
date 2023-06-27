import React, { useState } from "react";

import { useUserContext } from "../../context/UserContext";
import { Alert, AlertColor, Button, Snackbar, TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { novelManagementContract } from "../../contracts";
import { toast } from "react-toastify";

export default function SubmitChapter() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [content, setContent] = useState("");

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
  return (
    <div className="">
      <TextField
        placeholder="enter your content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" onClick={() => handleSubmit()}>
        submit
      </Button>
    </div>
  );
}
