import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";
import { contract } from ".";

export default function NovelBody() {
  const { user, setUser } = useUserContext();
  const { data, isLoading, error } = useQuery<any>([""], async () => {
    return contract.connect(user).submit("helo");
  });
  console.log("data", data);
  return <div>NovelBody:</div>;
}
