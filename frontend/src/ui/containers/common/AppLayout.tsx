import { RequestInterceptor } from "./RequestInterceptor";
import { ErrorBoundary } from "./ErrorBoundary";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle } from "../../styles/_global";
import { ThemeProvider } from "@mui/material";
import { MUITheme } from "../../styles/_MUITheme";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "../../components/SnackbarCloseButton";
import { useGlobalRequestConfiguration } from "./useGlobalRequestConfiguration";
import { useLoadUserData } from "./useLoadUserData";

export const AppLayout: CT<unknown> = ({ children }) => {
  useGlobalRequestConfiguration();
  useLoadUserData();
  return (
    <>
      <GlobalStyle />
      <Router>
        <ErrorBoundary>
          {/*  /!*Отлов ошибок api *!/*/}
          <RequestInterceptor>
            {/*тема*/}
            <ThemeProvider theme={MUITheme}>
              {/*снекбары*/}
              <SnackbarProvider
                autoHideDuration={2000}
                maxSnack={3}
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "bottom",
                }}
                action={(snackbarKey) => (
                  <SnackbarCloseButton snackbarKey={snackbarKey} />
                )}
              >
                {children}
              </SnackbarProvider>
            </ThemeProvider>
          </RequestInterceptor>
        </ErrorBoundary>
      </Router>
    </>
  );
};
