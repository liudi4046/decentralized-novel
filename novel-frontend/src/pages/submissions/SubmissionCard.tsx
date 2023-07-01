import SubmissionDetailButton from "./SubmissionDetailButton";
import VoteButton from "./VoteButton";

interface SubmissionProps {
  index: number;
  content: string;
  author: string;
  targetChapterId: string;
  yesVotes: string;
  accepted: string;
}
export default function Submission({
  index,
  content,
  author,
  targetChapterId,
  yesVotes,
  accepted,
}: SubmissionProps) {
  return (
    <div className="card text-white">
      <p className="index w-fit text-xl"># {index}</p>
      <p className="index w-fit text-xl">Vote Count: {yesVotes}</p>
      <p className="text-xl line-clamp-3 mt-2">{content}</p>
      <div>
        <div className="w-fit ml-auto">
          <SubmissionDetailButton author={author} content={content} />{" "}
          <VoteButton submissionIndex={index} />
        </div>
      </div>
    </div>
  );
}
