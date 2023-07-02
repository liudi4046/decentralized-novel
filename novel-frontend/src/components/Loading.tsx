import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </>
  );
}
