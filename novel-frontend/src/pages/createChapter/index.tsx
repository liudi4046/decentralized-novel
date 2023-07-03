import { useState } from "react";

import { Button, CircularProgress, TextField } from "@mui/material";

import { toast } from "react-toastify";
import { novelManagementContract } from "../../contracts";
import { useUserContext } from "../../context/UserContext";

export default function CreateChapter() {
  const { user } = useUserContext();
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const transactionResponse = await novelManagementContract
        .connect(user)
        .submit(content);

      toast.promise(transactionResponse.wait(), {
        pending: {
          render() {
            return (
              <div className="flex gap-3">
                <CircularProgress size={24} />
                <p> The submission transaction is pending...</p>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return "Submission succeeded!";
          },

          icon: "🟢",
        },
        error: {
          render() {
            return "Submission failed";
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason ?? error.message);
    }
  };

  return (
    <div className="flex h-[90vh] justify-center items-center">
      {" "}
      <div className="flex flex-col w-1/3 gap-5">
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={16}
          fullWidth
          placeholder="Enter your content"
          autoFocus
        />

        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </div>
    </div>
  );
}
