// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./DecentralizedNovelVoteToken.sol";
import "./DecentralizedNovelChapter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NovelManagement is Ownable {
    struct Submission {
        address author;
        string content;
        bool accepted;
        uint256 yesVotes;
        mapping(address => bool) voted;
    }
    event NewSubmissionAccepted(
        uint256 chapterId,
        address author,
        string content
    );

    Submission[] public submissions;
    DecentralizedNovelVoteToken public decentralizedNovelVoteToken;
    DecentralizedNovelChapter public decentralizedNovelChapter;
    bool public isNFTAddressSet;

    constructor(address votingTokenAddress) {
        decentralizedNovelVoteToken = DecentralizedNovelVoteToken(
            votingTokenAddress
        );
    }

    function vote(uint256 index, bool yesVote) public {
        Submission storage submission = submissions[index];

        require(
            !submission.voted[msg.sender],
            "You have already voted on this submission."
        );
        require(
            decentralizedNovelVoteToken.balanceOf(msg.sender) > 0,
            "You must own a voting token to vote."
        );
        uint256 balance = decentralizedNovelVoteToken.balanceOf(msg.sender);
        require(balance > 0, "You must own a voting token to vote.");

        if (yesVote) {
            submission.yesVotes += 1;
            if (
                submission.yesVotes >
                decentralizedNovelVoteToken.totalSupply() / 2
            ) {
                emit NewSubmissionAccepted(
                    index,
                    submission.author,
                    submission.content
                );

                decentralizedNovelChapter.mint(index);
            }
        }

        submission.voted[msg.sender] = true;
    }

    function setNFTAddress(address nftAddress) public onlyOwner {
        require(!isNFTAddressSet, "NFT address has already been set");
        decentralizedNovelChapter = DecentralizedNovelChapter(nftAddress);
        isNFTAddressSet = true;
    }

    function submit(string memory _content) public {
        // Push a blank Submission and get a reference to it
        submissions.push();
        Submission storage newSubmission = submissions[submissions.length - 1];

        // Set the fields of the new submission
        newSubmission.author = msg.sender;
        newSubmission.content = _content;
        newSubmission.accepted = false;
        newSubmission.yesVotes = 0;
    }

    function getSubmission(
        uint256 index
    )
        public
        view
        returns (
            address author,
            string memory content,
            bool accepted,
            uint256 yesVotes
        )
    {
        return (
            submissions[index].author,
            submissions[index].content,
            submissions[index].accepted,
            submissions[index].yesVotes
        );
    }
}
