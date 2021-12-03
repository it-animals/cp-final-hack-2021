import { PageTemplate } from "../components/PageTemplate";
import { Button, Grid, Typography } from "@mui/material";
import { useTitle } from "react-use";
import { appConfig } from "../../config";

export const ForbiddenPage: CT<unknown> = () => {
  useTitle("Недостаточно прав" + appConfig.titleApp);
  return (
    <>
      <PageTemplate>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant={"h3"}>
              Недостаточно прав для просмотра страницы
            </Typography>
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
