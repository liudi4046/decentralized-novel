import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";
import { novelManagementContract } from "../../contracts";

import { useState, useEffect } from 'react';
import AcceptedChapter from "./AcceptedChapter";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

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

export default function NovelBody({currentSelectedChapterHash,setCurrentSelectedChapterHash}:{currentSelectedChapterHash:string;setCurrentSelectedChapterHash:React.Dispatch<React.SetStateAction<string>>}) {
  console.log('NovelBody')

  const { setCurrentSubmissionRound, currentSubmissionRound } =
    useUserContext();
  const [isMounted, setIsMounted] = useState(false);

  // 组件挂载时设置isMounted为true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isFetching } = useQuery("getAcceptedSubmissions", () =>
  {
    return getAcceptedSubmissions(setCurrentSubmissionRound)
  },
      { refetchOnWindowFocus: false } // 使用isMounted控制查询的启用
  );

  console.log("currentSubmissionRound", currentSubmissionRound);

  return (
    <div className="w-3/5 h-full p-4 bg-[#ABCFF5] border-x-2 border-blue-400 overflow-auto">
      <Loading isLoading={isFetching} />
      {data?.chapters.map((chapter, index) => {
        return (
          <div className="mb-6" key={index}>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <AcceptedChapter currentSelectedChapterHash={currentSelectedChapterHash} setCurrentSelectedChapterHash={setCurrentSelectedChapterHash} contentHash={chapter} author={data.authors[index]} />
          </div>
        );
      })}
    </div>
  );
}
