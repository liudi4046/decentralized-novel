import { useUserContext } from "../../context/UserContext";

import { useQuery } from "react-query";
import React from 'react'

import SubmissionCard from "./SubmissionCard";
import { novelManagementContract } from "../../contracts";

import NoData from "../../components/NoData";
import Loading from "../../components/Loading";
import {getChapter} from '../../api/chapter'

type SubmissionType = [bigint, string, string, boolean, bigint] & {
  targetChapterId: bigint;
  author: string;
  content: string;
  accepted: boolean;
  yesVotes: bigint;
};
// const getSubmissionsContentByHash = (submissionList : Array<object>) => {
//
// }
// const getAllSubmissions = async () => {
//   console.log("getAllSubmissions");
//   const submissionsLength = await novelManagementContract.getSubmissionsLength();
//
//   const chapterPromises = [];
//
//   for (let i = 0; i < submissionsLength; i++) {
//     const curSubmission = await novelManagementContract.submissions(i);
//     const chapterPromise = getChapter({ chapterHashArray: [curSubmission[2]] })
//         .then(contentTmp => {
//           const subCopy = [...curSubmission];
//           if (contentTmp.data.chapterContentArray[0] !== '') {
//             subCopy[2] = contentTmp.data.chapterContentArray[0];
//           }
//           return subCopy;
//         });
//     chapterPromises.push(chapterPromise);
//   }
//
//   const submissionsTemp = await Promise.all(chapterPromises);
//   console.log(submissionsTemp);
//
//   return submissionsTemp;
// };
function groupByTargetChapterId(submissions) {
    return submissions.reduce((acc, submission) => {
        const chapterId = submission[0].toString();
        if (!acc[chapterId]) {
            acc[chapterId] = [];
        }
        acc[chapterId].push(submission);
        return acc;
    }, {});
}
const getAllSubmissions = async () => {
    console.log("getAllSubmissions");
    const submissionsLength = await novelManagementContract.getSubmissionsLength();

    // Create an array of promises for curSubmissions
    const curSubmissionPromises = [];
    for (let i = 0; i < submissionsLength; i++) {
        curSubmissionPromises.push(novelManagementContract.submissions(i));
    }

    // Resolve all curSubmissions
    const curSubmissions = await Promise.all(curSubmissionPromises);

    // Create chapterPromises based on curSubmissions
    const chapterPromises = curSubmissions.map(curSubmission => {
        return getChapter({ chapterHashArray: [curSubmission[2]] })
            .then(contentTmp => {
                const subCopy = [...curSubmission];
                if (contentTmp.data.chapterContentArray[0] !== '') {
                    subCopy[2] = contentTmp.data.chapterContentArray[0];
                }
                return subCopy;
            });
    });

    // Resolve all chapter promises and return
    const submissionsTemp = await Promise.all(chapterPromises);
    console.log(submissionsTemp);

    return submissionsTemp;
}

export default function Submissions() {
  const { user, currentSubmissionRound } = useUserContext();

  const { isFetching, data: allSubmissions } = useQuery<SubmissionType[]>(
    "getAllSubmissions",
    getAllSubmissions,
    {
      enabled: !!user,
      refetchOnWindowFocus: false
    }
  );

  const currentRoundSubmissions = allSubmissions?.filter((submission) => {
    return Number(submission[0]) === currentSubmissionRound;
  });
  const previousRoundSubmissions = allSubmissions?.filter((submission) => {
    return Number(submission[0]) !== currentSubmissionRound;
  });
  // const previousRoundSubmissionsList = []
  // previousRoundSubmissions.forEach((submission)=>{
  //       previousRoundSubmissionsList[submission[0]].push(submission)
  //   })
    function groupSubmissionsByFirstElement(submissions) {
        return submissions?.reduce((acc, submission) => {
            // 确保acc中有一个以submission[0]为键的数组存在
            if (!acc[submission[0]]) {
                acc[submission[0]] = [];
            }
            // 将当前submission添加到正确的数组中
            acc[submission[0]].push(submission);
            return acc;
        }, []);
    }
    const groupedSubmissions = groupSubmissionsByFirstElement(previousRoundSubmissions);

  console.log("currentSubmissionRound in submissions", currentSubmissionRound);
  return (
    <div className="relative min-fullscreen-minus-64px w-[90%] mx-auto">
      <p className="text-center text-white text-3xl mt-16 mb-10">
        Current Round &nbsp;(Round {currentSubmissionRound})
      </p>

      {isFetching ? (
        <Loading isLoading={isFetching} />
      ) : !currentRoundSubmissions || !currentRoundSubmissions.length ? (
        <NoData content="There are not any submissions in current round" />
      ) : (
          <div className="grid grid-cols-4 grid-flow-row gap-12">
                  {[...(currentRoundSubmissions || [])]
                      ?.reverse()
                      .map((submission, index) => {
                          return (
                              <div className="flex justify-center" key={index}>
                                  <SubmissionCard
                                      key={index}
                                      index={(currentRoundSubmissions?.length as number) - index}
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
        <Loading isLoading={isFetching} />
      ) : !previousRoundSubmissions || !previousRoundSubmissions.length ? (
        <NoData content="There are not any submissions in previous rounds" />
      ) : (
          <div>
              {groupedSubmissions?.slice().reverse().map((submissionList, listIndex) => (
                  <div className="grid grid-cols-4 grid-flow-row gap-12 mb-10">
                      <React.Fragment key={listIndex}>
                          {submissionList?.slice().reverse().map((submission, submissionIndex) => (
                              <div className="flex justify-center" key={submissionIndex}>
                                  <SubmissionCard
                                      index={submissionList?.length - submissionIndex}
                                      content={submission[2]}
                                      author={submission[1]}
                                      targetChapterId={submission[0].toString()}
                                      yesVotes={submission[4].toString()}
                                      accepted={submission[3] ? "true" : "false"}
                                  />
                              </div>
                          ))}
                      </React.Fragment>
                  </div>
              ))}
          </div>

      )}
    </div>
  );
}
