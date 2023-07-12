import { useUserContext } from "../context/UserContext";
import { voteTokenContract } from "../contracts";
import { useQuery } from "react-query";
//23
export default function Balance() {
  const { user } = useUserContext();

  const { data: balance } = useQuery(["balanceof", user], async () => {
    try {
      if (user?.address) {
        console.log("address", user.address);
        const tempBalance = await voteTokenContract.balanceOf(user.address);
        return tempBalance.toString();
      }
    } catch (error) {
      console.error("balanceof error", error);
    }
  });

  return (
    <div className="flex">
      Token Balance:&nbsp;<div className="flex font-bold">{balance}</div>
    </div>
  );
}
