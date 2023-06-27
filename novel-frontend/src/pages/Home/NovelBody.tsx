import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";

export default function NovelBody() {
  // const { user, setUser } = useUserContext();
  // const { data, isLoading, error } = useQuery([""], async () => {
  //   return contract.connect(user).submit("helo");
  // });

  return <div className="w-1/3 bg-slate-300 h-80">NovelBody:</div>;
}
