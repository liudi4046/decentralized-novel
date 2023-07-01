import { useUserContext } from "../../context/UserContext";

import { useQuery } from "react-query";

import SubmissionCard from "./SubmissionCard";
import { novelManagementContract } from "../../contracts";
import SubmitNewChapterButton from "./SubmitNewChapterButton";
import { Typography } from "@mui/material";

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
  const { user, currentSubmissionRound } = useUserContext();

  const {
    isLoading,
    isFetching,
    error,
    data: allSubmissions,
  } = useQuery<SubmissionType[]>(
    "getAllSubmissions",
    async () => {
      return getAllSubmissions();
    },
    {
      enabled: !!user,
    }
  );

  const getAllSubmissions = async () => {
    const submissionsLength =
      await novelManagementContract.getSubmissionsLength();

    const submissionsTemp = [];

    for (let i = 0; i < submissionsLength; i++) {
      const curSubmission = await novelManagementContract.submissions(i);
      submissionsTemp.push(curSubmission);
    }

    return [...submissionsTemp];
  };
  const currentRoundSubmissions = allSubmissions?.filter((submission) => {
    return Number(submission[0]) === currentSubmissionRound;
  });

  return (
    <div className="relative min-h-[90vh]">
      <Typography>The Current Round of Voting</Typography>
      <div className="grid grid-cols-3 grid-flow-row gap-5">
        {isFetching ? (
          <p>loading...</p>
        ) : (
          [...(currentRoundSubmissions || [])]
            ?.reverse()
            .map((submission, index) => {
              return (
                <div className="flex justify-center">
                  <SubmissionCard
                    key={index}
                    index={(allSubmissions?.length as number) - 1 - index}
                    content={submission[2]}
                    author={submission[1]}
                    targetChapterId={submission[0].toString()}
                    yesVotes={submission[4].toString()}
                    accepted={submission[3] ? "true" : "false"}
                  />
                </div>
              );
            })
        )}
      </div>
      <div className="absolute right-0 bottom-0">
        <SubmitNewChapterButton />
      </div>
    </div>
  );
}
