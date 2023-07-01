import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    outDir: "novel-frontend/typechain",
    target: "ethers-v6",
  },
};

export default config;
