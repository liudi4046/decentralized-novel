// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DecentralizedNovelVoteToken is ERC20 {
    address public novelManagementAddress;

    constructor(
        uint256 initialSupply,
        address _novelManagementAddress
    ) ERC20("DecentralizedNovelVoteToken", "DNVT") {
        _mint(msg.sender, initialSupply);
        novelManagementAddress = _novelManagementAddress;
    }

    function mint(address author, uint amount) external {
        require(
            msg.sender == novelManagementAddress,
            "only NovelManagement contract can call this function"
        );
        _mint(author, amount);
    }
}
