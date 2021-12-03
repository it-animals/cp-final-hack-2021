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
import { RegisterPage } from "./ui/components/RegisterPage";
import { StartapsPage } from "./ui/pages/StartapsPage";
import { StartapPage } from "./ui/pages/StartapPage";

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      <Switch>
        <Route path={"/"} exact component={StartapsPage} />
        <Route path={"/startap/:id"} exact component={StartapPage} />
        <Route path={"/registration"} exact component={RegisterPage} />
        <Route path={"/login"} exact component={LoginPage} />
        <Route path={"/error"} component={ErrorPage} />
        <Route path={"/404"} component={NotFoundPage} />
        <Route path={"/403"} component={ForbiddenPage} />
        <Route path={"/401"} component={UnauthorizedPage} />
      </Switch>
    </>
  );
}

export default App;
