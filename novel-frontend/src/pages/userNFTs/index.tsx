import React from "react";
import {
  nftContract,
  novelManagementContract,
  voteTokenContract,
} from "../../contracts";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoData from "../../components/NoData";
import Loading from "../../components/Loading";

export default function UserNFTs() {
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
  console.log("nfts", nfts);
  return (
    <div className="h-[90vh] ">
      {isLoading ? (
        <Loading />
      ) : !nfts || nfts.length === 0 ? (
        <div className="h-[90vh] flex justify-center items-center">
          {" "}
          <NoData content="You have not owned any NFTs" />
        </div>
      ) : (
        nfts?.map((nft) => (
          <div>
            <div>tokenId: {nft.tokenId}</div>
            <div>content: {nft.content}</div>
          </div>
        ))
      )}
    </div>
  );
}
