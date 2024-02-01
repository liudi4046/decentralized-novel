import SubmissionDetailButton from "./SubmissionDetailButton";
import VoteButton from "./VoteButton";

interface SubmissionProps {
  index: number;
  content: string;
  author: string;
  targetChapterId: string;
  yesVotes: string;
  accepted: string;

  isCurrentRound:boolean
}
export default function Submission({
  index,
  content,
  author,
  targetChapterId,
    isCurrentRound,
  yesVotes,
}: SubmissionProps) {
  return (
    <div className="card text-white">
      <section className="w-full text-xl flex justify-between">
        <p className="font-bold">Round {targetChapterId}</p>
          { !isCurrentRound && <p className="font-normal"># {index}</p>}
          { isCurrentRound && <p className="index w-fit text-xl">Vote Count: {yesVotes}</p>}
      </section>
        { !isCurrentRound &&  <p className="index w-fit text-xl">Vote Count: {yesVotes}</p>}
      <p className="text-xl line-clamp-3 mt-5 ">{content}</p>
      <div>
        <div className="w-fit ml-auto">
          <SubmissionDetailButton author={author} content={content} />{" "}
            {isCurrentRound && <VoteButton submissionIndex={index} /> }
        </div>
      </div>
    </div>
  );
}
