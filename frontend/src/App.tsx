import React, { useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MainPage } from "./ui/pages/MainPage";
import { ErrorPage } from "./ui/pages/ErrorPage";
import { NotFoundPage } from "./ui/pages/NotFoundPage";
import { UnauthorizedPage } from "./ui/pages/UnauthorizedPage";
import { ForbiddenPage } from "./ui/pages/ForbiddenPage";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { LoginPage } from "./ui/pages/LoginPage";
import { RegisterPage } from "./ui/pages/RegisterPage";
import { StartupsPage } from "./ui/pages/StartupsPage";
import { StartupPage } from "./ui/pages/StartupPage";
import { useGlobalRequestConfiguration } from "./ui/containers/common/useGlobalRequestConfiguration";
import { useAppSelector } from "./service/store/store";
import { selectUserData } from "./service/store/userSlice";
import { userService } from "./service/user/user";
import { LogoutPage } from "./ui/pages/LogoutPage";
import { RequestPage } from "./ui/pages/RequestPage";
import { RequestsPages } from "./ui/pages/RequestsPages";

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const userData = useAppSelector(selectUserData);

  const protectedRoute =
    (Route: (() => JSX.Element) | CT<unknown>) => (data: any) => {
      if (!userData || !userService.isAuth()) return <Redirect to={"/login"} />;
      return <Route />;
    };

  return (
    <>
      <Switch>
        <Route path={"/"} exact component={protectedRoute(StartupsPage)} />
        <Route
          path={"/startup/:id"}
          exact
          component={protectedRoute(StartupPage)}
        />
        <Route path={"/requests"} exact component={RequestsPages} />
        <Route path={"/request"} exact component={RequestPage} />
        <Route path={"/registration"} exact component={RegisterPage} />
        <Route path={"/login"} exact component={LoginPage} />
        <Route path={"/logout"} exact component={LogoutPage} />
        <Route path={"/error"} component={ErrorPage} />
        <Route path={"/404"} component={NotFoundPage} />
        <Route path={"/403"} component={ForbiddenPage} />
        <Route path={"/401"} component={UnauthorizedPage} />
      </Switch>
    </>
  );
}

export default App;
