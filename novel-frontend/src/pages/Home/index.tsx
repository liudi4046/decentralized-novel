import { useEffect } from "react";
import NovelBody from "./NovelBody";
import { useUserContext } from "../../context/UserContext";

import { Provider } from "../../contracts";

export default function Home() {
  // const { user, setUser } = useUserContext();

  return (
    <div className="flex h-[90vh] justify-center">
      <NovelBody />
    </div>
  );
}
