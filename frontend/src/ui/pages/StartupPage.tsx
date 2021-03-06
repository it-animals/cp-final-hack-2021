import { PageTemplate } from "../components/PageTemplate";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { InfoBlock } from "../components/InfoBlock";
import { _variables } from "../styles/_variables";
import React, { useEffect, useState } from "react";
import { HeadingSection } from "../components/HeadingSection";
import { Avatar } from "../components/Avatar";
import { Link, useHistory, useParams } from "react-router-dom";
import { projectService } from "../../service/project/project";
import { useSnackbar } from "notistack";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import {
  getCertProjectById,
  getForProjectById,
  getStatusProjectById,
  getTypeProjectById,
  ProjectType,
} from "../../domain/project";
import styled from "styled-components";
import { useAppSelector } from "../../service/store/store";
import { selectUserData } from "../../service/store/userSlice";
import { userIsAdmin, userIsModerator } from "../../domain/user";
import { TopLine } from "../components/TopLine";
import { appConfig } from "../../config";
import { useTitle } from "react-use";

const Doc = styled(Paper)`
  padding: 40px;
`;

const File = styled(Paper)`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    transition: color 0.2s ease-in;
    color: black;
  }

  &:hover {
    & svg {
      color: ${_variables.primaryColor};
    }
  }
`;

const Info = styled(InfoBlock)`
  min-height: 176px;
`;

