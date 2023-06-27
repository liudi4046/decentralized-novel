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
    <div key={index} className="border-2 relative">
      <p>index:{index}</p>
      <p>content:{content}</p>
      <p>author:{author}</p>
      <p>targetChapterId:{targetChapterId}</p>
      <p>yesVotes:{yesVotes}</p>
      <p>accepted:{accepted}</p>
      <div className="absolute right-0 bottom-0 w-fit">
        <VoteButton submissionIndex={index} />
      </div>
    </div>
  );
}
