import { useUserContext } from "../../context/UserContext";

import { useQuery } from "react-query";

import SubmissionCard from "./SubmissionCard";
import { novelManagementContract } from "../../contracts";
import SubmitNewChapterButton from "../../components/SubmitNewChapterButton";
import { Typography } from "@mui/material";
import NoData from "../../components/NoData";

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
type Accumulator = {
  prevTargetChapterId: string | null;
  elements: JSX.Element[];
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
  const previousRoundSubmissions = allSubmissions?.filter((submission) => {
    return Number(submission[0]) !== currentSubmissionRound;
  });

  return (
    <div className="relative min-h-[90vh] ">
      <p className="text-center text-white text-3xl mt-16 mb-10">
        Current Round &nbsp;(Round {currentSubmissionRound})
      </p>

      {isFetching ? (
        <p>loading...</p>
      ) : !currentRoundSubmissions || !currentRoundSubmissions.length ? (
        <NoData content="There are not any submissions in current round" />
      ) : (
        <div className="grid grid-cols-4 grid-flow-row gap-12 ">
          {[...(currentRoundSubmissions || [])]
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
            })}
        </div>
      )}

      <p className="text-center text-white text-3xl mt-16 mb-10">
        Previous Rounds
      </p>
      {isFetching ? (
        <p>loading...</p>
      ) : !previousRoundSubmissions || !previousRoundSubmissions.length ? (
        <NoData content="There are not any submissions in previous rounds" />
      ) : (
        <div className="grid grid-cols-4 grid-flow-row gap-12 ">
          {[...previousRoundSubmissions]?.reverse().map((submission, index) => {
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
          })}
        </div>
      )}
    </div>
  );
}
