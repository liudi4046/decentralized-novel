import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { contract } from ".";
import { Button } from "@mui/material";
import { useQuery } from "react-query";

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
    const submissionsLength = await contract
      .connect(user)
      .getSubmissionsLength();
    const submissionsTemp = [];

    for (let i = 0; i < submissionsLength; i++) {
      const curSubmission = await contract.connect(user).submissions(i);
      submissionsTemp.push(curSubmission);
    }
    console.log("done");
    return [...submissionsTemp];
  };
  console.log(allSubmissions);
  return (
    <div className="flex flex-col bg-sky-300 w-1/3">
      {isFetching ? (
        <p>loading...</p>
      ) : (
        allSubmissions?.map((submission, index) => {
          return (
            <div key={index}>
              <p>index:{index}</p>
              <p>content:{submission[2]}</p>
              <p>author:{submission[1]}</p>
              <p>targetChapterId:{JSON.stringify(submission[0])}</p>
              <p>yesVotes:{JSON.stringify(submission[4])}</p>
              <p>accepted:{submission[3] ? "true" : "false"}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
