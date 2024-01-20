import NovelBody from "./NovelBody";
import { useState } from "react";
import Comment from "./Comment";
import {useAutoAnimate} from "@formkit/auto-animate/react";
export default function Home() {
  // const { user, setUser } = useUserContext();
    const [parent, enableAnimations] = useAutoAnimate()
  const [currentSelectedChapterHash,setCurrentSelectedChapterHash] = useState('');
  return (
    <div ref={parent} className="flex h-[90vh] justify-center">
      <NovelBody setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
      <Comment setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
    </div>
  );
}
