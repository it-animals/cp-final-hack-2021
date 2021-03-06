import { PageTemplate } from "../components/PageTemplate";
import { Button, Grid, Typography } from "@mui/material";
import { useTitle } from "react-use";
import { appConfig } from "../../config";

export const NotFoundPage: CT<unknown> = () => {
  useTitle("Страница не существует" + appConfig.titleApp);
  return (
    <>
      <PageTemplate>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant={"h3"}>404 Страница не найдена :(</Typography>
          </Grid>
          <Grid item xs={12}>
            <a href={"/"} style={{ textDecoration: "none" }}>
              <Button color={"secondary"} variant={"contained"}>
                Вернуться на главную
              </Button>
            </a>
          </Grid>
        </Grid>
      </PageTemplate>
    </>
  );
};
