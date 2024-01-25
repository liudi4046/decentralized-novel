import { Popover, Typography } from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {getChapter} from '../../api/chapter'
export default function AcceptedChapter({
  contentHash,
  author,
  setCurrentSelectedChapterHash,
  currentSelectedChapterHash
}: {
  contentHash: string;
  author: string;
  setCurrentSelectedChapterHash:React.Dispatch<React.SetStateAction<string>>;
  currentSelectedChapterHash: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [content,setContent] = useState('')
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(()=>{
      getChapter({chapterHashArray:[contentHash]}).then(({data})=>{
          setContent(data.chapterContentArray.pop())
      })
  },[currentSelectedChapterHash])

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = ()=>{
      setCurrentSelectedChapterHash('');
    // setCurrentSelectedChapterHash(contentHash);
    console.log("111")
  }
  const open = Boolean(anchorEl);
  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        display="inline"
        className="text-gray-700"
        style={{
            fontWeight: "350",
          backgroundColor: open ?"rgb(238 236 146)"  : currentSelectedChapterHash === contentHash ? "rgb(244 243 195)":"transparent",
          fontSize: "1.05rem",
          cursor: 'pointer',
        }}
        onClick={handleClick}

      >
        {content}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <Typography sx={{ p: 1 }}>Author: {author}</Typography>
      </Popover>
    </>
  );
}
