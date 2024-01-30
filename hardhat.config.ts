import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();
const { ALCHEMY_SEPOLIA_KEY, ACCOUNT_PRIVATE_KEY, ACCOUNT_PRIVATE_KEY_2 } = process.env;

// 使用方法：在添加.env文件，在其中加入 ALCHEMY_SEPOLIA_KEY, ACCOUNT_PRIVATE_KEY, ACCOUNT_PRIVATE_KEY_2后
// 运行 npx hardhat test --network hardhat 进行本地部署测试
// 运行 npx hardhat test --network sepolia 即可完成sepolia部署+测试




const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {},
    // Sepolia网络配置，使用Alchemy
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`,// 使用Alchemy的Sepolia节点
      accounts: [ACCOUNT_PRIVATE_KEY!,ACCOUNT_PRIVATE_KEY_2!]
      // chainId: 11155111,                    // Sepolia网络的链ID，非必须，Infura、Alchemy 都能够自动处理chainId
    },

    // goerli: {
      // 这个url应该废弃掉了，所以刘神才部署错误
    //   url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // 使用Alchemy的Goerli节点
    //   accounts: [process.env.PRIVATE_KEY as string],
    //   chainId: 5,
    // },
  },
  typechain: {
    outDir: "novel-frontend/typechain",
    target: "ethers-v6",
  },

  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_KEY,
    }
  }
};

export default config;
