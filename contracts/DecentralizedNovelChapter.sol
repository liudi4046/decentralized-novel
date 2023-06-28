// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./DecentralizedNovelVoteToken.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./NovelManagement.sol";

contract DecentralizedNovelChapter is ERC721Enumerable {
    address public novelManagementAddress;

    constructor(
        address _novelManagementAddress
    ) ERC721("DecentralizedNovelChapter", "DNC") {
        novelManagementAddress = _novelManagementAddress;
    }

    function mint(uint256 chapterIndex) external {
        require(
            msg.sender == novelManagementAddress,
            "only NovelManagement contract can call this function"
        );
        NovelManagement novelManagement = NovelManagement(
            novelManagementAddress
        );
        (address author, ) = novelManagement.acceptedSubmissions(chapterIndex);
        _safeMint(author, chapterIndex);
    }
}
