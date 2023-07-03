import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";
import { novelManagementContract } from "../../contracts";

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
    toast.error("failed");
  }
};

export default function NovelBody() {
  const { setCurrentSubmissionRound, currentSubmissionRound } =
    useUserContext();

  const { data, isFetching } = useQuery("getAcceptedSubmissions", () =>
    getAcceptedSubmissions(setCurrentSubmissionRound)
  );
  console.log("currentSubmissionRound", currentSubmissionRound);

  return (
    <div className="w-2/5 h-full p-4 text-gray-900 bg-[#ABCFF5] border-x-2 border-blue-400 overflow-auto">
      <Loading isLoading={isFetching} />
      {data?.chapters.map((chapter, index) => {
        return (
          <span key={index}>
            <AcceptedChapter content={chapter} author={data.authors[index]} />
            {/* chapter:{chapter} author:{data.authors[index]} */}
          </span>
        );
      })}
    </div>
  );
}
