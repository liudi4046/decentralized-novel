import NovelBody from "./NovelBody";
import { useState } from "react";
import Comment from "./Comment";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import HandsDetection from "../../components/HandsDetection"

export default function Home() {
  // const { user, setUser } = useUserContext();
    const [parent, enableAnimations] = useAutoAnimate()
  const [currentSelectedChapterHash,setCurrentSelectedChapterHash] = useState('');
    const [gestureClick, setGestureClick] = useState({leftCount: 0,rightCount: 0})
  return (
    <div ref={parent} className="flex h-[90vh] justify-center">
        <HandsDetection setGestureClick={setGestureClick}></HandsDetection>
      <NovelBody gestureClick={gestureClick} setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
      <Comment setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} currentSelectedChapterHash={currentSelectedChapterHash}/>
    </div>
  );
}
