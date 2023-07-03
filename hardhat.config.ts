import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // 使用Alchemy的Goerli节点
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 5,
    },
  },
  typechain: {
    outDir: "novel-frontend/typechain",
    target: "ethers-v6",
  },
};

export default config;
