import { useQuery } from "react-query";
import { useUserContext } from "../../context/UserContext";
import { novelManagementContract } from "../../contracts";
import { useState } from "react";
import AcceptedChapter from "./AcceptedChapter";
import { toast } from "react-toastify";

export default function NovelBody() {
  // const { user, setUser } = useUserContext();
  // const { data, isLoading, error } = useQuery([""], async () => {
  //   return contract.connect(user).submit("helo");
  // });
  // const [content,setContent] = useState("")
  // const [author,setAuthor] = useState("")
  const { setCurrentSubmissionRound } = useUserContext();

  const { data, isLoading, error } = useQuery(
    "getAcceptedSubmissions",
    async () => {
      try {
        const [authors, chapters] =
          await novelManagementContract.getAcceptedSubmissions();
        setCurrentSubmissionRound(chapters.length);
        return { chapters, authors };
      } catch (error: any) {
        toast.error("failed");
      }
    }
  );

  return (
    <div className="w-1/3 bg-slate-300 h-80">
      NovelBody:
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
