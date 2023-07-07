/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  NovelManagement,
  NovelManagementInterface,
} from "../../contracts/NovelManagement";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "chapterId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "NewSubmissionAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "acceptedSubmissions",
    outputs: [
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decentralizedNovelChapter",
    outputs: [
      {
        internalType: "contract DecentralizedNovelChapter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decentralizedNovelVoteToken",
    outputs: [
      {
        internalType: "contract DecentralizedNovelVoteToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAcceptedSubmissions",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getSubmission",
    outputs: [
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "bool",
        name: "accepted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "yesVotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubmissionsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "submissionIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isNFTAddressSet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isVoteTokenAddressSet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "setNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "setVoteTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "submissions",
    outputs: [
      {
        internalType: "uint256",
        name: "targetChapterId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "bool",
        name: "accepted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "yesVotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "submit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "submissionIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612f5c80620001146000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063715018a6116100a25780639686213311610071578063968621331461029b578063ad73349e146102b9578063d99a8dc3146102ed578063f2a0988314610309578063f2fde38b1461033a57610116565b8063715018a6146102375780637b85a67c146102415780638d75311d1461025f5780638da5cb5b1461027d57610116565b80633e8686cc116100e95780633e8686cc1461017b57806340979980146101ae57806343859632146101cc5780634acb028c146101fc57806369d037381461021b57610116565b80630121b93f1461011b5780630b75a29a146101375780630f350d34146101555780633ccfd60b14610171575b600080fd5b6101356004803603810190610130919061196f565b610356565b005b61013f610c2f565b60405161014c91906119b7565b60405180910390f35b61016f600480360381019061016a9190611a30565b610c42565b005b610179610cf9565b005b6101956004803603810190610190919061196f565b610f23565b6040516101a59493929190611b0b565b60405180910390f35b6101b6611089565b6040516101c391906119b7565b60405180910390f35b6101e660048036038101906101e19190611b57565b61109c565b6040516101f391906119b7565b60405180910390f35b610204611116565b604051610212929190611d61565b60405180910390f35b61023560048036038101906102309190611a30565b611351565b005b61023f611408565b005b61024961141c565b6040516102569190611df7565b60405180910390f35b610267611442565b6040516102749190611e12565b60405180910390f35b61028561144f565b6040516102929190611e2d565b60405180910390f35b6102a3611478565b6040516102b09190611e69565b60405180910390f35b6102d360048036038101906102ce919061196f565b61149e565b6040516102e4959493929190611e84565b60405180910390f35b61030760048036038101906103029190612013565b611599565b005b610323600480360381019061031e919061196f565b61167c565b60405161033192919061205c565b60405180910390f35b610354600480360381019061034f9190611a30565b611758565b005b3273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103bb906120d8565b60405180910390fd5b6000600282815481106103da576103d96120f8565b5b9060005260206000209060060201905060038054905060028381548110610404576104036120f8565b5b90600052602060002090600602016000015414610456576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044d90612199565b60405180910390fd5b8060050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156104e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104dc9061222b565b60405180910390fd5b6032600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016105429190611e2d565b602060405180830381865afa15801561055f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105839190612260565b10156105c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105bb906122ff565b60405180910390fd5b60008060028054905090505b600081111561065e5760006001826105e8919061234e565b90506105f4813361109c565b1561063c57836000015460028281548110610612576106116120f8565b5b9060005260206000209060060201600001541480156106315750808514155b1561063b57600192505b5b6000810361064a575061065e565b50808061065690612382565b9150506105d0565b5080156106a0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106979061241d565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd333060326040518463ffffffff1660e01b815260040161070093929190612478565b6020604051808303816000875af115801561071f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074391906124db565b610782576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077990612554565b60405180910390fd5b6032600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107d29190612574565b9250508190555060018260040160008282546107ee9190612574565b92505081905550600a600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610864573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108889190612260565b61089291906125d7565b603283600401546108a39190612608565b10610b40576003600181600181540180825580915050039060005260206000209050506000600360016003805490506108dc919061234e565b815481106108ed576108ec6120f8565b5b906000526020600020906002020190508260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826002018160010190816109789190612877565b50600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a0712d6860016003805490506109c9919061234e565b6040518263ffffffff1660e01b81526004016109e59190611e12565b600060405180830381600087803b1580156109ff57600080fd5b505af1158015610a13573d6000803e3d6000fd5b50505050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f198460010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660646040518363ffffffff1660e01b8152600401610a9992919061299a565b600060405180830381600087803b158015610ab357600080fd5b505af1158015610ac7573d6000803e3d6000fd5b505050507f7c310cab26fe78c7db4459a9203ba74c47611ef5d13b07f3831601a2c21258846001600380549050610afe919061234e565b8460010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600201604051610b3693929190612a47565b60405180910390a1505b60018260050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933600a6040518363ffffffff1660e01b8152600401610bf8929190612ac0565b600060405180830381600087803b158015610c1257600080fd5b505af1158015610c26573d6000803e3d6000fd5b50505050505050565b600560149054906101000a900460ff1681565b610c4a6117db565b600560159054906101000a900460ff1615610c9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9190612b5b565b60405180910390fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600560156101000a81548160ff02191690831515021790555050565b3273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5e906120d8565b60405180910390fd5b6032600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610dea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de190612bed565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3360326040518363ffffffff1660e01b8152600401610e48929190612c0d565b6020604051808303816000875af1158015610e67573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8b91906124db565b610eca576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec190612c82565b60405180910390fd5b6032600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f1a919061234e565b92505081905550565b6000606060008060028581548110610f3e57610f3d6120f8565b5b906000526020600020906006020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660028681548110610f8457610f836120f8565b5b906000526020600020906006020160020160028781548110610fa957610fa86120f8565b5b906000526020600020906006020160030160009054906101000a900460ff1660028881548110610fdc57610fdb6120f8565b5b906000526020600020906006020160040154828054610ffa90612679565b80601f016020809104026020016040519081016040528092919081815260200182805461102690612679565b80156110735780601f1061104857610100808354040283529160200191611073565b820191906000526020600020905b81548152906001019060200180831161105657829003601f168201915b5050505050925093509350935093509193509193565b600560159054906101000a900460ff1681565b6000600283815481106110b2576110b16120f8565b5b906000526020600020906006020160050160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b606080600060038054905067ffffffffffffffff81111561113a57611139611ee8565b5b6040519080825280602002602001820160405280156111685781602001602082028036833780820191505090505b509050600060038054905067ffffffffffffffff81111561118c5761118b611ee8565b5b6040519080825280602002602001820160405280156111bf57816020015b60608152602001906001900390816111aa5790505b50905060005b60038054905081101561134457600381815481106111e6576111e56120f8565b5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683828151811061122b5761122a6120f8565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505060038181548110611279576112786120f8565b5b9060005260206000209060020201600101805461129590612679565b80601f01602080910402602001604051908101604052809291908181526020018280546112c190612679565b801561130e5780601f106112e35761010080835404028352916020019161130e565b820191906000526020600020905b8154815290600101906020018083116112f157829003601f168201915b5050505050828281518110611326576113256120f8565b5b6020026020010181905250808061133c90612ca2565b9150506111c5565b5081819350935050509091565b6113596117db565b600560149054906101000a900460ff16156113a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a090612d36565b60405180910390fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600560146101000a81548160ff02191690831515021790555050565b6114106117db565b61141a6000611859565b565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600280549050905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600281815481106114ae57600080fd5b90600052602060002090600602016000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020180546114fd90612679565b80601f016020809104026020016040519081016040528092919081815260200182805461152990612679565b80156115765780601f1061154b57610100808354040283529160200191611576565b820191906000526020600020905b81548152906001019060200180831161155957829003601f168201915b5050505050908060030160009054906101000a900460ff16908060040154905085565b6002600181600181540180825580915050039060005260206000209050506000600260016002805490506115cd919061234e565b815481106115de576115dd6120f8565b5b90600052602060002090600602019050338160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160020190816116429190612d56565b5060008160030160006101000a81548160ff0219169083151502179055506000816004018190555060038054905081600001819055505050565b6003818154811061168c57600080fd5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546116d590612679565b80601f016020809104026020016040519081016040528092919081815260200182805461170190612679565b801561174e5780601f106117235761010080835404028352916020019161174e565b820191906000526020600020905b81548152906001019060200180831161173157829003601f168201915b5050505050905082565b6117606117db565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036117cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117c690612e9a565b60405180910390fd5b6117d881611859565b50565b6117e361191d565b73ffffffffffffffffffffffffffffffffffffffff1661180161144f565b73ffffffffffffffffffffffffffffffffffffffff1614611857576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184e90612f06565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61194c81611939565b811461195757600080fd5b50565b60008135905061196981611943565b92915050565b6000602082840312156119855761198461192f565b5b60006119938482850161195a565b91505092915050565b60008115159050919050565b6119b18161199c565b82525050565b60006020820190506119cc60008301846119a8565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119fd826119d2565b9050919050565b611a0d816119f2565b8114611a1857600080fd5b50565b600081359050611a2a81611a04565b92915050565b600060208284031215611a4657611a4561192f565b5b6000611a5484828501611a1b565b91505092915050565b611a66816119f2565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611aa6578082015181840152602081019050611a8b565b60008484015250505050565b6000601f19601f8301169050919050565b6000611ace82611a6c565b611ad88185611a77565b9350611ae8818560208601611a88565b611af181611ab2565b840191505092915050565b611b0581611939565b82525050565b6000608082019050611b206000830187611a5d565b8181036020830152611b328186611ac3565b9050611b4160408301856119a8565b611b4e6060830184611afc565b95945050505050565b60008060408385031215611b6e57611b6d61192f565b5b6000611b7c8582860161195a565b9250506020611b8d85828601611a1b565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611bcc816119f2565b82525050565b6000611bde8383611bc3565b60208301905092915050565b6000602082019050919050565b6000611c0282611b97565b611c0c8185611ba2565b9350611c1783611bb3565b8060005b83811015611c48578151611c2f8882611bd2565b9750611c3a83611bea565b925050600181019050611c1b565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b6000611c9d82611a6c565b611ca78185611c81565b9350611cb7818560208601611a88565b611cc081611ab2565b840191505092915050565b6000611cd78383611c92565b905092915050565b6000602082019050919050565b6000611cf782611c55565b611d018185611c60565b935083602082028501611d1385611c71565b8060005b85811015611d4f5784840389528151611d308582611ccb565b9450611d3b83611cdf565b925060208a01995050600181019050611d17565b50829750879550505050505092915050565b60006040820190508181036000830152611d7b8185611bf7565b90508181036020830152611d8f8184611cec565b90509392505050565b6000819050919050565b6000611dbd611db8611db3846119d2565b611d98565b6119d2565b9050919050565b6000611dcf82611da2565b9050919050565b6000611de182611dc4565b9050919050565b611df181611dd6565b82525050565b6000602082019050611e0c6000830184611de8565b92915050565b6000602082019050611e276000830184611afc565b92915050565b6000602082019050611e426000830184611a5d565b92915050565b6000611e5382611dc4565b9050919050565b611e6381611e48565b82525050565b6000602082019050611e7e6000830184611e5a565b92915050565b600060a082019050611e996000830188611afc565b611ea66020830187611a5d565b8181036040830152611eb88186611ac3565b9050611ec760608301856119a8565b611ed46080830184611afc565b9695505050505050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611f2082611ab2565b810181811067ffffffffffffffff82111715611f3f57611f3e611ee8565b5b80604052505050565b6000611f52611925565b9050611f5e8282611f17565b919050565b600067ffffffffffffffff821115611f7e57611f7d611ee8565b5b611f8782611ab2565b9050602081019050919050565b82818337600083830152505050565b6000611fb6611fb184611f63565b611f48565b905082815260208101848484011115611fd257611fd1611ee3565b5b611fdd848285611f94565b509392505050565b600082601f830112611ffa57611ff9611ede565b5b813561200a848260208601611fa3565b91505092915050565b6000602082840312156120295761202861192f565b5b600082013567ffffffffffffffff81111561204757612046611934565b5b61205384828501611fe5565b91505092915050565b60006040820190506120716000830185611a5d565b81810360208301526120838184611ac3565b90509392505050565b7f4f6e6c7920454f412063616e2063616c6c20746869732066756e6374696f6e2e600082015250565b60006120c2602083611a77565b91506120cd8261208c565b602082019050919050565b600060208201905081810360008301526120f1816120b5565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f506c6561736520766f746520666f7220746865206c617465737420636861707460008201527f6572207375626d697373696f6e73000000000000000000000000000000000000602082015250565b6000612183602e83611a77565b915061218e82612127565b604082019050919050565b600060208201905081810360008301526121b281612176565b9050919050565b7f596f75206861766520616c726561647920766f746564206f6e2074686973207360008201527f75626d697373696f6e2e00000000000000000000000000000000000000000000602082015250565b6000612215602a83611a77565b9150612220826121b9565b604082019050919050565b6000602082019050818103600083015261224481612208565b9050919050565b60008151905061225a81611943565b92915050565b6000602082840312156122765761227561192f565b5b60006122848482850161224b565b91505092915050565b7f596f75206d757374206f776e20656e6f75676820766f74696e6720746f6b656e60008201527f202835302920746f20766f74652e000000000000000000000000000000000000602082015250565b60006122e9602e83611a77565b91506122f48261228d565b604082019050919050565b60006020820190508181036000830152612318816122dc565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061235982611939565b915061236483611939565b925082820390508181111561237c5761237b61231f565b5b92915050565b600061238d82611939565b9150600082036123a05761239f61231f565b5b600182039050919050565b7f596f75206861766520766f74656420612073616d65207461726765742063686160008201527f70746572204944207375626d697373696f6e0000000000000000000000000000602082015250565b6000612407603283611a77565b9150612412826123ab565b604082019050919050565b60006020820190508181036000830152612436816123fa565b9050919050565b6000819050919050565b600061246261245d6124588461243d565b611d98565b611939565b9050919050565b61247281612447565b82525050565b600060608201905061248d6000830186611a5d565b61249a6020830185611a5d565b6124a76040830184612469565b949350505050565b6124b88161199c565b81146124c357600080fd5b50565b6000815190506124d5816124af565b92915050565b6000602082840312156124f1576124f061192f565b5b60006124ff848285016124c6565b91505092915050565b7f4465706f736974206661696c6564000000000000000000000000000000000000600082015250565b600061253e600e83611a77565b915061254982612508565b602082019050919050565b6000602082019050818103600083015261256d81612531565b9050919050565b600061257f82611939565b915061258a83611939565b92508282019050808211156125a2576125a161231f565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006125e282611939565b91506125ed83611939565b9250826125fd576125fc6125a8565b5b828204905092915050565b600061261382611939565b915061261e83611939565b925082820261262c81611939565b915082820484148315176126435761264261231f565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061269157607f821691505b6020821081036126a4576126a361264a565b5b50919050565b6000815490506126b981612679565b9050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026127377fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826126fa565b61274186836126fa565b95508019841693508086168417925050509392505050565b600061277461276f61276a84611939565b611d98565b611939565b9050919050565b6000819050919050565b61278e83612759565b6127a261279a8261277b565b848454612707565b825550505050565b600090565b6127b76127aa565b6127c2818484612785565b505050565b5b818110156127e6576127db6000826127af565b6001810190506127c8565b5050565b601f82111561282b576127fc816126c0565b612805846126ea565b81016020851015612814578190505b612828612820856126ea565b8301826127c7565b50505b505050565b600082821c905092915050565b600061284e60001984600802612830565b1980831691505092915050565b6000612867838361283d565b9150826002028217905092915050565b81810361288557505061295d565b61288e826126aa565b67ffffffffffffffff8111156128a7576128a6611ee8565b5b6128b18254612679565b6128bc8282856127ea565b6000601f8311600181146128eb57600084156128d9578287015490505b6128e3858261285b565b865550612956565b601f1984166128f9876126d5565b9650612904866126c0565b60005b8281101561292c57848901548255600182019150600185019450602081019050612907565b868310156129495784890154612945601f89168261283d565b8355505b6001600288020188555050505b5050505050505b565b6000819050919050565b600061298461297f61297a8461295f565b611d98565b611939565b9050919050565b61299481612969565b82525050565b60006040820190506129af6000830185611a5d565b6129bc602083018461298b565b9392505050565b600081546129d081612679565b6129da8186611a77565b945060018216600081146129f55760018114612a0b57612a3e565b60ff198316865281151560200286019350612a3e565b612a14856126c0565b60005b83811015612a3657815481890152600182019150602081019050612a17565b808801955050505b50505092915050565b6000606082019050612a5c6000830186611afc565b612a696020830185611a5d565b8181036040830152612a7b81846129c3565b9050949350505050565b6000819050919050565b6000612aaa612aa5612aa084612a85565b611d98565b611939565b9050919050565b612aba81612a8f565b82525050565b6000604082019050612ad56000830185611a5d565b612ae26020830184612ab1565b9392505050565b7f566f746520546f6b656e20616464726573732068617320616c7265616479206260008201527f65656e2073657400000000000000000000000000000000000000000000000000602082015250565b6000612b45602783611a77565b9150612b5082612ae9565b604082019050919050565b60006020820190508181036000830152612b7481612b38565b9050919050565b7f73686f756c642068617665203e3d20353020746f6b656e7320746f207769746860008201527f6472617700000000000000000000000000000000000000000000000000000000602082015250565b6000612bd7602483611a77565b9150612be282612b7b565b604082019050919050565b60006020820190508181036000830152612c0681612bca565b9050919050565b6000604082019050612c226000830185611a5d565b612c2f6020830184612469565b9392505050565b7f7769746864726177206465706f736974206661696c6564000000000000000000600082015250565b6000612c6c601783611a77565b9150612c7782612c36565b602082019050919050565b60006020820190508181036000830152612c9b81612c5f565b9050919050565b6000612cad82611939565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612cdf57612cde61231f565b5b600182019050919050565b7f4e465420616464726573732068617320616c7265616479206265656e20736574600082015250565b6000612d20602083611a77565b9150612d2b82612cea565b602082019050919050565b60006020820190508181036000830152612d4f81612d13565b9050919050565b612d5f82611a6c565b67ffffffffffffffff811115612d7857612d77611ee8565b5b612d828254612679565b612d8d8282856127ea565b600060209050601f831160018114612dc05760008415612dae578287015190505b612db8858261285b565b865550612e20565b601f198416612dce866126c0565b60005b82811015612df657848901518255600182019150602085019450602081019050612dd1565b86831015612e135784890151612e0f601f89168261283d565b8355505b6001600288020188555050505b505050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612e84602683611a77565b9150612e8f82612e28565b604082019050919050565b60006020820190508181036000830152612eb381612e77565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612ef0602083611a77565b9150612efb82612eba565b602082019050919050565b60006020820190508181036000830152612f1f81612ee3565b905091905056fea2646970667358221220c52b3cc4e3a07f5a32ba7d9bfc7b2eed3c685e841b7b5d92f3b2b6f9d96f87ad64736f6c63430008120033";

type NovelManagementConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NovelManagementConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NovelManagement__factory extends ContractFactory {
  constructor(...args: NovelManagementConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      NovelManagement & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): NovelManagement__factory {
    return super.connect(runner) as NovelManagement__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NovelManagementInterface {
    return new Interface(_abi) as NovelManagementInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): NovelManagement {
    return new Contract(address, _abi, runner) as unknown as NovelManagement;
  }
}