import { RequestInterceptor } from "./RequestInterceptor";
import { ErrorBoundary } from "./ErrorBoundary";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle } from "../../styles/_global";
import { ThemeProvider } from "@mui/material";
import { MUITheme } from "../../styles/_MUITheme";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "../../components/SnackbarCloseButton";

export const AppLayout: CT<unknown> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        {/*Отлов ошибок api */}
        <RequestInterceptor>
          <Router>
            {/*тема*/}
            <ThemeProvider theme={MUITheme}>
              {/*снекбары*/}
              <SnackbarProvider
                autoHideDuration={5000}
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
          </Router>
        </RequestInterceptor>
      </ErrorBoundary>
    </>
  );
};
