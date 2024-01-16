import NovelBody from "./NovelBody";
import { useState } from "react";
import Comment from "./Comment";
export default function Home() {
  // const { user, setUser } = useUserContext();
  const [isVisible,setIsVisible] = useState(false);
  return (
    <div className="flex h-[90vh] justify-center">
      <NovelBody setIsVisible={setIsVisible}/>
      <Comment isVisible={isVisible}/>
    </div>
  );
}
