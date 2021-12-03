import { PageTemplate } from "../components/PageTemplate";
import { Button, Chip, Grid, Typography, useTheme } from "@mui/material";
import { InfoBlock } from "../components/InfoBlock";
import { _variables } from "../styles/_variables";
import React from "react";
import { HeadingSection } from "../components/HeadingSection";
import { Avatar } from "../components/Avatar";

export const StartupPage: CT<unknown> = () => {
  const theme = useTheme();

  return (
    <PageTemplate>
      <Grid container>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant={"h3"}>Название проекта</Typography>
          <div>
            <Button variant={"contained"}>Управление проектом</Button>
          </div>
        </Grid>
        {/*<Grid container xs={12} mt={1} columnGap={"10px"}>*/}
        {/*  <Chip label="123" defaultValue={"тег1"} />*/}
        {/*  <Chip label="24124" defaultValue={"тег1"} />*/}
        {/*  <Chip label="qwrrwqrq" defaultValue={"тег1"} />*/}
        {/*</Grid>*/}
        <Grid container xs={12} mt={3}>
          <Grid item xs={8} />
          <Grid item xs={4}>
            <InfoBlock>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                Стадия:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  Прототип
                </span>
              </Typography>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                Направление:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  Транспорт
                </span>
              </Typography>
            </InfoBlock>
          </Grid>
        </Grid>
        <Grid container xs={12} mt={3}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <HeadingSection title={"Команда"} />
            </Grid>
            <Grid item xs={4} mt={2}>
              <InfoBlock>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <Avatar variant={"big"} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      fontWeight={"bold"}
                      color={theme.palette.primary.main}
                      fontSize={18}
                      mt={1}
                    >
                      ФИО:&nbsp;
                      <span
                        style={{
                          fontWeight: "normal",
                          color: _variables.textColor,
                        }}
                      >
                        Петров Петр Петрович
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </InfoBlock>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};
