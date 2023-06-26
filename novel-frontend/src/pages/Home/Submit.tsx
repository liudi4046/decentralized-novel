import React, { useState } from "react";
import { contract } from ".";
import { useUserContext } from "../../context/UserContext";
import { Alert, AlertColor, Button, Snackbar, TextField } from "@mui/material";
import { useQueryClient } from "react-query";

export default function Submit() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const handleSubmit = async () => {
    try {
      await (await contract.connect(user).submit(content)).wait();
      await queryClient.invalidateQueries("getAllSubmissions");
      setSeverity("success");
      setIsSnackBarOpen(true);
    } catch (error) {
      console.error(error);
      setSeverity("error");
      setIsSnackBarOpen(true);
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
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackBarOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
