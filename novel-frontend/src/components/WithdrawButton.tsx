import { novelManagementContract } from "../contracts";
import { useUserContext } from "../context/UserContext";

import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "react-query";

export default function WithdrawButton() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const handleWithdraw = async () => {
    try {
      const withdrawTransaction = await novelManagementContract
        .connect(user)
        .withdraw();

      await toast.promise(withdrawTransaction.wait(), {
        pending: {
          render() {
            return (
              <div className="flex gap-3">
                <CircularProgress size={24} />
                <p> The withdraw transaction is pending...</p>
              </div>
            );
          },
          icon: false,
        },
        success: {
          render() {
            return "Withdraw succeeded!";
          },

          icon: "🟢",
        },
        error: {
          render() {
            return "Withdraw failed";
          },
        },
      });
      queryClient.invalidateQueries("balanceof");
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason ?? error.message);
    }
  };
  return <div onClick={handleWithdraw}>Withdraw Token</div>;
}
