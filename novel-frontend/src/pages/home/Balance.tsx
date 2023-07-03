import { useUserContext } from "../../context/UserContext";
import { voteTokenContract } from "../../contracts";
import { useQuery } from "react-query";

export default function Balance() {
  const { user } = useUserContext();

  const { data: balance } = useQuery(["balanceof", user], async () => {
    try {
      if (user?.address) {
        const tempBalance = await voteTokenContract.balanceOf(user.address);
        return tempBalance.toString();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex">
      Token Balance:&nbsp;<div className="flex font-bold">{balance}</div>
    </div>
  );
}
