import NovelBody from "./NovelBody";
import { useState } from "react";
import Comment from "./Comment";
export default function Home() {
  // const { user, setUser } = useUserContext();
  const [currentSelectedChapterHash,setCurrentSelectedChapterHash] = useState('');
  return (
    <div className="flex h-[90vh] justify-center">
      <NovelBody setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
      <Comment setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
    </div>
  );
}
