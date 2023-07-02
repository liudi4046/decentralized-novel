import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const HelperDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const helperText = [
    {
      question: "What is this?",
      answer:
        "This is a decentralized novel project. Everyone can contribute to the story.",
    },
    {
      question: "How do I submit my contribution?",
      answer: "All users can submit their storylines or plot twists.",
    },
    {
      question: "Whose contribution will be accepted?",
      answer:
        "Users who hold more than 50 Tokens can vote. When the vote count reaches a certain threshold, the proposed storyline or plot twist will be automatically accepted into the evolving novel.",
    },
    {
      question: "What are the rewards for voting and contributing?",
      answer:
        "When a user's contribution is accepted, they will receive 100 tokens and an NFT corresponding to their contribution. For voters, when a round of voting ends (i.e., any contribution is accepted), they will receive 10 tokens as a reward for participating in the vote.",
    },
    {
      question: "What are the restrictions on voting?",
      answer:
        "When users vote, they need to spend 50 tokens as a deposit. After a round of voting ends, users can retrieve their 50 tokens.",
    },
    {
      question: "What exactly are Token and NFT?",
      answer:
        "Tokens follow the ERC20 standard, while NFTs follow the ERC721 standard.",
    },
    {
      question: "这是什么？",
      answer: "这是一个去中心化的小说。每个人都可以参与小说的创作。",
    },
    {
      question: "如何提交我的创作？",
      answer: "所有用户都可以提交他们的创作。",
    },
    {
      question: "谁的创作会被采纳？",
      answer:
        "持有50个以上Token的用户可以进行投票。当投票数达到一定比例时，会自动采纳该创作。",
    },
    {
      question: "投票和创作有什么奖励？",
      answer:
        "当一个作者的创作被采纳之后，他会获得100 token和一个对应该创作的NFT。对于投票者而言，当一轮投票结束时（即任意创作被采纳）他们会获得10 token作为参与投票的奖励。",
    },
    {
      question: "投票有什么限制？",
      answer:
        "当用户投票时，他们需要花费50 token作为押金。在一轮投票结束之后，用户可以自行将50 token取回。",
    },
    {
      question: "Token和NFT具体指什么？",
      answer: "Token遵循ERC20标准，而NFT遵循ERC721标准。",
    },
  ];

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <HelpIcon fontSize="large" style={{ color: "gray" }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {helperText.map((item, index) => (
            <div key={index}>
              {index === 6 ? (
                <>
                  <Divider
                    style={{ backgroundColor: "white", height: "2px" }}
                  />
                  <br />
                </>
              ) : null}
              <p className="text-2xl">{item.question}</p>
              <p className="text-slate-200">:&nbsp;{item.answer}</p>
              <br />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HelperDialog;
