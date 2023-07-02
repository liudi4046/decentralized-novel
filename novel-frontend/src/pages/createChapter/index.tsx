import { useState } from "react";

import { Button, TextField } from "@mui/material";
import { useQueryClient } from "react-query";

import { toast } from "react-toastify";
import { novelManagementContract } from "../../contracts";
import { useUserContext } from "../../context/UserContext";

export default function CreateChapter() {
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
