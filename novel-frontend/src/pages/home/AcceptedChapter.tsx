import { Popover, Typography } from "@mui/material";
import React from "react";

export default function AcceptedChapter({
  content,
  author,
}: {
  content: string;
  author: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        display="inline"
        style={{
          backgroundColor: open ? "#F2F2AD" : "transparent",
          fontSize: "1.2rem",
        }}
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
