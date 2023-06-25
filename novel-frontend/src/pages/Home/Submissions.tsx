import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { contract } from ".";
import { Button } from "@mui/material";

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
  const [submission, setSubmission] = useState<PartialSubmissionType>();
  const [allSubmissions, setAllSubmissions] = useState<SubmissionType[]>();
  const getSubmission = async () => {
    setSubmission(await contract.connect(user).getSubmission(3));
  };
  const getAllSubmissions = async () => {
    const submissionsLength = await contract.connect(user).submissions.length;
    console.log("submissionsLength", submissionsLength);
    for (let i = 0; i < submissionsLength; i++) {
      const curSubmission = await contract.connect(user).submissions(i);
      setAllSubmissions([...(allSubmissions ?? []), curSubmission]);
    }
  };

  console.log("submission", submission);
  console.log("all", allSubmissions);
  return (
    <div className="flex flex-col">
      submission content:{submission?.content}
      all submissions:{allSubmissions}
      <Button
        onClick={getSubmission}
        variant="contained"
        style={{ width: "fit" }}
      >
        get Submission by index
      </Button>
      <Button
        onClick={getAllSubmissions}
        variant="contained"
        style={{ width: "fit" }}
      >
        get all submissions
      </Button>
    </div>
  );
}
