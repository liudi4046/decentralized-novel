// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DecentralizedNovelVoteToken is ERC20 {
    constructor(
        uint256 initialSupply
    ) ERC20("DecentralizedNovelVoteToken", "DNVT") {
        _mint(msg.sender, initialSupply);
    }

    function burnFrom(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
