import { Box, Typography } from "@mui/material";
import { CloudOff } from "@mui/icons-material";

const NoData = ({ content }: { content: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CloudOff
        fontSize="large"
        style={{ marginBottom: 16, color: "#B3B6B7" }}
      />

      <Typography variant="h5" component="div" gutterBottom color="#B3B6B7">
        {content}
      </Typography>
    </Box>
  );
};

export default NoData;
