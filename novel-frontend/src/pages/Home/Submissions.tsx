import { useUserContext } from "../../context/UserContext";

import { useQuery } from "react-query";

import Submission from "./Submission";
import { novelManagementContract } from "../../contracts";

type PartialSubmissionType = [string, string, boolean, bigint] & {
  author: string;
  content: string;
  accepted: boolean;
  yesVotes: bigint;
};
type SubmissionType = [bigint, string, string, boolean, bigint] & {
  targetChapterId: bigint;
  author: string;
  content: string;
  accepted: boolean;
  yesVotes: bigint;
};

export default function Submissions() {
  const { user, setUser } = useUserContext();

  const {
    isLoading,
    isFetching,
    error,
    data: allSubmissions,
  } = useQuery<SubmissionType[]>("getAllSubmissions", async () => {
    return getAllSubmissions();
  });

  const getAllSubmissions = async () => {
    const submissionsLength = await novelManagementContract
      .connect(user)
      .getSubmissionsLength();

    const submissionsTemp = [];

    for (let i = 0; i < submissionsLength; i++) {
      const curSubmission = await novelManagementContract
        .connect(user)
        .submissions(i);
      submissionsTemp.push(curSubmission);
    }

    return [...submissionsTemp];
  };

  return (
    <div className="flex flex-col bg-sky-300 w-1/3">
      {isFetching ? (
        <p>loading...</p>
      ) : (
        allSubmissions?.map((submission, index) => {
          return (
            <Submission
              index={index}
              content={submission[2]}
              author={submission[1]}
              targetChapterId={submission[0].toString()}
              yesVotes={submission[4].toString()}
              accepted={submission[3] ? "true" : "false"}
            />
          );
        })
      )}
    </div>
  );
}
