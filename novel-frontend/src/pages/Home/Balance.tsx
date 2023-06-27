import { ethers } from "ethers";

import { useUserContext } from "../../context/UserContext";
import { voteTokenContract } from "../../contracts";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Balance() {
  const { user } = useUserContext();

  const { data: balance } = useQuery("balanceof", async () => {
    // const tempBalance = await nftContract.balanceOf(
    //   await (user as ethers.providers.JsonRpcSigner).getAddress()
    // );
    console.log(user?.address);
    const tempBalance = await voteTokenContract
      .connect(user)
      .balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    return tempBalance.toString();
  });

  return <div>Balance:{balance}</div>;
}
