import { Button } from "@mui/material";

import { useUserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { novelManagementContract } from "../../contracts";

export default function VoteButton({
  submissionIndex,
}: {
  submissionIndex: number;
}) {
  const { user, setUser } = useUserContext();
  const handleVote = async () => {
    try {
      await (
        await novelManagementContract.connect(user).vote(submissionIndex)
      ).wait();
      console.log("voting");
      toast.success("🦄 Wow so easy!");
    } catch (error: any) {
      console.error("this", error);
      toast.error(error.reason);
    }
  };
  return (
    <>
      <Button variant="contained" onClick={() => handleVote()}>
        vote
      </Button>
    </>
  );
}
