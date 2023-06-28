import React from "react";
import {
  nftContract,
  novelManagementContract,
  voteTokenContract,
} from "../../contracts";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function UserNFT() {
  const { user } = useUserContext();

  const {
    data: nfts,
    isLoading,
    error,
  } = useQuery("getNFTs", async () => {
    if (user) {
      try {
        const nfts: { tokenId: string; content: string }[] = [];
        const tokenCount = await nftContract.balanceOf(user.address);
        for (let i = 0; i < tokenCount; i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(
            user.address,
            i
          );
          const acceptedSubmission =
            await novelManagementContract.acceptedSubmissions(tokenId);
          nfts.push({
            tokenId: tokenId.toString(),
            content: acceptedSubmission.content,
          });
        }
        return nfts;
      } catch (error: any) {
        toast.error(error.reason);
      }
    }
  });

  return (
    <>
      {nfts?.map((nft) => (
        <div>
          <div>tokenId: {nft.tokenId}</div>
          <div>content: {nft.content}</div>
        </div>
      ))}
    </>
  );
}
