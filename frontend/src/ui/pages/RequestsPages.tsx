import { TopLine } from "../components/TopLine";
import { userIsAdmin } from "../../domain/user";
import { appConfig } from "../../config";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PageTemplate } from "../components/PageTemplate";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../service/store/store";
import { selectUserData } from "../../service/store/userSlice";
import { HeadingSection } from "../components/HeadingSection";
import styled from "styled-components";
import { requestService } from "../../service/request/request";
import { RequestType } from "../../domain/request";
import { useSnackbar } from "notistack";

const RequestContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Request = styled(Paper)`
  width: 48%;
  min-height: 300px;
  padding: 20px;
`;

export const RequestsPages: CT<unknown> = () => {
  const [data, setData] = useState<RequestType[]>([]);
  const history = useHistory();
  const snackbar = useSnackbar();
  const userData = useAppSelector(selectUserData);

  const load = async () => {
    try {
      const data = await requestService.index({ id: userData!.user!.id });
      setData(data.data.requests);
    } catch (e) {
      snackbar.enqueueSnackbar("Ошибка отправки запроса", {
        variant: "warning",
      });
      setTimeout(() => {
        history.push("/");
      }, 700);
    }
  };
  useEffect(() => {
    if (userData.user) {
      load();
    }
  }, [userData.user]);

  return (
    <PageTemplate>
      <TopLine>
        <Link to={"/"}>
          <Button variant={"outlined"}>К списку стартапов</Button>
        </Link>
        {userData?.user && userIsAdmin(userData.user) && (
          <a href={appConfig.adminPanelUrl}>
            <Button variant={"outlined"}>Панель администратора</Button>
          </a>
        )}
      </TopLine>

      <Grid container xs={12}>
        <Typography variant={"h3"}>Точечные запросы</Typography>
      </Grid>

      <Grid container mt={3} xs={12}>
        <Grid item xs={12}>
          <HeadingSection
            title={(userData?.user?.fio || userData?.user?.email) ?? "..."}
          />
        </Grid>
        <Grid container xs={12} mt={2}>
          <RequestContainer>
            {data.map((item) => (
              <Request>
                <Box display={"flex"} justifyContent={"space-between"}>
                  {item.project_id ? (
                    <Chip
                      size={"medium"}
                      color={"success"}
                      label={"Обработан"}
                    />
                  ) : (
                    <Chip
                      size={"medium"}
                      color={"warning"}
                      label={"Ожидание ответа"}
                    />
                  )}
                </Box>
                <Box mt={1}>
                  <TextField
                    multiline
                    fullWidth
                    rows={8}
                    disabled
                    value={item.descr.replace(/<[^>]*>?/gm, "")}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
                  {item.project_id && (
                    <Link to={`/startup/${item.project_id}`}>
                      <Button variant={"contained"}>
                        {item.project_name ?? "Предлагаемый проект"}
                      </Button>
                    </Link>
                  )}
                </Box>
              </Request>
            ))}
          </RequestContainer>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};
