import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import GitHubIcon from "@mui/icons-material/GitHub";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import Submissions from "./pages/submissions";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import Transfer from "./pages/transfer";
import CreateChapter from "./pages/createChapter";
import UserNFTs from "./pages/userNFTs";
import HelperDialog from "./components/HelperDialog";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e4d85",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1e1e1e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#1e1e1e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e4d85",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#243b6b",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#ffffff", // 设置 TextField 的字体颜色为白色
          },
          "& label.Mui-focused": {
            color: "#2e4d85",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#2e4d85",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2e4d85",
          color: "#ffffff",
        },
      },
    },
  },
});
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="create-chapter" element={<CreateChapter />} />
        <Route path="usernfts" element={<UserNFTs />} />
      </Route>
    )
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div
              style={{
                position: "fixed",
                right: "20px",
                bottom: "20px",
                zIndex: "9999",
              }}
            >
              <HelperDialog />
              <IconButton href="https://github.com/liudi4046/decentralized-novel">
                <GitHubIcon style={{ color: "gray" }} fontSize="large" />
              </IconButton>
            </div>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