export const StartupPage: CT<unknown> = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const snackbar = useSnackbar();
  const [data, setData] = useState<ProjectType | null>(null);
  const userData = useAppSelector(selectUserData);

  useTitle((data?.name ?? "") + appConfig.titleApp);

  const load = async () => {
    try {
      const data = await projectService.getById(Number(id));
      if (!data.data.projects.length) throw new Error("???????????? ????????????");
      setData(data.data.projects[0]);
    } catch (e) {
      snackbar.enqueueSnackbar("???????????? ???????????????? ????????????", {
        variant: "warning",
      });
      history.push("/");
    }
  };

  useEffect(() => {
    if (!Number(id)) history.push("/");
    load();
    //eslint-disable-next-line
  }, []);

  return (
    <PageTemplate>
      <TopLine>
        <Link to={"/"}>
          <Button variant={"outlined"}>?? ???????????? ??????????????????</Button>
        </Link>
        {userData?.user && userIsAdmin(userData.user) && (
          <a href={appConfig.adminPanelUrl}>
            <Button variant={"outlined"}>???????????? ????????????????????????????</Button>
          </a>
        )}
      </TopLine>
      <Grid container>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant={"h3"}>
            {data?.name ?? <Skeleton width={"400px"} />}
          </Typography>
          <div>
            <Button variant={"contained"}>???????????????????? ????????????????</Button>
          </div>
          {/*{userData?.user &&*/}
          {/*  (userIsModerator(userData?.user) ||*/}
          {/*    userIsAdmin(userData?.user)) && (*/}
          {/*    <Button*/}
          {/*      style={{ width: 200 }}*/}
          {/*      size={"large"}*/}
          {/*      variant={"contained"}*/}
          {/*      fullWidth={false}*/}
          {/*    >*/}
          {/*      ??????????????????*/}
          {/*    </Button>*/}
          {/*  )}*/}
        </Grid>
        <Grid container spacing={1} xs={12} mt={3}>
          <Grid item xs={4}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              height={"100%"}
            >
              <div>
                <Grid
                  container
                  xs={12}
                  mt={1}
                  rowGap={"10px"}
                  columnGap={"10px"}
                >
                  {(data?.tags ?? []).map((item) => (
                    <Chip label={item.name} />
                  ))}
                </Grid>
              </div>

              {/*{userData?.user &&*/}
              {/*  (userIsModerator(userData?.user) ||*/}
              {/*    userIsAdmin(userData?.user)) && (*/}
              {/*    <Button*/}
              {/*      style={{ width: 200 }}*/}
              {/*      size={"large"}*/}
              {/*      variant={"contained"}*/}
              {/*      fullWidth={false}*/}
              {/*    >*/}
              {/*      ??????????????????*/}
              {/*    </Button>*/}
              {/*  )}*/}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Info>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                ????????????:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  {data?.status ? getStatusProjectById(data?.status) : "..."}
                </span>
              </Typography>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                ??????????????????????:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  {data?.type ? getTypeProjectById(data?.type) : "..."}
                </span>
              </Typography>
            </Info>
          </Grid>
          <Grid item xs={4}>
            <Info>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                ????????????????????????:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  {data?.certification
                    ? getCertProjectById(data?.certification)
                    : "..."}
                </span>
              </Typography>
              <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                fontSize={20}
                mt={1}
              >
                ???????????? ??????:&nbsp;
                <span
                  style={{
                    fontWeight: "normal",
                    color: _variables.textColor,
                  }}
                >
                  {data?.for_transport
                    ? getForProjectById(data?.for_transport)
                    : "..."}
                </span>
              </Typography>
            </Info>
          </Grid>
        </Grid>

        <Grid container xs={12} mt={3}>
          {data?.descr && (
            <Grid container xs={12}>
              <Grid item xs={12}>
                <HeadingSection title={"????????????????"} />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Doc
                  className={"markdown-body"}
                  dangerouslySetInnerHTML={{ __html: data?.descr }}
                />
              </Grid>
            </Grid>
          )}
          {data?.cases && (
            <Grid container mt={5} xs={12}>
              <Grid item xs={12}>
                <HeadingSection title={"??????????"} />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Doc
                  className={"markdown-body"}
                  dangerouslySetInnerHTML={{ __html: data?.cases }}
                />
              </Grid>
            </Grid>
          )}
          {data?.profit && (
            <Grid container mt={5} xs={12}>
              <Grid item xs={12}>
                <HeadingSection title={"??????????????????????"} />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Doc
                  className={"markdown-body"}
                  dangerouslySetInnerHTML={{ __html: data?.profit }}
                />
              </Grid>
            </Grid>
          )}
          {(data?.projectFiles ?? []).length > 0 && (
            <Grid container mt={5} xs={12}>
              <Grid item xs={12}>
                <HeadingSection title={"??????????"} />
              </Grid>
              <Grid
                container
                xs={12}
                display={"flex"}
                columnGap={"10px"}
                rowGap={"10px"}
                mt={2}
              >
                {data?.projectFiles.map((item) => (
                  <>
                    <Box minWidth={200}>
                      <a rel="noreferrer" href={item.url} target={"_blank"}>
                        <File>
                          <Typography>
                            {`${item.name}.${item.extension}`}
                          </Typography>
                          <DescriptionRoundedIcon />
                        </File>
                      </a>
                    </Box>
                  </>
                ))}
              </Grid>
            </Grid>
          )}
          {data && data?.teams?.length > 0 && (
            <Grid container mt={5} xs={12}>
              <Grid item xs={12}>
                <HeadingSection title={"????????????????"} />
              </Grid>
              {(data?.teams ?? []).map((item) => (
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
                          ??????:&nbsp;
                          <span
                            style={{
                              fontWeight: "normal",
                              color: _variables.textColor,
                            }}
                          >
                            {item.fio || "????????????????????"}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        mt={1}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        {userData?.user &&
                          (userIsModerator(userData?.user) ||
                            userIsAdmin(userData?.user)) && (
                            <a
                              rel="noreferrer"
                              target={"_blank"}
                              href={`mailto:${item.email}`}
                            >
                              <Button
                                style={{ width: 200 }}
                                variant={"contained"}
                                fullWidth={false}
                              >
                                ??????????????????
                              </Button>
                            </a>
                          )}
                        <Chip label={item.is_owner ? "????????????????" : "????????????????"} />
                      </Grid>
                    </Grid>
                  </InfoBlock>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </PageTemplate>
  );
};
