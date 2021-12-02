import { Button, Grid, Typography } from "@mui/material";
import { PageTemplate } from "../components/PageTemplate";
import { Link } from "react-router-dom";

export const ErrorPage: CT<unknown> = () => {
  return (
    <>
      <PageTemplate>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant={"h3"}>Что-то пошло не так :(</Typography>
          </Grid>
          <Grid item xs={12}>
            <a href={"/"} style={{ textDecoration: "none" }}>
              <Button color={"secondary"} variant={"contained"}>
                Перезагрузить
              </Button>
            </a>
          </Grid>
        </Grid>
      </PageTemplate>
    </>
  );
};
