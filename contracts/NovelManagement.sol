// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./DecentralizedNovelVoteToken.sol";
import "./DecentralizedNovelChapter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NovelManagement is Ownable {
    struct Submission {
        uint targetChapterId;
        address author;
        string content;
        bool accepted;
        uint256 yesVotes;
        mapping(address => bool) voted;
    }
    struct AcceptedSubmission {
        address author;
        string content;
    }
    event NewSubmissionAccepted(
        uint256 chapterId,
        address author,
        string content
    );

    mapping(address => uint[]) deposits;
    Submission[] public submissions;
    AcceptedSubmission[] public acceptedSubmissions;
    DecentralizedNovelVoteToken public decentralizedNovelVoteToken;
    DecentralizedNovelChapter public decentralizedNovelChapter;
    bool public isNFTAddressSet;
    bool public isVoteTokenAddressSet;

    function hasVoted(
        uint submissionIndex,
        address voter
    ) public view returns (bool) {
        return submissions[submissionIndex].voted[voter];
    }

    function vote(uint256 submissionIndex) public onlyEOA {
        Submission storage submission = submissions[submissionIndex];

        require(
            submissions[submissionIndex].targetChapterId ==
                acceptedSubmissions.length,
            "Please vote for the latest chapter submissions"
        );
        require(
            !submission.voted[msg.sender],
            "You have already voted on this submission."
        );

        require(
            decentralizedNovelVoteToken.balanceOf(msg.sender) >= 50,
            "You must own enough voting token (50) to vote."
        );

        bool hasVotedSameTargetIdChapter;
        for (uint i = submissions.length; i > 0; i--) {
            uint index = i - 1; // adjust index
            if (hasVoted(index, msg.sender)) {
                if (
                    submissions[index].targetChapterId ==
                    submission.targetChapterId &&
                    submissionIndex != index
                ) {
                    hasVotedSameTargetIdChapter = true;
                }
            }
            if (index == 0) {
                break;
            }
        }
        require(
            !hasVotedSameTargetIdChapter,
            "You have voted a same target chapter ID submission"
        );

        require(
            decentralizedNovelVoteToken.transferFrom(
                msg.sender,
                address(this),
                50
            ),
            "Deposit failed"
        );
        deposits[msg.sender].push(acceptedSubmissions.length);
        submission.yesVotes += 1;
        if (
            submission.yesVotes * 50 >=
            decentralizedNovelVoteToken.totalSupply() / 10
        ) {
            acceptedSubmissions.push();
            AcceptedSubmission
                storage newAcceptedSubmission = acceptedSubmissions[
                    acceptedSubmissions.length - 1
                ];

            newAcceptedSubmission.author = submission.author;
            newAcceptedSubmission.content = submission.content;

            decentralizedNovelChapter.mint(acceptedSubmissions.length - 1);
            decentralizedNovelVoteToken.mint(submission.author, 100);
            emit NewSubmissionAccepted(
                acceptedSubmissions.length - 1,
                submission.author,
                submission.content
            );
        }

        submission.voted[msg.sender] = true;
        decentralizedNovelVoteToken.mint(msg.sender, 10);
    }

    function withdraw() external onlyEOA {
        require(
            deposits[msg.sender].length > 0,
            "should have tokens to withdraw"
        );
        uint[] storage deposit = deposits[msg.sender];
        uint userLatestVoteRound = deposit[deposit.length - 1];

        require(
            acceptedSubmissions.length - 1 >= userLatestVoteRound,
            "The latest voting round has not finished yet"
        );
        require(
            decentralizedNovelVoteToken.transfer(msg.sender, 50),
            "withdraw deposit failed"
        );
        deposit.pop();
    }

    function setNFTAddress(address nftAddress) external onlyOwner {
        require(!isNFTAddressSet, "NFT address has already been set");
        decentralizedNovelChapter = DecentralizedNovelChapter(nftAddress);
        isNFTAddressSet = true;
    }

    function setVoteTokenAddress(address tokenAddress) external onlyOwner {
        require(
            !isVoteTokenAddressSet,
            "Vote Token address has already been set"
        );

        decentralizedNovelVoteToken = DecentralizedNovelVoteToken(tokenAddress);
        isVoteTokenAddressSet = true;
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
        newSubmission.targetChapterId = acceptedSubmissions.length;
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

    function getSubmissionsLength() external view returns (uint) {
        return submissions.length;
    }

    function getAcceptedSubmissions()
        public
        view
        returns (address[] memory, string[] memory)
    {
        address[] memory authors = new address[](acceptedSubmissions.length);
        string[] memory contents = new string[](acceptedSubmissions.length);
        for (uint i = 0; i < acceptedSubmissions.length; i++) {
            authors[i] = acceptedSubmissions[i].author;
            contents[i] = acceptedSubmissions[i].content;
        }
        return (authors, contents);
    }

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Only EOA can call this function.");
        _;
    }
}
