// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./DecentralizedNovelVoteToken.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NovelManagement.sol";

contract DecentralizedNovelChapter is ERC721 {
    NovelManagement public novelManagement;

    constructor(
        address novelManagementAddress
    ) ERC721("DecentralizedNovelChapter", "DNC") {
        novelManagement = NovelManagement(novelManagementAddress);
    }

    function mint(uint256 chapterIndex) public {
        // Make sure the chapter is accepted before minting an NFT for it
        (address author, , bool accepted, ) = novelManagement.getSubmission(
            chapterIndex
        );
        require(accepted, "Chapter has not been accepted");
        _mint(author, chapterIndex);
    }
}
