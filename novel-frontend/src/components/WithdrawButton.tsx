import { novelManagementContract } from "../contracts";
import { useUserContext } from "../context/UserContext";

import { toast } from "react-toastify";

export default function WithdrawButton() {
  const { user } = useUserContext();

  const handleWithdraw = async () => {
    try {
      await (await novelManagementContract.connect(user).withdraw()).wait();
      toast.success("withdraw 50 tokens success");
    } catch (error: any) {
      console.log(error);
      toast.error(error.reason);
    }
  };
  return <div onClick={handleWithdraw}>Withdraw Token</div>;
}
