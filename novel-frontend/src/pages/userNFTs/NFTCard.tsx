import React from "react";

interface NFTCardProps {
  id: string;
  content: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, content }) => {
  return (
    <div className="nftcard">
      <div className="text-3xl font-bold mb-2 text-gray-100">
        ChapterID: {id}
      </div>
      <p className="text-2xl line-clamp-4 mt-5 text-gray-200">{content}</p>
    </div>
  );
};

export default NFTCard;
