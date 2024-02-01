import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";
import { novelManagementContract } from "../../contracts";

import { useState, useEffect,useRef } from 'react';
import AcceptedChapter from "./AcceptedChapter";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";


import { useTheme } from '@mui/material/styles';

function scrollToCenter(element, container) {
  // const element = document.getElementById(elementId);
  // const container = document.getElementById(containerId);

  if (element && container) {
    // 获取元素相对于容器的位置
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // 计算元素距离容器顶部的距离
    const elementTopRelativeToContainer = elementRect.top - containerRect.top;

    // 计算容器中心的位置
    const containerCenter = container.clientHeight / 3;

    // 计算滚动距离
    const scrollPosition = elementTopRelativeToContainer - containerCenter + container.scrollTop;

    // 在容器中平滑滚动到指定位置
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
}



export const getAcceptedSubmissions = async (
  setCurrentSubmissionRound: React.Dispatch<React.SetStateAction<number | null>>
) => {
  console.log("getAcceptedSubmissions");
  try {
    const [authors, chapters] =
      await novelManagementContract.getAcceptedSubmissions();
    setCurrentSubmissionRound(chapters.length);
    return { chapters, authors };
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("could not decode result data")) {
      toast.error("Metamask should be connected to Sepolia. test network");
      return;
    }
    console.log(error.message);
    toast.error(error.reason ?? error.message);
  }
};

export default function NovelBody({gestureClick,currentSelectedChapterHash,setCurrentSelectedChapterHash}:{gestureClick:object;currentSelectedChapterHash:string;setCurrentSelectedChapterHash:React.Dispatch<React.SetStateAction<string>>}) {
  console.log('NovelBody')
  const theme = useTheme();
  console.log(theme.palette.primary.main); // 访问主题中的值

  const { setCurrentSubmissionRound, currentSubmissionRound } = useUserContext();

  function findElement(operation:string) {
    console.log(data)
    const index = data?.chapters?.indexOf(currentSelectedChapterHash);
    if (index === -1) {
      // currentSelectedChapterHash not found in data
      if(data.chapters[0]) return data.chapters[0];
      return ''
    } else {
      // Calculate the index of the next element
      let nextIndex = 0
      if(operation === 'next') nextIndex = (index + 1) % data?.chapters?.length;
      else nextIndex = (index - 1 + data?.chapters?.length) % data?.chapters?.length;
      if(nextIndex) return data?.chapters[nextIndex];
      if(nextIndex === 0 ) return data?.chapters[nextIndex];
      return ''
    }
  }
  const { data, isFetching } = useQuery("getAcceptedSubmissions", () =>
      {
        return getAcceptedSubmissions(setCurrentSubmissionRound)
      },
      { refetchOnWindowFocus: false } // 使用isMounted控制查询的启用
  );

  const chapterContainer = useRef(null)
  useEffect(()=>{
    const nextHash:string = findElement('next')
    console.log(document.getElementById(nextHash), chapterContainer.current,989898)
    scrollToCenter( document.getElementById(nextHash), chapterContainer.current)
    setCurrentSelectedChapterHash(nextHash)

  },[gestureClick.leftCount])

  useEffect(()=>{
    console.log('right + 1')
    setCurrentSelectedChapterHash(findElement('previous'))
  },[gestureClick.rightCount])


  console.log("currentSubmissionRound", currentSubmissionRound);

  return (
    <div ref={chapterContainer} className="w-1/2 h-full p-4 bg-[#ABCFF5] border-x-2 border-blue-400 overflow-auto">
      <Loading isLoading={isFetching} />
      {data?.chapters.map((chapter, index) => {
        return (
          <div id={chapter} className="mb-6" key={index}>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span >
              <AcceptedChapter currentSelectedChapterHash={currentSelectedChapterHash} setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} contentHash={chapter} author={data.authors[index]} />
            </span>
            </div>

        );
      })}
    </div>
  );
}
