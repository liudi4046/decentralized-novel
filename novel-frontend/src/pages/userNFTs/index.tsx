import { nftContract, novelManagementContract } from "../../contracts";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoData from "../../components/NoData";
import Loading from "../../components/Loading";
import NFTCard from "./NFTCard";

export default function UserNFTs() {
  const { user } = useUserContext();

  const { data: nfts, isLoading } = useQuery("getNFTs", async () => {
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
    <div className="fullscreen-minus-64px p-10">
      <p className="text-5xl text-gray-200 text-center">My NFTs</p>
      <div className="grid-cols-3 grid m-10 place-items-center">
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : !nfts || nfts.length === 0 ? (
          <div className="col-span-3 mt-20">
            <NoData content="You have not owned any NFTs" />
          </div>
        ) : (
          nfts?.map((nft) => (
            <div className="flex justify-center">
              <NFTCard id={nft.tokenId} content={nft.content} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
